from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import psycopg2.extras
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  


DATABASE_URL = os.getenv("NEON_DB_URL")
if not DATABASE_URL:
    raise Exception("NEON_DB_URL not found in environment variables")


conn = psycopg2.connect(DATABASE_URL, sslmode="require")
cur = conn.cursor()

@app.route("/", methods=["GET"])
def home():
    return "Flask + Neon DB Registration API Live!"

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    event_name = data.get("event_name")
    team_name = data.get("team_name")
    members = data.get("members")

   
    if not event_name or not team_name or not members:
        return jsonify({"error": "Missing required fields"}), 400

    try:
    
        cur.execute(
            "SELECT team_name FROM event_registrations WHERE event_name = %s AND team_name = %s",
            (event_name, team_name)
        )
        if cur.fetchone():
            return jsonify({"error": "Team name already exists for this event"}), 400
        cur.execute(
            """
            INSERT INTO event_registrations (event_name, team_name, members)
            VALUES (%s, %s, %s)
            """,
            (event_name, team_name, psycopg2.extras.Json(members))
        )
        conn.commit()

        return jsonify({"message": "Registered successfully"}), 200

    except Exception as e:
        
        print("DB Error:", e)
        return jsonify({"error": "Failed to register", "details": str(e)}), 500

@app.route("/registrations", methods=["GET"])
def get_registrations():
    try:
        cur.execute("SELECT id, event_name, team_name, members, created_at FROM event_registrations ORDER BY created_at DESC")
        rows = cur.fetchall()
        result = []
        for row in rows:
            result.append({
                "id": row[0],
                "event_name": row[1],
                "team_name": row[2],
                "members": row[3],
                "created_at": row[4].isoformat() if row[4] else None
            })
        return jsonify(result), 200
    except Exception as e:
        print(" DB Error:", e)
        return jsonify({"error": "Failed to fetch registrations", "details": str(e)}), 500

if __name__ == "__main__":
    # Run locally
    app.run(host="0.0.0.0", port=8080)

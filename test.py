import requests
import json

# API URL (your local Flask server)
API_URL = "https://anokhya-website-backend.vercel.app/registration"

# Sample registration data
data = {
    "event_name": "TestEvent",
    "team_name": "TeamAlpha",
    "members": [
        {
            "name": "John Doe",
            "phone": "9999999999",
            "email": "john@example.com",
            "college": "DSCE"
        },
        {
            "name": "Jane Doe",
            "phone": "8888888888",
            "email": "jane@example.com",
            "college": "DSCE"
        }
    ]
}

# Send POST request
response = requests.post(API_URL, json=data)

# Print response status and content
print("Status Code:", response.status_code)
try:
    print("Response JSON:", json.dumps(response.json(), indent=2))
except Exception:
    print("Response Text:", response.text)

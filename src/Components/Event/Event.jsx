import { useEffect, useRef } from "react";
import "./Event.css";
import event_data from "../../Assets/Data/Events_data.json";
import RegistrationForm from "../Reg/Registration";
import VanillaTilt from "vanilla-tilt";

function Tilt(props) {
  const { options, children, ...rest } = props;
  const tiltRef = useRef(null);

  useEffect(() => {
    // Protect against cases where the ref isn't set or the library fails to initialize.
    if (!tiltRef.current) return;

    try {
      VanillaTilt.init(tiltRef.current, options);
    } catch (err) {
      // initialization failed — don't crash the app
      // eslint-disable-next-line no-console
      console.warn("VanillaTilt init failed:", err);
    }

    return () => {
      try {
        if (tiltRef.current && tiltRef.current.vanillaTilt && typeof tiltRef.current.vanillaTilt.destroy === "function") {
          tiltRef.current.vanillaTilt.destroy();
        }
      } catch (err) {
        // cleanup failed — log and continue
        // eslint-disable-next-line no-console
        console.warn("VanillaTilt destroy failed:", err);
      }
    };
  }, [options]);

  return (
    <div ref={tiltRef} {...rest}>
      {children}
    </div>
  );
}

function Coderelay() {
  // Robustly extract the event index from the URL path (expecting /events/:id)
  const pathMatch = window.location.pathname.match(/\/events\/(\d+)/);
  const eventIndex = pathMatch ? parseInt(pathMatch[1], 10) - 1 : 0;
  const event_ = event_data[eventIndex];

  // If event data isn't found, render a friendly fallback instead of crashing
  if (!event_) {
    return (
      <div className="IndEventmain">
        <div className="link">
          <a href={`/`}>
            <i className="fa-solid fa-home" style={{ color: "#ffffff", fontSize: "30px" }}></i>
          </a>
        </div>
        <div style={{ padding: 40, color: '#fff' }}>
          <h2>Event not found</h2>
          <p>The event you requested doesn't exist or the URL is invalid.</p>
        </div>
      </div>
    );
  }

  // Removed KonfHub widget injection — we use the built-in register modal instead.

  const options = {
    speed: 2000,
    max: 20,
  };

  // Handle navigation based on event index
  const handleNextEvent = () => {
    if (eventIndex < event_data.length - 1) {
      const nextEventIndex = eventIndex + 1;
      window.location.href = `/events/${nextEventIndex + 1}`;
    } else {
      window.location.href = "/";
    }
  };

  const handlePrevEvent = () => {
    if (eventIndex > 0) {
      const prevEventIndex = eventIndex - 1;
      window.location.href = `/events/${prevEventIndex + 1}`;
    }
  };

  return (
    <>
      <div className="IndEventmain">
        <div className="link"> 
                <a href={`/`}>
                  <i
                    className="fa-solid fa-home"
                    style={{ color: "#ffffff" ,fontSize:"30px"}}
                  ></i>
                </a>
            </div>
        <div className="card_comp">
          <div className={`card_img_style event${event_.event_id}`}></div>

          <div className="event_description">
            <h2
              className="event_heading"
              style={{ color: `${event_.colour_code}` }}
            >
              {event_.event_name}
            </h2>
            <p>{event_.event_description}</p>
            <RegistrationForm eventId={eventIndex + 1} />

            {/* KonfHub removed — using local registration modal */}
          </div>
        </div>
        <div className="other_event_details">
          <div className="text_comp">
            <Tilt options={options}>
              <div className="event_time_details">
                <p style={{ whiteSpace: "pre-wrap" }}>
                  <i
                    className="fa-regular fa-calendar"
                    style={{ color: "ffffff" }}
                  ></i>{" "}
                  Event Date (Prelims): TBD
                </p>
                <p style={{ whiteSpace: "pre-wrap" }}>
                  <i
                    className="fa-regular fa-calendar"
                    style={{ color: "ffffff" }}
                  ></i>{" "}
                  Event Date (Finals): {event_.event_time}
                </p>
                <p>
                  <i
                    className="fa-solid fa-money-check-dollar"
                    style={{ color: "#ffffff" }}
                  ></i>{" "}
                  Fee: {event_.registration_fees}
                </p>
                <p>
                  <i
                    className="fa-solid fa-user-group"
                    style={{ color: "#fafcff" }}
                  ></i>{" "}
                  Team Size: {event_.team_size}
                </p>
              </div>
            </Tilt>

            <Tilt>
              <div className="event_prize_details">
                <h2>
                  <i
                    className="fa-solid fa-trophy"
                    style={{ color: "#ffffff" }}
                  ></i>{" "}
                  Exciting Prizes
                </h2>
                <p> First Prize: {event_.prize_pool.first_prize}</p>
                <p> Second Prize: {event_.prize_pool.second_prize}</p>
              </div>
            </Tilt>

            <Tilt>
              <div className="event_coordinators_details">
                <h2>Co-ordinator's</h2>
                <div className="name_and_phone">
                  <p>
                    <i
                      className="fa-solid fa-user"
                      style={{ color: "#ffffff" }}
                    ></i>{" "}
                    {event_.event_coordinator1}
                  </p>
                  <p style={{ whiteSpace: "pre-wrap", color: "greenorange" }}>
                    <i
                      className="fa-brands fa-whatsapp"
                      style={{ color: "#ffffff" }}
                    ></i>{" "}
                    {event_.coordinator1_mobile}
                  </p>
                </div>

                <div className="name_and_phone">
                  <p>
                    <i
                      className="fa-solid fa-user"
                      style={{ color: "#ffffff" }}
                    ></i>{" "}
                    {event_.event_coordinator2}
                  </p>
                  <p style={{ whiteSpace: "pre-wrap", color: "greenyellow" }}>
                    <i
                      className="fa-brands fa-whatsapp"
                      style={{ color: "#ffffff" }}
                    ></i>{" "}
                    {event_.coordinator2_mobile}
                  </p>
                </div>
              </div>
            </Tilt>
          </div>
        </div>

        <div className="navigation_buttons">
          {/* "Previous" Button */}
          {eventIndex > 0 && (
            <div className="content1">
              <a onClick={handlePrevEvent}>Previous</a>
            </div>
          )}

          {/* "Next" Button */}
          {eventIndex < event_data.length - 1 && (
            <div className="content2">
              <a onClick={handleNextEvent}>Next</a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Coderelay;

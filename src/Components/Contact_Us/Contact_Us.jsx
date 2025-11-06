import { useState } from "react";
import "./Contact_Us.css";
import bimg from "../../Assets/bottom.png";

const Contact_Us = () => {
  const whatsappCommunityLink = import.meta.env.VITE_WHATSAPP_LINK; // Replace with your actual WhatsApp community link

  return (
    <div className="conts" id="Contact">
      <div className="conts_con">
        <div className="conts_head">CONTACT US</div>
        
        <div className="conts_whatsapp">
          <h2 className="conts_doubts">Have any Doubts?</h2>
          <p className="conts_join_text">Join our WhatsApp community for quick support and updates!</p>
          <a 
            href={whatsappCommunityLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="conts_whatsapp_btn"
          >
            <i className="fab fa-whatsapp"></i>
            Join WhatsApp Community
          </a>
        </div>

        <div className="conts_links">
          <ul>
            <li>
              <a
                href="https://www.instagram.com/_anokhya?igsh=MTR5Y3lhejA1NHZpMw=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="mailto:aiml-dsce@dayanandasagar.edu" target="_blank" rel="noopener noreferrer">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/aimldeptdsce/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a
                href={`tel:${9108208731}`} 
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-phone"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="conts_img">
          <img src={bimg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Contact_Us;
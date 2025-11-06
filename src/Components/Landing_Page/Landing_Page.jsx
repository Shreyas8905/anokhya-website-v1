import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./land.css";
import logo from "../../Assets/LPMV/logo2.png";
import banner from "../../Assets/LPMV/1.gif";
import previous from "../../Assets/LPMV/Anokhya2.png";
import banner2 from "../../Assets/LPMV/banner.png";
import banner1 from "../../Assets/Events/final.mp4";
import { AuroraBackground } from "../ui/background";
import acm from "../../Assets/logos/acm.png";
import anvaya from "../../Assets/logos/anvaya.png";
import czl1 from "../../Assets/logos/czl1.png";
import iiclogo from "../../Assets/logos/iiclogo.png";
import iqac from "../../Assets/logos/iqac.png";
import Alert_mssg from '../../Components/Alert_mssg/Alert_mssg';

export default function Homee() {
  // Placeholder images for navbar carousel - replace with your actual image URLs
const navImages = [
    iiclogo, 
    iqac, 
    acm, 
    anvaya, 
    czl1
  ];


  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % navImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [navImages.length]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      {/* Header with Navbar - Outside AuroraBackground */}
      <header className="relative w-full bg-black/80 backdrop-blur-md shadow-lg border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 space-x-40">
            <div className="flex justify-center items-center gap-6">
                <div className="home_m_logo">
                  <img src={logo} alt="Logo" />
                  <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 overflow-hidden border-2 shadow-lg border border-solid border-gray-500 border-opacity-0 br-transparant"
                >
                   <img 
                    src={navImages[currentIndex]}
                    alt={`Nav Image ${currentIndex + 1}`}
                    className="w-full h-full object-cover"
                  />

                </motion.div>
              </AnimatePresence>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-4">
              {/* <button
                onClick={() => setCurrentView('register')}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-black rounded-full hover:from-orange-600 hover:to-yellow-600 transition-colors font-medium shadow-lg hover:shadow-orange-500/25"
              >
                Register
              </button>
              <button
                onClick={() => setCurrentView('about')}
                className="px-6 py-2 border border-orange-500 text-orange-400 rounded-full hover:bg-orange-500/10 transition-colors font-medium"
              >
                About
              </button> */}
            <div className="home_m_top_left">
              <h3>TECH FEST 2025</h3>
              <p>EVENTS WORKSHOPS TECH-TALKS</p>
              <p style={{ color: "orange" }}>21st - 22nd NOV 2025</p>
            </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="pt-20"
        >
          <div className="body" id="Home">
          {/*<div>
            <Alert_mssg message="🎉 Big News! Scuzo (Popsicle) is gifting cashback vouchers to the runners-up of Anokhya 3.0! 🏆💸" duration={8000} />
          </div>*/}
          <div className="home_m">
            
            {/* Toggle Popup Button */}
            <button onClick={togglePopup} className="toggle-button">
              <img src={previous} alt="Round Image"/>
            </button>

            {/* Popup Modal */}
            <AnimatePresence>
              {isPopupOpen && (
                <motion.div
                  className="popup-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={togglePopup}
                >
                  <motion.div
                    className="popup-content"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ul>
                      <li><video src={banner1} alt="video" autoPlay controls/></li>
                    </ul>
                    <button onClick={togglePopup} className="close-button">
                      Close
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
           
            {/* Rest of your component content */}
            {/* <div className="home_m_logo">
              <img src={logo} alt="Logo" />
            </div> */}
            <div className="home_m_banner">
              <img src={banner} alt="Banner" />
            </div>
            <div className="home_m_banner1">
              <img src={banner2} alt="banner" />
            </div>
            <div className="home_m_buttons">
              <a href="/anokhya3.pdf">BROCHURE</a>
              <a href="#Events">EVENTS</a>
              <a href="#Timeline">TIMELINE</a>
            </div>
            <div className="home_m_info">
              <p style={{ color: "white" }}>Brought to you by</p>
              <h4 style={{ textAlign: "center" }}>
                DAYANANDA SAGAR COLLEGE OF ENGINEERING
              </h4>
              <h5 style={{ textAlign: "center", color: "white" }}>
                Department of Artificial Intelligence & Machine Learning
              </h5>
            </div>
            <div className="home_m_links">
              <div>
                <a href="https://www.instagram.com/_anokhya?igsh=MTR5Y3lhejA1NHZpMw==">
                  <i
                    className="fa-brands fa-instagram"
                    style={{ color: "#ffffff" }}
                  ></i>
                </a>
              </div>
              <div>
                <a href={import.meta.env.VITE_WHATSAPP_LINK}>
                  <i
                    className="fa-brands fa-whatsapp"
                    style={{ color: "#ffffff" }}
                  ></i>
                </a>
              </div>
              <div>
                <a href="mailto:techfest@anokhya.com">
                  <i
                    className="fa-solid fa-envelope"
                    style={{ color: "#ffffff" }}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      </AuroraBackground>
    </>
  );
}
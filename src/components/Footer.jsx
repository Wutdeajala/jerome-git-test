import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import logo1 from '../assets/images/logos/logo1.png'; // White logo
import "./LuxuryFooter.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ===== Logo & About ===== */}
        <div className="footer-about">
          <img src={logo1} alt="Bima Shelter Logo" className="footer-logo" />
          <p>
            Bima Shelter Ltd delivers premium real estate solutions across Nigeria, combining
            innovative design, sustainable practices, and trusted industry leadership.
          </p>
        </div>

        {/* ===== Quick Links ===== */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* ===== Contact Info ===== */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p><FaMapMarkerAlt className="icon"/> 123 Bima Street, Abuja, Nigeria</p>
          <p><FaPhoneAlt className="icon"/> +234 800 123 4567</p>
          <p><FaEnvelope className="icon"/> info@bimashelter.com</p>
          <div className="footer-socials">
            <a href="https://ng.linkedin.com/company/bima-shelter-limited" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://www.instagram.com/bimashelterltd/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* ===== Newsletter (Optional) ===== */}
        <div className="footer-newsletter">
          <h4>Subscribe</h4>
          <p>Stay updated with our latest properties and news.</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="footer-bottom">
        © 2026 Bima Shelter Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
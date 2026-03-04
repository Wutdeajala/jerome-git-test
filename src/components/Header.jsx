import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import logo1 from '../assets/images/logos/logo1.png'; // white logo
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);
  const closeMenu = () => {
  setIsOpen(false);
};

  return (
    <>
      <header className="header">
        <div className="header-container">

          {/* LEFT — LOGO */}
          <div className="logo">
            <Link to='/' onClick={closeMenu}>
              <img
                src={logo1}  // Always use white logo
                alt="Bima Shelter Logo"
              />
            </Link>
          </div>

          {/* CENTER — NAVIGATION */}
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/properties">Properties</Link>
          </nav>

          {/* RIGHT — SOCIAL + CTA + HAMBURGER */}
          <div className="right-section">

            <div className="social-icons">
              <a
                href="https://ng.linkedin.com/company/bima-shelter-limited"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://www.instagram.com/bimashelterltd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>

            <Link className="contact-btn" to='/contact'>
              Contact Us
            </Link>

            <div
              className="hamburger"
              onClick={() => setMenuOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* MOBILE PANEL */}
      <div className={`mobile-panel ${menuOpen ? "open" : ""}`}>
        <div className="mobile-header">
          <img
            src={logo1}
            alt="Emerald Estates Logo"
            className="mobile-logo"
          />
          <div
            className="close-btn"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </div>
        </div>

        <nav className="mobile-nav">
          <Link to='/' onClick={closeMenu}>Home</Link>
          <Link to='/about' onClick={closeMenu}>About</Link>
          <Link to='/properties' onClick={closeMenu}>Properties</Link>
          <Link className="mobile-contact-btn" to='/contact' onClick={closeMenu}> 
            Contact Us
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
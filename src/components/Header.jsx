import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import logo1 from "../assets/images/logos/logo1.png";
import logo2 from "../assets/images/logos/greelogo.png";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Scroll effect only for home page
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`header ${
          isHomePage ? (scrolled ? "scrolled" : "home-header") : "normal-header"
        }`}
      >
        
          <nav className="mb-nav">
          <div className="hamburger" onClick={() => setMenuOpen(true)}>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <img
            src={logo1}
            alt="Bima Shelter Logo"
            className="mb-lg"
          />
          </nav>
        
        <div className="header-container">
          
          {/* LOGO */}
          
          <div className="logo">
            <Link to="/" onClick={closeMenu}>
              <img src={logo1} alt="Bima Shelter Logo" />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/properties">Properties</Link>
          </nav>

          {/* RIGHT SECTION */}
          <div className="right-section">
            <div className="social-icons">
              <a
                href="https://ng.linkedin.com/company/bima-shelter-limited"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://www.instagram.com/bimashelterltd/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>

            <Link className="contact-btn" to="/contact">
              Contact Us
            </Link>


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

  {/* MOBILE HEADER */}
  <div className="mobile-header">
    <img
      src={logo2}
      alt="Bima Shelter Logo"
      className="mb-lg2"
    />

    <div className="close-btn" onClick={closeMenu}>
      ✕
    </div>
  </div>
  <div className="underline"></div>

  {/* MOBILE NAV LINKS */}
  <nav className="mobile-nav">
    <Link to="/" onClick={closeMenu}>
      Home
    </Link>
    <Link to="/about" onClick={closeMenu}>
      About
    </Link>
    <Link to="/properties" onClick={closeMenu}>
      Properties
    </Link>
    <div className="underline"></div>

    <Link
      className="mobile-contact-btn"
      to="/contact"
      onClick={closeMenu}
    >
      Contact Us
    </Link>
  </nav>

</div>
    </>
  );
};

export default Navbar;
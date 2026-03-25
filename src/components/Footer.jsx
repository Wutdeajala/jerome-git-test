import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import {
  MapPin, Phone, Mail, Send, ArrowRight, CheckCircle
} from "lucide-react";
import logo1 from "../assets/images/logos/logo1.png";
import "./LuxuryFooter.css";

// ─── Data ──────────────────────────────────────────────────────────────────────
const quickLinks = [
  { label: "Home",       to: "/"           },
  { label: "About",      to: "/about"      },
  { label: "Properties", to: "/properties" },
  { label: "Contact",    to: "/contact"    },
];

const contactItems = [
  {
    Icon: MapPin,
    text: "No 3, Ankuru Close, Off Gurara Street, Maitama, Abuja FCT",
    href: "https://www.google.com/maps/search/Ankuru+Close+Maitama+Abuja",
  },
  {
    Icon: Phone,
    text: "+234 000 000 0000",
    href: "tel:+2340000000000",
  },
  {
    Icon: Mail,
    text: "info@bimashelter.com",
    href: "mailto:info@bimashelter.com",
  },
];

// ─── Email validation (same pattern as the rest of the site) ──────────────────
const isValidEmail = (e) =>
  /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(e.trim());

// ─── Component ─────────────────────────────────────────────────────────────────
const Footer = () => {
  const [email,   setEmail]   = useState("");
  const [status,  setStatus]  = useState("idle"); // idle | loading | success | error
  const [errMsg,  setErrMsg]  = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setErrMsg("Please enter a valid email address.");
      return;
    }

    setErrMsg("");
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: email.trim().toLowerCase().slice(0, 254) }),
      });

      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="lf-footer">

      {/* ── Top rule with diamond accent ── 
      <div className="lf-top-rule" aria-hidden="true">
        <span className="lf-top-rule__line" />
        <span className="lf-top-rule__diamond" />
        <span className="lf-top-rule__line" />
      </div>  */}

      <div className="lf-inner">

        {/* ── Col 1 — Brand ── */}
        <div className="lf-brand">
          <img src={logo1} alt="Bima Shelter Logo" className="lf-logo" />
          <p className="lf-brand__body">
            Bima Shelter Ltd delivers premium real estate solutions across
            Nigeria, combining innovative design, sustainable practices, and
            trusted industry leadership.
          </p>
          <div className="lf-socials">
            <a
              href="https://ng.linkedin.com/company/bima-shelter-limited"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="lf-social"
            >
              <FaLinkedinIn size={15} />
            </a>
            <a
              href="https://www.instagram.com/bimashelterltd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="lf-social"
            >
              <FaInstagram size={15} />
            </a>
          </div>
        </div>

        {/* ── Col 2 — Quick Links ── */}
        <div className="lf-col">
          <h4 className="lf-col__heading">Quick Links</h4>
          <ul className="lf-links">
            {quickLinks.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="lf-link">
                  <ArrowRight size={12} className="lf-link__arrow" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 3 — Contact ── */}
        <div className="lf-col">
          <h4 className="lf-col__heading">Contact Us</h4>
          <ul className="lf-contact-list">
            {contactItems.map(({ Icon, text, href }, i) => (
              <li key={i} className="lf-contact-item">
                <span className="lf-contact-item__icon">
                  <Icon size={14} strokeWidth={2} />
                </span>
                <a
                  href={href}
                  className="lf-contact-item__text"
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 4 — Newsletter ── */}
        <div className="lf-col">
          <h4 className="lf-col__heading">Stay Updated</h4>
          <p className="lf-newsletter__sub">
            Subscribe to receive our latest listings, news and market insights.
          </p>

          {status === "success" ? (
            <div className="lf-newsletter__success">
              <CheckCircle size={18} />
              <span>You're subscribed — thank you!</span>
            </div>
          ) : (
            <form className="lf-newsletter__form" onSubmit={handleSubscribe} noValidate>
              <div className={`lf-newsletter__field${errMsg ? " lf-newsletter__field--err" : ""}`}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrMsg("");
                    if (status === "error") setStatus("idle");
                  }}
                  maxLength={254}
                  autoComplete="email"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-label="Subscribe"
                >
                  <Send size={14} />
                </button>
              </div>
              {errMsg && (
                <p className="lf-newsletter__err">{errMsg}</p>
              )}
            </form>
          )}

          <p className="lf-newsletter__privacy">
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="lf-bottom">
        <p>© {new Date().getFullYear()} Bima Shelter Ltd. All rights reserved.</p>
        <p className="lf-bottom__tag">Bima Shelter · Abuja, Nigeria</p>
      </div>

    </footer>
  );
};

export default Footer;

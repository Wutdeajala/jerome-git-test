import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import bg2 from "../assets/images/bimaworld.png";
import "./HomeCta.css";

const CTABanner = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`cta-banner${visible ? " cta-banner--visible" : ""}`}
      ref={ref}
      aria-labelledby="cta-heading"
      style={{ backgroundImage: `url(${bg2})` }}
    >
      {/* Decorative background elements */}
      <div className="cta-banner__circle cta-banner__circle--1" aria-hidden="true" />
      <div className="cta-banner__circle cta-banner__circle--2" aria-hidden="true" />
      <div className="cta-banner__circle cta-banner__circle--3" aria-hidden="true" />

      {/* Content */}
      <div className="cta-banner__content">

        <p className="cta-banner__eyebrow">
          <span className="cta-banner__eyebrow-line" aria-hidden="true" />
          Premium Real Estate · Abuja, Nigeria
          <span className="cta-banner__eyebrow-line" aria-hidden="true" />
        </p>

        <h2 className="cta-banner__heading" id="cta-heading">
          Ready to Find Your<br />
          <em>Dream Home?</em>
        </h2>

        <p className="cta-banner__sub">
          Let our team guide you to the perfect residence. Whether you're
          investing, relocating, or building your legacy — we're here to help.
        </p>

        <div className="cta-banner__actions">
          <Link to="/contact" className="cta-banner__btn cta-banner__btn--primary">
            Get In Touch
          </Link>
          <Link to="/properties" className="cta-banner__btn cta-banner__btn--ghost">
            Browse Properties
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CTABanner;

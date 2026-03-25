import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./HeroProp.css";
import bg3 from "../assets/images/proper/parkvillaMA/pvma3.jpg";

const HeroProp = () => {
  const heroRef = useRef(null);

  // Subtle parallax on scroll
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleScroll = () => {
      const y = window.scrollY;
      el.style.backgroundPositionY = `calc(50% + ${y * 0.35}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hp-hero" ref={heroRef} style={{ backgroundImage: `url(${bg3})` }}>

      {/* Layered overlays for depth */}
      <div className="hp-hero__overlay hp-hero__overlay--dark" />
      <div className="hp-hero__overlay hp-hero__overlay--gradient" />
      <div className="hp-hero__overlay hp-hero__overlay--vignette" />

      {/* Decorative vertical rule */}
      <div className="hp-hero__rule" aria-hidden="true" />

      {/* Content */}
      <div className="hp-hero__content">

        <div className="hp-hero__eyebrow">
          <span className="hp-hero__eyebrow-line" aria-hidden="true" />
          <span>Est. 2013 · Abuja, Nigeria</span>
        </div>

        <h1 className="hp-hero__title">
          <span className="hp-hero__title-line">Let's Build</span>
          <span className="hp-hero__title-line hp-hero__title-line--accent">Your Shelter</span>
        </h1>

        <p className="hp-hero__sub">
          Discover premium properties designed for<br />
          comfort, elegance and lasting value.
        </p>

        <div className="hp-hero__actions">
          <Link to="/properties" className="hp-hero__btn hp-hero__btn--primary">
            View Properties
          </Link>
          <Link to="/contact" className="hp-hero__btn hp-hero__btn--ghost">
            Get In Touch
          </Link>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="hp-hero__scroll" aria-hidden="true">
        <span className="hp-hero__scroll-label">Scroll</span>
        <span className="hp-hero__scroll-line" />
      </div>

      {/* Bottom gradient fade into page */}
      <div className="hp-hero__bottom-fade" aria-hidden="true" />

    </section>
  );
};

export default HeroProp;

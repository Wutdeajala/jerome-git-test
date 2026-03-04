import React, { useEffect, useRef } from "react";
import "./AboutHero.css";
import image from "../assets/images/bimaworld.png"

const AboutHero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("hero-visible");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-hero" ref={heroRef} img src={image}>
      <div className="hero-content">
        <div className="hero-glass">
          <h1>About Bima Shelter</h1>
          <p className="hero-small">
            Discover the story behind Bima Shelter Ltd.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
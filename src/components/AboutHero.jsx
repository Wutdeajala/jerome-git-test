import React from "react";
import "./AboutHero.css";
import bg2 from "../assets/images/bimaworld.png";

const AboutHero = () => {
  return (
    <section className="about-hero" style={{ backgroundImage: `url(${bg2})` }}>
      <div className="about-hero__overlay" />
      <div className="about-hero__content">
        <p className="about-hero__eyebrow">Est. 2013 · Abuja, Nigeria</p>
        <h1 className="about-hero__title">About Bima Shelter</h1>
        <div className="about-hero__rule" aria-hidden="true" />
        <p className="about-hero__sub">
          Discover the story behind Bima Shelter Ltd.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;

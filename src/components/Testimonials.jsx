import React, { useEffect, useRef, useState } from "react";
import "./Testimonial.css";

// ─── Placeholder data — replace with real client testimonials later ────────────
const testimonials = [
  {
    quote:
      "The place met expectation and was exactly as was described neat, quiet and very residential , staff were very friendly and reliable and always responded to request with a smile",
    name:     "Ifeanyi",
    title:    "Residence 541 · Wuye, Abuja",
    initials: "IF",
  },
  {
    quote:
      "The estate which is located at Apo area of Abuja have a standard road, adequate electricity, water supply and security. Their is also a standby generator set that supply electricity to the whole estate incase of outage....",
    name:     "Yusuf",
    title:    "Saada Court Abuja",
    initials: "YF",
  },
  {
    quote:
      "This a beautifully set up apartment, very clean and the staff are absolutely professional and brilliant.",
    name:     "Abiodun",
    title:    "Residence 541 Apartments and Suites · Wuye, Abuja",
    initials: "AB",
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`tm-section${visible ? " tm-section--visible" : ""}`}
      ref={sectionRef}
      aria-labelledby="tm-heading"
    >
      {/* Decorative background motif */}
      <div className="tm-bg-motif" aria-hidden="true">
        <span className="tm-bg-motif__circle tm-bg-motif__circle--1" />
        <span className="tm-bg-motif__circle tm-bg-motif__circle--2" />
      </div>

      {/* Section header */}
      <div className="tm-header">
        <p className="tm-eyebrow">
          <span className="tm-eyebrow__line" aria-hidden="true" />
          Client Stories
          <span className="tm-eyebrow__line" aria-hidden="true" />
        </p>
        <h2 className="tm-heading" id="tm-heading">
          What Our Clients Say
        </h2>
        <p className="tm-subheading">
          The true measure of our work is the satisfaction of the families
          and investors who call our developments home.
        </p>
      </div>

      {/* Cards grid */}
      <div className="tm-grid">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="tm-card"
            style={{ transitionDelay: `${0.1 + i * 0.15}s` }}
          >
            {/* Quote mark */}
            <div className="tm-card__quote-mark" aria-hidden="true">"</div>

            {/* Stars */}
            <div className="tm-card__stars" aria-label="5 stars">
              {[...Array(5)].map((_, s) => (
                <span key={s} className="tm-card__star" aria-hidden="true">★</span>
              ))}
            </div>

            {/* Quote text */}
            <blockquote className="tm-card__text">
              "{t.quote}"
            </blockquote>

            {/* Divider */}
            <div className="tm-card__divider" aria-hidden="true" />

            {/* Author */}
            <div className="tm-card__author">
              <div className="tm-card__avatar" aria-hidden="true">
                {t.initials}
              </div>
              <div>
                <p className="tm-card__name">{t.name}</p>
                <p className="tm-card__title">{t.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

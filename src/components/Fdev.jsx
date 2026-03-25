import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, BedDouble, ArrowRight, Shield, Trees, Zap } from "lucide-react";
import "./Fdev.css";
import spotlightImg from "../assets/images/proper/parkvillaMA/pvma3.jpg";

const highlights = [
  { Icon: BedDouble, label: "7-Bedroom Villas",     desc: "Expansive private residences" },
  { Icon: Shield,    label: "24/7 Gated Security",  desc: "Manned entrance & CCTV"       },
  { Icon: Trees,     label: "Landscaped Grounds",   desc: "Private gardens & walkways"   },
  { Icon: Zap,       label: "Backup Power",         desc: "Uninterrupted power supply"   },
];

const FeaturedDevelopment = () => {
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
    <section className={`fd-section${visible ? " fd-section--visible" : ""}`} ref={sectionRef}>

      {/* ── Background texture strip ── */}
      <div className="fd-bg-strip" aria-hidden="true" />

      <div className="fd-container">

        {/* ── LEFT — Image ── */}
        <div className="fd-image-col">
          <div className="fd-image-frame">
            <img src={spotlightImg} alt="Park Villa — Maitama, Abuja" className="fd-image" />
            {/* Floating badge */}
            <div className="fd-image-badge">
              <p className="fd-image-badge__num">6</p>
              <p className="fd-image-badge__label">Exclusive<br/>Units</p>
            </div>
            {/* Decorative border frame */}
            <div className="fd-image-frame__border" aria-hidden="true" />
          </div>
        </div>

        {/* ── RIGHT — Content ── */}
        <div className="fd-content-col">

          <div className="fd-eyebrow">
            <span className="fd-eyebrow__line" aria-hidden="true" />
            <span>Featured Development</span>
          </div>

          <h2 className="fd-title">Park Villa</h2>

          <div className="fd-location">
            <MapPin size={14} strokeWidth={2} className="fd-location__icon" />
            <span>Maitama, Abuja — Nigeria's Most Prestigious Address</span>
          </div>

          <p className="fd-body">
            An exclusive enclave of six meticulously crafted 7-bedroom detached
            villas set between the IBB Golf Club and Maitama Amusement Park.
            Each residence is a masterclass in architectural refinement —
            delivering unmatched privacy, generous living spaces, and
            world-class finishing.
          </p>

          {/* Highlights grid */}
          <div className="fd-highlights">
            {highlights.map(({ Icon, label, desc }, i) => (
              <div key={i} className="fd-highlight">
                <div className="fd-highlight__icon">
                  <Icon size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <p className="fd-highlight__label">{label}</p>
                  <p className="fd-highlight__desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link to="/pvmabs" className="fd-cta">
            <span>Explore Park Villa</span>
            <ArrowRight size={16} className="fd-cta__arrow" />
          </Link>

        </div>

      </div>
    </section>
  );
};

export default FeaturedDevelopment;

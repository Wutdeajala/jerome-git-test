import React, { useEffect, useRef, useState } from "react";
import { Building, Leaf, Award } from "lucide-react";
import "./CredYChoose.css";

const stats = [
  { value: 800,  suffix: "+", label: "Featured Projects" },
  { value: 1250, suffix: "+", label: "Luxury Houses"     },
  { value: 1250, suffix: "+", label: "Satisfied Clients" },
  { value: 13,   suffix: "+", label: "Years Experience"  },
];

const features = [
  {
    Icon: Building,
    title: "Innovation & Modern Design",
    desc:  "Architecturally refined developments built for modern living and enduring value.",
  },
  {
    Icon: Leaf,
    title: "Sustainable Standards",
    desc:  "Environmentally responsible, future-focused developments across Nigeria.",
  },
  {
    Icon: Award,
    title: "Trusted Industry Leadership",
    desc:  "A proven track record of excellence, integrity and client satisfaction since 2013.",
  },
];

function useCountUp(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

function StatItem({ value, suffix, label, active, delay }) {
  const count = useCountUp(value, 1800, active);
  return (
    <div className="cy-stat" style={{ transitionDelay: delay }}>
      <p className="cy-stat__num">
        {count.toLocaleString()}
        <span className="cy-stat__suffix">{suffix}</span>
      </p>
      <p className="cy-stat__label">{label}</p>
    </div>
  );
}

const CredYChoose = () => {
  const whyRef   = useRef(null);
  const statsRef = useRef(null);
  const [whyVisible,   setWhyVisible]   = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const obs1 = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setWhyVisible(true); },
      { threshold: 0.15 }
    );
    const obs2 = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (whyRef.current)   obs1.observe(whyRef.current);
    if (statsRef.current) obs2.observe(statsRef.current);
    return () => { obs1.disconnect(); obs2.disconnect(); };
  }, []);

  return (
    <>
      {/* WHY CHOOSE */}
      <section className={`cy-why${whyVisible ? " cy-why--visible" : ""}`} ref={whyRef}>
        <span className="cy-why__watermark" aria-hidden="true"></span>
        <div className="cy-why__container">

          <div className="cy-why__text">
            <p className="cy-why__eyebrow">
              <span className="cy-why__eyebrow-line" aria-hidden="true" />
              Why Choose Us
            </p>
            <h2 className="cy-why__heading">
              Choose Bima<br /><em>Shelter</em>
            </h2>
            <p className="cy-why__body">
              Bima Shelter Ltd is a private limited liability company incorporated
              in July 2013 with a strategic vision to become a leading force in
              real estate development across Nigeria and beyond. The company has
              built a solid reputation for delivering innovative, high-quality,
              and sustainable property solutions tailored to meet the evolving
              needs of a diverse and sophisticated clientele.
            </p>
          </div>

          <div className="cy-why__features">
            {features.map(({ Icon, title, desc }, i) => (
              <div key={i} className="cy-feature" style={{ transitionDelay: `${0.15 + i * 0.12}s` }}>
                <div className="cy-feature__icon">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <div className="cy-feature__text">
                  <h3 className="cy-feature__title">{title}</h3>
                  <p className="cy-feature__desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
{/*
        <div className="cy-divider" aria-hidden="true">
          <span className="cy-divider__line" /> 
          <span className="cy-divider__diamond" />
          <span className="cy-divider__line" />
        </div>*/}
      </section>

      {/* STATS BAND */}
      <section
        className={`cy-stats${statsVisible ? " cy-stats--visible" : ""}`}
        ref={statsRef}
        aria-label="Company achievements"
      >
        <div className="cy-stats__container">
          {stats.map((s, i) => (
            <StatItem key={i} {...s} active={statsVisible} delay={`${i * 0.1}s`} />
          ))}
        </div>
      </section>
    </>
  );
};

export default CredYChoose;

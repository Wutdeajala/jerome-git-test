import React, { useEffect, useRef, useState } from "react";
import "./Credibile.css";


// ─── Data ──────────────────────────────────────────────────────────────────────
const statsData = [
  { value: "800",   suffix: "",  label: "Featured Projects" },
  { value: "1,250", suffix: "",  label: "Luxury Houses"     },
  { value: "1,250", suffix: "",  label: "Satisfied Clients" },
  { value: "13",    suffix: "+", label: "Years Experience"  },
];

// Parse a stat value to a plain integer for animation
function parseNumber(str) {
  return parseInt(str.replace(/,/g, ""), 10);
}

// Format a number back with commas
function formatNumber(n) {
  return n.toLocaleString("en-US");
}

// ─── Animated counter hook ─────────────────────────────────────────────────────
function useCountUp(target, duration = 1800, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime = null;
    let raf;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [shouldStart, target, duration]);

  return count;
}

// ─── Single stat item ──────────────────────────────────────────────────────────
function StatItem({ value, suffix, label, started, delay }) {
  const target = parseNumber(value);
  const count  = useCountUp(target, 1800, started);

  return (
    <div className="stat-item" style={{ animationDelay: `${delay}ms` }}>
      <div className="stat-item__inner">
        <span className="stat-item__number">
          {formatNumber(count)}
          <span className="stat-item__suffix">{suffix}</span>
        </span>
        <span className="stat-item__divider" aria-hidden="true" />
        <span className="stat-item__label">{label}</span>
      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function StatsSection() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect(); // only fire once
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={sectionRef} aria-label="Company statistics">
      <div className="stats-section__track">
        {statsData.map((stat, i) => (
          <StatItem
            key={i}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            started={started}
            delay={i * 80}
          />
        ))}
      </div>
    </section>
  );
}

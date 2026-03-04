import React from "react";
import "./Credibile.css";


const statsData = [
  { value: "10.5K", label: "Featured Projects" },
  { value: "50.5K", label: "Luxury Houses" },
  { value: "50.5K", label: "Satisfied Clients" },
  { value: "13+", label: "Years Experience" }
];

const AboutStats = () => {
  return (
    <section className="about-stats">
      <div className="stats-divider"></div>

      <div className="stats-container">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <h2 className="stat-value">{stat.value}</h2>
            <p className="stat-label">{stat.label}</p>
            <span className="stat-underline"></span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutStats;
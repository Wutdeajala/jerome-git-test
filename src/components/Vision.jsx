import React from "react";
import "./mv.css";

const Vision = ({ title = "", content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum." }) => {
  return (
    <section className="about-content">
          {/* VISION & MISSION */}
      <div className="vision-mission">
        <div className="vm-card">
          <h3>VISION</h3>
          <p>
            Our vision is to set the benchmark for excellence in Nigeria’s real estate sector, becoming the foremost provider of innovative, sustainable, and customer-centric property solutions, while shaping the future of urban living and development.
          </p>
        </div>

        <div className="vm-card">
          <h3>MISSION STATEMENT</h3>
          <p>
           Our mission is to deliver exceptional real estate and property services by combining innovation, integrity, and industry expertise. We are committed to creating lasting value for our clients, enhancing communities through sustainable development, and consistently exceeding expectations in every project we undertake.
          </p>
        </div>
      </div>
    </section>

  );
};

export default Vision;
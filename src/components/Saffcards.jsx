import React from "react";
import { Link } from "react-router-dom";
import "./StaffCard.css";
import lead from "../assets/images/director/bod.jpg";
import rel from "../assets/images/director/rel.jpg";

const StaffCard = () => {
  return (
    <section className="leadership-section">
      {/* Section Title */}
      <div className="card-title">OUR TEAMS</div>
      <div className="dividing" />

      {/* Leadership Cards Container */}
      <div className="leadership-container">

        {/* ===== Card 1 — Board of Directors ===== */}
        <div
          className="leadership-card board-card"
          style={{ backgroundImage: `url(${lead})` }}
        >
          <div className="card-overlay">
            <div className="card-content">
              <h3>Board of Directors</h3>
              <p>
                Bima Shelter's Leadership team is comprised of the industry's most 
                experienced leaders, securing our place as a top-tier real estate and 
                property developer with excellence in every project.
              </p>
              <Link to="/directors" className="card-btn">
                Meet the Board
              </Link>
            </div>
          </div>
        </div>

        {/* ===== Card 2 — Real Estate Team ===== */}
        <div
          className="leadership-card team-card"
          style={{ backgroundImage: `url(${rel})` }}
        >
          <div className="card-overlay">
            <div className="card-content">
              <h3>Real Estate Team</h3>
              <p>
                With their combined expertise and innovative strategies, Bima Shelter's 
                real estate team ensures the delivery of premium residential and commercial 
                properties while maintaining our position as a market leader.
              </p>
              <Link to="/team" className="card-btn">
                Meet the Team
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StaffCard;
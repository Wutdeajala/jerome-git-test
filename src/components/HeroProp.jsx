import React from "react";
import { Link } from "react-router-dom";
import "./HeroProp.css";
import bg3 from "../assets/images/proper/parkvillaMA/pvma3.jpg";

const HeroProp = () => {
  return (
    <section
      className="MyHero"
      style={{ backgroundImage: `url(${bg3})` }}
    >
      <div className="cover"></div>

      <div className="hero-content">
        <div className="her-text">
          <h1>Let’s Build Your Shelter</h1>
        <p>
          Discover Premium properties designed
        </p>
        <p>
          for Comfort, Elegance and Value.
        </p>
      </div>
      </div>
      <div className="her-butns">
        <Link to="/contact" className="btn-secondary">
          Get In Touch
        </Link>
      </div>
    </section>
  );
};

export default HeroProp;
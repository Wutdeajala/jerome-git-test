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

      <div className="her-text">
        <h1>Let’s Build Your Shelter</h1>

        <p className="her-subtext">
          Discover Premium properties designed
        </p>
        <p className="her-subtext">
          for Comfort, Elegance and Value.
        </p>
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
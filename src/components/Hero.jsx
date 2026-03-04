import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./HeroProp.css";
import bg2 from "../assets/images/bimaworld.png";

const HeroLanding = () => {
  return (<section className="MyHero">
        <div className="heroProp" style={{ backgroundImage: `url(${bg2})` }}>
  
          <div className="cover"></div>
  
          <div className="write-up">
            {/*<img src={logo1} alt="Bima Shelter Logo" />*/}
            <h1>Let’s Build Your Shelter</h1>
            <p className="hero-subtext">
              Premium properties designed for Comfort, Elegance and Value.
            </p>
            
  
            <div className="her-butns">
              <Link to="/contact" className="btn-secondary">
                Get In Touch
              </Link>
            </div>
  
          </div>
  
        </div>
      </section>
  );
};

export default HeroLanding;
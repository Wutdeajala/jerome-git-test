import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./ConvergeSection.css";
import leftImg from "../assets/images/left.png";
import centerImg from "../assets/images/centre.png";
import rightImg from "../assets/images/end.png";

const Convergence = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="outer-wrapper">
      <div
        ref={sectionRef}
        className={`converge-section ${animate ? "animate" : ""}`}
      >
        <div className="slice left">
          <img src={leftImg} alt="Left Slice" />
        </div>

        <div className="slice center">
          <img src={centerImg} alt="Center Slice" />
        </div>

        <div className="slice right">
          <img src={rightImg} alt="Right Slice" />
        </div>

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

export default Convergence;
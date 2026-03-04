import React, { useState, useEffect } from "react";
import "./HeroProperties.css";

// Import your building images
import bourdillon from "../assets/images/4bourdillon.jpg";
import nationalTheatre from "../assets/images/nationaltheatre.jpeg";
import centralBank from "../assets/images/abujaaa.jpg";
import sheratonAbuja from "../assets/images/lagosian.jpg";
import ecowas from "../assets/images/abujasky.png"; 


const HeroProperties = () => {
  const images = [
    bourdillon,
    nationalTheatre,
    centralBank,
    sheratonAbuja,
    ecowas,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // change slide every 6s

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="hero-properties">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}

      {/* Dark overlay */}
      <div className="hero-overlay"></div>

      {/* Text overlay */}
      <div className="hero-text">
        <h1>Future Dream Home</h1>
        <p>Providing the best Real Estate services.</p>
      </div>
    </section>
  );
};

export default HeroProperties;
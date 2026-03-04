import React, { useEffect } from "react";
import Iframe from 'react-iframe';
import "./comstyle.css";
import img1 from "../assets/images/proper/parkvillaMA/parkvilla.jpg"
import img2 from "../assets/images/proper/parkvillaMA/pvma1.jpg"
import img3 from "../assets/images/proper/parkvillaMA/pvma2.jpg"
import img4 from "../assets/images/proper/parkvillaMA/pvma3.jpg"
import img5 from "../assets/images/proper/parkvillaMA/pvma4.jpg"
import map from "../assets/images/proper/parkvillaMA/pvmap.png"

const residences = [
  {
    title: "Apartments",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    features: ["Spacious layouts", "Private balconies", "Premium finishing"],
    description:
      "Modern apartments designed for comfort, elegance and seamless living."
  },
  {
    title: "Terraces",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    features: ["Contemporary design", "Ample parking", "Family-focused layouts"],
    description:
      "Refined terrace homes offering warmth, privacy and sophistication."
  },
  {
    title: "Duplexes",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    features: ["Expansive interiors", "Private gardens", "Luxury detailing"],
    description:
      "Premium duplex residences crafted for elevated family living."
  }
];

const amenities = [
  "Playground",
  "Fitness Centre",
  "Landscaped Parks",
  "Clubhouse",
  "Walking Paths",
  "24/7 Security"
];

const galleryImages = [
img1, img2, img3, img4, img5, img4
];

const ParkVilla = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));
  }, []);
  //Land at top of page not bottom
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="parkvilla">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content fade-in">
          <h1>PARK VILLA</h1>
         
        </div>
        <div className="scroll-indicator"></div>
      </section>

      {/* OVERVIEW */}
      <section className="overview container fade-in">
          <p>
            PARK VILLA is a thoughtfully designed residential community
            offering peaceful living within a secure and family-friendly
            environment. Defined by clean modern architecture and landscaped
            surroundings, the estate blends contemporary style with timeless
            comfort.
          </p>
      </section>
  {/* GALLERY */}
      <section className="gallery container fade-in">
        <div className="gallery-grid">
          {galleryImages.map((img, index) => (
            <div key={index} className="gallery-item">
              <img src={img} alt="Park Villa Gallery" />
            </div>
          ))}
        </div>
      </section>

      {/* AMENITIES */}
      <section className="amenities fade-in">
        <div className="container">
          <h2>Amenities</h2>
          <div className="amenities-grid">
            {amenities.map((item, index) => (
              <div key={index} className="amenity-item">
                <div className="amenity-icon"></div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* LOCATION */}
      <section className="location container fade-in">
         
        <div className="map-placeholder">
          <div class ="map-img">
            <img src={map}/>
            </div>
        </div>
        <div className="prox-cards">
          <div className="prox-card">
            <h4>AIRPORT</h4>
            <p>35 MINS</p>
          </div>
          <div className="prox-card">
            <h4>HOSPITAL</h4>
            <p>8 MINS</p>
          </div>
          <div className="prox-card">
            <h4>SCHOOL</h4>
            <p>5 MINS</p>
          </div>
          <div className="prox-card">
            <h4>PARK</h4>
            <p>10 MINS</p>
          </div>
          <div className="prox-card">
            <h4>MARKET</h4>
            <p>8 MINS</p>
          </div>
          </div>
      </section>

          <h2>Register Your Interest</h2>
          <button className="cta-button">Register Interest</button>


    </div>        
    
  );
};

export default ParkVilla;


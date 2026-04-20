import React, { useState, useEffect } from "react";
import hrH from "../assets/images/team/staff/Tosin.png";
import operationsH from "../assets/images/team/staff/Nura.png";
import coo from "../assets/images/team/staff/joshua.jpg";
import '../components/leadership.css';
import bg2 from "../assets/images/bimaworld.png";
const directors = [
  {
    id: 1,
    name: "Oluwatosin Idowu",
    title: "Legal Counsel | Head of Human Resources",
    image: hrH,
    bio: [ "Oluwatosin Idowu is a well-grounded legal and human capital professional with a proven track record in both corporate law and strategic human resource management.",
        "She brings a rare dual expertise that allows her to operate effectively at the intersection of legal compliance, workforce development, and organizational governance.",
        "She has experience spanning contract law, corporate governance, and risk advisory."
    ]
    },
  {
    id: 2,
    name: "QS. Sani Nura Bello",
    title: "Head of Operations",
    image: operationsH,
    bio:["QS. Sani Nura Bello serves as the Head of Operations and Lead Quantity Surveyor at the company. He holds a Bachelor of Technology (B.Tech, Hons) degree in Quantity Surveying from the Federal University of Technology, Minna. In his role, Nura is responsible for overseeing all contractual aspects of construction projects.",
      "He manages project costs, ensuring that each project is delivered within budget and on schedule.",
      ] 
  },
  {
    id: 3,
    name: "Dr. Joshua Olorunkiya",
    title: "Chief Operating Officer",
    image: coo,
    bio: [ "Dr. Joshua is a seasoned Quantity Surveyor and Project Manager with over 15 years of experience across the construction industry in Nigeria and abroad.",
      "He holds a PhD in Civil Engineering (Construction Project Management) from the University of Auckland, New Zealand, and a Master’s in Construction Contract Management (Distinction) from the University of Technology Malaysia. He also earned a B.Sc."
    ]
  },
];

function Team() {
  const [selectedDirector, setSelectedDirector] = useState(null);

  const closeModal = () => {
    setSelectedDirector(null);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  //Land at top of page not bottom
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    //Body scroll lock
    useEffect(() => {
    if (selectedDirector) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedDirector]);
  

  return (<>
  
     <section className="leadership-hero" style={{ backgroundImage: `url(${bg2})` }}>
      <div className="staff-overlay"></div>

      <div className="hero-container">
        <span className="hero-label">Meet The Team</span>

        <h1 className="hero-title">Our Real Estate Team</h1>

        <p className="herol-text">
          Our team combines vision, experience and innovation to
          deliver exceptional real estate developments and lasting value
          across Nigeria.
        </p>

        <div className="hero-divider"></div>
      </div>

      <div>
        <span></span>
      </div>
    </section>

    <section className="leadership-page">

      <div className="directors-grid">
        {directors.map((director) => (
          <div
            key={director.id}
            className="director-card"
            onClick={() => setSelectedDirector(director)}
          >
            <img src={director.image} alt={director.name} className="director-image" />
            <h3>{director.name}</h3>
            <p>{director.title}</p>
          </div>
        ))}
      </div>

      {selectedDirector && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeModal}>
              ✕
            </button>

            <div className="modal-content">

              <div className="modal-header">
                <img src={selectedDirector.image} alt={selectedDirector.name} className="director-image" />

                <div className="modal-title">
                  <h2>{selectedDirector.name}</h2>
                  <p>{selectedDirector.title}</p>
                </div>
              </div>

              <div className="modal-bio">
                 {selectedDirector.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>))}
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
    
    
 </> );
}

export default Team;
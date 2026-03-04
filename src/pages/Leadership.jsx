import React, { useState, useEffect } from "react";
import chairman from '../assets/images/director/Alhaji sambo.png';
import director1 from '../assets/images/director/SMA.png';
import director2 from '../assets/images/director/Hajiya Garba.jpg';
import director3 from '../assets/images/director/Babatunde.png';
import "../components/Leadership.css";

const directors = [
  {
    id: 1,
    name: "Alhaji Sambo",
    title: "Executive Chairman",
    image: chairman, // add image later
    bio: [ "Alhaji Sambo Garba, MON, is a distinguished and versatile entrepreneur with a strong presence in the Nigerian economy. He began his career in the public sector with the Securities and Exchange Commission, where he spent nearly a decade overseeing issuance approvals and monitoring securities transactions to ensure compliance with the Investment and Securities Act.",
        "After his commendable time in public service, Alhaji Sambo transitioned into the private sector, where he launched a successful real estate business. His company, Bima Shelter Limited, has delivered hundreds of homes and has become a leading player in the Abuja property market. Alhaji Sambo has since diversified his investments into several sectors, including real estate, agriculture, commodity exports, mining, and financial services. He has successfully established multiple thriving businesses, such as Bima Shelter Ltd, Bima Mines and Chemcraft Nigeria Ltd, all of which contribute to job creation and the growth of the Nigerian economy. He is also the founder of Tripple Gee Merchants, which is ranked among top 10 leading commodities exporters in the country, recognized for its consistent performance and contribution to the nation export sector.",
        "He also serves as a Director at Credent Capital & Investment Ltd and GSCL Ltd. An alumnus of Lagos Business School, Alhaji Sambo holds an MBA from Ahmadu Belo University, Zaria, and a Bachelor’s degree in Business Administration from Bayero University, Kano. In recognition of his contributions to Nigeria’s economic development, he was awarded the prestigious National Honor of Member of the Order of the Niger (MON) by President Muhammadu Buhari in 2022. He also holds the traditional title of Sardaunan Gusau."
    ]
    },
  {
    id: 2,
    name: "Mr. Sulieman Arzika",
    title: "Director",
    image: director1,
    bio:["Suleiman Arzika is an alumnus of the prestigious Harvard Business School. He holds a Bachelor of Science degree in Business Administration from the University of Abuja, and a diploma from the University of Hull. He is a seasoned entrepreneur and business executive with a robust portfolio that spans multiple sectors of the Nigerian economy, including telecommunications, infrastructure, and technology.",
      "Over the years, Suleiman has demonstrated a deep understanding of strategic planning, product innovation, and operational efficiency. His strong leadership skills and business insight were evident during his tenure as Vice President of Operations at Suburban Telecom Ltd, where he played a pivotal role in streamlining operations and driving organizational growth.",
      "Building on this success, he went on to found Suburban Fiber Company Ltd, positioning it as a key player in Nigeria’s broadband and fiber infrastructure landscape. Suleiman’s extensive experience in managing large-scale projects, navigating regulatory frameworks, and building high-performance teams reflect a consistent commitment to innovation, sustainable growth, and the development of scalable solutions tailored to the Nigerian market.",
      "His business acumen and cross-sector expertise bring valuable strategic insight to Bima Shelter Limited."
    ] 
  },
  {
    id: 3,
    name: "Hajiya Zainab Garba",
    title: "Director",
    image: director2,
    bio: [ "Hajiya Zainab Sambo Garba is a dynamic and results-driven entrepreneur with a solid academic foundation in Business Management from Baze University, Abuja. Over the years, she has built a reputation for excellence, innovation, and leadership across multiple sectors of the Nigerian economy.",
      "Her entrepreneurial journey is marked by a strong passion for hospitality, where she has made impact as the Founder and Proprietor of Northern Fusion Restaurant, a celebrated dining destination in Abuja known for its unique blend of Northern Nigerian cuisine and contemporary culinary presentation.",
      "In addition to her achievements in the hospitality industry, she holds key leadership positions in other thriving enterprises. She serves as a Director at Bima Mines Ltd. and Chemcraft Nigeria Ltd., companies actively engaged in mining and industrial services. Her involvement at the executive level reflects her deep understanding of business operations, strategic planning, and cross-sectoral management.",
      "With a broad portfolio, she brings a wealth of hands-on experience and business acumen."
    ]
  },
  {
    id: 4,
    name: "Mr. Babatunde Richards Olomolehin",
    title: "Finance Director",
    image: director3,
    bio: [ "With over 24 years of experience, Babatunde Richards Olomolehin is a leading figure in the property and infrastructure development sector. He brings a rare blend of academic rigor and practical expertise to his work, underpinned by a BSc in Geography and an MSc in Information Systems from City University, London.",
      "This combination equips him with a unique perspective on urban development—balancing spatial insight with technology-driven efficiency.",
      "Babatunde has played a pivotal role in delivering landmark projects across key cities such as Lagos, Abuja, and London. His portfolio includes the development of modern hospitals, luxury hotels, and a wide range of residential properties, each reflecting his commitment to quality, functionality, and long-term value.",
      "In addition to his real estate ventures, Babatunde is an active investor and operator in the hospitality industry. He is the visionary behind several thriving enterprises, including the Hotel Quo Vadis brand, Q-Lets short-term accommodations, and the VII Bistro restaurant chain, all well-established across the Abuja metropolis.",
      "His dual expertise as both developer and operator offers him a deep understanding of market dynamics, enabling him to deliver projects that are not only structurally and financially sound but also thoughtfully designed for optimal user experience."
    ]
  },
  {
    id: 5,
    name: "Director Name",
    title: "Development Director",
    image: "",
    bio: "Biography goes here."
  },
  {
    id: 6,
    name: "Director Name",
    title: "Strategy Director",
    image: "",
    bio: "Biography goes here."
  }
];

function Leadership() {
  const [selectedDirector, setSelectedDirector] = useState(null);

  const closeModal = () => {
    setSelectedDirector(null);
  };

  //Esc key
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
  
     <section className="leadership-hero">
      <div className="hero-overlay"></div>

      <div className="hero-container">
        <span className="hero-label">Meet The Directors</span>

        <h1 className="hero-title">Our Leadership</h1>

        <p className="hero-text">
          Our leadership team combines vision, experience and innovation to
          deliver exceptional real estate developments and lasting value
          across Nigeria.
        </p>

        <div className="hero-divider"></div>
      </div>

      <div className="scroll-indicator">
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

export default Leadership;
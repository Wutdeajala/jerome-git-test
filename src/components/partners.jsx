import React from "react";
import "./Partners.css";

import part1 from "../assets/partners/sub2.PNG";
import part2 from "../assets/partners/npc.PNG";
import part3 from "../assets/partners/jaizb.PNG";
import part4 from "../assets/partners/ecowas.PNG";
import part5 from "../assets/partners/amcon.PNG";

const logos = [
  { src: part1, alt: "Partner 1" },
  { src: part2, alt: "Partner 2" },
  { src: part3, alt: "Partner 3" },
  { src: part4, alt: "Partner 4" },
  { src: part5, alt: "Partner 5" },
];

const Partners = () => {
  return (
    <section className="credibility-section">
      <div className="container">
        <div className="logo-marquee" aria-label="Partner logos">
          <div className="logo-track">
            {[...logos, ...logos].map((logo, index) => (
              <div className="logo-item" key={index}>
                <img src={logo.src} alt={logo.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
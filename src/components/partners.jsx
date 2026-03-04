import React, { useEffect, useRef } from "react";
import "./Credibile.css";
import part1 from '../assets/partners/sub2.PNG'
import part2 from '../assets/partners/npc.PNG'
import part3 from '../assets/partners/jaizb.PNG'
import part4 from '../assets/partners/ecowas.PNG'
import part5 from '../assets/partners/amcon.PNG'

const Partners = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add("show");
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
  }, []);

  return (
    <section className="credibility-section" ref={sectionRef}>
      <div className="container">

        <div className="partner-logos">
            <img src={part1} alt="Partner 1" />
            <img src={part2} alt="Partner 2" />
            <img src={part3} alt="Partner 3" />
            <img src={part4} alt="Partner 4" />
            <img src={part5} alt="Partner 5" />
        </div>

      </div>
    </section>
  );
};

export default Partners;

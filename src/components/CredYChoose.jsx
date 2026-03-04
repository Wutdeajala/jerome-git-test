import React, { useEffect, useRef } from "react";
import { Building, Leaf, Award } from "lucide-react";
import "./CredYChoose.css";
import FeaturedProperties from "./FeaturedProperties";
import Credibile from "./credible"
import part1 from '../assets/partners/sub2.PNG'
import part2 from '../assets/partners/npc.PNG'
import part3 from '../assets/partners/jaizb.PNG'
import part4 from '../assets/partners/ecowas.PNG'
import part5 from '../assets/partners/amcon.PNG'

const CredYChoose = () => {
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
    <section className="credibility-why" ref={sectionRef}>
      <div className="container">
        

        

        {/* ===== WHY CHOOSE US ===== */}
        <div className="why-grid">

          {/* LEFT TEXT BLOCK */}
          <div className="why-text">
            <h2>Choose Premium Luxury</h2>

            <p >
              Bima Shelter Ltd is a private limited liability company
              incorporated in July 2013 with a strategic vision to become a
              leading force in real estate development across Nigeria and
              beyond. The company has built a solid reputation for delivering
              innovative, high-quality, and sustainable property solutions
              tailored to meet the evolving needs of a diverse and
              sophisticated clientele.
            </p>
          </div>

          {/* RIGHT FEATURES */}
          <div className="why-features">

  <div className="feature">
    <div className="feature-icon">
      <Building size={40} strokeWidth={1.5} />
    </div>
    <h3>Innovation & Modern Design</h3>
    <p>Architecturally refined developments built for modern living.</p>
  </div>

  <div className="feature">
    <div className="feature-icon">
      <Leaf size={40} strokeWidth={1.5} />
    </div>
    <h3>Sustainable Standards</h3>
    <p>Environmentally responsible and future-focused developments.</p>
  </div>

  <div className="feature">
    <div className="feature-icon">
      <Award size={40} strokeWidth={1.5} />
    </div>
    <h3>Trusted Industry Leadership</h3>
    <p>A proven track record of excellence and client satisfaction.</p>
  </div>

</div>
</div>

      </div>
    </section>
  );
};

export default CredYChoose;

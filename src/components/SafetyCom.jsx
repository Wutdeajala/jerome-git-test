import React from "react";
import "./AboutCard.css";

const SafetyCom = ({ title = "", content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum." }) => {
  return (
  <section className="about-content">
    <div className="about-story">
        <div className="story-container">
          <h2 className="section-title">SAFETY COMMITMENT</h2>
          <p>
            At Bima Shelter Ltd, the safety of our clients, employees, and communities is a top 
            priority in everything we do. Whether it's during the construction of a new development, 
            managing a commercial property, or assisting clients in the sale, we integrate stringent 
            safety standards into every facet of our operations. We adhere to the highest safety 
            regulations on all our construction sites, ensuring that every project is completed with 
            the well-being of our workers and the surrounding community in mind.
          </p>

          <p>
            Our safety protocols include regular site inspections, adherence to local and international
            building standards, and the use of advanced construction technologies that enhance site
            security. All workers are properly trained in safety procedures, minimizing risks and 
            preventing accidents. 
          </p>
          <p>
            We are committed to sustainable construction practices that 
            prioritize the health and well-being of our communities. This includes using 
            environmentally friendly materials, minimizing environmental impact during development, 
            and creating healthy living spaces.
          </p>  

        </div>
      </div>
      
    </section>
      );
};

export default SafetyCom;
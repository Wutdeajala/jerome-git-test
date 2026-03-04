import React from "react";
import "./AboutCard.css";

const Story = ({ title = "", content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum." }) => {
  return (
    <div className="about-card">
      <h3 className="about-card-title">OUR STORY</h3>
      <div className="divider"/>
      <p className="about-card-content">From inception, Bima Shelter Ltd has focused on creating value-driven developments that redefine standards in both the residential and commercial real estate sectors. The company’s portfolio spans a wide array of projects, ranging from affordable housing developments and luxury residences to mixed-use commercial complexes and investment-grade properties. With a deliberate emphasis on quality, functionality, and modern aesthetics, each development is executed with meticulous attention to detail and a commitment to long-term value. The company’s success is built on the strength of its people—an experienced and highly motivated workforce comprised of professionals from various disciplines within the built environment. With expertise in architecture, project management, engineering, urban planning, and property management, Bima Shelter Ltd operates as a well-coordinated team driven by innovation, excellence, and a shared vision for delivering real estate solutions that go beyond expectations.</p>
      <p className="about-card-content">Bima Shelter Ltd serves a broad and loyal client base, including individual homeowners, first-time property buyers, real estate investors, corporate organizations, and institutional clients. This wide client spectrum has enabled the company to develop deep insights into market trends and customer preferences, allowing for the design and delivery of projects that are both market-relevant and economically viable.</p>
      <p className="about-card-content">Operating with a client-first philosophy, Bima Shelter Ltd prides itself on maintaining transparency, ethical standards, and a responsive approach in all its dealings. Every project is approached with a sense of responsibility-to clients, communities, and the environment. The company is also committed to sustainable development practices, ensuring that its projects align with contemporary environmental standards and contribute positively to urban growth.</p>
      <p className="about-card-content">Over the years, Bima Shelter Ltd has steadily expanded its operations, growing its brand presence and establishing itself as a trusted name in real estate. With each new development, the company reinforces its mission to provide innovative, secure, and high-quality properties that meet the aspirations of today’s real estate market.</p> 
      <p className="about-card-content">Looking ahead, Bima Shelter Ltd remains dedicated to continuous growth and transformation, leveraging its expertise, partnerships, and market intelligence to explore new frontiers in real estate development. As the industry evolves, the company is well-positioned to adapt, innovate, and lead the way in delivering the future of real estate.</p>
    </div>
  );
};


<section className="about-content">

      {/* OUR STORY */}
      <div className="about-story">
        <div className="story-container">
          <h2 className="section-title">OUR STORY</h2>
          <p>
            From inception, Bima Shelter Ltd has focused on creating value-driven developments that redefine standards in both the
            residential and commercial real estate sectors. The company’s portfolio spans a wide array of projects, ranging from affordable housing developments and luxury residences to mixed-use commercial complexes and investment-grade properties. With a deliberate emphasis on quality, functionality, and modern aesthetics, each development is executed with meticulous attention to detail and a commitment to long-term value. The company’s success is built on the strength of its people—an experienced 
            and highly motivated workforce comprised of professionals from various disciplines within the built environment. With expertise in architecture, project management, engineering, urban planning, and property management, Bima Shelter Ltd operates as a well-coordinated team driven by innovation, excellence, and a shared vision for delivering real estate solutions that go beyond expectations.
          </p>

          <p>
            Bima Shelter Ltd serves a broad and loyal client base, including individual homeowners, first-time property buyers,
            real estate investors, corporate organizations, and institutional clients. This wide client spectrum has enabled the company to develop deep insights into market trends and customer preferences, allowing for the design and delivery of projects that are both market-relevant and economically viable.
          </p>

          <p>
Operating with a client-first philosophy, Bima Shelter Ltd prides itself on maintaining transparency, ethical standards, and a responsive approach in all its dealings. Every project is approached with a sense of responsibility-to clients, communities, and the environment. The company is also committed to sustainable development practices, ensuring that its projects align with contemporary environmental standards and contribute positively to urban growth.
          </p>

          <p>
           Over the years, Bima Shelter Ltd has steadily expanded its operations, growing its brand presence and establishing itself as a trusted name in real estate. With each new development, the company reinforces its mission to provide innovative, secure, and high-quality properties that meet the aspirations of today’s real estate market.
          </p>
          <p>
            Looking ahead, Bima Shelter Ltd remains dedicated to continuous growth and transformation, leveraging its expertise, partnerships, and market intelligence to explore new frontiers in real estate development. As the industry evolves, the company is well-positioned to adapt, innovate, and lead the way in delivering the future of real estate.
          </p>
        </div>
      </div>
      
    </section>


export default Story;
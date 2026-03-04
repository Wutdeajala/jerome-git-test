import React, { useEffect, useState } from "react";
import property1 from "../assets/images/proper/parkvilla.jpg";
import property2 from "../assets/images/proper/541R4.jpg";
import property3 from "../assets/images/proper/HBcourt1.jpg";
import property4 from "../assets/images/proper/UMcourt4.png";
import property5 from "../assets/images/proper/ECestate2.jpg";
import property6 from "../assets/images/proper/BMestate1.jpg";
import "./Proplist.css";

/* ================= PROPERTY DATA ================= */
const properties = [
  {
    id: 1,
    image: property1,
    location: "Maitama",
    type: ["Detached Villas"],
    status: "For Sale",
    title: "Park Villa",
    description:
      "An architectural masterpiece offering refined living in Abuja's most prestigious neighborhood.",
  },
  {
    id: 2,
    image: property2,
    location: "Wuye",
    type: ["Apartments"],
    status: "Off-Plan",
    title: "Residence 541",
    description:
      "Designed for comfort and exclusivity, featuring expansive interiors and serene surroundings.",
  },
  {
    id: 3,
    image: property3,
    location: "Karamo",
    type: ["Terrace", "Apartments"],
    status: "For Sale",
    title: "Habiba Court",
    description:
      "Luxury redefined with panoramic city views and world-class finishing.",
  },
  {
    id: 4,
    image: property4,
    location: "Galadimawa",
    type: ["Terrace", "Duplexes", "Apartments"],
    status: "For Sale",
    title: "Ummahani Court",
    description:
      "A seamless blend of modern technology and timeless elegance.",
  },
  {
    id: 5,
    image: property5,
    location: "Jabi",
    type: ["Detached Villas", "Duplexes"],
    status: "For Sale",
    title: "Enclave Estate",
    description:
      "An architectural masterpiece offering refined living in Abuja's most prestigious neighborhood.",
  },
  {
    id: 6,
    image: property6,
    location: "Maitama",
    type: ["Fully Detached Villas"],
    status: "For Sale",
    title: "Bima Shelter Estate 1",
    description:
      "An architectural masterpiece offering refined living in Abuja's most prestigious neighborhood.",
  },
];

/* ================= COMPONENT ================= */
const AllProperties = ({ filters = { type: "", location: "", status: "" } }) => {
  const [fadeIn, setFadeIn] = useState(false);

  // Trigger fade-in immediately on mount
  useEffect(() => {
    setFadeIn(true);
  }, []);

  // Filter properties
  const filteredProperties = properties.filter((property) => {
    const matchesType =
      filters.type === "" || property.type.includes(filters.type);

    const matchesLocation =
      filters.location === "" || property.location === filters.location;

    const matchesStatus =
      filters.status === "" || property.status === filters.status;

    return matchesType && matchesLocation && matchesStatus;
  });

  return (
    <section className={`featured-section ${fadeIn ? "fade-in" : ""}`}>
      <div className="container">
        <div className="props-grid">
          {filteredProperties.length === 0 ? (
            <p className="no-results">No properties match your criteria.</p>
          ) : (
            filteredProperties.map((property) => (
              <div key={property.id} className="props-card">
                <div
                  className="props-image"
                  style={{ backgroundImage: `url(${property.image})` }}
                />
                <div className="props-content">
                  <span className="props-location">{property.location}</span>
                  <h3>{property.title}</h3>
                  <p>{property.description}</p>
                  <span className="props-type">{property.type.join(", ")}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AllProperties;
import React, { useState } from "react";
import "./PropertyFilter.css";

const PropertyFilter = ({ onFilterChange }) => {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = () => {
    onFilterChange({ type, location, status });
  };

  return (
    <section className="propertyFilterSection">
      <div className="filterWrapper">
        <div className="filterContainer">
          {/* Property Type */}
          <div className="filterGroup">
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Terrace">Terrace</option>
              <option value="Detached">Detached</option>
              <option value="Semi-Detached">Semi-Detached</option>
            </select>
          </div>

          {/* Location */}
          <div className="filterGroup">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="Maitama">Maitama</option>
              <option value="Wuye">Wuye</option>
              <option value="Karimo">Karamo</option>
              <option value="Galadimawa">Galadimawa</option>
              <option value="Jabi">Apo</option>
              <option value="Jabi">Guzape</option>
            </select>
          </div>

          {/* Status */}
          <div className="filterGroup">
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All Status</option>
              <option value="For Sale">For Sale</option>
              <option value="Off-Plan">Off-Plan</option>
              <option value="Sold Out">Sold Out</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="filterButtonWrapper">
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyFilter;
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PropertyFilter from "../components/Findme.jsx";
import AllProperties from "../components/Proplist.jsx";
import HeroProperties from "../components/PropertiesHEro.jsx";
import FeaturedProperties from "../components/FeaturedProperties.jsx";


const Props = () => {


  const [filters, setFilters] = useState({
    type: "",
    location: "",
  });

  return (
    <>
      {// <PropertyFilter onFilterChange={setFilters} />
      //<AllProperties filters={filters} /> 
      }
      <HeroProperties/>
      <AllProperties/>
      <FeaturedProperties/>
    </>
  );
};

export default Props;
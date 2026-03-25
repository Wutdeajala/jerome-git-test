import React from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./pages/Contactpg";
import About from "./pages/About";
import Home from "./pages/Home";
import Props from "./pages/Properties";
import Leadership from "./pages/Leadership";
import Navbar from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Team from "./pages/Team.jsx";
import ParkVilla from "./communities/ParkVilla.jsx";
import ComingSoon from "./communities/ComingSoon.jsx";
import SaadaCourt from "./communities/Sa'adaC.jsx";
import Residence541 from "./communities/Residence541.jsx";
import UmmahaniCourt from "./communities/UmmahaniC.jsx";
import EnclaveEstate from "./communities/EnclaveE.jsx";

function App(){
    return(
    <>
    
        <ScrollToTop />
        <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/properties" element={<Props/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/directors" element={<Leadership/>} />
        <Route path="/team" element={<Team/>}/>
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/pvmabs" element={<ParkVilla/>}/>
        <Route path="/saadacrt" element={<SaadaCourt/>}/>
        <Route path="/res541" element={<Residence541/>}/>
        <Route path="/umhc" element={<UmmahaniCourt/>}/>
        <Route path="/enclv" element={<EnclaveEstate/>}/>
    </Routes>
    
    <Footer/> 
  
    </>
    );
}

export default App
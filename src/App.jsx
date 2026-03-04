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
        <Route path="/pvmabs" element={<ParkVilla/>}/>
    </Routes>
    
    <Footer/> 
  
    </>
    );
}

export default App
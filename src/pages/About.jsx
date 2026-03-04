import Story from "../components/Story";
import SafetyCom from "../components/SafetyCom.jsx";
import Mission from "../components/Mission.jsx";
import Vision from "../components/Vision.jsx";
import Partners from "../components/partners.jsx";
import StaffCard from "../components/Saffcards.jsx";
import AboutHero from "../components/AboutHero.jsx";
import AboutSMV from "../components/Mission.jsx";
import Credibile from "../components/credible.jsx";

function About() {
  return (<>
  <AboutHero/>
  <AboutSMV/>
  <Credibile/>
  <Vision/>
  <SafetyCom/> 
  <StaffCard/>
  <Partners/>
  
 </>);
};

export default About;
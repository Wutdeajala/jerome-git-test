import CredYChoose from "../components/CredYChoose.jsx";
import FeaturedProperties from "../components/FeaturedProperties.jsx"
import StaffCard from "../components/Saffcards.jsx";
import Hcard from "../components/Hcard.jsx";
import Credibile from "../components/credible.jsx";
import HeroProp from "../components/HeroProp.jsx";


function Home() {

  return(
    <>
    
      <HeroProp/>
      <CredYChoose/>
      <Hcard/>
      <FeaturedProperties/>
      <Credibile/>
      <StaffCard/>

    </>
  );
}

export default Home

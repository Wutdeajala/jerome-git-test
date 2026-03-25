import CredYChoose from "../components/CredYChoose.jsx";
import FeaturedProperties from "../components/FeaturedProperties.jsx"
import HeroProp from "../components/HeroProp.jsx";
import Partners from "../components/partners.jsx";
import Testimonials from "../components/Testimonials.jsx";
import FeaturedDevelopment from "../components/Fdev.jsx";
import CTABanner from "../components/HomeCta.jsx";
function Home() {

  return(
    <>
    
      <HeroProp/>
      <FeaturedProperties/>
      <FeaturedDevelopment/>
      <CredYChoose/>
      <Testimonials/>
      <CTABanner/>
      <Partners/>

    </>
  );
}

export default Home

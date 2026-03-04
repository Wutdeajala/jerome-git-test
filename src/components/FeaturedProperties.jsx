import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import property1 from '../assets/images/proper/parkvilla.jpg';
import property2 from '../assets/images/proper/541R4.jpg';
import property3 from '../assets/images/proper/HBcourt1.jpg';
import property4 from '../assets/images/proper/UMcourt4.png';
import property5 from '../assets/images/proper/ECestate2.jpg';
import property6 from '../assets/images/proper/parkvillaMA/pvma1.jpg';

import "./FProps.css";

const properties = [
  { id: 1, availability: "42 units of 7-bedroom detached villa", location: "Enclave Estate. Asokoro, Abuja", image: property6 },
  { id: 2, availability: "100 units of various house types", location: "Saada Court. Apo Ressetlement, Abuja", image: property3 },
  { id: 3, availability: "17 units of 9-bedroom Luxurious villa", location: "Park Villas II. Maitama, Abuja", image: property1 },
  { id: 4, availability: "6 units of 7-bedroom Luxurious villa", location: "Park Villa. Maitama, Abuja", image: property5 },
  { id: 5, availability: "16 units of town houses", location: "541 Residence. Wuye, Abuja", image: property2 },
  { id: 6, availability: "17 units of 9-bedroom villa", location: "Ummahani Court. Galadima, Abuja", image: property4 },
];

const FeaturedProperties = () => {
  return (
    <section className="p-section">
      <div className="p-container">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          navigation={true}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              centeredSlides: true,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 3,
              centeredSlides: false,
              spaceBetween: 30
            }
          }}
        >
          {properties.map((property) => (
            <SwiperSlide key={property.id}>
              <div
                className="p-card"
                style={{ backgroundImage: `url(${property.image})` }}
              >
                <div className="cards-overlay">
                  <h3>{property.location}</h3>
                  <div className="divida"></div>
                  <p>{property.availability}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedProperties;
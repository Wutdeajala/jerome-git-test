import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from "lucide-react";
import './FProps.css';

import property1 from '../assets/images/proper/parkvillaI1.jpg';
import property2 from '../assets/images/proper/541R6.jpg';
import property8 from '../assets/images/proper/UMcourt6.jpg';
import property3 from "../assets/images/proper/HBcourt1.jpg";
import property5 from "../assets/images/proper/ECestate2.jpg";
import property7 from "../assets/images/proper/Sa'ada4.jpg";
// ─── Only Maitama & Wuye properties ───────────────────────────────────────────
const properties = [
  {
    
    id: 1,
    title: 'Park Villa II',
    route: '/pvmabs',
    subtitle: 'Maitama, Abuja',
    availability: '6 units of 7-bedroom Luxurious villa',
    address: 'Off Usuma Close, Maitama Amusement Park, Maitama, Abuja',
    bedrooms: 7,
    bathrooms: 8,
    image: property1,
    badge: 'FEATURED',
  },
  {
    id: 2,
    title: 'Enclave Estate',
    image: property5,
    route: '/enclv',
    subtitle: 'Asokoro, Abuja',
    availability: '42 units of 7 bedroom fully detached Villas',
    address: 'plot 417 cadastral zone A04, Asokoro district, Abuja-FCT',
    bedrooms: 7,
    bathrooms: 8,
    badge: 'FEATURED',
  },
  {
    id: 3,
    title: 'Residence 541',
    route: '/res541',
    subtitle: 'Wuye, Abuja',
    availability: '17 units of terraces as Airbnb',
    address: 'Plot 541 John Chukwu Crescent, Off Dahiru Musdafa Blvd, Wuye, Abuja',
    bedrooms: 3,
    bathrooms: 4,
    image: property2,
    badge: 'FEATURED',
  },
  {
    id: 4,
    title: 'Habiba court',
    image: property3,
    type: 'townhouse',
    route: '/coming-soon',
    subtitle: 'Karimo, Abuja',
    availability: '40 units of various house types',
    address: 'Cadastral Zone, Life Camp, Abuja 900108',
    badge: 'FEATURED',
  },
  {
    id: 5,
    title: 'Ummahani Court',
    image: property8,
    type: 'townhouse',
    route: '/umhc',
    subtitle: 'Galadimawa, Abuja',
    availability: '200 units of various house types',
    address: 'Plot 21, Cadastral zone C17, Galadimawa, Abuja',
    badge: 'FEATURED',
  },  
  {
    id: 6,
    title: 'Sa ada Court',
    image: property7,
     route: '/saadacrt',
     subtitle: 'Apo, Abuja',
     availability: '100 units of various house types',
     address: 'Plot 960, Cadastral Zone B19, Apo-Dutse, Apo District, Abuja',
     badge: 'FEATURED',
  },

];

// ─── Single property card ──────────────────────────────────────────────────────
function PropertyCard({ property }) {
  const { title, subtitle, availability, address, mapUrl, bedrooms, bathrooms, image, badge } =
    property;

  return (
    <article className="fp-card">
      {/* ── Image ── */}
      <div className="fp-card__image-wrap">
        <img src={image} alt={`${title} – ${subtitle}`} className="fp-card__image" />
        {badge && <span className="fp-card__badge">{badge}</span>}
      </div>

      {/* ── Content ── */}
      <div className="fp-card__body">
        <p className="fp-card__availability">{availability}</p>

        <h3 className="fp-card__title">
          {title}{' '}
          <span className="fp-card__title-sub">— {subtitle}</span>
        </h3>

        {/* ── span instead of <a> to avoid invalid nested <a> inside <a> ── */}
        <span
          className="fp-card__address"
          aria-label={`View ${title} on Google Maps`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(mapUrl, "_blank", "noopener,noreferrer");
          }}
          style={{ cursor: "pointer" }}
        >
          <svg
            className="fp-card__pin-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {address}
        </span>

        <div className="fp-card__features">
          <span className="fp-card__feature">
            <span className="fp-card__feature-icon" aria-hidden="true">🛏</span>
            {bedrooms} Br
          </span>
          <span className="fp-card__feature-divider" aria-hidden="true" />
          <span className="fp-card__feature">
            <span className="fp-card__feature-icon" aria-hidden="true">🚿</span>
            {bathrooms} Ba
          </span>
        </div>
      </div>      
    </article>
    
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function FeaturedProperties() {
  return (
    <section className="fp-section" aria-labelledby="fp-heading">
      <div className="fp-section__header">
        <p className="fp-section__eyebrow">Premium Listings</p>
        <h2 className="fp-section__title" id="fp-heading">
          Featured Properties
        </h2>
        <p className="fp-section__subtitle">
          Handpicked luxury residences in Abuja's most sought-after addresses.
        </p>
      </div>

      <div className="fp-grid">
        {properties.map((p) => (
          <Link to={p.route} key={p.id} className="fp-card-link">
            <PropertyCard property={p} />
          </Link>
        ))}
      </div>
      <div className='act_btn'>
        <Link to="/properties" className="fprop_action">
          <span>View more Properties</span>
          <ArrowRight size={16} className="fprop_arrow" />
        </Link>
      </div>        
    </section>
  );
}

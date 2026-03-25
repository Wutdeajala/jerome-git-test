import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FProps.css';
import './Proplist.css';
import './animations.css';
/*
  ── ICONS ──────────────────────────────────────────────────────
  We use react-icons (https://react-icons.github.io/react-icons/)
  Install once with:  npm install react-icons

  Icon sets used:
  • BsBuildings, BsBuildingsFill  — Bootstrap Icons (crisp, pixel-perfect)
  • PiHouseLineDuotone             — Phosphor Icons (elegant, architectural)
  • TbBuildingCottage              — Tabler Icons (clean line style)
  • MdOutlineVilla                 — Material Design (polished)
  • LuBuilding2, LuHouse           — Lucide (modern, consistent stroke)
  ──────────────────────────────────────────────────────────────
*/
import { BsBuildings, BsHouses } from 'react-icons/bs';  // Apartment + Terrace (row of houses)
import { LuHousePlus }         from 'react-icons/lu';       // Town House — house with extension
import { MdOutlineVilla }      from 'react-icons/md';       // Villa
import { LuLayoutGrid }        from 'react-icons/lu';       // All — grid/category view

// Import images — update these paths to match your project structure
import property1 from "../assets/images/proper/parkvillaI1.jpg";
import property2 from "../assets/images/proper/541R6.jpg";
import property3 from "../assets/images/proper/HBcourt1.jpg";
import property4 from "../assets/images/proper/UMcourt1.jpg";
import property5 from "../assets/images/proper/ECestate4.jpg";
import property6 from "../assets/images/proper/BMestate1.jpg";
import property7 from "../assets/images/proper/lakechad1.jpg";
import property8 from "../assets/images/proper/parkvillasII1.jpg";
import property9 from "../assets/images/proper/Sa'ada4.jpg";
import property10 from "../assets/images/proper/Sa'ada3.jpg";
import property11 from "../assets/images/proper/UMcourt6.jpg";



/* ===============================================================
   PROPERTY DATA
   To add a new property: copy any block below and update the values.
   The "type" field controls which filter tab shows it.
   Valid types: "villa" | "duplex" | "terrace" | "apartment"
=============================================================== */
const properties = [
  {
    id: 1,
    title: 'Park Villa I',
    image: property1,
    type: 'villa',
    route: '/pvmabs',
    subtitle: 'Maitama, Abuja',
    availability: '15 units of 9-bedroom Luxurious villa',
    address: 'Off Usuma Close, Maitama Amusement Park, Maitama, Abuja',
    mapUrl: 'https://www.google.com/maps/search/Off+Usuma+Close+Maitama+Amusement+Park+Maitama+Abuja/@9.0859855,7.5003871,17z',
    bedrooms: 9,
    bathrooms: 10,
    badge: 'FEATURED',
  },
  {
    id: 2,
    title: 'Rescidence 541',
    image: property2,
    type: 'apartment',
    route: '/res541',
    subtitle: 'Wuye, Abuja',
    availability: '17 units of terraces as Airbnb',
    address: 'Plot 541 John Chukwu Crescent, Off Dahiru Musdafa Blvd, Wuye, Abuja',
    mapUrl: 'https://www.google.com/maps/search/Plot+541+John+Chukwu+Crescent+Wuye+Abuja/@9.0653,7.4836,17z',
    bedrooms: 3,
    bathrooms: 4,
    badge: 'FEATURED',
  },
  {
    id: 3,
    title: 'Habbiba court',
    image: property3,
    type: 'townhouse',
    route: '/coming-soon',
    subtitle: 'Karimo, Abuja',
    availability: '40 units of various house types',
    address: 'Plot 541 John Chukwu Crescent, Off Dahiru Musdafa Blvd, Karimo, Abuja',
    mapUrl: 'https://www.google.com/maps/search/Plot+541+John+Chukwu+Crescent+Wuye+Abuja/@9.0653,7.4836,17z',
    badge: 'FEATURED',
  },
  {
    id: 4,
    title: 'Ummahani Court',
    image: property4,
    type: 'apartment',
    route: '/umhc',
    subtitle: 'Galadimawa, Abuja',
    availability: '2 Bedroom Serviced Apartment',
    address: 'Plot 426, Tigris Crescent, Aguiyi Ironsi St, Abuja',
    mapUrl: 'https://maps.app.goo.gl/fGRwBQhyhUohMrnm7',
    bedrooms: 3,
    bathrooms: 4,
    badge: 'FEATURED',
  },
  {
    id: 11,
    title: 'Ummahani Court',
    image: property11,
    type: 'townhouse',
    route: '/umhc',
    subtitle: 'Galadimawa, Abuja',
    availability: '200 units of various house types',
    address: 'Plot 426, Tigris Crescent, Aguiyi Ironsi St, Abuja',
    mapUrl: 'https://maps.app.goo.gl/fGRwBQhyhUohMrnm7',
    bedrooms: 3,
    bathrooms: 4,
    badge: 'FEATURED',
  },
  {
    id: 5,
    title: 'Enclave Estate',
    image: property5,
    type: 'villa',
    route: '/enclv',
    subtitle: 'Asokoro, Abuja',
    availability: '42 units of 7 bedroom fully detached Villas',
    address: 'plot 417 cadastral zone A04, Asokoro district, Abuja-FCT',
    bedrooms: 3,
    bathrooms: 4,
    badge: 'FEATURED',
  },
  {
    id: 6,
    title:'Seine Close',
    image: property6,
    type: 'terrace',
    route: '/coming-soon',
    subtitle: 'Maitama, Abuja',
    availability: '17 units of terraces as Airbnb',
    address: 'Maitama, Abuja 904101, Federal Capital Territory',
    mapUrl: 'https://maps.app.goo.gl/nCVnXR83mo2GivAC6',
    bedrooms: 3,
    bathrooms: 4,
    badge: 'FEATURED',
  },
  {
    id: 7,
    image: property9,
    title: 'Sa ada Court',
    type: 'townhouse',
    route: '/saadacrt',
    subtitle: 'Apo, Abuja',
    availability: '100 units of various house types',
    address: 'Plot 960, Cadestral Zone B19, Apo-Dutse, Apo District, Abuja',
    mapUrl: 'https://maps.app.goo.gl/E8nG3dZ8JsdMxmoz6',
    bedrooms: 3,
    bathrooms: 4,
    badge: 'FEATURED',
  },  
  {
    id: 8,
    title: 'Park Villa II',
    image: property8,
    type: 'villa',
    route: '/coming-soon',
    subtitle: 'Maitama, Abuja',
    availability: '6 units of 7 bedroom villas currently under construction',
    bedrooms: 7,
    bathrooms: 8,
    badge: 'FEATURED',
  },
  {
    id: 9,
    title:'Lake Chad',
    image: property7,
    type: 'terrace',
    route: '/coming-soon',
    subtitle: 'Maitama, Abuja',
    availability: '8 units of terraces currently under construction',
    badge: 'FEATURED',
  },
  {
    id: 10,
    image: property10,
    title: 'Sa ada Court',
    type: 'apartment',
    route: '/saadacrt',
    subtitle: 'Apo, Abuja',
    availability: '2-Bedroom Serviced Apartment',
    address: 'Plot 960, Cadestral Zone B19, Apo-Dutse, Apo District, Abuja',
    mapUrl: 'https://maps.app.goo.gl/E8nG3dZ8JsdMxmoz6',
    bedrooms: 3,
    bathrooms: 4,
    badge: 'FEATURED',
  }, 
];

/* ===============================================================
   FILTER DEFINITIONS
   Each tile uses a react-icons component as its icon.
   The icon inherits currentColor so it turns white when active
   and green when inactive — controlled entirely by CSS.
   To swap an icon: change the component, nothing else needs updating.
=============================================================== */
const FILTERS = [
  {
    id: 'villa',
    label: 'Villa',
    icon: <MdOutlineVilla />,
  },
  {
    id: 'townhouse',
    label: 'Town House',
    icon: <LuHousePlus />,
  },
  {
    id: 'terrace',
    label: 'Terrace',
    icon: <BsHouses />,   // Two houses side by side — closest to a terrace row
  },
  {
    id: 'apartment',
    label: 'Apartment',
    icon: <BsBuildings />,
  },
];

/* ===============================================================
   PROPERTY CARD
   Displays title (estate name) + subtitle (location) in the same
   format as the featured properties cards — bold serif title with
   the location as a lighter secondary line beneath it.
=============================================================== */
function PropertyCard({ property }) {
  const { title, subtitle, availability, address, mapUrl, bedrooms, bathrooms, image, badge } = property;

  return (
    <article className="fp-card">
      <div className="fp-card__image-wrap">
        <img src={image} alt={`${title} – ${subtitle}`} className="fp-card__image" />
        {badge && <span className="fp-card__badge">{badge}</span>}
      </div>
      <div className="fp-card__body">
        <p className="fp-card__availability">{availability}</p>

        {/* Title matches the featured properties format exactly:
            Bold serif estate name — lighter location subtitle */}
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

/* ===============================================================
   FILTER TILE
   activeType: the currently selected filter id, or null for "all"
   Clicking an active tile deselects it (shows all properties again)
=============================================================== */
function FilterTile({ filter, count, isActive, onClick }) {
  return (
    <button
      className={`pf-tile ${isActive ? 'pf-tile--active' : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
      title={`Show ${filter.label} properties`}
    >
      {/* Large icon */}
      <span className="pf-tile__icon" aria-hidden="true">
        {filter.icon}
      </span>
      {/* Label */}
      <span className="pf-tile__label">{filter.label}</span>
      {/* Property count pill */}
      <span className="pf-tile__count">{count}</span>
    </button>
  );
}

/* ===============================================================
   MAIN EXPORT — AllProperties
=============================================================== */
export default function AllProperties() {
  // null = no filter active (show everything)
  const [activeType, setActiveType] = useState(null);

  // Toggle: clicking the already-active filter deselects it
  const handleFilterClick = (typeId) => {
    setActiveType((prev) => (prev === typeId ? null : typeId));
  };

  // Filtered list — if no active type, show everything
  const visibleProperties = activeType
    ? properties.filter((p) => p.type === activeType)
    : properties;

  return (
    <section className="fp-section" aria-labelledby="fp-heading">

      {/* ── Section header ── */}
      <div className="fp-section__header">
        <p className="fp-section__eyebrow">'</p>
        <h2 className="fp-section__title" id="fp-heading">
          Our Properties
        </h2>
        <p className="fp-section__subtitle">
          Explore Bima Shelter's handpicked residences across Abuja's most desirable addresses.
        </p>
      </div>

      {/* ── Property type filter tiles ── */}
      <div className="pf-filter-band" role="group" aria-label="Filter by property type">

        {/* "All" tile */}
        <button
          className={`pf-tile ${activeType === null ? 'pf-tile--active' : ''}`}
          onClick={() => setActiveType(null)}
          aria-pressed={activeType === null}
          title="Show all properties"
        >
          <span className="pf-tile__icon" aria-hidden="true">
            <LuLayoutGrid />
          </span>
          <span className="pf-tile__label">All</span>
          <span className="pf-tile__count">{properties.length}</span>
        </button>

        {/* One tile per property type */}
        {FILTERS.map((filter) => {
          const count = properties.filter((p) => p.type === filter.id).length;
          return (
            <FilterTile
              key={filter.id}
              filter={filter}
              count={count}
              isActive={activeType === filter.id}
              onClick={() => handleFilterClick(filter.id)}
            />
          );
        })}
      </div>

      {/* ── Active filter label ── */}
      {activeType && (
        <div className="pf-active-label">
          <span>
            Showing <strong>{visibleProperties.length}</strong>{' '}
            {activeType.charAt(0).toUpperCase() + activeType.slice(1)}{visibleProperties.length !== 1 ? 's' : ''}
          </span>
          <button className="pf-clear-btn" onClick={() => setActiveType(null)}>
            Clear filter ✕
          </button>
        </div>
      )}

      {/* ── Property grid ── */}
      <div className="fp-grid">
        {visibleProperties.length > 0 ? (
          visibleProperties.map((p) => (
            <Link to={p.route} key={`${p.id}-${p.type}`} className="fp-card-link">
              <PropertyCard property={p} />
            </Link>
          ))
        ) : (
          // Empty state — shown if no properties match (future-proofing)
          <div className="pf-empty">
            <p>No properties found in this category yet.</p>
            <button className="pf-clear-btn" onClick={() => setActiveType(null)}>View all properties</button>
          </div>
        )}
      </div>
    </section>
  );
}

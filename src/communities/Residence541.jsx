import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import "./comstyle.css";
import {
  Dumbbell, Waves, Sparkles, UtensilsCrossed, Wifi, ConciergeBell,
  X, CheckCircle, Loader
} from "lucide-react";
import img1 from "../assets/images/proper/541R1.jpg";
import img2 from "../assets/images/proper/541R2.jpg";
import img3 from "../assets/images/proper/541R3.jpg";
import img4 from "../assets/images/proper/541R4.jpg";
import img5 from "../assets/images/proper/541R5.jpg";
import img6 from "../assets/images/proper/541R6.jpg";
import img7 from "../assets/images/proper/541R7.jpg";
import img8 from "../assets/images/proper/541R8.jpg";
import img9 from "../assets/images/proper/541R9.jpg";

// ─── Data ──────────────────────────────────────────────────────────────────────

const residences = [
  {
    title: "1-Bedroom Apartment",
    image: img8,
    features: ["King-size bed", "Private bathroom", "Balcony access"],
    description:
      "Thoughtfully designed for solo travellers and couples seeking a stylish, self-contained retreat with all modern comforts.",
  },
  {
    title: "2-Bedroom Apartment",
    image: img9,
    features: ["Two en-suite bedrooms", "Open-plan living area", "Fully equipped kitchen"],
    description:
      "Spacious and versatile — ideal for families or professionals who need room to work, relax and entertain.",
  },
  {
    title: "3-Bedroom Apartment",
    image: img3,
    features: ["Three bedrooms", "Dining area with table", "Premium Italian finishes"],
    description:
      "An expansive residence offering generous living space, refined interiors and all the amenities of a luxury serviced apartment.",
  },
  {
    title: "4-Bedroom Apartment",
    image: img6,
    features: ["Four en-suite bedrooms", "Full dining & lounge", "Dedicated parking bays"],
    description:
      "Our flagship unit — a sprawling four-bedroom apartment delivering the ultimate in space, privacy and premium Airbnb living.",
  },
];

const amenities = [
  { Icon: Dumbbell,       label: "Fully Equipped Gym",    desc: "State-of-the-art fitness centre on-site"         },
  { Icon: Waves,          label: "Outdoor Pool",           desc: "Year-round swimming pool for all guests"         },
  { Icon: Sparkles,       label: "Spa & Wellness",         desc: "Dedicated wellness package for relaxation"       },
  { Icon: UtensilsCrossed,label: "Restaurant & Bar",       desc: "In-house dining and full bar service"            },
  { Icon: Wifi,           label: "Free WiFi",              desc: "High-speed internet throughout the property"     },
  { Icon: ConciergeBell,  label: "24hr Room Service",      desc: "Concierge and room service around the clock"     },
];

const PROPERTIES = [
  "Park Villa — Maitama, Abuja",
  "Park Villas II — Maitama, Abuja",
  "541 Residence — Wuye, Abuja",
  "Enclave Estate — Asokoro, Abuja",
  "Saada Court — Apo Resettlement, Abuja",
  "Ummahani Court — Galadima, Abuja",
];

const galleryImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9 ];

// ─── Sanitisation helpers ──────────────────────────────────────────────────────
const stripTags    = (str) => str.replace(/<[^>]*>/g, "").trim();
const sanitiseName = (str) => str.replace(/[^a-zA-ZÀ-ÿ\s'\-]/g, "").slice(0, 80);
const isValidEmail = (email) => /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(email.trim());
const sanitiseMessage = (str) => stripTags(str).slice(0, 1000);

// ─── Interest Form Modal ───────────────────────────────────────────────────────
const InterestModal = ({ onClose, onSuccess }) => {
  const [form, setForm]   = useState({ name: "", email: "", property: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const firstFieldRef = useRef(null);


  useEffect(() => {
    firstFieldRef.current?.focus();
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your full name.";
    if (!isValidEmail(form.email)) e.email = "Please enter a valid email address.";
    if (!form.property) e.property = "Please select a property.";
    return e;
  };
  const handleChange = useCallback((field) => (evt) => {
    const val = evt.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);

    const payload = {
      name: sanitiseName(form.name),
      email: form.email.trim().slice(0, 254),
      property: form.property,
      message: sanitiseMessage(form.message),
    };

    try {
      const res = await fetch("https://jerome-bima-backend.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Server error");
      onSuccess();
      onClose();
    } catch {
      onSuccess(); onClose(); // remove once backend is live
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="ri-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ri-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="ri-modal">
        <div className="ri-modal__header">
          <div>
            <p className="ri-modal__eyebrow">Airbnb & Long-Stay Bookings</p>
            <h2 className="ri-modal__title" id="ri-modal-title">Register Your Interest</h2>
          </div>
          <button className="ri-modal__close" onClick={onClose} aria-label="Close form">
            <X size={20} strokeWidth={1.8} />
          </button>
        </div>

        <form className="ri-form" onSubmit={handleSubmit} noValidate>
          <div className={`ri-field${errors.name ? " ri-field--error" : ""}`}>
            <label htmlFor="ri-name">Full Name <span aria-hidden="true">*</span></label>
            <input
              id="ri-name" name= "name" ref={firstFieldRef} type="text"
              placeholder="e.g. Amina Bello" value={form.name}
              onChange={handleChange("name")} autoComplete="name" maxLength={80} required
            />
            {errors.name && <span className="ri-field__error" role="alert">{errors.name}</span>}
          </div>

          <div className={`ri-field${errors.email ? " ri-field--error" : ""}`}>
            <label htmlFor="ri-email">Email Address <span aria-hidden="true">*</span></label>
            <input
              id="ri-email" name= "email" type="email" placeholder="e.g. amina@example.com"
              value={form.email} onChange={handleChange("email")}
              autoComplete="email" maxLength={254} required
            />
            {errors.email && <span className="ri-field__error" role="alert">{errors.email}</span>}
          </div>

          <div className={`ri-field${errors.property ? " ri-field--error" : ""}`}>
            <label htmlFor="ri-property">Property of Interest <span aria-hidden="true">*</span></label>
            <div className="ri-select-wrap">
              <select id="ri-property" name= "property" value={form.property} onChange={handleChange("property")} required>
                <option value="" disabled>Select a property…</option>
                {PROPERTIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            {errors.property && <span className="ri-field__error" role="alert">{errors.property}</span>}
          </div>

          <div className="ri-field">
            <label htmlFor="ri-message">
              Message <span className="ri-field__optional">(optional)</span>
            </label>
            <textarea
              id="ri-message" name= "message" placeholder="Preferred unit size, dates, any questions…"
              value={form.message} onChange={handleChange("message")} rows={4} maxLength={1000}
            />
            <span className="ri-field__count">{form.message.length} / 1000</span>
          </div>

          <button className="ri-submit" type="submit" disabled={loading}>
            {loading
              ? <><Loader size={16} className="ri-submit__spin" /> Sending…</>
              : "Submit Enquiry"
            }
          </button>

          <p className="ri-privacy">
            Your information is kept strictly confidential and used only to respond to your enquiry.
          </p>
        </form>
      </div>
    </div>
  );
};
/* ─── SUCCESS TOAST ─── */

const SuccessToast = ({ onDismiss }) => {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div className="ri-toast" role="status" aria-live="polite">
      <CheckCircle size={22} className="ri-toast__icon" />
      <div>
        <p className="ri-toast__title">Enquiry Received!</p>
        <p className="ri-toast__sub">We'll be in touch within 24 hours.</p>
      </div>
      <button className="ri-toast__close" onClick={onDismiss} aria-label="Dismiss">
        <X size={16} />
      </button>
    </div>
  );
};

/* ─── LIGHTBOX ─── */
// Separate component so touch handlers are contained and clean

const Lightbox = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);

  // Track touch position for swipe detection
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1)), [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "Escape")     onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  // Touch swipe handlers
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    // Only trigger if horizontal swipe is dominant (not a scroll)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) next(); // swipe left  → next
      else        prev(); // swipe right → prev
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className="pv-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close */}
      <button
        className="pv-lightbox__close"
        onClick={onClose}
        aria-label="Close gallery"
      >
        <X size={26} strokeWidth={1.8} />
      </button>

      {/* Image counter */}
      <div className="pv-lightbox__counter" aria-live="polite">
        {current + 1} / {images.length}
      </div>

      {/* Prev arrow */}
      <button
        className="pv-lightbox__nav pv-lightbox__nav--left"
        onClick={prev}
        aria-label="Previous image"
      >
        <ChevronLeft size={22} strokeWidth={1.8} />
      </button>

      {/* Image */}
      <img
        key={current}
        src={images[current]}
        className="pv-lightbox__img"
        alt={`Gallery image ${current + 1} of ${images.length}`}
      />

      {/* Next arrow */}
      <button
        className="pv-lightbox__nav pv-lightbox__nav--right"
        onClick={next}
        aria-label="Next image"
      >
        <ChevronRight size={22} strokeWidth={1.8} />
      </button>

      {/* Dot indicators */}
      <div className="pv-lightbox__dots" role="tablist">
        {images.map((_, i) => (
          <button
            key={i}
            className={`pv-lightbox__dot ${i === current ? "pv-lightbox__dot--active" : ""}`}
            onClick={() => setCurrent(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── MAIN PAGE ─── */

const Residence541 = () => {
  const ctaRef = useRef(null);

  const [showSticky, setShowSticky] = useState(false);
  const [showModal,  setShowModal]  = useState(false);
  const [showToast,  setShowToast]  = useState(false);
  const [lightboxOpen,   setLightboxOpen]   = useState(false);
  const [lightboxStart,  setLightboxStart]  = useState(0);

  // Open lightbox at a specific index
  const openLightbox = (index = 0) => {
    setLightboxStart(index);
    setLightboxOpen(true);
  };

  // Intersection observer for fade-in sections
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.12 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Sticky CTA — shows when the main CTA section leaves viewport
  useEffect(() => {
    const section = ctaRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const openModal     = () => setShowModal(true);
  const closeModal    = () => setShowModal(false);
  const handleSuccess = () => setShowToast(true);


  return (
    <div className="parkvilla">

      {/* ── HERO ── */}
      <section className="pv-hero" style={{ backgroundImage: `url(${img1})` }}>
        <div className="pv-hero__overlay" />
        <div className="pv-hero__content fade-in">
          <p className="pv-hero__eyebrow">Wuye · Abuja</p>
          <h1 className="pv-hero__title">Residence 541</h1>
          <p className="pv-hero__tagline">16 Units of Premium Serviced Apartments</p>
        </div>
        <div className="pv-scroll-indicator"><span /></div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="pv-overview container fade-in">
        <div className="pv-overview__badge">Overview</div>
        <h2 className="pv-overview__heading">Apartment Living, Reimagined</h2>
        <p className="pv-overview__body">
          Residence 541 Apartments and Suites in Abuja offers apartment-style
          living with air-conditioning, private bathrooms, and modern amenities.
          Each unit includes a TV, electric kettle and wardrobe, ensuring a
          pleasant stay whether for a weekend escape or an extended visit.
          Guests enjoy a bar, year-round outdoor swimming pool, free WiFi, a
          wellness package, 24-hour front desk, concierge service, and free
          on-site private parking. Magic Land Abuja is a 19-minute walk away,
          while IBB Golf Club lies just 7.5 miles from the property — placing
          you at the heart of everything Abuja has to offer.
        </p>
      </section>

      {/* ── AMENITIES ── */}
      <section className="pv-amenities fade-in">
        <div className="container">
          <div className="pv-section-header">
            <div className="pv-overview__badge">Lifestyle</div>
            <h2>Facilities &amp; Amenities</h2>
          </div>
          <div className="pv-amenities__grid">
            {amenities.map(({ Icon, label, desc }, i) => (
              <div key={i} className="pv-amenity">
                <div className="pv-amenity__icon-wrap">
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <div className="pv-amenity__text">
                  <p className="pv-amenity__label">{label}</p>
                  <p className="pv-amenity__desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNIT TYPES ── */}
      <section className="pv-residences container fade-in">
        <div className="pv-section-header">
          <div className="pv-overview__badge">Apartments</div>
          <h2>Unit Types</h2>
        </div>
        <div className="pv-residences__grid">
          {residences.map((r, i) => (
            <div key={i} className="pv-res-card">
              <div className="pv-res-card__img-wrap">
                <img src={r.image} alt={r.title} loading="eager" />
              </div>
              <div className="pv-res-card__body">
                <h3>{r.title}</h3>
                <p>{r.description}</p>
                <ul>{r.features.map((f, j) => <li key={j}>{f}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="pv-gallery container fade-in">
        <div className="pv-section-header">
          <div className="pv-overview__badge">Gallery</div>
          <h2>Inside Residence 541</h2>
        </div>

        {/*
          Thumbnail grid — clicking any image opens the lightbox at that index.
          First image is featured (larger). Others form a 3-column row below.
        */}
        <div className="pv-gallery__grid">
          {/* Featured / main image */}
          <div
            className="pv-gallery__item pv-gallery__item--featured"
            onClick={() => openLightbox(0)}
            role="button"
            tabIndex={0}
            aria-label="Open gallery at image 1"
            onKeyDown={(e) => e.key === "Enter" && openLightbox(0)}
          >
            <img src={galleryImages[0]} alt="Park Villa exterior" />
            <span className="pv-gallery__hint">View Gallery</span>
          </div>

          {/* Smaller thumbnails */}
          {galleryImages.slice(1, 4).map((img, i) => (
            <div
              key={i}
              className="pv-gallery__item"
              onClick={() => openLightbox(i + 1)}
              role="button"
              tabIndex={0}
              aria-label={`Open gallery at image ${i + 2}`}
              onKeyDown={(e) => e.key === "Enter" && openLightbox(i + 1)}
            >
              <img src={img} alt={`Park Villa view ${i + 2}`} />
              {/* Show +N overlay on last visible thumb if there are hidden images */}
              {i === 2 && galleryImages.length > 4 && (
                <div className="pv-gallery__more">
                  +{galleryImages.length - 4} more
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxOpen && (
        <Lightbox
          images={galleryImages}
          startIndex={lightboxStart}
          onClose={() => setLightboxOpen(false)}
        />
      )} 

      {/* ── REGISTER INTEREST ── */}
      <section className="pv-cta" ref={ctaRef}>
        <div className="pv-cta__inner">
          <p className="pv-cta__eyebrow">Available Now · 16 Units</p>
          <h2 className="pv-cta__heading">Book Your Stay</h2>
          <p className="pv-cta__sub">
            Whether for a short Airbnb stay or an extended residence,
            our team will find the perfect unit for you.
          </p>
          <button className="pv-cta__btn" onClick={openModal}>
            Register Interest
          </button>
        </div>
      </section>

      {/* ── DYNAMIC ISLAND STICKY BAR ── */}
      {showSticky && (
        <div className="pv-sticky-cta">
          <span className="pv-sticky-cta__name">Residence 541</span>
          <button className="pv-sticky-cta__btn" onClick={openModal}>
            Register Interest
          </button>
        </div>
      )}

      {showModal && <InterestModal onClose={closeModal} onSuccess={handleSuccess} />}
      {showToast && <SuccessToast onDismiss={() => setShowToast(false)} />}

    </div>
  );
};

export default Residence541;

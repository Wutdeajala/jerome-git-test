import React, { useEffect, useState, useCallback } from "react";
import "./Contact.css";
import {
  Phone, Mail, MapPin, Clock,
  Send, Loader, CheckCircle, X,
  ArrowRight,
} from "lucide-react";

// ─── Contact info data ─────────────────────────────────────────────────────────
const contactDetails = [
  {
    Icon: Phone,
    label: "Phone",
    value: "+234 000 000 0000",
    href: "tel:+2340000000000",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "info@bimashelter.com",
    href: "mailto:info@bimashelter.com",
  },
  {
    Icon: MapPin,
    label: "Office Address",
    value: "No 3, Ankuru Close, Off Rima Street, Off Gurara Street, Maitama, Abuja FCT",
    href: "https://www.google.com/maps/search/Ankuru+Close+Maitama+Abuja",
  },
  {
    Icon: Clock,
    label: "Business Hours",
    value: "Monday – Friday: 9:00 AM – 5:00 PM",
    href: null,
  },
];

// ─── Sanitisation helpers ──────────────────────────────────────────────────────
const stripTags   = (s) => String(s).replace(/<[^>]*>/g, "").trim();
const sanitiseName = (s) => s.replace(/[^a-zA-ZÀ-ÿ\s'\-]/g, "").slice(0, 80);
const isValidEmail = (e) => /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(e.trim());
const isValidPhone = (p) => /^[+\d\s\-()\\.]{7,20}$/.test(p.trim());

// ─── Component ─────────────────────────────────────────────────────────────────
const Getintouch = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [toast,   setToast]   = useState(null); // "success" | "error"

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Auto-dismiss toast after 5 s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  const validate = () => {
    const e = {};
    if (!form.name.trim())              e.name    = "Please enter your full name.";
    if (!isValidEmail(form.email))      e.email   = "Please enter a valid email.";
    if (form.phone && !isValidPhone(form.phone)) e.phone = "Please enter a valid phone number.";
    if (!form.subject.trim())           e.subject = "Please enter a subject.";
    if (!form.message.trim())           e.message = "Please enter a message.";
    return e;
  };

const handleChange = useCallback((field) => (e) => {
    const val = e.target.value;
    setForm((p) => ({ ...p, [field]: val }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);

    const payload = {
      name:    sanitiseName(form.name),
      email:   form.email.trim().slice(0, 254),
      phone:   form.phone.trim().slice(0, 20),
      subject: stripTags(form.subject).slice(0, 120),
      message: stripTags(form.message).slice(0, 1500),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Server error");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setToast("success");
    } catch {
      setToast("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="ct-page">

        {/* ── HERO BANNER ── */}
        <div className="ct-hero">
          <div className="ct-hero__overlay" />
          <div className="ct-hero__content">
            <p className="ct-hero__eyebrow">We'd Love to Hear From You</p>
            <h1 className="ct-hero__title">Get in Touch</h1>
            <div className="ct-hero__rule" />
          </div>
        </div>

        {/* ── MAIN SECTION ── */}
        <section className="ct-section">
          <div className="ct-container">

            {/* ── LEFT — form ── */}
            <div className="ct-form-card">
              <p className="ct-card__eyebrow">Send a Message</p>
              <h2 className="ct-card__heading">Contact Us</h2>
              <p className="ct-card__sub">
                Fill in the form and a member of our team will respond within
                24 hours.
              </p>

              <form className="ct-form" onSubmit={handleSubmit} noValidate>

                {/* Name */}
                <div className={`ct-field${errors.name ? " ct-field--err" : ""}`}>
                  <label htmlFor="ct-name">Full Name <span>*</span></label>
                  <input
                    id="ct-name"
                    type="text"
                    placeholder="e.g. Amina Bello"
                    value={form.name}
                    onChange={handleChange("name")}
                    maxLength={80}
                    autoComplete="name"
                  />
                  {errors.name && <span className="ct-err">{errors.name}</span>}
                </div>

                {/* Email + Phone — side by side on desktop */}
                <div className="ct-row">
                  <div className={`ct-field${errors.email ? " ct-field--err" : ""}`}>
                    <label htmlFor="ct-email">Email Address <span>*</span></label>
                    <input
                      id="ct-email"
                      type="email"
                      placeholder="e.g. amina@example.com"
                      value={form.email}
                      onChange={handleChange("email")}
                      maxLength={254}
                      autoComplete="email"
                    />
                    {errors.email && <span className="ct-err">{errors.email}</span>}
                  </div>

                  <div className={`ct-field${errors.phone ? " ct-field--err" : ""}`}>
                    <label htmlFor="ct-phone">
                      Phone <span className="ct-optional">(optional)</span>
                    </label>
                    <input
                      id="ct-phone"
                      type="tel"
                      placeholder="e.g. +234 800 000 0000"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      maxLength={20}
                      autoComplete="tel"
                    />
                    {errors.phone && <span className="ct-err">{errors.phone}</span>}
                  </div>
                </div>

                {/* Subject */}
                <div className={`ct-field${errors.subject ? " ct-field--err" : ""}`}>
                  <label htmlFor="ct-subject">Subject <span>*</span></label>
                  <input
                    id="ct-subject"
                    type="text"
                    placeholder="e.g. Enquiry about Park Villa"
                    value={form.subject}
                    onChange={handleChange("subject")}
                    maxLength={120}
                  />
                  {errors.subject && <span className="ct-err">{errors.subject}</span>}
                </div>

                {/* Message */}
                <div className={`ct-field${errors.message ? " ct-field--err" : ""}`}>
                  <label htmlFor="ct-message">Message <span>*</span></label>
                  <textarea
                    id="ct-message"
                    placeholder="Tell us how we can help…"
                    value={form.message}
                    onChange={handleChange("message")}
                    rows={6}
                    maxLength={1500}
                  />
                  <span className="ct-count">{form.message.length} / 1500</span>
                  {errors.message && <span className="ct-err">{errors.message}</span>}
                </div>

                <button className="ct-submit" type="submit" disabled={loading}>
                  {loading
                    ? <><Loader size={16} className="ct-spin" /> Sending…</>
                    : <><Send size={15} /> Send Message</>
                  }
                </button>

              </form>
            </div>

            {/* ── RIGHT — info ── */}
            <div className="ct-info-card">
              <p className="ct-card__eyebrow">Our Details</p>
              <h2 className="ct-card__heading">Reach Us</h2>
              <p className="ct-card__sub">
                Leverage our expertise in delivering innovative, high-quality
                construction and property development solutions across Nigeria.
              </p>

              <div className="ct-details">
                {contactDetails.map(({ Icon, label, value, href }, i) => (
                  <div key={i} className="ct-detail">
                    <div className="ct-detail__icon">
                      <Icon size={20} strokeWidth={1.6} />
                    </div>
                    <div className="ct-detail__text">
                      <p className="ct-detail__label">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="ct-detail__value ct-detail__value--link"
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="ct-detail__value">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map embed */}
              <div className="ct-map">
                <iframe
                  title="Bima Shelter Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.8!2d7.4985!3d9.0871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b9e8e8e8e8f%3A0x1234567890abcdef!2sMaitama%2C%20Abuja%2C%20Federal%20Capital%20Territory!5e0!3m2!1sen!2sng!4v1700000000000"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>

          </div>
        </section>
      </div>

      {/* ── TOAST ── */}
      {toast && (
        <div className={`ct-toast ct-toast--${toast}`} role="status" aria-live="polite">
          {toast === "success"
            ? <CheckCircle size={20} className="ct-toast__icon" />
            : <X size={20} className="ct-toast__icon" />
          }
          <div>
            <p className="ct-toast__title">
              {toast === "success" ? "Message Sent!" : "Something went wrong"}
            </p>
            <p className="ct-toast__sub">
              {toast === "success"
                ? "We'll be in touch within 24 hours."
                : "Please try again or email us directly."
              }
            </p>
          </div>
          <button className="ct-toast__close" onClick={() => setToast(null)} aria-label="Dismiss">
            <X size={14} />
          </button>
        </div>
      )}
    </>
  );
};

export default Getintouch;

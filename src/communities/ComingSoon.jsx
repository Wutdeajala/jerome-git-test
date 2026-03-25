// src/pages/ComingSoon.jsx
import { useState } from 'react';
import { Link }     from 'react-router-dom';
import './ComingSoon.css';

export default function ComingSoon() {
  // Controls whether the inquiry form is open or closed
  const [formOpen,   setFormOpen]   = useState(false);
  // Tracks form field values
  const [formData,   setFormData]   = useState({ name: '', email: '', phone: '', message: '' });
  // 'idle' | 'sending' | 'sent' | 'error'
  const [status,     setStatus]     = useState('idle');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    /*
      ── TO CONNECT TO A REAL BACKEND ────────────────────────────
      Replace the setTimeout below with a real fetch/axios call:

      try {
        await fetch('/api/inquiries', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(formData),
        });
        setStatus('sent');
      } catch {
        setStatus('error');
      }
      ─────────────────────────────────────────────────────────── */
    setTimeout(() => {
      setStatus('sent');
    }, 1200);
  };

  const reset = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setStatus('idle');
    setFormOpen(false);
  };

  return (
    <div className="cs-page">

      {/* ── Background decorative ring ── */}
      <div className="cs-ring" aria-hidden="true" />

      {/* ── Main content ── */}
      <div className="cs-content">

        {/* Gold eyebrow pill */}
        <span className="cs-eyebrow">Under Development</span>

        <h1 className="cs-title">Coming Soon</h1>

        <p className="cs-body">
          This property page is currently being prepared.<br />
          Something exceptional is on its way.
        </p>

        {/* ── Action buttons ── */}
        <div className="cs-actions">
          <Link to="/contact"
            className="cs-btn cs-btn--primary"
            /*onClick={() => setFormOpen(true)}*/
          >
            Make an Enquiry
          </Link>

          <Link to="/" className="cs-btn cs-btn--ghost">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* ── Inquiry modal overlay ── */}
      {formOpen && (
        <div
          className="cs-overlay"
          onClick={(e) => e.target === e.currentTarget && reset()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-title"
        >
          <div className="cs-modal">

            {/* Close button */}
            <button
              className="cs-modal__close"
              onClick={reset}
              aria-label="Close enquiry form"
            >
              ✕
            </button>

            {/* ── Success state ── */}
            {status === 'sent' ? (
              <div className="cs-success">
                <div className="cs-success__icon" aria-hidden="true">✓</div>
                <h2 className="cs-success__title">Enquiry Received</h2>
                <p className="cs-success__body">
                  Thank you for your interest. A member of the Bima Shelter
                  team will be in touch with you shortly.
                </p>
                <button className="cs-btn cs-btn--primary" onClick={reset}>
                  Done
                </button>
              </div>

            ) : (
              /* ── Form state ── */
              <>
                <p className="cs-modal__eyebrow">Property Enquiry</p>
                <h2 className="cs-modal__title" id="inquiry-title">
                  Get in Touch
                </h2>
                <p className="cs-modal__sub">
                  Leave your details and we'll contact you as soon as this
                  property is ready — or to answer any questions you have now.
                </p>

                <form className="cs-form" onSubmit={handleSubmit} noValidate>

                  <div className="cs-form__row">
                    <div className="cs-form__field">
                      <label htmlFor="cs-name">Full name *</label>
                      <input
                        id="cs-name"
                        name="name"
                        type="text"
                        placeholder="e.g. Emeka Okafor"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>

                    <div className="cs-form__field">
                      <label htmlFor="cs-email">Email address *</label>
                      <input
                        id="cs-email"
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="cs-form__field">
                    <label htmlFor="cs-phone">Phone number</label>
                    <input
                      id="cs-phone"
                      name="phone"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                  </div>

                  <div className="cs-form__field">
                    <label htmlFor="cs-message">Message</label>
                    <textarea
                      id="cs-message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your interest in this property — number of units, budget range, timeline, or any questions..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="cs-form__error">
                      Something went wrong. Please try again or contact us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="cs-btn cs-btn--primary cs-btn--full"
                    disabled={status === 'sending' || !formData.name || !formData.email}
                  >
                    {status === 'sending' ? 'Sending…' : 'Submit Enquiry'}
                  </button>

                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

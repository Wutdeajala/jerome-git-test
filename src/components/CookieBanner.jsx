import { useState, useEffect } from "react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import "./CookieBanner.css";

const STORAGE_KEY = "bima_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = (decision) => {
    setLeaving(true);
    setTimeout(() => {
      if (decision) localStorage.setItem(STORAGE_KEY, decision);
      setVisible(false);
      setLeaving(false);
    }, 400);
  };

  return (
    <>
      {visible && (
        <div
          className={`cookie-banner ${leaving ? "cookie-banner--leaving" : ""}`}
          role="region"
          aria-label="Cookie consent"
        >
          <div className="cookie-banner__inner">
            <div className="cookie-banner__text">
              <span className="cookie-banner__heading">We use cookies</span>
              <p className="cookie-banner__body">
                We use cookies to improve your experience and understand how our site is used.
                You can accept, decline, or close this notice.{" "}
                <button
                  className="cookie-banner__policy-btn"
                  onClick={() => setPolicyOpen(true)}
                >
                  Privacy Policy
                </button>
              </p>
            </div>
            <div className="cookie-banner__actions">
              <button
                className="cookie-banner__btn cookie-banner__btn--accept"
                onClick={() => dismiss("accepted")}
              >
                Accept
              </button>
              <button
                className="cookie-banner__btn cookie-banner__btn--decline"
                onClick={() => dismiss("declined")}
              >
                Decline
              </button>
              <button
                className="cookie-banner__close"
                onClick={() => dismiss(null)}
                aria-label="Dismiss"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <PrivacyPolicyModal
        isOpen={policyOpen}
        onClose={() => setPolicyOpen(false)}
      />
    </>
  );
}
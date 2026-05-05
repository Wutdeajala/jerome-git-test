import { useEffect } from "react";
import "./PrivacyPolicyModal.css";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: `Bima Shelter Limited ("we", "our", or "us") is committed to protecting the personal information of everyone who visits and interacts with our website. This Privacy Policy explains what data we collect, why we collect it, how we use it, and your rights under the Nigeria Data Protection Regulation (NDPR) 2019.

By using our website and submitting any form on it, you agree to the practices described in this policy.`,
  },
  {
    id: "data-collected",
    title: "2. Data We Collect",
    content: `We collect personal information only when you voluntarily provide it through one of the following forms on our website:

Email Subscription (Footer) — When you subscribe to our mailing list, we collect your email address.

Property Enquiry Forms — When you enquire about a specific property listing, we collect your full name, email address, phone number, and the details of your enquiry including any preferred viewing dates or times.

Contact Form (Contact Page) — When you reach out to us directly, we collect your full name, email address, phone number, and the content of your message.

We do not collect any sensitive personal data such as financial information, identification numbers, or health data.`,
  },
  {
    id: "cookies",
    title: "3. Cookies",
    content: `Our website uses cookies to improve your browsing experience. A cookie is a small text file stored on your device when you visit our site.

We use cookies solely to remember your cookie consent preference so that the consent banner does not appear on every visit. We do not currently use cookies for advertising, tracking, or analytics purposes.

You may accept or decline cookies when prompted by our cookie banner. You can also clear cookies at any time through your browser settings. Declining cookies will not affect your ability to use our website.`,
  },
  {
    id: "use-of-data",
    title: "4. How We Use Your Data",
    content: `We use the information you provide for the following purposes only:

— To respond to your property enquiries and arrange viewings or consultations.
— To send you property updates, market insights, and company news if you have subscribed to our mailing list.
— To respond to general messages and questions sent through our contact form.
— To comply with any legal obligations applicable to us as a registered entity in Nigeria.

We will never sell, rent, or share your personal information with third parties for marketing purposes.`,
  },
  {
    id: "legal-basis",
    title: "5. Legal Basis for Processing",
    content: `Under the NDPR, we process your personal data on the following legal bases:

Consent — For email subscriptions and cookie usage, where you have actively opted in.

Contractual necessity — For property enquiries, where processing is necessary to take steps at your request.

Legitimate interests — For responding to contact form messages, where we have a legitimate interest in communicating with prospective clients.

You may withdraw your consent at any time by contacting us at the address below.`,
  },
  {
    id: "data-retention",
    title: "6. Data Retention",
    content: `We retain your personal data only for as long as is necessary to fulfil the purpose for which it was collected:

— Email subscription data is retained until you unsubscribe.
— Enquiry and contact form data is retained for up to 24 months to allow for follow-up and record keeping, after which it is securely deleted.

You may request deletion of your data at any time by contacting us directly.`,
  },
  {
    id: "your-rights",
    title: "7. Your Rights",
    content: `Under the Nigeria Data Protection Regulation (NDPR) 2019, you have the following rights regarding your personal data:

— The right to access the personal data we hold about you.
— The right to correct inaccurate or incomplete data.
— The right to request erasure of your data ("right to be forgotten").
— The right to withdraw consent at any time, without affecting the lawfulness of prior processing.
— The right to lodge a complaint with the National Information Technology Development Agency (NITDA) if you believe your data has been mishandled.

To exercise any of these rights, please contact us at the details below.`,
  },
  {
    id: "security",
    title: "8. Data Security",
    content: `We take reasonable technical and organisational measures to protect your personal data against unauthorised access, loss, or disclosure. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.

If you have reason to believe that your interaction with us is no longer secure, please notify us immediately.`,
  },
  {
    id: "third-parties",
    title: "9. Third-Party Services",
    content: `Our website may contain links to external websites or platforms, including our social media profiles on LinkedIn and Instagram. We are not responsible for the privacy practices of those platforms and encourage you to review their own privacy policies.

We do not currently use third-party analytics tools, advertising networks, or data processors on this website.`,
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. When we do, we will update the effective date at the top of this page. We encourage you to review this policy periodically.

Continued use of our website after any changes constitutes your acceptance of the updated policy.`,
  },
  {
    id: "contact",
    title: "11. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or the way we handle your data, please contact us:

Bima Shelter Limited
Email: info@bimashelter.com
Nigeria`,
  },
];

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="pp-modal-overlay" onClick={onClose}>
      <div
        className="pp-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Privacy Policy"
      >
        {/* Modal Header */}
        <div className="pp-modal__header">
          <div>
            <p className="pp-modal__label">Legal · NDPR 2019</p>
            <h2 className="pp-modal__title">Privacy Policy</h2>
            <p className="pp-modal__meta">Last updated: May 2025</p>
          </div>
          <button className="pp-modal__close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="pp-modal__body">
          {sections.map((s, index) => (
            <section key={s.id} className="pp-modal__section">
              <h3 className="pp-modal__section-title">{s.title}</h3>
              {s.content.split("\n\n").map((para, i) => (
                <p key={i} className="pp-modal__section-body">{para}</p>
              ))}
              {index < sections.length - 1 && <div className="pp-modal__divider" />}
            </section>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="pp-modal__footer">
          <p className="pp-modal__footer-text">
            For privacy concerns, contact us at{" "}
            <a href="mailto:info@bimashelter.com" className="pp-modal__footer-link">
              info@bimashelter.com
            </a>
          </p>
          <button className="pp-modal__close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

import React, {useEffect} from "react";
import "./Contact.css";


const Getintouch = () => {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <section className="contact-section">
      <div className="contact-container">

        {/* ===== LEFT: CONTACT FORM ===== */}
        <div className="contact-form-card">
          <h2 className="contact-heading">Contact Us</h2>

          <form className="contact-form">
            <input
              type="text"
              placeholder="Full Name"
              className="form-input"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              className="form-input"
              required
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="form-input"
            />

            <input
              type="text"
              placeholder="Subject"
              className="form-input"
            />

            <textarea
              placeholder="Your Message"
              className="form-textarea"
              rows="6"
              required
            ></textarea>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>

        {/* ===== RIGHT: COMPANY DETAILS ===== */}
        <div className="contact-info-card">
          <h2 className="info-heading">Get in Touch</h2>

          <p className="info-description"> Contact us today to leverage our expertise in delivering innovative, high-quality construction and property development solutions</p>

         

          <div className="info-item">
            <h4>Phone</h4>
            <p>+1 (234) 000-000-000</p>
          </div>

          <div className="info-item">
            <h4>Email</h4>
            <p>bima@shelter.com</p>
          </div>

          <div className="info-item">
            <h4>Office Address</h4>
            <p>
              No 3, Ankuru Close, Off Rima Stree, Off Gurara Street, Maitama, Abuja-FCT<br />
              Business District <br/>
            </p>
          </div>

          <div className="info-item">
            <h4>Business Hours</h4> 
            <p>Mon – Fri: 9:00 AM – 5:00 PM</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Getintouch;
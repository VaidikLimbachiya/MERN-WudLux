// import React from 'react';
import './ContactUs.css';
import phoneIcon from '../../assets/phone.png'; // Path to phone icon
import emailIcon from '../../assets/email.png'; // Path to email icon
import contactBanner from '../../assets/contact.png'; // Path to banner image

const ContactUs = () => {
  return (
    <div className="contact-page">
      {/* Banner Section */}
      <div
        className="contact-banner"
        style={{
          backgroundImage: `url(${contactBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      </div>

      {/* Main Section */}
      <section className="contact-content">
        {/* Left Section */}
        <div className="contact-info">
          <h2>Let's Talk</h2>
          <p>
            Lorem Ipsum has been the industry's standard <br /> dummy text ever since the 1500s,
            when an unknown <br /> printer took a galley.
          </p>
          <div className="info-item">
            <img src={phoneIcon} alt="Phone Icon" className="icon" />
            <div className="contact-text">
              <h3>Phone Number</h3>
              <p>+91-9601272812</p>
            </div>
          </div>
          <hr className="dividerr" />
          <div className="info-item">
            <img src={emailIcon} alt="Email Icon" className="icon" />
            <div className="contact-text">
              <h3>Email Address</h3>
              <p>wudluxdecor@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="contact-form">
          <h2>Send us a message</h2>
          <form>
            <label>
              <input type="text" name="name" required />
              <span className="placeholder">Your Name <span className="red">*</span></span>
            </label>
            <label>
              <input type="email" name="email" required />
              <span className="placeholder">Email Address <span className="red">*</span></span>
            </label>
            <label>
              <textarea name="message" rows="10"></textarea>
              <span className="placeholder">Your Message</span>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;

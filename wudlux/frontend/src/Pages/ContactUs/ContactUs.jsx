// import React from 'react';
import './ContactUs.css';
import phoneIcon from '../../assets/phone.png'; // Path to phone icon
import emailIcon from '../../assets/email.png'; // Path to email icon
import contactBanner from '../../assets/contact.png'; // Path to banner image

const ContactUs = () => {

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh
  
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      alert(data.message); // Notify user
      e.target.reset(); // Clear form
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };  
  
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
            <img src={phoneIcon} alt="Phone Icon" className="icon" loading="lazy" />
            <div className="contact-text">
              <h3>Phone Number</h3>
              <p>+91-9601272812</p>
            </div>
          </div>
          <hr className="dividerr" />
          <div className="info-item">
            <img src={emailIcon} alt="Email Icon" className="icon" loading="lazy"/>
            <div className="contact-text">
              <h3>Email Address</h3>
              <p>wudluxdecor@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="contact-form">
  <h2>Send us a message</h2>
  <form onSubmit={handleSubmit}>
    <label className="input-container">
      <input type="text" name="name" placeholder="Your Name *" required />
    </label>

    <label className="input-container">
      <input type="email" name="email" placeholder="Email Address *" required />
    </label>

    <label className="input-container">
      <textarea name="message" rows="10" placeholder="Your Message"></textarea>
    </label>

    <button type="submit" onSubmit={handleSubmit}>Submit</button>
  </form>
</div>


      </section>
    </div>
  );
};

export default ContactUs;

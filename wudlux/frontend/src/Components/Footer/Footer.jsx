import React from "react";
import "./Footer.css"; // Create this file to style the footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Newsletter Section */}
        <div className="footer-section newsletter">
          <h3>Join Our Newsletter Now</h3>
          <p>Get E-mail updates about our latest shop and special offers.</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Email Address" />
            <button>Subscribe →</button>
          </div>
          <div className="social-icons">
            <a href="#facebook" className="social-icon">F</a>
            <a href="#instagram" className="social-icon">I</a>
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-section">
          <h4>Customer Care</h4>
          <ul>
            <li><a href="#refund">Refund Policy</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
            <li><a href="#shipping">Shipping Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>About Wudlux</h4>
          <ul>
            <li><a href="#story">Our Story</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Wudlux Products</h4>
          <ul>
            <li><a href="#serverware">Serveware</a></li>
            <li><a href="#kitchenware">Kitchenware</a></li>
            <li><a href="#tableware">Tableware</a></li>
            <li><a href="#collections">Collections</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h4>Contact Information</h4>
          <p><strong>Phone:</strong> +91-9601272812</p>
          <p><strong>Email:</strong> wudluxdecor@gmail.com</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>Copyright ©2024 WUDLUX – All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
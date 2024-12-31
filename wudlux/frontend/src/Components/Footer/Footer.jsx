// Footer.js
import { FaFacebookF } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { BiLogoInstagramAlt } from "react-icons/bi";
import "./Footer.css";

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
            <button>
              Subscribe  
             <span className="span-arrow"> <FaArrowRightLong /></span>
            </button>
          </div>
          <div className="social-icons">
            <a href="#facebook" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="#instagram" className="social-icon">
              <BiLogoInstagramAlt />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-section">
          <h4>Customer Care</h4>
          <ul>
            <li><a href="/refund-policy">Refund Policy</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-condition">Terms & Conditions</a></li>
            <li><a href="/shipping-policy">Shipping Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>About Wudlux</h4>
          <ul>
            <li><a href="/our-story">Our Story</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
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

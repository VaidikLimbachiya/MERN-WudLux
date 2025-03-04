// Footer.js
import { FaFacebookF } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { BiLogoInstagramAlt } from "react-icons/bi";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Newsletter Section */}
        <div className=" newsletter">
          <h3>Join Our Newsletter Now</h3>
          <p>Get E-mail updates about our latest shop and special offers.</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Email Address" />
            <button>
              Subscribe  
             <span > <FaArrowRightLong className="span-arrow" /></span>
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
            <li><Link to="/refund-policy" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Refund Policy</Link></li>
            <li><Link to="/privacy-policy" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Privacy Policy</Link></li>
            <li><Link to="/terms-condition" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Terms & Conditions</Link></li>
            <li><Link to="/shipping-policy" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Shipping Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>About Wudlux</h4>
          <ul>
            <li><Link to="/our-story" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Our Story</Link></li>
            <li><Link to ="/contact-us" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Wudlux Products</h4>
          <ul>
            <li><Link to ="/products/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >Serveware</Link></li>
            <li><Link to="/products/"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Kitchenware</Link></li>
            <li><Link to="/products/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Tableware</Link></li>
            <li><Link to="/products/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Collections</Link></li>
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

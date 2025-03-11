// Footer.js
import { useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { BiLogoInstagramAlt } from "react-icons/bi";
import "./Footer.css";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.", { position: "top-right" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/subscribe", { email });
      toast.success(response.data.message, { position: "top-right" });
      setEmail(""); // Clear input after successful subscription
    } catch {
      toast.error("Something went wrong. Please try again later.", { position: "top-right" });
    }
  };

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
            <li><Link to="/refund-policy" >Refund Policy</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-condition">Terms & Conditions</Link></li>
            <li><Link to="/shipping-policy">Shipping Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>About Wudlux</h4>
          <ul>
            <li><Link to="/our-story">Our Story</Link></li>
            <li><Link to ="/contact-us">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Wudlux Products</h4>
          <ul>
            <li><Link to ="/products/" >Serveware</Link></li>
            <li><Link to="/products/">Kitchenware</Link></li>
            <li><Link to="/products/">Tableware</Link></li>
            <li><Link to="/products/">Collections</Link></li>
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

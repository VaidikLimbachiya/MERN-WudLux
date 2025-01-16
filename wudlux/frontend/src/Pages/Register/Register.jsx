// import React from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const handleLoginNavigation = () => {
    const form = document.getElementById("register-form");
    form.classList.add("shrink-in");
    setTimeout(() => {
      navigate("/log-in");
    }, 500); // Matches the shrink animation duration
  };

  return (
    <div id="register-container" className="register-container">
      <h2 className="register-title">Register</h2>
      <p className="register-subtitle">
        Your personal data will be used to support your experience throughout this website, to manage access to your account.
      </p>
      <form id="register-form" className="register-form">
        <div className="form-row">
          <input type="text" placeholder="First Name *" className="form-input" required />
          <input type="text" placeholder="Last Name *" className="form-input" required />
        </div>
        <input type="email" placeholder="Email Address *" className="form-input-full" required />
        <div className="form-row">
          <input type="text" placeholder="Your Address *" className="form-input" required />
          <input type="text" placeholder="Zip Code *" className="form-input" required />
        </div>
        <div className="form-row">
          <select className="form-input" required>
            <option value="">Country *</option>

            <option value="USA">USA</option>
            <option value="Canada">Canada</option>

             <option value="USA">USA</option>
            <option value="Canada">Canada</option> 

          </select>
          <select className="form-input" required>
            <option value="">State *</option>

            <option value="California">California</option>
            <option value="Texas">Texas</option>

             <option value="California">California</option>
            <option value="Texas">Texas</option> 

          </select>
          <select className="form-input" required>
            <option value="">City *</option>
          </select>
        </div>
        <input type="tel" placeholder="Phone Number *" className="form-input-full" required />
        <div className="password-row">
          <input type="password" placeholder="Password *" className="form-input" required />
          <input type="password" placeholder="Confirm Password *" className="form-input" required />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
        <button
          type="button"
          className="back-to-login"
          onClick={handleLoginNavigation}
        >
          ← Back to Login
        </button>
      </form>
    </div>
  );
};

export default Register;

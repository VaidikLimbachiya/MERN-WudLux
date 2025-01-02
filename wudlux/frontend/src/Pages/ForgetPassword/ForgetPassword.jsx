import React from "react";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/log-in");
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Forgot Password</h2>
      <p className="forgot-password-description">
        Lost your password? Please enter your email address. <br />
        You will receive a link to create a new password via email.
      </p>
      <form className="forgot-password-form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email address *"
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="continue-button">
          Continue →
        </button>
        <button
          type="button"
          className="back-to-login-button"
          onClick={handleBackToLogin}
        >
          ← Back to Login
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../api/api";
import "./ForgetPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resetRequested, setResetRequested] = useState(false);  // Track if the reset link was sent
  const [newPassword, setNewPassword] = useState("");           // Track new password input

  const handleBackToLogin = () => {
    navigate("/log-in");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      await apiCall("http://localhost:5000/api/auth/forgot-password ", "POST", { email });
      setMessage("A password reset link has been sent to your email.");
      setResetRequested(true);  // Mark the reset link request as successful
    } catch (error) {
      setMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiCall("/auth/reset-password", "POST", { email, newPassword });
      setMessage("Your password has been reset successfully.");
      // You can optionally navigate the user to the login page after a successful password reset
      navigate("/log-in");
    } catch (error) {
      setMessage(error.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Forgot Password</h2>
      <p className="forgot-password-description">
        Lost your password? Please enter your email address. <br />
        You will receive a link to create a new password via email.
      </p>

      {!resetRequested ? (
        // Initial email form to request a password reset link
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email address *"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="continue-button" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Continue →"}
          </button>
          <button
            type="button"
            className="back-to-login-button"
            onClick={handleBackToLogin}
          >
            ← Back to Login
          </button>
        </form>
      ) : (
        // Display form to enter a new password after reset link request
        <form className="forgot-password-form" onSubmit={handlePasswordReset}>
          <div className="form-group">
            <input
              type="password"
              placeholder="New Password *"
              className="form-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="continue-button" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Reset Password →"}
          </button>
          <button
            type="button"
            className="back-to-login-button"
            onClick={handleBackToLogin}
          >
            ← Back to Login
          </button>
        </form>
      )}

      {message && <p className="forgot-password-message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;

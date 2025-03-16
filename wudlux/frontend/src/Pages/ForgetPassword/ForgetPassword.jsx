import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../api/api";
import { toast } from "react-toastify"; //   Import toast
import "react-toastify/dist/ReactToastify.css"; //   Import toast styles
import "./ForgetPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const handleBackToLogin = () => {
    navigate("/log-in");
  };

  //   Step 1: Verify Email Exists
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiCall("https://mern-wudlux-1-lss8.onrender.com/api/auth/verify-email", "POST", { email });

      if (response.message === "Email verified") {
        setShowPasswordReset(true); // Show password reset form
        toast.success("Email verified! Enter a new password."); //   Toast message
      } else {
        toast.error("No account found with this email.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //   Step 2: Reset Password Directly
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://mern-wudlux-1-lss8.onrender.com/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      if (!response.ok) {
        throw new Error(`Failed to reset password: ${response.statusText}`);
      }

      await response.json();
      toast.success("Your password has been reset successfully."); //   Toast message
      navigate("/log-in");
    } catch (error) {
      toast.error(error.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Forgot Password</h2>
      <p className="forgot-password-description">
        Enter your email and reset your password instantly.
      </p>

      {!showPasswordReset ? (
        //   Step 1: Enter Email for Verification
        <form className="forgot-password-form" onSubmit={handleVerifyEmail}>
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
            {loading ? <span className="spinner"></span> : "Verify Email →"}
          </button>
          <button type="button" className="back-to-login-button" onClick={handleBackToLogin}>
            ← Back to Login
          </button>
        </form>
      ) : (
        //   Step 2: Reset Password Directly
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
          <button type="button" className="back-to-login-button" onClick={handleBackToLogin}>
            ← Back to Login
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;

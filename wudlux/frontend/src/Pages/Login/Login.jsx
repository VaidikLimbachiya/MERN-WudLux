import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json(); // Parse JSON response

      if (!response.ok) {
        console.error("Backend Error:", result); // Log backend error
        throw new Error(result.message || "Failed to log in");
      }

      toast.success("Login successful");
      // Store tokens in localStorage
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error); // Log error
      toast.error(error.message || "Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to refresh the access token
  const refreshToken = async () => {
    try {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      if (!storedRefreshToken) {
        throw new Error("No refresh token found");
      }

      const response = await fetch("http://localhost:5000/api/users/refresh-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: storedRefreshToken }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to refresh token");
      }

      // Update access token in localStorage
      localStorage.setItem("accessToken", result.accessToken);
      toast.success("Session refreshed successfully!");
      return result.accessToken;
    } catch (error) {
      console.error("Token refresh error:", error);
      toast.error("Session expired. Please log in again.");
      localStorage.clear(); // Clear tokens and user data
      navigate("/log-in");
    }
  };

  // Auto-refresh token logic (optional)
  useEffect(() => {
    const interval = setInterval(async () => {
      await refreshToken();
    }, 15 * 60 * 1000); // Refresh token every 15 minutes

    return () => clearInterval(interval);
  }, []);

  const handleRegisterNavigation = () => {
    const form = document.getElementById("login-form");
    form.classList.add("expand-out");
    setTimeout(() => {
      navigate("/sign-up");
    }, 500);
  };

  return (
    <div id="login-container" className="login-page">
      <main className="login-container">
        <form id="login-form" className="login-form" onSubmit={handleLogin}>
          <h1>Login</h1>
          <p>
            Your personal data will be used to support your experience
            throughout this <br />
            website, to manage access to your account.
          </p>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="form-actions">
            <p className="remember-me">
              <input className="checkBox" type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </p>
            <Link to="/forgot-password" className="Forgot-link">
              Forgot Password?
            </Link>
          </div>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login →"}
          </button>
          <p>
            Don’t have an account?{" "}
            <span
              onClick={handleRegisterNavigation}
              className="register-link"
            >
              Register Now
            </span>
          </p>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;

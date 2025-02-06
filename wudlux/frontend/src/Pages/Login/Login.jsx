import { useState, useEffect, useCallback, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { apiCall } from "../../api/api";
import "./Login.css";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import { useCartContext } from "../../Context/CartContext"; //   Correct import

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const { fetchCart } = useCartContext(); //   Corrected usage

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //   Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const result = await apiCall("http://localhost:5000/api/auth/login", "POST", { email, password });

      toast.success("Login successful");

      //   Store authentication details in AuthContext
      login(result.user, result.accessToken, result.refreshToken);

      //   Store tokens in localStorage
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("user", JSON.stringify(result.user));

      //   Fetch cart data immediately after login
      await fetchCart(true);

      const params = new URLSearchParams(location.search);
      const redirectUrl = params.get("redirect") || "/"; // Default to home if no redirect
      navigate(redirectUrl);
    } catch (error) {
      toast.error(error.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
};
  const refreshToken = useCallback(async () => {
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
  }, [navigate]);
  useEffect(() => {
    const interval = setInterval(async () => {
      await refreshToken();
    }, 15 * 60 * 1000); // Refresh token every 15 minutes

    return () => clearInterval(interval);
  }, [refreshToken]);

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
          <p>Your personal data will be used to manage access to your account.</p>
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

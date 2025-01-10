import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to log in");
      }
  
      const result = await response.json();
      toast.success("Login successful");
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

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

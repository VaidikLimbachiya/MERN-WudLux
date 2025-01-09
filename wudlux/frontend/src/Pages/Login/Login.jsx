// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRegisterNavigation = () => {
    const form = document.getElementById("login-form");
    form.classList.add("expand-out");
    setTimeout(() => {
      navigate("/sign-up");
    }, 500); // Matches the expand animation duration
  };

  return (
    <div id="login-container" className="login-page">
      <main className="login-container">
        <form id="login-form" className="login-form">
          <h1>Login</h1>
          <p>
            Your personal data will be used to support your experience throughout this <br />
            website, to manage access to your account.
          </p>
          {/* <label htmlFor="email">Email Address</label> */}
          <input type="email" id="email" placeholder="Email address" required />
          {/* <label htmlFor="password">Password</label> */}
          <input type="password" id="password" placeholder="Password" required />
          <div className="form-actions">
              <p className="remember-me">
                <input  className ="checkBox " type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember Me</label>
              </p>
            <Link to="/forgot-password" className='Forgot-link'>Forgot Password?</Link>
          </div>
          <button className="btn" type="submit">Login →</button>
          <p>
            Don’t have an account? <span onClick={handleRegisterNavigation} className="register-link">Register Now</span>
          </p>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;

// import React from 'react';
import './Login.css'; 

const LoginPage = () => {
  return (
    <div className="login-page">
      <main className="login-container">
        <form className="login-form">
          <h1>Login</h1>
          <p>
            Your personal data will be used to support your experience
            throughout this <br />
            website, to manage access to your account.
          </p>
          {/* <label htmlFor="email">Email Address</label> */}
          <input type="email" id="email" placeholder="Email address" required />

          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />

          <div className="form-actions">
              <p className="remember-me">
                <input  className ="checkBox " type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember Me</label>
              </p>
            <a href="#" className='Forgot-link'>Forgot Password?</a>
          </div>

          <button className="btn" type="submit">
            Login
          </button>
          <p>
            Don’t have an account? <a href="#">Register Now</a>
          </p>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;

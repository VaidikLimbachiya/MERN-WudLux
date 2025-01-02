import React from 'react';
import './Login.css'; 

const LoginPage = () => {
  return (
    <div className="login-page">
      <main className="login-container">
        <form className="login-form">
          <h1>Login</h1>
          <p>Your personal data will be used to support your experience throughout this  <br />website, to manage access to your account.</p>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Enter your email" required />
          
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required />
          
          <div className="form-actions">
            <div>
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember Me</label>
            </div>
            <a href="#">Forgot Password?</a>
          </div>
          
          <button className='btn' type="submit">Login</button>
          <p>Don’t have an account? <a href="#">Register Now</a></p>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;

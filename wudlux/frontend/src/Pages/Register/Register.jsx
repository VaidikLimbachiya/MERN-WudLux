import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const App = () => {
  const navigate = useNavigate();
  const [isLogging, setIsLogging] = useState(false);
  const [userData, setUserData] = useState(null);

  // Simulate fetching user data on mount
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        // Simulate an API call to get user data
        const response = await fetch("localhost:3000/api/users/login", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setIsLogging(true); // User is logged in
        }
      }
    };

    fetchData();
  }, []);

  const handleLoginNavigation = () => {
    navigate("/log-in");
  };

  return (
    <div id="register-container" className="register-container">
      <h2 className="register-title">{isLogging ? "Shipping Information" : "Register"}</h2>
      <p className="register-subtitle">
        {isLogging
          ? "select available address"
          : "Already have an account ?"}<Link to="/log-in">login </Link>
      </p>
      <form id="register-form" className="register-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="First Name *"
            className="form-input"
            required
            defaultValue={isLogging ? userData?.firstName : ""}
          />
          <input
            type="text"
            placeholder="Last Name *"
            className="form-input"
            required
            defaultValue={isLogging ? userData?.lastName : ""}
          />
        </div>
        <input
          type="email"
          placeholder="Email Address *"
          className="form-input-full"
          required
          defaultValue={isLogging ? userData?.email : ""}
        />
        <div className="form-row">
          <input
            type="text"
            placeholder="Your Address *"
            className="form-input"
            required
            defaultValue={isLogging ? userData?.address : ""}
          />
          <input
            type="text"
            placeholder="Zip Code *"
            className="form-input"
            required
            defaultValue={isLogging ? userData?.zipCode : ""}
          />
        </div>
        <div className="form-row">
          <select
            className="form-input"
            required
            defaultValue={isLogging ? userData?.country : ""}
          >
            <option value="">Country *</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
          <select
            className="form-input"
            required
            defaultValue={isLogging ? userData?.state : ""}
          >
            <option value="">State *</option>
            <option value="Gujarat">Gujarat</option>
            <option value="California">California</option>
          </select>
          <select
            className="form-input"
            required
            defaultValue={isLogging ? userData?.city : ""}
          >
            <option value="">City *</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Los Angeles">Los Angeles</option>
          </select>
        </div>
        <input
          type="tel"
          placeholder="Phone Number *"
          className="form-input-full"
          required
          defaultValue={isLogging ? userData?.phoneNumber : ""}
        />
        {!isLogging && (
          <div className="password-row">
            <input
              type="password"
              placeholder="Password *"
              className="form-input"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password *"
              className="form-input"
              required
            />
          </div>
        )}
        <button type="submit" className="register-button">
          {isLogging ? "Proceed to Payment" : "Register"}
        </button>
        {!isLogging && (
          <button
            type="button"
            className="back-to-login"
            onClick={handleLoginNavigation}
          >
            ← Back to Login
          </button>
        )}
      </form>
    </div>
  );
};

export default App;

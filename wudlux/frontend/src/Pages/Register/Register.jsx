import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import * as yup from "yup";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

// Validation Schema
const registrationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  address: yup.object().shape({
    street: yup.string().required("Street Address is required"),
    zipCode: yup.string().required("Zip Code is required"),
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
  }),
  phoneNumber: yup.string().required("Phone Number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    // Create structured address object
    const structuredData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: {
        street: data.address, // The "address" input is the street
        zipCode: data.zipCode,
        country: data.country,
        state: data.state,
        city: data.city,
      },
      phoneNumber: data.phoneNumber,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
  
    try {
      // Validate form data
      await registrationSchema.validate(structuredData, { abortEarly: false });
  
      // Dismiss any existing toast messages
      toast.dismiss();
  
      // Send API request
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(structuredData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success("Registration successful");
        navigate("/log-in");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast.dismiss();
      if (error.name === "ValidationError") {
        const firstErrorMessage = error.inner[0]?.message;
        if (firstErrorMessage) {
          toast.error(firstErrorMessage);
        }
      } else {
        toast.error("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleLoginNavigation = () => {
    const form = document.getElementById("register-form");
    form.classList.add("shrink-in");
    setTimeout(() => {
      navigate("/log-in");
    }, 500);
  };

  return (
    <div id="register-container" className="register-container">
      <h2 className="register-title">Register</h2>
      <p className="register-subtitle">
        Your personal data will be used to support your experience throughout this website, to manage access to your account.
      </p>
      <form id="register-form" className="register-form" onSubmit={handleRegister}>
        <div className="form-row">
          <input type="text" name="firstName" placeholder="First Name *" className="form-input" />
          <input type="text" name="lastName" placeholder="Last Name *" className="form-input" />
        </div>
        <input type="email" name="email" placeholder="Email Address *" className="form-input-full" />
        <div className="form-row">
          <input type="text" name="address" placeholder="Street Address *" className="form-input" />
          <input type="text" name="zipCode" placeholder="Zip Code *" className="form-input" />
        </div>
        <div className="form-row">
          <select name="country" className="form-input">
            <option value="">Country *</option>
            {/* <option value="USA">USA</option>
            <option value="Canada">Canada</option> */}
          </select>
          <select name="state" className="form-input">
            <option value="">State *</option>
            {/* <option value="California">California</option>
            <option value="Texas">Texas</option> */}
          </select>
          <select name="city" className="form-input">
            <option value="">City *</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Dallas">Dallas</option>
          </select>
        </div>
        <input type="tel" name="phoneNumber" placeholder="Phone Number *" className="form-input-full" />
        <div className="password-row">
          <input type="password" name="password" placeholder="Password *" className="form-input" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password *" className="form-input" />
        </div>
        <button type="submit" className="register-button" disabled={loading}>
          {loading ? <ClipLoader size={20} color="#fff" /> : "Register"}
        </button>
        <button
          type="button"
          className="back-to-login"
          onClick={handleLoginNavigation}
        >
          ← Back to Login
        </button>
      </form>
    </div>
  );
};

export default Register;

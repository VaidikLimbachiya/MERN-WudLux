import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../api/api";
import "./Register.css";
import * as yup from "yup";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

// Gujarat Cities List
const statesAndCities = {
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh", "Anand", "Nadiad"],
};

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
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
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
  const [selectedCity, setSelectedCity] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const structuredData = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      address: {
        street: data.address.trim(),
        zipCode: data.zipCode.trim(),
        country: "India", // Fixed Country
        state: "Gujarat", // Fixed State
        city: data.city.trim(),
      },
      phoneNumber: data.phoneNumber.trim(),
      password: data.password.trim(),
      confirmPassword: data.confirmPassword.trim(),
    };

    console.log("Structured Data:", structuredData); // Log structured data

    try {
      await registrationSchema.validate(structuredData, { abortEarly: false });
      await apiCall("https://mern-wudlux-1-lss8.onrender.com/api/auth/register", "POST", structuredData);
      toast.success("Registration successful");
      navigate("/log-in");
    } catch (error) {
      if (error.name === "ValidationError") {
        error.inner.forEach((err) => toast.error(err.message));
      } else {
        toast.error(error.message || "Registration failed");
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
        Your personal data will be used to support your experience throughout this website and manage access to your account.
      </p>
      <form id="register-form" className="register-form" onSubmit={handleRegister}>
        <div className="form-row">
          <input type="text" name="firstName" placeholder="First Name *" className="form-input" required />
          <input type="text" name="lastName" placeholder="Last Name *" className="form-input" required />
        </div>
        <input type="email" name="email" placeholder="Email Address *" className="form-input-full" required />
        <div className="form-row">
          <input type="text" name="address" placeholder="Street Address *" className="form-input" required />
          <input type="text" name="zipCode" placeholder="Zip Code *" className="form-input" required />
        </div>
        
        {/* Country & State Dropdowns (Fixed to India & Gujarat) */}
        <div className="form-row">
          <select name="country" className="form-input" required disabled>
            <option value="India">India</option>
          </select>
          <select name="state" className="form-input" required disabled>
            <option value="Gujarat">Gujarat</option>
          </select>

          {/* City Dropdown */}
          <select
            name="city"
            className="form-input"
            required
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select City *</option>
            {statesAndCities.Gujarat.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <input type="tel" name="phoneNumber" placeholder="Phone Number *" className="form-input-full" required />
        <div className="password-row">
          <input type="password" name="password" placeholder="Password *" className="form-input" required />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password *"
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="register-button" disabled={loading}>
          {loading ? <ClipLoader size={20} color="#fff" /> : "Register"}
        </button>
        <button type="button" className="back-to-login" onClick={handleLoginNavigation}>
          ← Back to Login
        </button>
      </form>
    </div>
  );
};

export default Register;

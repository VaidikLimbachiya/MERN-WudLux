import { useState, useEffect,useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext";
import { useUserContext } from "../../Context/UserContext";
import {  toast } from "react-toastify";

import "./Checkout.css";
import logo from "../../assets/logo.png";

const API_BASE_URL = "http://localhost:5000"; // Backend API base URL

const Checkout = () => {
  const { cartItems = [], clearCart } = useCartContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const statesAndCities = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
    Delhi: ["New Delhi"],
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    zipCode: "",
    country: "India",
    state: "",
    city: "",
    phone: "",
    notes: "",
  });

  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addresses, setAddresses] = useState([]);

  // Fetch user addresses from the database
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user || !user.id) return;
      try {
        const response = await axios.get(`${API_BASE_URL}/addresses/${user.id}`);
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [user]);

  // Ensure addresses are always an array
  const userAddresses = Array.isArray(addresses) ? addresses : [];

  // Auto-fill form fields when user logs in
  useEffect(() => {
    if (userAddresses.length > 0) {
      console.log("Populating formData with user addresses:", userAddresses);

      const defaultAddress = userAddresses.find((addr) => addr.isDefault) || userAddresses[0];

      setSelectedAddressId(defaultAddress?._id || "");

      setFormData((prev) => ({
        ...prev,
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        address: defaultAddress?.street || "",
        zipCode: defaultAddress?.zipCode || "",
        country: defaultAddress?.country || "India",
        state: defaultAddress?.state || "",
        city: defaultAddress?.city || "",
        phone: user?.phoneNumber || "",
      }));
    }
  }, [userAddresses]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "state" && { city: "" }), // Reset city when state changes
    }));
  };

  const handleAddressChange = (e) => {
    const selectedId = e.target.value;
    setSelectedAddressId(selectedId);
    const selectedAddress = userAddresses.find((addr) => addr._id === selectedId);

    if (selectedAddress) {
      setFormData((prev) => ({
        ...prev,
        address: selectedAddress.street || "",
        zipCode: selectedAddress.zipCode || "",
        state: selectedAddress.state || "",
        city: selectedAddress.city || "",
        phone: user?.phoneNumber || "",
      }));
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.state || !formData.city || !formData.phone) {
      toast.error("Please complete all required fields.");
      return;
    }
  
    let token = localStorage.getItem("accessToken");
  
    // If user is not logged in and wants to register
    if (!user && formData.registerAccount) {
      if (!formData.password || !formData.confirmPassword) {
        toast.error("Please enter a password and confirm it.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
  
      try {
        const registerPayload = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phone,
          address: {
            street: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
          },
        };
  
        // Call backend API to register the user
        const registerResponse = await axios.post(`${API_BASE_URL}/api/users/register`, registerPayload);
        const { accessToken, user: newUser } = registerResponse.data;
  
        // Save token and update user context
        localStorage.setItem("accessToken", accessToken);
        toast.success("Account registered successfully!");
  
        // Update the user state
        setIsLoggedIn(true);
  
        // Assign user data
        user.id = newUser.id;
        user.firstName = newUser.firstName;
        user.lastName = newUser.lastName;
        user.email = newUser.email;
        user.phoneNumber = newUser.phoneNumber;
  
        // Remove "Register an account" checkbox after successful registration
        setFormData((prev) => ({
          ...prev,
          registerAccount: false,
          password: "",
          confirmPassword: "",
        }));
  
        token = accessToken;
      } catch (error) {
        console.error("Registration Error:", error);
        toast.error("Failed to register. Please try again.");
        return;
      }
    }
  
    if (!token) {
      token = await refreshToken();
      if (!token) {
        toast.error("Authentication required. Please log in.");
        return;
      }
    }
  
    try {
      const orderPayload = {
        userId: user?.id,
        selectedAddressId,
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        notes: formData.notes,
      };
  
      await axios.post(`${API_BASE_URL}/api/orders`, orderPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      toast.success("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };    
  return (
    <div className="checkout-wrapper">
      {/* Left Part - Shipping Form */}
      <div className="form-container">
        <div className="logo-box">
          <Link to="/">
            <img src={logo} alt="Company Logo" className="logo-image" />
          </Link>
        </div>
        <h1 className="form-title">Shipping Information</h1>
  
        {!user && (
          <p className="form-subtitle">
            Already have an account? <Link to={`/log-in?redirect=${location.pathname}`}>Login</Link>
          </p>
        )}
  
        <form onSubmit={handleSubmit}>
          {userAddresses.length > 0 && (
            <div className="input-group">
              <label>Select an Address:</label>
              <select value={selectedAddressId} onChange={handleAddressChange}>
                {userAddresses.map((addr) => (
                  <option key={addr._id} value={addr._id}>
                    {addr.street}, {addr.city}, {addr.state}, {addr.zipCode}
                  </option>
                ))}
              </select>
            </div>
          )}
  
          <div className="input-group">
            <input type="text" name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleInputChange} required />
            <input type="text" name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <input type="text" name="address" placeholder="Your Address *" value={formData.address} onChange={handleInputChange} required />
            <input type="text" name="zipCode" placeholder="Zip Code *" value={formData.zipCode} onChange={handleInputChange} required />
          </div>
          <div className="input-group">
            <input type="text" name="country" value={formData.country} readOnly className="readonly-input" />
            <select name="state" value={formData.state} onChange={handleInputChange} required>
              <option value="">State *</option>
              {Object.keys(statesAndCities).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <select name="city" value={formData.city} onChange={handleInputChange} required disabled={!formData.state}>
              <option value="">City *</option>
              {formData.state && statesAndCities[formData.state]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <input type="text" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleInputChange} required />
          </div>
{!isLoggedIn && (
  <div className="checkbox-group">
    <label>
      <input
        type="checkbox"
        name="registerAccount"
        checked={formData.registerAccount}
        onChange={handleInputChange}
      />
      Register an account with the above information?
    </label>
  </div>
)}
{!isLoggedIn && formData.registerAccount && (
  <div className="input-group">
    <input
      type="password"
      name="password"
      placeholder="Password *"
      value={formData.password}
      onChange={handleInputChange}
      required
    />
    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password *"
      value={formData.confirmPassword}
      onChange={handleInputChange}
      required
    />
  </div>
)}

          <h2>Payment Method:</h2>
          <div className="payment-container">
            <label className="payment-option">
              <span className="payment-label-one">Pay Online</span>
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="Payment with Razorpay"
                checked={formData.paymentMethod === "Payment with Razorpay"}
                onChange={handleInputChange}
              />
              <span className="payment-label">Payment with Razorpay</span>
            </label>
          </div>
          <div className="checkbox-group-one">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-Invoice"
                name="requiresInvoice"
                checked={formData.requiresInvoice}
                onChange={handleInputChange}
              />
              Requires company invoice (Please fill in your company information
              to receive the invoice)?
            </label>
          </div>
          {formData.requiresInvoice && (
            <div>
              <input
                type="text"
                name="companyAddress"
                className="first-class"
                placeholder="Company Address *"
                value={formData.companyAddress}
                onChange={handleInputChange}
                required
              />
              <div className="input-group">
                <input
                  type="text"
                  className="second-class"
                  name="companyName"
                  placeholder="Company Name *"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  className="third-class"
                  name="companyTaxCode"
                  placeholder="Company Tax Code *"
                  value={formData.companyTaxCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input
                type="email"
                className="fourth-class"
                name="companyEmail"
                placeholder="Company Email *"
                value={formData.companyEmail}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <textarea name="notes" placeholder="Notes about your order, e.g., special delivery instructions." value={formData.notes} onChange={handleInputChange} />
          <div className="button-group">
            <button type="button" className="back-button" onClick={() => navigate("/cartPage")}>← Back to Cart</button>
            <button type="submit" className="submit-button">Checkout →</button>
          </div>
        </form>
        
      </div>
      {/* Right part */}
      <div className="summary-container">
        <h2>Products</h2>
        <div className="product-list">
        {cartItems.length > 0 ? (
  cartItems.map((item, index) => (
    <div key={item.id || index} className="product-box">
      <img
        crossOrigin="anonymous"
        src={item.images ? `http://localhost:5000/uploads/${item.images}` : "placeholder.png"}
        alt={item.title || "Product Image"}
        className="product-thumbnail"
      />
      <div className="product-info">
        <div className="product-title">
          <span className="quantity-badge">{item.quantity}</span>
          <p className="name">{item.title || "Unknown Product"}</p>
        </div>
        <div className="product-cost">
          ₹{item.price ? item.price.toFixed(2) : "0.00"} {/* ✅ Prevents crash */}
        </div>
      </div>
    </div>
  ))
) : (
  <p>No items in the cart.</p>
)}
</div>

        
        <div className="summary-totals">
          <div className="price-item">
            <span>Total Amount:</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="price-item">
            <span>Total CGST:</span>
            <span>₹{(totalPrice * 0.09).toFixed(2)}</span>
          </div>
          <div className="price-item">
            <span>Total SGST:</span>
            <span>₹{(totalPrice * 0.09).toFixed(2)}</span>
          </div>
          <div className="price-item">
            <span>Coupon Discount:</span>
            <span className="discount-product">-₹99.00</span>
          </div>
          <hr />
          <h3 className="price-item">
            <span>Amount Payable:</span>
            <span>₹{(totalPrice + totalPrice * 0.18 - 99).toFixed(2)}</span>
          </h3>
        </div>
      </div>
    </div>
  );   
};

export default Checkout;

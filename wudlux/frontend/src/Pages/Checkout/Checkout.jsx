import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext"; // Import the cart context
import "./Checkout.css";
import logo from "../../assets/logo.png"; // Import the logo image

const Checkout = () => {
  const { cartItems, totalPrice } = useCartContext(); // Get cart items and total price from context
  const navigate = useNavigate(); // For navigation

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
    country: "India", // Default and unchangeable country
    state: "",
    city: "",
    phone: "",
    notes: "",
    registerAccount: false, // For "Register Account" checkbox
    requiresInvoice: false, // For "Requires Company Invoice" checkbox
    password: "",
    confirmPassword: "",
    companyAddress: "",
    companyName: "",
    companyTaxCode: "",
    companyEmail: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (name === "state") {
      setFormData((prev) => ({ ...prev, city: "" })); // Reset city when state changes
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (

    

    <div className="checkout-container">
        {/* left part */}
      <div className="checkout-form">
        <div className="logo-wrapper">
          <img src={logo} alt="Company Logo" className="checkout-logo" />
        </div>
        <h1 className="Title">Shipping Information</h1>
        <p className="subTitle">
          Already have an account? <a href="/login">Login</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name *"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name *"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="address"
              placeholder="Your Address *"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code *"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            {/* Disabled Country Field */}
            <input
              type="text"
              name="country"
              value={formData.country}
              readOnly
              className="readonly-field"
            />
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
            >
              <option value="">State *</option>
              {Object.keys(statesAndCities).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              disabled={!formData.state}
            >
              <option value="">City *</option>
              {formData.state &&
                statesAndCities[formData.state].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group ">
            <label className="registerAccountLabel">
              <input
              className="registerAccount"
                type="checkbox"
                name="registerAccount"
                checked={formData.registerAccount}
                onChange={handleInputChange}
              />
              Register an account with above information?
            </label>
          </div>
          {formData.registerAccount && (
            <div className="form-group">
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
          <div className="payment-method-container">
            <label className="payment-method-option">
              <span className="payment-method-label1">Pay Online</span>
            </label>
            <label className="payment-method-option">
              <input
                type="radio"
                name="paymentMethod"
                value="Payment with Razorpay"
                checked={formData.paymentMethod === "Payment with Razorpay"}
                onChange={handleInputChange}
              />
              <span className="payment-method-label">
                Payment with Razorpay
              </span>
            </label>
          </div>

          <textarea
            name="notes"
            placeholder="Notes about your order, e.g. special notes for delivery."
            value={formData.notes}
            onChange={handleInputChange}
          />
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="requiresInvoice"
                checked={formData.requiresInvoice}
                onChange={handleInputChange}
              />
              Requires company invoice (Please fill in your company information
              to receive the invoice)?
            </label>
          </div>
          {formData.requiresInvoice && (
            <div className="form-group">
              <input
                type="text"
                name="companyAddress"
                placeholder="Company Address *"
                value={formData.companyAddress}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="companyName"
                placeholder="Company Name *"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="companyTaxCode"
                placeholder="Company Tax Code *"
                value={formData.companyTaxCode}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="companyEmail"
                placeholder="Company Email *"
                value={formData.companyEmail}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="form-buttons">
            <button
              type="button"
              className="back-to-cart-button"
              onClick={() => navigate("/cart")} // Navigate back to the cart page
            >
              ← Back to Cart
            </button>
            <button type="submit" className="checkout-button">
              Checkout →
            </button>
          </div>
        </form>
      </div>

      {/* //product right part */}
      <div className="checkout-summary">
        <h2>Products</h2>
        <div className="product-list">
          {cartItems.map((item) => (
            <div key={item.id} className="product-item">
              <img src={item.image} alt={item.name} className="product-image" />
              <div className="product-details">
                <div className="product-name">
                  <span className="product-quantity">{item.quantity}</span>{" "}
                  {item.name}
                </div>
                <div className="product-price">₹{item.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
        <h2>Shipping Method:</h2>
        <button className="shipping-method-button">
          Free Delivery – Free Shipping
        </button>
        <h3>Order Summary</h3>
        <p>Total Amount: ₹{totalPrice.toFixed(2)}</p>
        <p>Total CGST: ₹{(totalPrice * 0.09).toFixed(2)}</p>
        <p>Total SGST: ₹{(totalPrice * 0.09).toFixed(2)}</p>
        <p>Coupon Discount: -₹99.00</p>
        <h3>
          Amount Payable: ₹{(totalPrice + totalPrice * 0.18 - 99).toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default Checkout;

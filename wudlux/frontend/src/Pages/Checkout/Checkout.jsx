import  { useState } from "react";
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
    <div className="checkout-wrapper">
      {/* left part */}
      <div className="form-container">
        <div className="logo-box">
          <img src={logo} alt="Company Logo" className="logo-image" />
        </div>
        <h1 className="form-title">Shipping Information</h1>
        <p className="form-subtitle">
          Already have an account? <a href="/login">Login</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
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
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
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
          <div className="input-group">
            {/* Disabled Country Field */}
            <input
              type="text"
              name="country"
              value={formData.country}
              readOnly
              className="readonly-input"
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
          <div className="input-group">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name="registerAccount"
                checked={formData.registerAccount}
                onChange={handleInputChange}
              />
              Register an account with above information?
            </label>
          </div>
          {formData.registerAccount && (
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
              <span className="payment-label">Pay Online</span>
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

          <textarea
            name="notes"
            placeholder="Notes about your order, e.g. special notes for delivery."
            value={formData.notes}
            onChange={handleInputChange}
          />
          <div className="checkbox-group-one">
            <label className="checkbox-label">
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
          <div className="button-group">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/cart")} // Navigate back to the cart page
            >
              ← Back to Cart
            </button>
            <button type="submit" className="submit-button">
              Checkout →
            </button>
          </div>
        </form>
      </div>

      {/* product right part */}
      <div className="summary-container">
        <h2>Products</h2>
        <div className="product-list">
          {cartItems.map((item) => (
            <div key={item.id} className="product-box">
              <img
                src={item.image}
                alt={item.name}
                className="product-thumbnail"
              />
              <div className="product-info">
                <div className="product-title">
                  <span className="quantity-badge">{item.quantity}</span>{" "}
                  {item.name}
                </div>
                <div className="product-cost">₹{item.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
        <h2>Shipping Method:</h2>
        <button className="shipping-button">
          Free Delivery – <strong> Free Shipping</strong>
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

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext"; // Import the cart context
import { useUserContext } from "../../Context/UserContext"; // Import the user context
import "./Checkout.css";
import logo from "../../assets/logo.png"; // Import the logo image

const Checkout = () => {
  const { cartItems = [], totalPrice = 0 } = useCartContext(); // Default values for cart context
  const { user } = useUserContext(); // Default values for user context
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

  // Auto-fill form fields when the user is logged in
  useEffect(() => {
    if (user) {
      console.log("Populating formData with user data:", user); // Debugging
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        address: user.address || "",
        zipCode: user.zipCode || "",
        state: user.state || "",
        city: user.city || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

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

  if (!Array.isArray(cartItems)) {
    return <p>Error: Cart items not available. Please try again later.</p>;
  }

  return (
    <div className="checkout-wrapper">
      {/* Left part */}
      <div className="form-container">
        <div className="logo-box">
          <Link to="/">
            <img src={logo} alt="Company Logo" className="logo-image" />
          </Link>
        </div>
        <h1 className="form-title">Shipping Information</h1>

        {!user && (
          <p className="form-subtitle">
            Already have an account? <Link to="/log-in">Login</Link>
          </p>
        )}

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
          <textarea
            name="notes"
            placeholder="Notes about your order, e.g. special notes for delivery."
            value={formData.notes}
            onChange={handleInputChange}
          />
          <div className="button-group">
            <button
              type="button"
              className="back-button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
                navigate("/"); 
              }}
            >
              ← Back to Cart
            </button>
            <button type="submit" className="submit-button">
              Checkout →
            </button>
          </div>
        </form>
      </div>

      {/* Right part */}
      <div className="summary-container">
        <h2>Products</h2>
        <div className="product-list">
          {cartItems.length > 0 ? (
            cartItems.map((item ,index) => (
              <div key={item.id || index} className="product-box">
                <img
                  crossOrigin="anonymous"
                  src= {`http://localhost:5000/uploads/${item.images}`}
                  alt={item.title}
                  className="product-thumbnail"
                />
                <div className="product-info">
                  <div className="product-title">
                    <span className="quantity-badge">{item.quantity}</span>
                    <p className="name">{item.title}</p>
                  </div>
                  <div className="product-cost">₹{item.price.toFixed(2)}</div>
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

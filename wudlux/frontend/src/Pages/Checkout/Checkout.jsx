import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import "./Checkout.css";
import logo from "../../assets/logo.svg";
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";

const API_BASE_URL = "https://mern-wudlux-1-lss8.onrender.com"; // Backend API base URL

const Checkout = () => {
  const { cartItems = [], clearCart } = useCartContext();
  const { user } = useContext(AuthContext); // Get logged-in user
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
    phone: "",
    address: "",
    zipCode: "",
    country: "India",
    state: "",
    city: "",
    notes: "",
  });

  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [addresses, setAddresses] = useState([]);

  // Fetch user addresses from the database
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user?.id) return;
      try {
        const response = await axios.get(`${API_BASE_URL}/addresses/${user.id}`);
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [user?.id]);
  useEffect(() => {
    if (!user) {
      console.log("User is not logged in. Redirecting to login page...");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        zipCode: "",
        country: "India",
        state: "",
        city: "",
        notes: "",
      });
  
      setAddresses([]); // Clear stored addresses
      setSelectedAddressId(""); // Reset selected address
  
      navigate("/log-in"); // Redirect to login page
    }
  }, [user, navigate]);  
  useEffect(() => {
    const handleUserLogout = () => {
      console.log("User logged out. Resetting checkout form...");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        zipCode: "",
        country: "India",
        state: "",
        city: "",
        notes: "",
      });
  
      setAddresses([]); // Clear stored addresses
      setSelectedAddressId(""); // Reset selected address
    };
  
    window.addEventListener("userLoggedOut", handleUserLogout);
  
    return () => {
      window.removeEventListener("userLoggedOut", handleUserLogout);
    };
  }, []);
  

  // Ensure addresses are always an array
  const userAddresses = Array.isArray(addresses) ? addresses : [];

  // Auto-fill form fields when user logs in
  useEffect(() => {
    if (!userAddresses.length) return;

    const defaultAddress = userAddresses.find((addr) => addr.isDefault) || userAddresses[0];

    setSelectedAddressId(defaultAddress?._id || "");
    setFormData((prev) => ({
      ...prev,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phoneNumber || "",
      address: defaultAddress?.street || "",
      zipCode: defaultAddress?.zipCode || "",
      country: defaultAddress?.country || "India",
      state: defaultAddress?.state || "",
      city: defaultAddress?.city || "",
    }));
  }, [userAddresses, user?.id]);

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

      const response = await axios.post(`${API_BASE_URL}/api/users/refresh-token`, {
        refreshToken: storedRefreshToken,
      });

      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      toast.success("Session refreshed successfully!");

      return accessToken;
    } catch (error) {
      console.error("Token refresh error:", error);
      toast.error("Session expired. Please log in again.");
      localStorage.clear();
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
        totalAmount: totalPrice,
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
      navigate("/orders");
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
            <img src={logo} alt="Company Logo" className="logo-image" loading="lazy" />
          </Link>
        </div>
        <h1 className="form-title">Shipping Information</h1>

        {!user && (
          <p className="form-subtitle">
            Already have an account?{" "}
            <Link to={`/log-in?redirect=${location.pathname}`}>Login</Link>
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
                statesAndCities[formData.state]?.map((city) => (
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
          <textarea
            name="notes"
            placeholder="Notes about your order, e.g., special delivery instructions."
            value={formData.notes}
            onChange={handleInputChange}
          />
          <div className="button-group">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/cartPage")}
            >
              < BsArrowLeft className="rightarr"/> Back to Cart
            </button>
            <button type="submit" className="submit-button">
              Checkout <BsArrowRight className="rightarr" />
            </button>
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
  src={
    item.images?.[0]?.url
      ? item.images[0].url
      : "https://via.placeholder.com/150"
  }
  alt={item.title || "Product Image"}
  className="product-thumbnail"
  loading="lazy"
/>

                <div className="product-info">
                  <div className="product-title">
                    <span className="quantity-badge">{item.quantity}</span>
                    <p className="name">{item.title || "Unknown Product"}</p>
                  </div>
                  <div className="product-cost">
                    ₹{item.price ? item.price.toFixed(2) : "0.00"}{" "}
                    {/* Prevents crash */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
        </div>

        <div className="summary-totals">
        <h2 className="shipping-method">Shipping Method:</h2>
        <button className="shipping-button">
          Free Delivery – <strong> Free Shipping</strong>
        </button>
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
          
          <h3 className="price-item1">
            <span >Amount Payable:</span>
            <span>₹{(totalPrice + totalPrice * 0.18 - 99).toFixed(2)}</span>
          </h3>
        </div>
      </div>
    </div>
  );   
};

export default Checkout;

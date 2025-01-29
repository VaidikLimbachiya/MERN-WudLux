import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../Context/CartContext";
import { useUserContext } from "../../Context/UserContext";
import "./Checkout.css";
import logo from "../../assets/logo.png";

const API_BASE_URL = "http://localhost:5000"; // Backend API base URL

const Checkout = () => {
  const { cartItems = [] } = useCartContext();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.state || !formData.city || !formData.phone) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/checkout`, {
        userId: user?.id,
        selectedAddressId,
        cartItems,
        totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        formData,
      });

      console.log("Checkout Success:", response.data);
      alert("Checkout Successful!");
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again.");
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
          <textarea name="notes" placeholder="Notes about your order, e.g., special delivery instructions." value={formData.notes} onChange={handleInputChange} />
          <div className="button-group">
            <button type="button" className="back-button" onClick={() => navigate("/cartPage")}>← Back to Cart</button>
            <button type="submit" className="submit-button">Checkout →</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/vector.png";
import profileIcon from "../../assets/profile.png";
import cartIcon from "../../assets/bag.png";
import { useCartContext } from "../../Context/CartContext";

const categories = [
  {
    text: "Serveware",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a1cfa473b4c3091f113c79eb7155d25fb5458b102ed1a68b6ce2308227f94925",
    dropdownItems: [
      { text: "Tray", link: "/Serveware/ServingTray" },
      { text: "Platter", link: "/ServeWare/withDrawer" },
      { text: "Bowl", link: "/Serveware/BeerCaddy" },
      // { text: "Serving Platter", link: "/Serveware/ServingPlatter" },
      // { text: "Wine Serving Tray", link: "/Serveware/WineServingTray" },
    ],
  },
  {
    text: "Kitchenware",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/93802c32367c70d0f1cbcf887c7e26e1d4f770ebf8473953950cd1af3bf76896",
    dropdownItems: [
      { text: "Chopping Board", link: "/Kitchenware/ChoppingBoard" },
      { text: "Tissue Holder", link: "/Kitchenware/Tissue Holder" },
    ],
  },
  {
    text: "Tableware",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c9ea7504e7b254d854b06a79b48cf39d39e2ab6c6f3afb37338801a7c60027f8",
    dropdownItems: [
      { text: "Fruit Bowl", link: "/Tableware/FruitBowl" },
      { text: "Cutlery Caddy", link: "/Tableware/CutleryCaddy" },
      { text: "Lazy Susan", link: "/Tableware/LazySusan"},
    ],
  },
  {
    text: "Collections",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3a93a25a709f4fb428d7f57f554a75f6dae8c2c4a680b05c19026a7d150d8a2f",
    dropdownItems: [{ text: "Bella", link: "/Collections/Bella" }],
  },
];


const Navbar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // Profile menu state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [productToRemove, setProductToRemove] = useState(null); // Product to remove
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state
  const [isSliderOpen] = useState(false); // Fix initial state of slider to false

  const {
    cartItems,
    totalQuantity,
    totalPrice,
    updateQuantity,
    removeItem,
    totalProducts,
  } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token); // Set login state based on token existence
  }, []);

  const handleProfileIconClick = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true); // Ensure login state is updated
      setIsProfileMenuOpen((prev) => !prev); // Toggle the profile menu
    } else {
      navigate("/log-in"); // Redirect to login page
    }
  };

  const handleCategoryClick = async (categoryText, subCategoryText = "") => {
    if (subCategoryText) {
      // If a subcategory is clicked, fetch products for that subcategory
      try {
        const products = await fetchProductsByCategory(categoryText, subCategoryText);
        console.log("Fetched products:", products); // Debug: View fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
  
      // Navigate with both category and subcategory query parameters
      const queryParams = `category=${categoryText}&subcategory=${subCategoryText}`;
      navigate(`/products?${queryParams}`);
    } else {
      // Handle only category click (e.g., open/close the dropdown)
      setActiveCategory(activeCategory === categoryText ? null : categoryText);
    }
  };
  
  
  
  
  
  

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const openPopup = (product) => {
    setProductToRemove(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setProductToRemove(null);
    setIsPopupOpen(false);
  };

  const confirmRemove = () => {
    if (productToRemove) {
      removeItem(productToRemove._id); // Use `_id` instead of `id`
    }
    closePopup();
  };

  const handleLogout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Update login state
    setIsLoggedIn(false);
    setIsProfileMenuOpen(false); // Close the profile menu

    // Redirect to login page
    navigate("/log-in");
  };

  const handleNavigate = (path) => {
    setIsCartOpen(false); // Close cart when navigating
    setIsSearchOpen(false); // Close search slider when navigating
    navigate(path); // Navigate to the desired path
  };
  const fetchProductsByCategory = async (categoryText, subCategoryText) => {
    // Make an API call with category and subcategory as query parameters
    const response = await fetch(`/api/products?category=${categoryText}&subcategory=${subCategoryText}`);
    const data = await response.json();
    return data;
  };
  

  return (
    <>
      <nav className="navigation" role="navigation">
        <div className="header">
          <div className="logoSection" onClick={() => navigate("/")}>
            <img
              src={logo}
              alt="Company Logo"
              className="logo"
              loading="lazy"
            />
          </div>
          <div className="navCategories">
  {categories.map((category) => (
    <div
      key={category.text} // Use a unique property for the key
      className={`categoryWrapper ${activeCategory === category.text ? "active" : ""}`}
    >
      <div
        onClick={() => handleCategoryClick(category.text)}
        role="button"
        tabIndex={0}
        aria-expanded={activeCategory === category.text}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleCategoryClick(category.text);
          }
        }}
        className="categoryButton"
      >
        <span className="categoryText">{category.text}</span>
        <img
          src={category.iconSrc}
          alt={`${category.text} Icon`}
          className="dropdownIcon"
        />
      </div>
      {activeCategory === category.text && (
        <div className="dropdownMenu">
         {category.dropdownItems.map((item) => (
  <NavLink
    key={item.link}
    to={item.link}
    className="dropdownItem"
    onClick={() => handleCategoryClick(category.text, item.text)} // Fetch products when clicking on a subcategory
  >
    {item.text}
  </NavLink>
))}


        </div>
      )}
    </div>
  ))}
</div>

          <div className="promotionBanner">
            <span className="promoText">Summer sale - 50% OFF!</span>
            <button
              className="promoButton"
              onClick={() => navigate("/products")}
              aria-label="Shop Now - Summer Sale 50% OFF"
            >
              Shop Now
            </button>
          </div>
          <div className="userActions">
            <img
              src={searchIcon}
              alt="Search"
              className="actionIcon"
              onClick={toggleSearch}
            />
            <div className="divider"></div>
            <div className="profileIconWrapper">
              <img
                src={profileIcon}
                alt="User Account"
                className="actionIcon"
                onClick={handleProfileIconClick}
              />
              {isProfileMenuOpen && isLoggedIn && (
                <div className="profileMenu">
                  <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                      isActive ? "profileMenuItem active" : "profileMenuItem"
                    }
                    onClick={() => setIsProfileMenuOpen(false)} // Close menu on navigation
                  >
                    Order History
                  </NavLink>
                  <NavLink
                    to="/address"
                    className={({ isActive }) =>
                      isActive ? "profileMenuItem active" : "profileMenuItem"
                    }
                    onClick={() => setIsProfileMenuOpen(false)} // Close menu on navigation
                  >
                    Addresses
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="profileMenuItem logoutButton"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <div className="divider"></div>
            <div className="cartIcon" onClick={toggleCart}>
              <img src={cartIcon} alt="Shopping Cart" className="cartImage" />
              <span className="cartBadge">{totalQuantity}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Slider */}
      <div className={`cartSlider ${isCartOpen ? "open" : ""}`}>
        <div className="cartHeader">
          <h3>Shopping Cart</h3>
          <button className="closeButton" onClick={toggleCart}>
            ✖
          </button>
        </div>
        <div className="cartItems">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id} className="cartItem">
                <img
                  crossOrigin="anonymous"
                  src={`http://localhost:5000/uploads/${item.images}`}
                  alt={item.name}
                  className="cartItemImage"
                />
                <div className="cartItemDetails">
                  <p className="cartItemName">{item.title}</p>
                  <p className="cartItemPrice">₹{item.price.toFixed(2)}</p>
                </div>
                <div className="cartQuantity">
                  <button
                    className="cart-quantity-decrement1"
                    onClick={() => updateQuantity(item._id, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="cart-quantity-increment1"
                    onClick={() => updateQuantity(item._id, 1)}
                  >
                    +
                  </button>
                </div>
                <button className="removeButton" onClick={() => openPopup(item)}>
                  ✖
                </button>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className={`cartFooter ${isSliderOpen ? "open" : "closed"}`}>
          <div className="cartSummary">
            <span>{totalProducts} Product</span>
            <span>₹{totalPrice}.00</span>
          </div>
          <div className="cartActions">
            <button
              className="checkoutButton"
              onClick={() => handleNavigate("/Checkout")}
            >
              Checkout →
            </button>
            <button
              className="goToCartButton"
              onClick={() => handleNavigate("/CartPage")}
            >
              Go to Cart →
            </button>
          </div>
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="popupOverlay">
          <div className="popupContent">
            <h3>Remove from Cart</h3>
            <hr className="row-divider" />
            <p>Are you sure you want to remove this product?</p>
            <div className="popupActions">
              <button className="confirmButton" onClick={confirmRemove}>
                <span>🗑</span> Yes, Delete
              </button>
              <button className="cancelButton" onClick={closePopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Drawer */}
      <div className={`searchDrawer ${isSearchOpen ? "open" : ""}`}>
        <div className="searchHeader">
          <h3>Search by Category...</h3>
          <button className="closeButton" onClick={toggleSearch}>
            ✖
          </button>
        </div>
        <ul className="searchCategories">
          <li>Tray</li>
          <li>Platter</li>
          <li>Chopping Board</li>
          <li>Cheese Board</li>
          <li>Chip & Dip</li>
          <li>Bowls</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;

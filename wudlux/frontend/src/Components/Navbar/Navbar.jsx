import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.svg";
import searchIcon from "../../assets/Vector.png";
import profileIcon from "../../assets/Vector.svg";
import cartIcon from "../../assets/bag.png";
import { useCartContext } from "../../Context/CartContext";
// import { IoMenu } from "react-icons/io5";
import menuBar from "../../assets/Hamburger.png";

const categories = [
  {
    text: "Serveware",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a1cfa473b4c3091f113c79eb7155d25fb5458b102ed1a68b6ce2308227f94925",
    dropdownItems: [
      { text: "Tray", link: "/" },
      { text: "Platter", link: "/" },
      { text: "Bowl", link: "/" },
      // { text: "Serving Platter", link: "/Serveware/ServingPlatter" },
      // { text: "Wine Serving Tray", link: "/Serveware/WineServingTray" },
    ],
  },
  {
    text: "Kitchenware",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/93802c32367c70d0f1cbcf887c7e26e1d4f770ebf8473953950cd1af3bf76896",
    dropdownItems: [
      { text: "Chopping Board", link: "/" },
      { text: "Tissue Holder", link: "/" },
    ],
  },
  {
    text: "Tableware",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c9ea7504e7b254d854b06a79b48cf39d39e2ab6c6f3afb37338801a7c60027f8",
    dropdownItems: [
      { text: "Fruit Bowl", link: "/" },
      { text: "Cutlery Caddy", link: "/" },
      { text: "Lazy Susan", link: "/" },
    ],
  },
  {
    text: "Collections",
    iconSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3a93a25a709f4fb428d7f57f554a75f6dae8c2c4a680b05c19026a7d150d8a2f",
    dropdownItems: [{ text: "Bella", link: "/" }],
  },
];

const Navbar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // Profile menu state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [productToRemove, setProductToRemove] = useState(null); // Product to remove
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state
  // const [isSliderOpen] = useState(false); // Fix initial state of slider to false
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const categoriesList = [
    "Tray",
    "Platter",
    "Chopping Board",
    "Cheese Board",
    "Chip & Dip",
    "Bowls",
  ];

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCategories(categoriesList); // Show all when empty
    } else {
      setFilteredCategories(
        categoriesList.filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery]);

  const handleSearch = (category) => {
    console.log("Searching for:", category);
    navigate(`/products?search=${category}`);
    setIsSearchOpen(false); // Close search popup after selection
  };

  const {
    cartItems,
    totalQuantity,
    totalPrice,
    totalProducts,
    updateQuantity,
    removeItem,
  } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token); // Update login state based on token

    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    checkScreenWidth(); // Check on component mount
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth); // Cleanup listener
    };
  }, []);
  useEffect(() => {
    if (isCartOpen || isSearchOpen) {
      document.body.classList.add("no-scroll"); // Add class to disable scrolling
    } else {
      document.body.classList.remove("no-scroll"); // Remove class to re-enable scrolling
    }

    return () => {
      document.body.classList.remove("no-scroll"); // Cleanup on unmount
    };
  }, [isCartOpen, isSearchOpen]);

  const handleProfileIconClick = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true); // Ensure login state is updated
      setIsProfileMenuOpen((prev) => !prev); // Toggle the profile menu
    } else {
      navigate("/log-in"); // Redirect to login page
    }
    setIsMenuOpen(false); // Close the menu when profile icon is clicked
  };

  const handleCategoryClick = async (categoryText, subCategoryText = "") => {
    if (subCategoryText) {
      // If a subcategory is clicked, fetch products for that subcategory
      try {
        const products = await fetchProductsByCategory(
          categoryText,
          subCategoryText
        );
        console.log("Fetched products:", products); // Debug: View fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }

      // Navigate with both category and subcategory query parameters
      const queryParams = `category=${categoryText}&subcategory=${subCategoryText}`;
      navigate(`/products?${queryParams}`);
      setIsMenuOpen(false);
    } else {
      // Handle only category click (e.g., open/close the dropdown)
      setActiveCategory(activeCategory === categoryText ? null : categoryText);
    }
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  const openPopup = (product) => {
    console.log("Product passed to openPopup:", product);
    setProductToRemove(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setProductToRemove(null);
    setIsPopupOpen(false);
  };

  const confirmRemove = () => {
    if (productToRemove && productToRemove.productId) {
      console.log("Removing Product ID:", productToRemove.productId);
      removeItem(productToRemove.productId);
    } else {
      console.error("Invalid productToRemove:", productToRemove);
    }
    closePopup();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Only toggles the menu
    setIsSearchOpen(false); // Ensure search is closed when opening menu
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
    const response = await fetch(
      `/api/products?category=${categoryText}&subcategory=${subCategoryText}`
    );
    const data = await response.json();
    return data;
  };
  useEffect(() => {
    const handleCartUpdate = () => {
      console.log("Cart update detected in Navbar. Re-rendering...");
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="navigation" role="navigation">
        {isMobile ? (
          <div className="mobileNavbar">
            {/* Menu Icon */}
            <div className="navbar__menuIcon" onClick={toggleMenu}>
              <img src={menuBar} alt="Menu" loading="lazy" />
            </div>

            {/* Menu Drawer */}
            <div className={`menuDrawer ${isMenuOpen ? "open" : ""}`}>
              <div className="menuDrawerHeader">
                <h3>Menu</h3>
                <button
                  className="menuDrawerCloseButton"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ✖
                </button>
              </div>
              <div className="navigationCategories">
                {categories.map((category) => (
                  <div
                    key={category.text} // Use a unique property for the key
                    className={`categoryContainer ${
                      activeCategory === category.text ? "selectedCategory" : ""
                    }`}
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
                      className="categoryTrigger"
                    >
                      <span className="categoryLabel">{category.text}</span>
                      <img
                        src={category.iconSrc}
                        alt={`${category.text} Icon`}
                        className="categoryIcon"
                        loading="lazy"
                      />
                    </div>
                    {activeCategory === category.text && (
                      <div className="categoryDropdown">
                        {category.dropdownItems.map((item) => (
                          <NavLink
                            key={item.link}
                            to={item.link}
                            className="dropdownOption"
                            onClick={() =>
                              handleCategoryClick(category.text, item.text)
                            } // Fetch products when clicking on a subcategory
                          >
                            {item.text}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="userAccountSection">
                  {isLoggedIn ? (
                    // If user is logged in, show account dropdown
                    <div className="userInfo">
                      <div
                        className="accountDropdownTrigger"
                        onClick={() =>
                          setIsAccountDropdownOpen(!isAccountDropdownOpen)
                        }
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setIsAccountDropdownOpen(!isAccountDropdownOpen);
                          }
                        }}
                      >
                        <span className="userName">Account</span>
                        <span
                          className={`dropdownIcon ${
                            isAccountDropdownOpen ? "open" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </div>

                      {isAccountDropdownOpen && (
                        <div className="accountDropdown">
                          <NavLink to="/orders" className="dropdownOption">
                            Orders
                          </NavLink>
                          <NavLink to="/address" className="dropdownOption">
                            Address
                          </NavLink>
                          <button
                            className="logoutButton"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    // If user is not logged in, show login link
                    <div className="userInfo">
                      <NavLink to="/log-in" className="accountLink">
                        View Account
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search Icon */}

            {/* Logo */}
            <div className="navbar__logo" onClick={() => navigate("/")}>
              <img src={logo} alt="Logo" loading="lazy" />
            </div>

            <div className="navbar__searchIcon">
              <img
                src={searchIcon}
                alt="Search"
                onClick={toggleSearch}
                loading="lazy"
              />
            </div>

            {/* Cart Icon */}
            <div className="navbar__cartIcon" onClick={toggleCart}>
              <img src={cartIcon} alt="Cart" loading="lazy" />
              <span className="navbar__cartBadge">{totalQuantity}</span>
            </div>
          </div>
        ) : (
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
                  className={`categoryWrapper ${
                    activeCategory === category.text ? "active" : ""
                  }`}
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
                      loading="lazy"
                    />
                  </div>
                  {activeCategory === category.text && (
                    <div className="dropdownMenu">
                      {category.dropdownItems.map((item) => (
                        <NavLink
                          key={item.link}
                          to={item.link}
                          className="dropdownItem"
                          onClick={() =>
                            handleCategoryClick(category.text, item.text)
                          } // Fetch products when clicking on a subcategory
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
                loading="lazy"
              />
              <div className="divider"></div>
              <div className="profileIconWrapper">
                <img
                  src={profileIcon}
                  alt="User Account"
                  className="actionIcon"
                  onClick={handleProfileIconClick}
                  loading="lazy"
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
                <img
                  src={cartIcon}
                  alt="Shopping Cart"
                  className="cartImage"
                  loading="lazy"
                />
                <span className="cartBadge">{totalQuantity}</span>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Cart Slider */}
      {isCartOpen && (
        <div className={isMobile ? "cartPopup" : "cartSlider open"}>
          <div className="cartHeader">
            <h3>Shopping Cart</h3>
            <button className="closeButton" onClick={toggleCart}>
              ✖
            </button>
          </div>
          <div className="cartItems">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div
                  key={`${item.productId}-${index}`} // Ensures unique key by combining productId and index
                  className="cartItem"
                >
                  <img
                    crossOrigin="anonymous"
                    loading="lazy"
                    src={
                      item.images
                        ? `http://localhost:5000/uploads/${item.images}`
                        : "path/to/placeholder-image.png"
                    }
                    alt={item.title || "Product Image"}
                    className="cartItemImage"
                  />
                  <div className="cartItemDetails">
                    <p className="cartItemName">
                      {item.title || "Unnamed Product"}
                    </p>
                    <p className="cartItemPrice">
                      ₹
                      {typeof item.price === "number"
                        ? item.price.toFixed(2)
                        : "0.00"}
                    </p>
                  </div>
                  <div className="cartQuantity">
                    <button
                      className="cart-quantity-decrement1"
                      onClick={() => updateQuantity(item.productId, -1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="cart-quantity-increment1"
                      onClick={() => updateQuantity(item.productId, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="removeButton"
                    onClick={() => openPopup(item)}
                  >
                    ✖
                  </button>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>

          {/* Cart Footer */}
          <div className="cartFooter">
            <div className="cartSummary">
              <span>{totalProducts} Product(s)</span>
              <span>Total: ₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="cartActions">
              <button
                className="checkoutButton"
                onClick={() => handleNavigate("/checkout")}
                disabled={cartItems.length === 0} // Disable if cart is empty
              >
                Checkout →
              </button>
              <button
                className="goToCartButton"
                onClick={() => handleNavigate("/CartPage")}
                disabled={cartItems.length === 0} // Disable if cart is empty
              >
                Go to Cart →
              </button>
            </div>
          </div>
        </div>
      )}

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
      {isSearchOpen && (
        <div className={isMobile ? "searchPopup" : "searchDrawer open"}>
          <div className="searchHeader">
            <input
              type="text"
              placeholder="Search by Category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="searchHeading"
            />
            <button className="closeButton" onClick={toggleSearch}>
              ✖
            </button>
          </div>

          {/* Filtered Search Categories */}
          <ul className="searchCategories">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <li key={index} onClick={() => handleSearch(category)}>
                  {category}
                </li>
              ))
            ) : (
              <li className="no-results">No results found</li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
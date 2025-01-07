import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/vector.png";
import profileIcon from "../../assets/profile.png";
import cartIcon from "../../assets/bag.png";
// import bowl from "../../assets/bowl.png";
import { useCartContext } from "../../Context/CartContext";

const categories = [
  {
    text: "Serveware",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a1cfa473b4c3091f113c79eb7155d25fb5458b102ed1a68b6ce2308227f94925",
    dropdownItems: [
      { text: "Serving Tray", link: "/Serveware/ServingTray" },
      { text: "Serving Tray with Drawer", link: "/ServeWare/withDrawer" },
      { text: "Beer Caddy", link: "/Serveware/BeerCaddy" },
      { text: "Serving Platter", link: "/Serveware/ServingPlatter" },
      { text: "Wine Serving Tray", link: "/Serveware/WineServingTray" },
    ],
  },
  {
    text: "Kitchenware",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/93802c32367c70d0f1cbcf887c7e26e1d4f770ebf8473953950cd1af3bf76896",
    dropdownItems: [
      { text: "Chopping Board", link: "/Kitchenware/ChoppingBoard" },
      { text: "Butcher Board", link: "/Kitchenware/ButcherBoard" },
    ],
  },
  {
    text: "Tableware",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c9ea7504e7b254d854b06a79b48cf39d39e2ab6c6f3afb37338801a7c60027f8",
    dropdownItems: [
      { text: "Lazy Susan", link: "/Tableware/Lazysusan" },
      { text: "Coffee Pods Drawer", link: "/Tableware/CoffeePods" },
      { text: "Cutlery Caddy", link: "/Tableware/CutleryCaddy" },
    ],
  },
  {
    text: "Collections",
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/3a93a25a709f4fb428d7f57f554a75f6dae8c2c4a680b05c19026a7d150d8a2f",
    dropdownItems: [{ text: "Bella", link: "/Collections/Bella" }],
  },
];

const Navbar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state
  const [productToRemove, setProductToRemove] = useState(null); // Product to remove
  const {
    cartItems,
    totalQuantity,
    totalPrice,
    updateQuantity,
    removeItem,
    totalProducts,
  } = useCartContext();
  const navigate = useNavigate();

  const handleCategoryClick = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
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
      removeItem(productToRemove.id);
    }
    closePopup();
  };

  return (
    <>
      <nav className="navigation" role="navigation">
        <div className="header">
          <div className="logoSection" onClick={() => navigate("/")}>
            <img src={logo} alt="Company Logo" className="logo" loading="lazy" />
          </div>
          <div className="navCategories">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`categoryWrapper ${
                  activeCategory === index ? "active" : ""
                }`}
              >
                <div
                  onClick={() => handleCategoryClick(index)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={activeCategory === index}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleCategoryClick(index);
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
                {activeCategory === index && (
                  <div className="dropdownMenu">
                    {category.dropdownItems.map((item, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={item.link}
                        className="dropdownItem"
                        onClick={() => setActiveCategory(null)}
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
            <img src={searchIcon} alt="Search" className="actionIcon" onClick={toggleSearch} />
            <div className="divider"></div>
            <img
              src={profileIcon}
              alt="User Account"
              className="actionIcon"
              onClick={() => navigate("/log-in")}
            />
            <div className="divider"></div>
            <div className="cartIcon" onClick={toggleCart}>
              <img src={cartIcon} alt="Shopping Cart" className="cartImage" />
              <span className="cartBadge">{totalQuantity}</span>
            </div>
          </div>
        </div>
      </nav>

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
              <div key={item.id} className="cartItem">
                <img src={item.image} alt={item.name} className="cartItemImage" />
                <div className="cartItemDetails">
                  {/* <p className="cartItemName">{item.name}</p> */}
                  <p className="cartItemName">ABC</p> 
                  <p className="cartItemPrice">₹{item.price}.00</p>
                </div>
                <div className="cartQuantity">
                <button
                      className="cart-quantity-decrement1"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="cart-quantity-value1">{item.quantity}</span>
                    <button
                      className="cart-quantity-increment1"
                      onClick={() => updateQuantity(item.id, 1)}
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
            <p className="emptyCartMessage">Your cart is empty.</p>
          )}
        </div>

        <div className="cartFooter">
          <div className="cartSummary">
            <span>{totalProducts} Product</span>
            <span>₹{totalPrice}.00</span>
          </div>
          <div className="cartActions">
            <button className="checkoutButton" onClick={() => navigate("/Checkout")}>
              Checkout →
            </button>
            <button className="goToCartButton" onClick={() => navigate("/CartPage")}>
              Go to Cart →
            </button>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="popupOverlay">
          <div className="popupContent">
            <h3>Remove from Cart</h3>
            <hr className="row-divider"/>
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

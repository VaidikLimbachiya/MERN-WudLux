import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/vector.png';
import profileIcon from '../../assets/profile.png';
import cartIcon from '../../assets/bag.png';

const categories = [
  {
    text: 'Serveware',
    iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a1cfa473b4c3091f113c79eb7155d25fb5458b102ed1a68b6ce2308227f94925',
    dropdownItems: [
      { text: 'Serving Tray', link: '/Serveware/ServingTray' },
      { text: 'Serving Tray with Drawer', link: '/Serveware/ServingTrayWithDrawer' },
      { text: 'Beer Caddy', link: '/Serveware/BeerCaddy' },
      { text: 'Serving Platter', link: '/Serveware/ServingPlatter' },
      { text: 'Wine Serving Tray', link: '/Serveware/WineServingTray' },
    ],
  },
  {
    text: 'Kitchenware',
    iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/93802c32367c70d0f1cbcf887c7e26e1d4f770ebf8473953950cd1af3bf76896',
    dropdownItems: [
      { text: 'Chopping Board', link: '/Kitchenware/ChoppingBoard' },
      { text: 'Butcher Board', link: '/Kitchenware/ButcherBoard' },
    ],
  },
  {
    text: 'Tableware',
    iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c9ea7504e7b254d854b06a79b48cf39d39e2ab6c6f3afb37338801a7c60027f8',
    dropdownItems: [
      { text: 'Lazy Susan', link: '/Tableware/Lazysusan' },
      { text: 'Coffee Pods Drawer', link: '/Tableware/CoffeePodsDrawer' },
      { text: 'Cutlery Caddy', link: '/Tableware/CutleryCaddy' },
    ],
  },
  {
    text: 'Collections',
    iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3a93a25a709f4fb428d7f57f554a75f6dae8c2c4a680b05c19026a7d150d8a2f',
    dropdownItems: [{ text: 'Bella', link: '/Collections/Bella' }],
  },
];

export function Navbar() {
  const [activeCategory, setActiveCategory] = useState(null); // Tracks the active category index
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Tracks if the search pop-up is open
  const navigate = useNavigate();

  const handleCategoryClick = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="navigation" role="navigation">
        <div className="header">
          {/* Logo Section */}
          <div className="logoSection" onClick={() => navigate('/')}>
            <img src={logo} alt="Company Logo" className="logo" loading="lazy" />
          </div>

          {/* Categories Section */}
          <div className="navCategories">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`categoryWrapper ${
                  activeCategory === index ? 'active' : ''
                }`}
              >
                <div
                  onClick={() => handleCategoryClick(index)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={activeCategory === index}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCategoryClick(index);
                    }
                  }}
                  className={`categoryButton ${
                    activeCategory === index ? 'active' : ''
                  }`}
                >
                  <span className="categoryText">{category.text}</span>
                  <div className="iconWrapper">
                    <img
                      src={category.iconSrc}
                      alt={`${category.text} Icon`}
                      className="dropdownIcon"
                    />
                  </div>
                </div>
                {/* Dropdown Menu */}
                {activeCategory === index && (
                  <div className="dropdownMenu">
                    {category.dropdownItems.map((item, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={item.link}
                        className="dropdownItem"
                        onClick={() => setActiveCategory(null)}
                        role="button"
                        tabIndex={0}
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Promotion Section */}
        <div className="promotionBanner">
          <span className="promoText">Summer sale - 50% OFF!</span>
          <button
            className="promoButton"
            onClick={() => navigate('/products')}
            aria-label="Shop Now - Summer Sale 50% OFF"
          >
            Shop Now
          </button>
        </div>
          {/* User Actions Section */}
          <div className="userActions">
            <img
              src={searchIcon}
              alt="Search"
              className="actionIcon"
              onClick={toggleSearch}
            />
            <div className="divider"></div>
            <img
              src={profileIcon}
              alt="User Account"
              className="actionIcon"
              onClick={() => navigate('/account')}
            />
            <div className="divider"></div>
            <div className="cartIcon" onClick={() => navigate('/cart')}>
              <img src={cartIcon} alt="Shopping Cart" className="cartImage" />
              <span className="cartBadge">3</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Drawer */}
      <div className={`searchDrawer ${isSearchOpen ? 'open' : ''}`}>
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
}

export default Navbar;

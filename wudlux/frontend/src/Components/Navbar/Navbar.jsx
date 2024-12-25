import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file
import logo from '../../assets/logo.png'; // Adjust the path to your logo
import searchIcon from '../../assets/vector.png'; // Path to search icon
import profileIcon from '../../assets/profile.png'; // Path to profile icon
import cartIcon from '../../assets/bag.png'; // Path to cart icon

const categories = [
  { text: 'Serveware', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a1cfa473b4c3091f113c79eb7155d25fb5458b102ed1a68b6ce2308227f94925' },
  { text: 'Kitchenware', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/93802c32367c70d0f1cbcf887c7e26e1d4f770ebf8473953950cd1af3bf76896' },
  { text: 'Tableware', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c9ea7504e7b254d854b06a79b48cf39d39e2ab6c6f3afb37338801a7c60027f8' },
  { text: 'Collections', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3a93a25a709f4fb428d7f57f554a75f6dae8c2c4a680b05c19026a7d150d8a2f' },
];

export function Navbar() {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  return (
    <nav className="navigation" role="navigation">
      <div className="header">
        {/* Logo Section */}
        <div className="logoSection">
          <img src={logo} alt="Company Logo" className="logo" loading="lazy" />
        </div>

        {/* Categories Section */}
        <div className="navCategories">
          {categories.map((category, index) => (
            <div
              key={index}
              className="categoryWrapper"
              onClick={() => handleCategoryClick(index)}
              role="button"
              tabIndex={0}
              aria-expanded={activeCategory === index}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCategoryClick(index);
                }
              }}
            >
              <span className="categoryText">{category.text}</span>
              <div className="iconWrapper">
                <img
                  src={category.iconSrc}
                  alt=""
                  className="dropdownIcon"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Promotion Section */}
        <div className="promotionBanner">
          <span className="promoText">Summer sale - 50% OFF!</span>
          <button
            className="promoButton"
            onClick={() => (window.location.href = '/shop')}
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
            onClick={() => (window.location.href = '/search')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                window.location.href = '/search';
              }
            }}
          />
          <div className="divider"></div>
          <img
            src={profileIcon}
            alt="User Account"
            className="actionIcon"
            onClick={() => (window.location.href = '/account')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                window.location.href = '/account';
              }
            }}
          />
          <div className="divider"></div>
          <div
            className="cartIcon"
            onClick={() => (window.location.href = '/cart')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                window.location.href = '/cart';
              }
            }}
          >
            <img
              src={cartIcon}
              alt="Shopping Cart"
              className="cartImage"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/Vector.png';
import profileIcon from '../../assets/profile.png';
import cartIcon from '../../assets/bag.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li>
          <a href="#serveware">Serveware</a>
        </li>
        <li>
          <a href="#kitchenware">Kitchenware</a>
        </li>
        <li>
          <a href="#tableware">Tableware</a>
        </li>
        <li>
          <a href="#collections">Collections</a>
        </li>
      </ul>
      <div className="navbar-right">
        <span className="navbar-sale">Summer sale – 50% OFF!</span>
        <a href="#shop" className="navbar-shop">Shop Now</a>
        <div className="navbar-icons">
          <img src={searchIcon} alt="Search" className="icon" />
          <img src={profileIcon} alt="Profile" className="icon" />
          <div className="icon-cart">
            <img src={cartIcon} alt="Cart" className="icon" />
            <span className="cart-badge"></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

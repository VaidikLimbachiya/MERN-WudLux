// import React from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png'; // Adjust the path to your logo
import searchIcon from '../../assets/vector.png'; // Path to search icon
import profileIcon from '../../assets/profile.png'; // Path to profile icon
import cartIcon from '../../assets/bag.png'; // Path to cart icon
import { FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li className="nav-item">
          <a href="#serveware" className="nav-link">Serveware<span className="arrow"><FiChevronDown /></span></a>
        </li>
        <li className="nav-item">
          <a href="#kitchenware" className="nav-link">Kitchenware <span className="arrow"><FiChevronDown /></span></a>
        </li>
        <li className="nav-item">
          <a href="#tableware" className="nav-link">Tableware <span className="arrow"><FiChevronDown /></span></a>
        </li>
        <li className="nav-item">
          <a href="#collections" className="nav-link">Collections <span className="arrow"><FiChevronDown /></span></a>
        </li>
      </ul>
      <div className="navbar-right">
        <span className="navbar-sale">Summer sale – 50% OFF!</span>
        <a href="#shop" className="navbar-shop">Shop Now</a>
        <div className="navbar-icons">
          <img src={searchIcon} alt="Search" className="icon" />
          <span className="divider"></span>
          <img src={profileIcon} alt="Profile" className="icon" />
          <span className="divider"></span>
          <div className="icon-cart">
            <img src={cartIcon} alt="Cart" className="icon" />
            <span className="cart-badge">8</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

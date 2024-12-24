import React from 'react';
import './Header.css';
import backgroundImage from '../../assets/header.png'; // Replace with your actual image path

const Banner = () => {
  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="banner-content">
      <p className="sale-offer">
            <hr className="line-offer"/>
            <span>Sale offer</span> 10% off this week
            <hr className="line-offer"/>
          </p>
        <h1 className="banner-title">
          <span>Wooden</span> <br /> Kitchenware
        </h1>
        <button className="banner-button">Shop Now →</button>
      </div>
    </div>
  );
};

export default Banner;

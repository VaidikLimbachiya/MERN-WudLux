// import React from "react";
import "./Header.css";

const Slider = () => {
  return (
    <div className="slider">
      <div className="slider-content">
        <div className="slider-text">
          <p className="sale-offer">
            <hr className="line-offer"/>
            <span>Sale offer</span> 10% off this week
            <hr className="line-offer"/>
          </p>
          <h1 className="slider-heading">
            Wooden <br /> Kitchenware
          </h1>
          <button className="shop-now">
            Shop Now <span>→</span>
          </button>
        </div>
        <div className="slider-image">
          <img
            src="header.png" // Replace with actual image path
            alt="Wooden Kitchenware"
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;

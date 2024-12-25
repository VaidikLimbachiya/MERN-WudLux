// import React from 'react';
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
          <h1 className="slider-heading">
            Wooden <br /> Kitchenware
          </h1>
          <button className="shop-now">
            Shop Now <span>→</span>
          </button>
        </div>
        <div className="slider-image">
          {/* <img
<<<<<<< HEAD
            src="E:\Test\wudlux\src\Components\Header\header.png" // Replace with actual image path
            alt="Wooden Kitchenware"
          /> */}
        </div>
      </div>
     
=======
            // src="E:\Test\wudlux\src\Components\Header\header.png" // Replace with actual image path
            // alt="Wooden Kitchenware"
          /> */}
        </div>
      </div>
  
>>>>>>> 8558d7afe130dc886a36e0a13547adef1aa1f966
  );
};

export default Banner;

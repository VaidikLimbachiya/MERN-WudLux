// import React from 'react';
import './offers.css';
import tablewareImage from '../../assets/offer1.svg'; // Replace with actual image paths
import saleImage from '../../assets/offer2.svg';
import kitchenwareImage from '../../assets/offer3.svg';

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-container">
        {/* First Card */}
        <div className="offer-card">
          <img src={tablewareImage} alt="Tableware Collections" className="offer-image" loading="lazy"/>
          <div className="offer-overlay">
            <p className="offer-titlee">Top Trending</p>
            <h3 className="offer-subtitle">Tableware Collections</h3>
            <a href="#" className="offer-button">Discover Now</a>
          </div>
        </div>

        {/* Second Card */}
        <div className="offer-card">
          <img src={saleImage} alt="Black Friday Sale" className="offer-image" loading="lazy"/>
          <div className="offer-overlay">
            <p className="offer-titlee">Black Fridays!</p>
            <h3 className="offer-subtitle">Sale up to <br />50% off</h3>
            <a href="#" className="offer-button">Shop Now</a>
          </div>
        </div>

        {/* Third Card */}
        <div className="offer-card">
          <img src={kitchenwareImage} alt="Kitchenware Collections" className="offer-image" loading="lazy" />
          <div className="offer-overlay">
            <p className="offer-titlee">Top Trending</p>
            <h3 className="offer-subtitle">Kitchenware - Bella <br /> Collections</h3>
            <a href="#" className="offer-button">Discover Now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;

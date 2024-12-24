// import React from 'react';
import './Offers.css';
import tablewareImage from '../../assets/offer1.png'; // Replace with actual image paths
import saleImage from '../../assets/offer2.png';
import kitchenwareImage from '../../assets/offer3.png';

const Offers = () => {
  const offers = [
    {
      title: "Top Trending",
      subtitle: "Tableware Collections",
      button: "Discover Now",
      image: tablewareImage,
    },
    {
      title: "Black Fridays !",
      subtitle: "Sale up to 50% off",
      button: "Shop Now",
      image: saleImage,
    },
    {
      title: "Top Trending",
      subtitle: "Kitchenware - Bella Collections",
      button: "Discover Now",
      image: kitchenwareImage,
    },
  ];

  return (
    <div className="offers">
      <div className="offers-container">
        {offers.map((offer, index) => (
          <div className="offer-card" key={index}>
            <img src={offer.image} alt={offer.subtitle} className="offer-image" />
            <div className="offer-overlay">
              <p className="offer-title">{offer.title}</p>
              <h3 className="offer-subtitle">{offer.subtitle}</h3>
              <a href="#" className="offer-button">{offer.button}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;

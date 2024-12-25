// import React from 'react';
import './Categories.css';
import tray from '../../assets/tray.png'; // Replace with actual image paths
import platter from '../../assets/platter.png';
import choppingBoard from '../../assets/choppingBoard.png';
import cheeseBoard from '../../assets/cheeseBoard.png';
import chipDip from '../../assets/chip.png';
import bowls from '../../assets/bowl.png';

const Categories = () => {
  const categories = [
    { image: tray, title: 'Tray' },
    { image: platter, title: 'Platter' },
    { image: choppingBoard, title: 'Chopping Board' },
    { image: cheeseBoard, title: 'Cheese Board' },
    { image: chipDip, title: 'Chip & Dip' },
    { image: bowls, title: 'Bowls' },
  ];

  return (
    <div className="categories">
      <h2 className="categories-title">Shop by Categories</h2>
      <p className="categories-subtitle">
        Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero est.
      </p>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div className="category-item" key={index}>
            <div className="category-image-wrapper">
              <img src={category.image} alt={category.title} className="category-image" />
            </div>
            <p className="category-title">{category.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

// import React from 'react';
import './categories.css'; // Single CSS file

// Import images from the assets folder
import trayImage from '../../assets/tray.png'; // Adjust the path to your assets folder
import platterImage from '../../assets/platter.png';
import choppingBoardImage from '../../assets/choppingBoard.png';
import cheeseBoardImage from '../../assets/cheeseBoard.png';
import chipDipImage from '../../assets/chip.png';
import bowlsImage from '../../assets/bowl.png';

const categories = [
  { image: trayImage, title: 'Tray' },
  { image: platterImage, title: 'Platter' },
  { image: choppingBoardImage, title: 'Chopping Board' },
  { image: cheeseBoardImage, title: 'Cheese Board' },
  { image: chipDipImage, title: 'Chip & Dip' },
  { image: bowlsImage, title: 'Bowls' },
];

const Categories = () => {
  return (
    <div className="categoriesContainer">
      <h1 className="categoriesHeader">Shop by Categories</h1>
      <p className="categories-subtitle">
        Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero est.
      </p>
      <div className="categoriesGrid">
        {categories.map((category, index) => (
          <div className="categoryCard" key={index}>
            <img
              loading="lazy"
              src={category.image}
              alt={`${category.title}` }
              className="categoryImage"
            />
            <div className="categoryTitle">{category.title}</div>
          </div>
          
        ))}
        
      </div>
    </div>
  );
};

export default Categories;
// import React from 'react';
import './categories.css'; // Single CSS file

// Import images from the assets folder
import trayImage from '../../assets/tray.png'; // Adjust the path to your assets folder
import platterImage from '../../assets/platter.png';
import choppingBoardImage from '../../assets/choppingBoard.png';
import cheeseBoardImage from '../../assets/cheeseBoard.png';
import chipDipImage from '../../assets/chip.png';
import bowlsImage from '../../assets/bowl.png';
import { Link } from 'react-router-dom';
// import KitchenWare from '../../Pages/kichenWare/KitchenWare';

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
      {/* Heading Section */}
      <div className="headingContainer">
        <h1 className="headingTitle">Shop by Categories</h1>
        <div className="headingUnderline"></div>
        <p className="headingSubtitle">
          Discover a wide range of categories to find the perfect item for you.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="categoriesGrid">
        {categories.map((category, index) => (
          <div className="categoryCard" key={index}>
            <div className="categoryHoverEffect">
              <Link to= /*{`/category/${category.title}`}*/ "/Serveware/ServingTray">
              <img
                loading="lazy"
                src={category.image}
                alt={`${category.title} category`}
                className="categoryImage"
              />
              <div className="hoverOverlay">
                <span>+</span>
              </div>
              </Link>
            </div>
            <div className="categoryTitle">{category.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
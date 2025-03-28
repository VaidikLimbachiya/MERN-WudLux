import './categories.css'; // Single CSS file

// Import images from the assets folder
import trayImage from '../../assets/tray.svg'; // Adjust the path to your assets folder
import platterImage from '../../assets/platter.svg';
import choppingBoardImage from '../../assets/choppingBoard.svg';
import cheeseBoardImage from '../../assets/cheeseBoard.svg';
import chipDipImage from '../../assets/chip.svg';
import bowlsImage from '../../assets/bowl.svg';
import { useNavigate } from 'react-router-dom';

const categories = [
  { image: trayImage, title: 'Tray' },
  { image: platterImage, title: 'Platter' },
  { image: choppingBoardImage, title: 'Chopping Board' },
  { image: cheeseBoardImage, title: 'Cheese Board' },
  { image: chipDipImage, title: 'Chip & Dip' },
  { image: bowlsImage, title: 'Bowls' },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (subCategoryText) => {
    // Example logic: navigate with the category in the query string
    const queryParams = `subcategory=${subCategoryText}`;
    navigate(`/products?${queryParams}`);
  };

  return (
    <div className="categoriesContainer">
      {/* Heading Section */}
      <div className="headingContainer">
        <h1 className="headingTitle">Shop by Categories</h1>
        <div className="headingUnderline"></div>
        <p className="headingSubtitle">
        Accumsan vitae pede lacus ut ullamcorper.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="categoriesGrid">
        {categories.map((category, index) => (
          <div className="categoryCard" key={index}>
            <div className="categoryHoverEffect">
              <div
                onClick={() => handleCategoryClick(category.title)} // Pass category title for navigation
                className="categoryClickArea"
              >
                <img
                  loading="lazy"
                  src={category.image}
                  alt={`${category.title} category`}
                  className="categoryImage"
                  
                />
                <div className="hoverOverlay">
                  <span>+</span>
                </div>
              </div>
            </div>
            <div className="categoryTitle">{category.title}</div>
          </div> 
        ))}
      </div>
    </div>
  );
};

export default Categories;

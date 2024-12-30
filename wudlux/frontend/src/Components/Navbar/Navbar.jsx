import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file
import logo from '../../assets/logo.png'; // Adjust the path to your logo
import searchIcon from '../../assets/vector.png'; // Path to search icon
import profileIcon from '../../assets/profile.png'; // Path to profile icon
import cartIcon from '../../assets/bag.png'; // Path to cart icon

const categories = [
  {
    text: 'Serveware',
    iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a1cfa473b4c3091f113c79eb7155d25fb5458b102ed1a68b6ce2308227f94925',
    dropdownItems: [
      'Serving Tray',
      'Serving Tray with Drawer',
      'Beer Caddy',
      'Serving Platter',
      'Wine Serving Tray',
    ],
  },
  {
    text: 'Kitchenware',
    iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/93802c32367c70d0f1cbcf887c7e26e1d4f770ebf8473953950cd1af3bf76896',
    dropdownItems: ['Chopping Board', 'Butcher Board'],
  },
  {
    text: 'Tableware',
    iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c9ea7504e7b254d854b06a79b48cf39d39e2ab6c6f3afb37338801a7c60027f8',
    dropdownItems: ['Lazy Susan', 'Coffee Pods Drawer', 'Cutlery Caddy'],
  },
  {
    text: 'Collections',
    iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3a93a25a709f4fb428d7f57f554a75f6dae8c2c4a680b05c19026a7d150d8a2f',
    dropdownItems: ['Bella'],
  },
];

export function Navbar() {
  const [activeCategory, setActiveCategory] = useState(null); // Tracks the active category index
  const navigate = useNavigate(); // Use React Router's useNavigate hook

  /**
   * Toggles the dropdown menu for a category on click.
   * @param {number} index - The index of the clicked category.
   */
  const handleCategoryClick = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  /**
   * Navigates to the ProductList page with the selected category.
   * @param {string} category - The category name.
   */
  const handleNavigate = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <nav className="navigation" role="navigation">
      <div className="header">
        {/* Logo Section */}
        <div className="logoSection">
          <img
            src={logo}
            alt="Company Logo"
            className="logo"
            loading="lazy"
            onClick={() => navigate('/')}
          />
        </div>

        {/* Categories Section */}
        <div className="navCategories">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`categoryWrapper ${
                activeCategory === index ? 'active' : ''
              }`}
            >
              <div
                onClick={() => handleCategoryClick(index)}
                role="button"
                tabIndex={0}
                aria-expanded={activeCategory === index}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCategoryClick(index);
                  }
                }}
                className={`categoryButton ${
                  activeCategory === index ? 'active' : ''
                }`}
              >
                <span className="categoryText">{category.text}</span>
                <div className="iconWrapper">
                  <img
                    src={category.iconSrc}
                    alt={`${category.text} Icon`}
                    className="dropdownIcon"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Dropdown Menu */}
              {activeCategory === index && (
                <div className="dropdownMenu">
                  {category.dropdownItems.map((item, subIndex) => (
                    <div
                      key={subIndex}
                      className="dropdownItem"
                      onClick={() => handleNavigate(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleNavigate(item);
                        }
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User Actions Section */}
        <div className="userActions">
          <img
            src={searchIcon}
            alt="Search"
            className="actionIcon"
            onClick={() => navigate('/search')}
          />
          <div className="divider"></div>
          <img
            src={profileIcon}
            alt="User Account"
            className="actionIcon"
            onClick={() => navigate('/account')}
          />
          <div className="divider"></div>
          <div
            className="cartIcon"
            onClick={() => navigate('/cart')}
            role="button"
            tabIndex={0}
          >
            <img
              src={cartIcon}
              alt="Shopping Cart"
              className="cartImage"
              loading="lazy"
            />
            <span className="cartBadge">3</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

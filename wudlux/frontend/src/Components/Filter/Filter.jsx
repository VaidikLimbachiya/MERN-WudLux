import { useState } from 'react';
import './Filter.css'; // Import the external CSS file
import rp from '../../assets/rp.png'; // Import the image

export default function Filter() {
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortOption, setSortOption] = useState('Latest'); // Default sorting option

  const applyFilters = () => {
    const newFilters = [];
    if (selectedMaterial) {
      newFilters.push({ id: 1, text: selectedMaterial });
    }
    if (priceRange.min && priceRange.max) {
      newFilters.push({
        id: 2,
        text: `Min ₹${priceRange.min} - Max ₹${priceRange.max}`,
      });
    }
    setActiveFilters(newFilters);
  };

  const removeFilter = (id) => {
    setActiveFilters(activeFilters.filter((filter) => filter.id !== id));
    if (id === 1) setSelectedMaterial('');
    if (id === 2) setPriceRange({ min: '', max: '' });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    // Add sorting logic here (e.g., sort results based on `sortOption`)
  };

  const DropdownButton = ({ text, onClick }) => (
    <button className="dropdownButton" onClick={onClick}>
      <span className="dropdownText">{text}</span>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b1814fcafe90076f25a83439b3688c501d330d82a0a80c03284da2443342b05?placeholderIfAbsent=true&apiKey=4bede4563f2047b58544427a4978e824"
        alt="Dropdown icon"
        className="dropdownIcon"
      />
    </button>
  );

  const FilterTag = ({ text, onRemove }) => (
    <div className="filterTag">
      <span>{text}</span>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2cdb55ad4c984ede5a4e417af1ae7201f69c7563ecf20c5136cb8d3a76b68e7?placeholderIfAbsent=true&apiKey=4bede4563f2047b58544427a4978e824"
        alt="Remove filter"
        className="removeIcon"
        onClick={onRemove}
        role="button"
        tabIndex={0}
      />
    </div>
  );

  return (
    <div className="filterContainer">
      <div className="filterRow">
        <div className="filterGroup">
          <select
            className="dropdownButton"
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
          >
            <option value="">Select Material</option>
            <option value="Acacia wood">Acacia wood</option>
            <option value="Teak wood">Teak wood</option>
            <option value="Pine wood">Pine wood</option>
          </select>

          <div className="priceRange">
            <span className="priceLabel">Price</span>
            <div className="currencyInput">
              <span className="currencySymbol"><img src={rp} alt="" /></span>
              <input
                type="number"
                className="priceInput"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
              />
            </div>
            <span>to</span>
            <div className="currencyInput">
              <span className="currencySymbol"><img src={rp} alt="" /></span>
              <input
                type="number"
                className="priceInput"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
              />
            </div>
          </div>

          <button className="applyButton" onClick={applyFilters}>
            <span>Apply</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d65c38d49cc0cc7f1ecc59f5c6f56ed7d0e5da7faa4138d582f4497361762f54?placeholderIfAbsent=true&apiKey=4bede4563f2047b58544427a4978e824"
              alt="Apply icon"
              className="dropdownIcon"
            />
          </button>
        </div>

        <div>
          <select
            className="dropdownButton"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="Featured">Featured</option>
            <option value="bestSelling">Best Selling</option>
            <option value="atoz">Alphabetically A to Z</option>
            <option value="ztoa">Alphabetically Z to A</option>
            <option value="Price-low-to-High">Price: Low to High</option>
            <option value="Price-High-to-Low">Price: High to Low</option>
            <option value="old-to-new">Date old to new</option>
            <option value="new-to-old">Date new to old</option>
          </select>
        </div>
      </div>

      <div className="activeFiltersBar">
        <div className="activeFiltersList">
          <span className="activeFiltersLabel">Active Filters:</span>
          {activeFilters.map((filter) => (
            <FilterTag
              key={filter.id}
              text={filter.text}
              onRemove={() => removeFilter(filter.id)}
            />
          ))}
        </div>
        <div className="resultsCount">
          <span className="resultsNumber">12</span> Results found.
        </div>
      </div>
    </div>
  );
}

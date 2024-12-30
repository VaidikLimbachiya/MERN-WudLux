import { useState } from 'react';
import './Filter.css'; // CSS for the styling

const Filters = () => {
  const [material, setMaterial] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleApply = () => {
    console.log({
      material,
      minPrice,
      maxPrice,
    });
    // Add logic to apply the filters
  };

  return (
    <div className="filters-container">
      {/* Material Dropdown */}
      <div className="filter-item">
        <select
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="filter-select"
        >
          <option value="">Select Material</option>
          <option value="Acacia wood">Acacia wood</option>
          <option value="Bamboo">Primium Wood</option>
          <option value="Steel">Walnut Wodd</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="filter-item price-section">
        <label className="price-label">Price</label>
        <div className="price-inputs">
          <span>₹</span>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="price-input"
          />
          <span>to</span>
          <span>₹</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="price-input"
          />
        </div>
      </div>

      {/* Apply Button */}
      <button onClick={handleApply} className="apply-button">
        Apply →
      </button>

      {/* Sort Dropdown */}
      <div className="filter-item sort-dropdown">
        <select className="sort-select">
          <option value="Featured">Featured</option>
          <option value="BstSelling">Best Selling</option>
          <option value="AlphabeticallyAtoZ">Alphabetically A to Z</option>
          <option value="AlphabeticallyZtoA">Alphabetically Z to A</option>
          <option value="priceLow">Price (Low to High)</option>
          <option value="priceHigh">Price (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;

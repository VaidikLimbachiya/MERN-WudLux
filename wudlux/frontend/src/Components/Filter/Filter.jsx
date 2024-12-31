import { useState } from 'react';
import './Filter.css'; // CSS for the styling

const sampleProducts = [
  { id: 1, name: 'Acacia Chair', material: 'Acacia wood', price: 1500 },
  { id: 2, name: 'Bamboo Table', material: 'Bamboo', price: 3000 },
  { id: 3, name: 'Walnut Bed', material: 'Steel', price: 5000 },
  { id: 4, name: 'Premium Sofa', material: 'Acacia wood', price: 4500 },
];

const Filters = () => {
  const [material, setMaterial] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);

  const handleApply = () => {
    const filtered = sampleProducts.filter((product) => {
      const isMaterialMatch = material ? product.material === material : true;
      const isMinPriceMatch = minPrice ? product.price >= Number(minPrice) : true;
      const isMaxPriceMatch = maxPrice ? product.price <= Number(maxPrice) : true;

      return isMaterialMatch && isMinPriceMatch && isMaxPriceMatch;
    });

    setFilteredProducts(filtered);
  };

  const handleRemoveFilter = (filterType) => {
    if (filterType === 'material') setMaterial('');
    if (filterType === 'minPrice') setMinPrice('');
    if (filterType === 'maxPrice') setMaxPrice('');
    handleApply(); // Reapply filters after removing one
  };

  return (
    <div className="filters-container">
      <div className="filters-row">
        {/* Material Dropdown */}
        <div className="filter-item">
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="filter-select"
          >
            <option value="">Select Material</option>
            <option value="Acacia wood">Acacia wood</option>
            <option value="Bamboo">Bamboo</option>
            <option value="Steel">Walnut Wood</option>
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
            <option value="Featured">Sort by: Latest</option>
            <option value="priceLow">Price (Low to High)</option>
            <option value="priceHigh">Price (High to Low)</option>
            <option value="AlphabeticallyAtoZ">Alphabetically A to Z</option>
            <option value="AlphabeticallyZtoA">Alphabetically Z to A</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      <div className="active-filters">
        <strong>Active Filters:</strong>
        {material && (
          <span className="filter-badge">
            {material} <button onClick={() => handleRemoveFilter('material')}>×</button>
          </span>
        )}
        {minPrice && (
          <span className="filter-badge">
            Min ₹{minPrice} <button onClick={() => handleRemoveFilter('minPrice')}>×</button>
          </span>
        )}
        {maxPrice && (
          <span className="filter-badge">
            Max ₹{maxPrice} <button onClick={() => handleRemoveFilter('maxPrice')}>×</button>
          </span>
        )}
        {!material && !minPrice && !maxPrice && <span>None</span>}
      </div>

      {/* Results Found */}
      <div className="results-info">
        <strong>{filteredProducts.length} Results found.</strong>
      </div>
    </div>
  );
};

export default Filters;

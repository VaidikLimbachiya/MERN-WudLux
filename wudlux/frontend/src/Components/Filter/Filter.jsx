import React, { useState } from 'react';
import './Filter.css'; // Import the CSS file

const FilterComponent = () => {
  const [material, setMaterial] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [activeFilters, setActiveFilters] = useState([]);

  const materials = ['Acacia wood', 'Teak wood', 'Pine wood'];

  const handleApply = () => {
    const newFilters = [];
    if (material) newFilters.push({ label: material, type: 'Material' });
    if (priceRange.min && priceRange.max)
      newFilters.push({
        label: `Min ₹${priceRange.min} – Max ₹${priceRange.max}`,
        type: 'Price',
      });

    setActiveFilters(newFilters);
  };

  const removeFilter = (filter) => {
    if (filter.type === 'Material') setMaterial('');
    if (filter.type === 'Price') setPriceRange({ min: '', max: '' });
    setActiveFilters(activeFilters.filter((f) => f.label !== filter.label));
  };

  return (
    <div className="filter-container">
      {/* Filter Inputs */}
      <div className="filter-controls">
        <select
          className="filter-select"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        >
          <option value="">Select Material</option>
          {materials.map((mat) => (
            <option key={mat} value={mat}>
              {mat}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          className="filter-input"
          value={priceRange.min}
          onChange={(e) =>
            setPriceRange({ ...priceRange, min: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Max Price"
          className="filter-input"
          value={priceRange.max}
          onChange={(e) =>
            setPriceRange({ ...priceRange, max: e.target.value })
          }
        />
        <button className="filter-apply-button" onClick={handleApply}>
          Apply
        </button>
      </div>

      {/* Active Filters */}
      <div className="active-filters">
        <h4>Active Filters:</h4>
        <div className="filters-list">
          {activeFilters.map((filter) => (
            <span className="filter-tag" key={filter.label}>
              {filter.label}{' '}
              <button
                className="remove-button"
                onClick={() => removeFilter(filter)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;

import { useState } from "react";
import "./Filter.css"; 

export default function Filter({ filters, setFilters }) {
  const [selectedMaterial, setSelectedMaterial] = useState(filters.material);
  const [priceRange, setPriceRange] = useState(filters.priceRange);
  const [sortOption, setSortOption] = useState(filters.sortOption);

  const applyFilters = () => {
    setFilters({
      material: selectedMaterial,
      priceRange,
      sortOption,
    });
  };

  return (
    <div className="filterContainer">
      <div className="filterRow">
        <div className="filterGroup">
          <select className="dropdownButton" value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
            <option value="">Select Material</option>
            <option value="Acacia wood">Acacia wood</option>
            <option value="Teak wood">Teak wood</option>
            <option value="Pine wood">Pine wood</option>
          </select>

          <div className="priceRange">
            <span className="priceLabel">Price</span>
            <input
              type="number"
              className="priceInput"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            />
            <span>to</span>
            <input
              type="number"
              className="priceInput"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            />
          </div>

          <button className="applyButton" onClick={applyFilters}>Apply</button>
        </div>

        <div>
          <select className="dropdownButton" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="Latest">Latest</option>
            <option value="bestSelling">Best Selling</option>
            <option value="Price-low-to-High">Price: Low to High</option>
            <option value="Price-High-to-Low">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

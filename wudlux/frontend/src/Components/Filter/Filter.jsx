import './Filter.css';
import rp from '../../assets/rp.png';

export default function Filter({
  selectedMaterial = '',
  setSelectedMaterial,
  priceRange = { min: '', max: '' },  // Ensure priceRange has a default value
  setPriceRange,
  sortOption = 'Latest',
  setSortOption,
}) 
 {
  return (
    <div className="filterContainer">
      <div className="filterRow">
        <div className="filterGroup">
          {/* Material Dropdown */}
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

          {/* Price Range Inputs */}
          <div className="priceRange">
            <span className="priceLabel">Price</span>
            <div className="currencyInput">
              <span className="currencySymbol"><img src={rp} alt="₹" /></span>
              <input
  type="number"
  className="priceInput"
  placeholder="Min"
  value={priceRange?.min || ''} // Safe access using optional chaining
  onChange={(e) =>
    setPriceRange({ ...priceRange, min: e.target.value })
  }
/>

            </div>
            <span>to</span>
            <div className="currencyInput">
              <span className="currencySymbol"><img src={rp} alt="₹" /></span>
              <input
  type="number"
  className="priceInput"
  placeholder="Max"
  value={priceRange?.max || ''} // Safe access using optional chaining
  onChange={(e) =>
    setPriceRange({ ...priceRange, max: e.target.value })
  }
/>

            </div>
          </div>
        </div>

        {/* Sorting Dropdown */}
        <div>
          <select
            className="dropdownButton"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
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

      {/* Active Filters Bar */}
      <div className="activeFiltersBar">
        <div className="activeFiltersList">
          <span className="activeFiltersLabel">Active Filters:</span>
          {selectedMaterial && (
            <div className="filterTag">
              <span>{selectedMaterial}</span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2cdb55ad4c984ede5a4e417af1ae7201f69c7563ecf20c5136cb8d3a76b68e7"
                alt="Remove filter"
                className="removeIcon"
                onClick={() => setSelectedMaterial('')}
                role="button"
                tabIndex={0}
              />
            </div>
          )}
          {priceRange.min && priceRange.max && (
            <div className="filterTag">
              <span>₹{priceRange.min} - ₹{priceRange.max}</span>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2cdb55ad4c984ede5a4e417af1ae7201f69c7563ecf20c5136cb8d3a76b68e7"
                alt="Remove filter"
                className="removeIcon"
                onClick={() => setPriceRange({ min: '', max: '' })}
                role="button"
                tabIndex={0}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

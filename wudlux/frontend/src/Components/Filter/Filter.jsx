import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Filter.css';
import rp from '../../assets/rp.png';
import { CiCircleRemove } from "react-icons/ci";

export default function Filter({ productCount }) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Keep existing category & subcategory
  const category = queryParams.get("category") || "";
  const subcategory = queryParams.get("subcategory") || "";

  // Get initial filter values from URL
  const initialMaterial = queryParams.get("material") || "";
  const initialMinPrice = queryParams.get("minPrice") || "";
  const initialMaxPrice = queryParams.get("maxPrice") || "";
  const initialSortOption = queryParams.get("sortOption") || "Latest";

  // State for filter values before applying
  const [selectedMaterial, setSelectedMaterial] = useState(initialMaterial);
  const [priceRange, setPriceRange] = useState({ min: initialMinPrice, max: initialMaxPrice });
  const [sortOption, setSortOption] = useState(initialSortOption);
  
  // State for applied filters (Only updates when Apply is clicked)
  const [activeFilters, setActiveFilters] = useState([]);

  // Apply Filters & Update URL
  const applyFilters = () => {
    const newParams = new URLSearchParams();

    if (category) newParams.set("category", category);
    if (subcategory) newParams.set("subcategory", subcategory);
    if (selectedMaterial) newParams.set("material", selectedMaterial);
    if (priceRange.min) newParams.set("minPrice", Number(priceRange.min));  // Ensure number conversion
    if (priceRange.max) newParams.set("maxPrice", Number(priceRange.max));
    if (sortOption && sortOption !== "Latest") newParams.set("sortOption", sortOption);

    // Update URL
    navigate(`/products?${newParams.toString()}`);

    // Update active filters (only on Apply button click)
    const filters = [];
    if (selectedMaterial) filters.push({ id: "material", text: selectedMaterial });
    if (priceRange.min || priceRange.max) {
      const priceText = `₹${priceRange.min || '0'} - ₹${priceRange.max || '∞'}`;
      filters.push({ id: "price", text: priceText });
    }
    if (sortOption && sortOption !== "Latest") filters.push({ id: "sort", text: `Sort: ${sortOption}` });

    setActiveFilters(filters);
  };

  // Remove Individual Filters
  const removeFilter = (filterId) => {
    const newParams = new URLSearchParams(location.search);

    if (filterId === "material") {
      setSelectedMaterial("");
      newParams.delete("material");
    }
    if (filterId === "price") {
      setPriceRange({ min: "", max: "" });
      newParams.delete("minPrice");
      newParams.delete("maxPrice");
    }
    if (filterId === "sort") {
      setSortOption("Latest");
      newParams.delete("sortOption");
    }

    // Update URL
    navigate(`/products?${newParams.toString()}`);

    // Update active filters list
    setActiveFilters(activeFilters.filter(filter => filter.id !== filterId));
  };

  return (
    <div className="filterContainer">
      <div className="filterRow">
        {/* Material Filter */}
        <select className="dropdownButton2" value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
          <option value="">Select Material</option>
          <option value="Acacia wood">Acacia wood</option>
          <option value="Teak wood">Teak wood</option>
          <option value="Mango wood">Mango wood</option>
        </select>

        {/* Price Range Filter */}
        <div className="priceRange">
          <span className="priceLabel">Price</span>
          <div className="currencyInput">
            <span className="currencySymbol"><img src={rp} alt="" loading="lazy"/></span>
            <input
              type="number"
              className="priceInput"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            />
          </div>
          <span>to</span>
          <div className="currencyInput">
            <span className="currencySymbol"><img src={rp} alt="" loading="lazy"/></span>
            <input
              type="number"
              className="priceInput"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            />
          </div>
        </div>

        {/* Sort Filter */}
<select className="dropdownButton1" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
  <option value="Featured">Featured</option>
  <option value="Best Selling">Best Selling</option>
  <option value="Alphabetically: A to Z">Alphabetically A to Z</option>
  <option value="Alphabetically: Z to A">Alphabetically Z to A</option>
  <option value="Price-low-to-High">Price: Low to High</option>
  <option value="Price-High-to-Low">Price: High to Low</option>
  <option value="Date - old to new">Date: Old to New</option>
  <option value="Date - new to old">Date: New to Old</option>
</select>


        {/* Apply Button */}
        <button className="applyButton" onClick={applyFilters}>Apply</button>
      </div>

      {/* Active Filters & Results Count (Only show after clicking Apply) */}
{activeFilters.length > 0 && (
  <div className="activeFiltersBar">
    <div className="activeFiltersList">
      <span className="activeFiltersLabel">Active Filters:</span>
      {activeFilters.map((filter) => (
        <div className="filterTag" key={filter.id}>
          <span>{filter.text}</span>
          <CiCircleRemove className="removeIcon" onClick={() => removeFilter(filter.id)} />
        </div>
      ))}
    </div>
    {/* ✅ Display the product count dynamically */}
    <div className="resultsCount">
      <span>Results Found: {productCount}</span>
    </div>
  </div>
)}

    </div>
  );
}

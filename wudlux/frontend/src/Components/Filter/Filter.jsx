import { useState, useEffect } from 'react';
import './Filter.css';
import rp from '../../assets/rp.png';
import { CiCircleRemove } from "react-icons/ci";

export default function Filter() {
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortOption, setSortOption] = useState('Latest');
  const [products, setProducts] = useState([]); // Store filtered results
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFilteredData();
  }, [selectedMaterial, priceRange, sortOption]);

  const fetchFilteredData = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        material: selectedMaterial || "",
        minPrice: priceRange.min || "",
        maxPrice: priceRange.max || "",
        sort: sortOption || "",
      }).toString();

      const response = await fetch(`/api/products?${queryParams}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const newFilters = [];
    if (selectedMaterial) {
      newFilters.push({ id: 1, text: selectedMaterial });
    }
    if (priceRange.min && priceRange.max) {
      newFilters.push({
        id: 2,
        text: `₹${priceRange.min} - ₹${priceRange.max}`,
      });
    }
    if (sortOption) {
      newFilters.push({
        id: 3,
        text: `Sort: ${sortOption}`,
      });
    }
    setActiveFilters(newFilters);
  };

  const removeFilter = (id) => {
    if (id === 1) setSelectedMaterial("");
    if (id === 2) setPriceRange({ min: "", max: "" });
    if (id === 3) setSortOption("");
    setActiveFilters(activeFilters.filter((filter) => filter.id !== id));
    fetchFilteredData();
  };

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
          </button>
        </div>

        <div>
          <select
            className="dropdownButton"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Featured">Featured</option>
            <option value="Best Selling">Best Selling</option>
            <option value="Alphabetically: A to Z">Alphabetically A to Z</option>
            <option value="Alphabetically: Z to A">Alphabetically Z to A</option>
            <option value="Price: low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="old to new">Date old to new</option>
            <option value="new to old">Date new to old</option>
          </select>
        </div>
      </div>

      <div className="activeFiltersBar">
        <div className="activeFiltersList">
          <span className="activeFiltersLabel">Active Filters:</span>
          {activeFilters.map((filter) => (
            <div className="filterTag" key={filter.id}>
              <span>{filter.text}</span>
              {/* <img
                // src="https://cdn.builder.io/api/v1/image/assets/TEMP/remove-icon.png"
                alt="Remove filter"
                className="removeIcon"
                onClick={() => removeFilter(filter.id)}
                role="button"
                tabIndex={0}
              /> */}
              <CiCircleRemove  className="removeIcon"  onClick={() => removeFilter(filter.id)}/>
            </div>
          ))}
        </div>
        <div className="resultsCount">
          {loading ? <span>Loading...</span> : <span>{products.length} Results found</span>}
        </div>
      </div>

      {/* Render Filtered Products */}
      <div className="productGrid">
        {products.map((product) => (
          <div key={product.id} className="productCard">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

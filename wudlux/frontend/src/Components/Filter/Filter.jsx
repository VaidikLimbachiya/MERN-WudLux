import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Filter.css";
import rp from "../../assets/rp.png";
import rct from "../../assets/rct.png";
import { CiCircleRemove } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import fltr from "../../assets/fltr.png";

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

  // State for filter values
  const [selectedMaterial, setSelectedMaterial] = useState(initialMaterial);
  const [priceRange, setPriceRange] = useState({
    min: initialMinPrice,
    max: initialMaxPrice,
  });
  const [sortOption, setSortOption] = useState(initialSortOption);
  const [activeFilters, setActiveFilters] = useState([]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect screen size for mobile filter button
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Apply Filters & Update URL
  const applyFilters = () => {
    const newParams = new URLSearchParams();

    if (category) newParams.set("category", category);
    if (subcategory) newParams.set("subcategory", subcategory);
    if (selectedMaterial) newParams.set("material", selectedMaterial);
    if (priceRange.min) newParams.set("minPrice", Number(priceRange.min));
    if (priceRange.max) newParams.set("maxPrice", Number(priceRange.max));
    if (sortOption && sortOption !== "Latest")
      newParams.set("sortOption", sortOption);

    navigate(`/products?${newParams.toString()}`);

    // Update active filters
    const filters = [];
    if (selectedMaterial)
      filters.push({ id: "material", text: selectedMaterial });
    if (priceRange.min || priceRange.max) {
      const priceText = `₹${priceRange.min || "0"} - ₹${priceRange.max || "∞"}`;
      filters.push({ id: "price", text: priceText });
    }
    if (sortOption && sortOption !== "Latest")
      filters.push({ id: "sort", text: `Sort: ${sortOption}` });

    setActiveFilters(filters);
    setShowBottomSheet(false); // Close mobile filter after applying
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

    navigate(`/products?${newParams.toString()}`);
    setActiveFilters(activeFilters.filter((filter) => filter.id !== filterId));
  };

  return (
    <div className="filterContainer">
      {/* Desktop Filter */}
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
            <option value="Mango wood">Mango wood</option>
          </select>

          {/* Price Range Filter */}
          <div className="priceRange">
            <span className="priceLabel">Price</span>
            <div className="currencyInput">
              <span className="currencySymbol">
                <img src={rp} alt="" />
              </span>
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
              <span className="currencySymbol">
                <img src={rp} alt="" />
              </span>
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
            Apply
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d65c38d49cc0cc7f1ecc59f5c6f56ed7d0e5da7faa4138d582f4497361762f54?placeholderIfAbsent=true&apiKey=4bede4563f2047b58544427a4978e824"
              alt="Apply icon"
              className="dropdownIcon"
            />
          </button>
        </div>
        <div>
          <select
            className="dropdownButton1"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Featured">Featured</option>
            <option value="Best Selling">Best Selling</option>
            <option value="Alphabetically: A to Z">
              Alphabetically A to Z
            </option>
            <option value="Alphabetically: Z to A">
              Alphabetically Z to A
            </option>
            <option value="Price-low-to-High">Price: Low to High</option>
            <option value="Price-High-to-Low">Price: High to Low</option>
            <option value="Date - old to new">Date: Old to New</option>
            <option value="Date - new to old">Date: New to Old</option>
          </select>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="activeFiltersBar">
          <div className="activeFiltersList">
            <span className="activeFiltersLabel">Active Filters:</span>
            {activeFilters.map((filter) => (
              <div className="filterTag" key={filter.id}>
                <span>{filter.text}</span>
                <CiCircleRemove
                  className="removeIcon"
                  onClick={() => removeFilter(filter.id)}
                />
              </div>
            ))}
          </div>
          {/* ✅ Display the product count dynamically */}
          <div className="resultsCount">
            <span>Results Found: {productCount}</span>
          </div>
        </div>
      )}

      {/* Mobile Filter Button (Hidden on Desktop) */}
      {isMobile && (
        <button
          className="filter-button"
          onClick={() => setShowBottomSheet(true)}
        >
          <img src={fltr} alt="Filter" className="filter-icon" />
        </button>
      )}

      {/* Mobile Bottom Sheet */}
      {showBottomSheet && (
        <div className="bottomSheet open">
          <div className="bottomSheetHeader">
            <img
              src={rct}
              onClick={() => setShowBottomSheet(false)}
              className="closeIcon"
            />
          </div>
          <div className="filterGroupMobile">
            <h2>Select Material:</h2>
            <div className="materialFilter">
              <button
                className={`materialButton ${
                  selectedMaterial === "Acacia wood" ? "active" : ""
                }`}
                onClick={() => setSelectedMaterial("Acacia wood")}
              >
                Acacia wood
              </button>
              <button
                className={`materialButton ${
                  selectedMaterial === "Teak wood" ? "active" : ""
                }`}
                onClick={() => setSelectedMaterial("Teak wood")}
              >
                Teak wood
              </button>
              <button
                className={`materialButton ${
                  selectedMaterial === "Mango wood" ? "active" : ""
                }`}
                onClick={() => setSelectedMaterial("Mango wood")}
              >
                Mango wood
              </button>
            </div>
            <div className="priceRangeMobile">
              <span className="priceLabel">Price</span>

              <div className="priceInputsContainer">
                <div className="currencyInput">
                  <span className="currencySymbol">₹</span>
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
                  <span className="currencySymbol">₹</span>
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
            </div>

            <div className="sortByMobile">
              <span>Sort By</span>
              <label className="text">
                <input
                  className="radiobtn"
                  type="radio"
                  name="sort"
                  value="Featured"
                  checked={sortOption === "Featured"}
                  onChange={() => setSortOption("Featured")}
                />
                Featured
              </label>
              <label>
                <input
                  className="radiobtn"
                  type="radio"
                  name="sort"
                  value="Best Selling"
                  checked={sortOption === "Best Selling"}
                  onChange={() => setSortOption("Best Selling")}
                />
                Best Selling
              </label>
              <label>
                <input
                  className="radiobtn"
                  type="radio"
                  name="sort"
                  value="Price-low-to-High"
                  checked={sortOption === "Alphabetically A to Z"}
                  onChange={() => setSortOption("Alphabetically A to Z")}
                />
                Alphabetically A to Z
              </label>
              <label>
                <input
                  className="radiobtn"
                  type="radio"
                  name="sort"
                  value="Price-low-to-High"
                  checked={sortOption === "Alphabetically Z to A"}
                  onChange={() => setSortOption("Alphabetically Z to A")}
                />
                Alphabetically Z to A
              </label>
              <label>
                <input
                  className="radiobtn"
                  type="radio"
                  name="sort"
                  value="Price-High-to-Low"
                  checked={sortOption === "Price-High-to-Low"}
                  onChange={() => setSortOption("Price-High-to-Low")}
                />
                Price: High to Low
              </label>
              <label>
                <input
                  className="radiobtn"
                  type="radio"
                  name="sort"
                  value="Price-low-to-High"
                  checked={sortOption === "Price-low-to-High"}
                  onChange={() => setSortOption("Price-low-to-High")}
                />
                Price: Low to High
              </label>
              <label>
                <input
                  className="radiobtn"
                  type="radio"
                  name="sort"
                  value="Price-low-to-High"
                  checked={sortOption === "Date - old to new"}
                  onChange={() => setSortOption("Date - old to new")}
                />
                Date - old to new
              </label>
              <label>
                <input
                  className="radiobtn"
                  type="radio"
                  name="sort"
                  value="Price-low-to-High"
                  checked={sortOption === "Date - new to old"}
                  onChange={() => setSortOption("Date - new to old")}
                />
                Date - new to old
              </label>
            </div>

            <button className="applyButtonMobile" onClick={applyFilters}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

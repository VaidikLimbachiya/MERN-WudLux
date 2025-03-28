import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Filter.css";
import rp from "../../assets/rp.png";
import rct from "../../assets/rct.png";
import { CiCircleRemove } from "react-icons/ci";
// import { IoClose } from "react-icons/io5";
import fltr from "../../assets/fltr.png";
// import down from "../../assets/Down.png";
import { GrSort } from "react-icons/gr";

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
  const [showSortSheet, setShowSortSheet] = useState(false); // ✅ New state for Sort button

  // Detect screen size for mobile filter button
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (sortOption) {
      applyFilters(sortOption); // ✅ Apply sorting instantly
      setShowSortSheet(false); // ✅ Close the sorting sheet automatically
    }
  }, [sortOption]); // ✅ Runs when sortOption changes
  

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
  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
  
    const newParams = new URLSearchParams(location.search);
    newParams.set("sortOption", newSortOption);
    navigate(`/products?${newParams.toString()}`);
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
          <div className="custom-dropdown">
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
            >
              <option value="">Select Material</option>
              <option value="Acacia wood">Acacia wood</option>
              <option value="Teak wood">Teak wood</option>
              <option value="Mango wood">Mango wood</option>
            </select>
          </div>

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
        <div className="custom-dropdown1">
  <select
    value={sortOption === "Latest" ? "" : sortOption} // Ensure placeholder is shown initially
    onChange={handleSortChange}
    className={!sortOption || sortOption === "Latest" ? "placeholder" : ""}
  >
    <option value="" disabled hidden>
      Sort By
    </option>
    <option value="Featured">Featured</option>
    <option value="Best Selling">Best Selling</option>
    <option value="Alphabetically: A to Z">Alphabetically A to Z</option>
    <option value="Alphabetically: Z to A">Alphabetically Z to A</option>
    <option value="Price-low-to-High">Price: Low to High</option>
    <option value="Price-High-to-Low">Price: High to Low</option>
    <option value="Date - old to new">Date: Old to New</option>
    <option value="Date - new to old">Date: New to Old</option>
  </select>
</div>




      </div>

      

      {/* Mobile Filter Button (Hidden on Desktop) */}
      {/* Mobile Filter & Sort Buttons (Hidden on Desktop) */}
{isMobile && (
  <div className="mobile-filter-buttons">
    <button
      className="filter-button"
      onClick={() => setShowBottomSheet(true)}
    >
      <img src={fltr} alt="Filter" className="filter-icon" />
    </button>
    
    <button
      className="sort-button"
      onClick={() => setShowSortSheet(true)} // ✅ Open Sort Sheet
    >
      Sort By
      <GrSort className="sortIcon" />
    </button>
  </div>
)}
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

            <button className="applyButtonMobile" onClick={applyFilters}>
              Apply
            </button>
          </div>
        </div>
      )}
      {/* Sort Bottom Sheet */}
      {showSortSheet && (
  <div className="bottomSheet open">
    <div className="bottomSheetHeader">
      <img
        src={rct}
        onClick={() => setShowSortSheet(false)} // ✅ Close Sort Sheet
        className="closeIcon"
      />
    </div>

    <div className="sortByMobile">
      <h2>Sort By</h2>

      {[
        "Featured",
        "Best Selling",
        "Price-low-to-High",
        "Price-High-to-Low",
        "Date - old to new",
        "Date - new to old"
      ].map((option) => (
        <label key={option}>
          <input
            className="radiobtn"
            type="radio"
            name="sort"
            value={option}
            checked={sortOption === option}
            onChange={() => {
              setSortOption(option); // ✅ Set the sort option
              applyFilters(); // ✅ Apply the filter
              setShowSortSheet(false); // ✅ Close the bottom sheet
            }}
          />
          {option.replace("-", " ")} {/* Format text properly */}
        </label>
      ))}
    </div>
  </div>
)}


    </div>
  );
}

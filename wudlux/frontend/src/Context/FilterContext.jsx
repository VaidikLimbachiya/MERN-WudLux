import {
    createContext,
    useReducer,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { filterReducer, initialFilterState } from "../Reducer/filterReducer";
  import PropTypes from 'prop-types';
  
  const FilterContext = createContext();
  
  export const FilterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(filterReducer, initialFilterState);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fetch products from API
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch("http://localhost:5000/api/products/list");
          const result = await response.json();
  
          console.log("API Response:", result);
  
          //   Extract `data` array if available
          if (result.success && Array.isArray(result.data)) {
            setData(result.data);
          } else {
            throw new Error("Fetched data is not an array.");
          }
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Failed to fetch products. Please check the API.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    // Filtering and sorting logic
    useEffect(() => {
      let filtered = [...data];
  
      //   Filter by Material (Supports multiple selections)
      if (state.selectedMaterials.length > 0) {
        filtered = filtered.filter((item) =>
          state.selectedMaterials.includes(item.material)
        );
      }
  
      //   Filter by Price Range
      if (state.priceRange.min !== null && state.priceRange.max !== null) {
        filtered = filtered.filter(
          (item) =>
            item.price >= Number(state.priceRange.min) &&
            item.price <= Number(state.priceRange.max)
        );
      }
  
      //   Filter by Category
      if (state.selectedCategory) {
        filtered = filtered.filter((item) => item.category === state.selectedCategory);
      }
  
      //   Search Filtering (Case Insensitive)
      if (state.searchQuery.trim() !== "") {
        filtered = filtered.filter((item) =>
          item.title.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
  
      //   Sorting Logic
      switch (state.sortOption) {
        case "Price-low-to-High":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "Price-High-to-Low":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "atoz":
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "ztoa":
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case "old-to-new":
          filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case "new-to-old":
          filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        default:
          break;
      }
  
      setFilteredData(filtered);
    }, [state, data]);
  
    return (
      <FilterContext.Provider value={{ state, dispatch, filteredData, loading, error }}>
        {children}
      </FilterContext.Provider>
    );
  };
  FilterProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  export const useFilterContext = () => useContext(FilterContext);
  
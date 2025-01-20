// import {
//   createContext,
//   useReducer,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { filterReducer, initialFilterState } from "../Reducer/filterReducer";

// const FilterContext = createContext();

// export const FilterProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(filterReducer, initialFilterState);
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   // Fetch data from the database
//   useEffect(() => {
//     fetch("/api/products") // Replace with your API endpoint
//       .then((response) => response.json())
//       .then((result) => setData(result))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   // Apply filters and sorting logic
//   useEffect(() => {
//     let filtered = [...data];

//     if (state.selectedMaterial) {
//       filtered = filtered.filter(
//         (item) => item.material === state.selectedMaterial
//       );
//     }

//     if (state.priceRange.min && state.priceRange.max) {
//       filtered = filtered.filter(
//         (item) =>
//           item.price >= Number(state.priceRange.min) &&
//           item.price <= Number(state.priceRange.max)
//       );
//     }

//     // Sort data
//     switch (state.sortOption) {
//       case "Price-low-to-High":
//         filtered.sort((a, b) => a.price - b.price);
//         break;
//       case "Price-High-to-Low":
//         filtered.sort((a, b) => b.price - a.price);
//         break;
//       case "atoz":
//         filtered.sort((a, b) => a.name.localeCompare(b.name));
//         break;
//       case "ztoa":
//         filtered.sort((a, b) => b.name.localeCompare(a.name));
//         break;
//       case "old-to-new":
//         filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
//         break;
//       case "new-to-old":
//         filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
//         break;
//       default:
//         break;
//     }

//     setFilteredData(filtered);
//   }, [state, data]);

//   return (
//     <FilterContext.Provider value={{ state, dispatch, filteredData }}>
//       {children}
//     </FilterContext.Provider>
//   );
// };

// export const useFilterContext = () => useContext(FilterContext);

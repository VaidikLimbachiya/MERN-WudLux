<<<<<<< HEAD
// export const initialFilterState = {
//     selectedMaterials: [], // Supports multiple selections
//     selectedCategory: "",
//     searchQuery: "",
//     priceRange: { min: null, max: null },
//     sortOption: "default",
//   };
  
//   export const filterReducer = (state, action) => {
//     switch (action.type) {
//       case "SET_MATERIAL":
//         return {
//           ...state,
//           selectedMaterials: action.payload, // Supports multiple selections
//         };
//       case "SET_CATEGORY":
//         return { ...state, selectedCategory: action.payload };
//       case "SET_SEARCH_QUERY":
//         return { ...state, searchQuery: action.payload };
//       case "SET_PRICE_RANGE":
//         return { ...state, priceRange: action.payload };
//       case "SET_SORT_OPTION":
//         return { ...state, sortOption: action.payload };
//       case "RESET_FILTERS":
//         return initialFilterState; // Fully resets filters
//       default:
//         return state;
//     }
//   };
=======
export const initialFilterState = {
    selectedMaterials: [], // Supports multiple selections
    selectedCategory: "",
    searchQuery: "",
    priceRange: { min: null, max: null },
    sortOption: "default",
  };
  
  export const filterReducer = (state, action) => {
    switch (action.type) {
      case "SET_MATERIAL":
        return {
          ...state,
<<<<<<< HEAD
          selectedMaterials: action.payload, //   Supports multiple selections
=======
          selectedMaterials: action.payload, // Supports multiple selections
>>>>>>> 335fefab1947c264ce085c2cd630dfb273119e0a
        };
      case "SET_CATEGORY":
        return { ...state, selectedCategory: action.payload };
      case "SET_SEARCH_QUERY":
        return { ...state, searchQuery: action.payload };
      case "SET_PRICE_RANGE":
        return { ...state, priceRange: action.payload };
      case "SET_SORT_OPTION":
        return { ...state, sortOption: action.payload };
      case "RESET_FILTERS":
<<<<<<< HEAD
        return initialFilterState; //   Fully resets filters
=======
        return initialFilterState; // Fully resets filters
>>>>>>> 335fefab1947c264ce085c2cd630dfb273119e0a
      default:
        return state;
    }
  };
>>>>>>> dab1c22ff97df1574679dc3c0b48a362e89fab14
  
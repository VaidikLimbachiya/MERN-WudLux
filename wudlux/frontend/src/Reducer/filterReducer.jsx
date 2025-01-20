// export const initialFilterState = {
//   selectedMaterial: "",
//   priceRange: { min: "", max: "" },
//   sortOption: "Featured", // Default sort option
//   activeFilters: [],
// };

// export function filterReducer(state, action) {
//   switch (action.type) {
//     case "SET_MATERIAL":
//       return { ...state, selectedMaterial: action.payload };
//     case "SET_PRICE_RANGE":
//       return { ...state, priceRange: action.payload };
//     case "SET_SORT_OPTION":
//       return { ...state, sortOption: action.payload };
//     case "APPLY_FILTERS": {
//       const newFilters = [];
//       if (state.selectedMaterial) {
//         newFilters.push({ id: 1, text: state.selectedMaterial });
//       }
//       if (state.priceRange.min && state.priceRange.max) {
//         newFilters.push({
//           id: 2,
//           text: `Min ₹${state.priceRange.min} - Max ₹${state.priceRange.max}`,
//         });
//       }
//       return { ...state, activeFilters: newFilters };
//     }
//     case "RESET_FILTERS":
//       return initialFilterState;
//     default:
//       return state;
//   }
// }

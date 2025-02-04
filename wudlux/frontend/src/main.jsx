import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Context/CartContext"; 
import { UserProvider } from "./Context/UserContext"; 
// import { FilterProvider } from "./Context/FilterContext"; 
import { AuthProvider } from "./Context/AuthContext"; // ✅ Import AuthProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* ✅ Wrap everything inside AuthProvider */}
        <UserProvider>
          <CartProvider>
<<<<<<< HEAD
            <FilterProvider>
=======
            {/* <FilterProvider>  */}
>>>>>>> a22aabe8579dd0b157150b77a46b9dbef0817d5d
              <App />
            {/* </FilterProvider> */}
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

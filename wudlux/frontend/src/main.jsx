import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Context/CartContext"; 
import { UserProvider } from "./Context/UserContext"; 
// import { FilterProvider } from "./Context/FilterContext"; 
<<<<<<< HEAD
import { AuthProvider } from "./Context/AuthContext"; //   Import AuthProvider
=======
import { AuthProvider } from "./Context/AuthContext"; // Import AuthProvider
<<<<<<< HEAD
import { FilterProvider } from "./Context/FilterContext.jsx";
=======
>>>>>>> 335fefab1947c264ce085c2cd630dfb273119e0a
>>>>>>> 8a8284ad4aed5916aaf81c852225f8f4da60f150

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {" "}
<<<<<<< HEAD
        {/*   Wrap everything inside AuthProvider */}
=======
        {/* Wrap everything inside AuthProvider */}
>>>>>>> 335fefab1947c264ce085c2cd630dfb273119e0a
        <UserProvider>
          <CartProvider>
            <FilterProvider> 
              <App />
            </FilterProvider>
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

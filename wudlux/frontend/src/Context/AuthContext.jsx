import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCartContext } from "../Context/CartContext";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem("user");
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
  
      if (storedUser && accessToken) {
        setUser(JSON.parse(storedUser));
      } else if (refreshToken) {
        await refreshAccessToken();
      }
    };
  
    initializeAuth();
  }, []);
  

  const login = async (userData, accessToken, refreshToken) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  
    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    if (guestCart.length > 0) {
      console.log("Merging guest cart into backend cart...");
  
      for (const item of guestCart) {
        await fetch("https://mern-wudlux-1-lss8.onrender.com/api/cart/add", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: item.productId,
            quantity: item.quantity,
          }),
        });
      }
  
      localStorage.removeItem("guestCart"); // Clear guest cart after merging
    }
  
    await fetchCart(); // 🔥 Immediately update the cart UI after login
    window.dispatchEvent(new Event("cartUpdated")); // 🔥 Notify other components to update
  
    navigate("/");
  };
  
  
  
  
  

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("guestCart");

    window.dispatchEvent(new Event("userLoggedOut")); // Broadcast logout globally
    navigate("/log-in");
};

  
  

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.log("No refresh token found, logging out.");
        return logout();
      }
  
      console.log("Attempting token refresh...");
  
      const response = await axios.post("/api/auth/refresh-token", {
        token: refreshToken,
      });
  
      console.log("Token refreshed successfully:", response.data);
  
      localStorage.setItem("accessToken", response.data.accessToken);
      setUser((prevUser) => ({ ...prevUser })); // Force re-render
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
    }
  };  

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user, // Dynamically derive it from user object
        login,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
  
};

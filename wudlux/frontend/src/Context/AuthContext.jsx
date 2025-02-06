import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");

    if (storedUser && accessToken) {
      setUser(JSON.parse(storedUser));
    } else if (localStorage.getItem("refreshToken")) {
      refreshAccessToken(); // Try refreshing token if available
    }
  }, []);

  const login = (userData, accessToken, refreshToken) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    navigate("/"); // Redirect to homepage after login
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.clear();
    navigate("/log-in");
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return logout();

      const response = await axios.post("/api/auth/refresh-token", {
        token: refreshToken,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      setUser((prevUser) => ({ ...prevUser })); // Update state to trigger re-render
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout(); // Logout if refresh fails
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

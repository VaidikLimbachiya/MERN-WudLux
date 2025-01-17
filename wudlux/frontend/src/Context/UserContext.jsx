import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create the UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log("Received userData in login:", userData);
    const completeUserData = {
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email: userData.email || "",
      address: userData.address || "",
      zipCode: userData.zipCode || "",
      state: userData.state || "",
      city: userData.city || "",
      phone: userData.phone || "",
    };

    setUser(completeUserData);
    localStorage.setItem("user", JSON.stringify(completeUserData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Simulate user data loading for testing purposes
      const userData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        address: "123 Main Street",
        zipCode: "123456",
        state: "Maharashtra",
        city: "Mumbai",
        phone: "1234567890",
      };
      login(userData); // Call after defining login
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);

export { UserContext };

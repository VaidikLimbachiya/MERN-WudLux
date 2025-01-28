import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create the UserContext
const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store user data
  const [token, setToken] = useState(null); // State to store auth token
  const [loading, setLoading] = useState(true); // Loading state for initialization

  // Login function to store user data and token
  const login = (userData, authToken) => {
    console.log("User data received for login:", userData);
  
    const completeUserData = {
      id: userData?.id || "",
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      address: {
        street: userData?.address?.street || "",
        city: userData?.address?.city || "",
        state: userData?.address?.state || "",
        zipCode: userData?.address?.zipCode || "",
        country: userData?.address?.country || "",
      },
      phoneNumber: userData?.phoneNumber || "",
      role: userData?.role || "user",
    };
  
    console.log("Complete user data:", completeUserData);
  
    setUser(completeUserData);
    setToken(authToken || null);
  
    localStorage.setItem("user", JSON.stringify(completeUserData));
    if (authToken) {
      localStorage.setItem("token", authToken);
    }
  };
  
  

  // Logout function to clear user data
  const logout = () => {
    console.log("Logging out user");
    setUser(null);
    setToken(null);

    // Clear local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Update user details dynamically
  const updateUser = (updatedData) => {
    console.log("Updating user data:", updatedData);
    const updatedUser = {
      ...user,
      ...updatedData, // Merge updated data with existing user data
      address: {
        ...user?.address, // Preserve existing address structure
        ...updatedData?.address,
      },
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Save updated data to local storage
  };

  // Initialize user data from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
  
    console.log("Stored user:", storedUser);
  
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
  
      const completeUserData = {
        id: parsedUser?.id || "",
        firstName: parsedUser?.firstName || "",
        lastName: parsedUser?.lastName || "",
        email: parsedUser?.email || "",
        address: {
          street: parsedUser?.address?.street || "",
          zipCode: parsedUser?.address?.zipCode || "",
          country: parsedUser?.address?.country || "",
          state: parsedUser?.address?.state || "",
          city: parsedUser?.address?.city || "",
        },
        phoneNumber: parsedUser?.phoneNumber || "",
        role: parsedUser?.role || "user",
      };
  
      setUser(completeUserData);
    }
  
    if (storedToken) {
      setToken(storedToken);
    }
  
    setLoading(false);
  }, []);
  

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
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

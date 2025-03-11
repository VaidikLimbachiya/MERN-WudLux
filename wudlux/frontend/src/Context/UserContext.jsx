import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    addresses: [], // Ensures `addresses` is always an array
    phoneNumber: "",
    role: "user",
  });

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData, authToken) => {
    console.log("User data received for login:", userData);

    const completeUserData = {
      id: userData?.id || "",
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      addresses: Array.isArray(userData?.addresses) ? userData.addresses : [],
      phoneNumber: userData?.phoneNumber || "",
      role: userData?.role || "user",
    };

    setUser(completeUserData);
    setToken(authToken || null);
    localStorage.setItem("user", JSON.stringify(completeUserData));
    if (authToken) {
      localStorage.setItem("token", authToken);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, token, loading, login }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserContext = () => useContext(UserContext);
export { UserContext };

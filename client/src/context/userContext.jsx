import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  

  useEffect(() => {
    const fetchUserData = async () => {

          try {
            const email = localStorage.getItem('email')
            const response = await axios.get(`https://portfolio-server-two-tawny.vercel.app/user/get-data/${email}`);
            const data = response.data;
            console.log("User Data:", data.payload);
            setUser(data.payload);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
        fetchUserData();
  }, [])
  const login = (userData) => {
    console.log("context",userData)
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context easily
export const useAuth = () => useContext(UserContext);

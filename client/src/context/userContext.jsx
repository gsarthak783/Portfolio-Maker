import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const email = firebaseUser.email;
        // Optional: remove localStorage.getItem, use email from Firebase
        const response = await axios.get(`https://portfolio-server-two-tawny.vercel.app/user/get-data/${email}`);
        const data = response.data;
        // console.log("User Data:", data.payload);

        setUser({
          email,
          uid: firebaseUser.uid,
          isVerified: data.payload?.isVerified,
          ...data.payload,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    console.log("context", userData);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(UserContext);

// components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/Firebase';
import { useAuth } from '../context/userContext';
import Spinner from '../components/Spinner';
import EmailVerify from '../components/EmailVerify';

const ProtectedRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const {user} = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (googleUser) => {
      setIsAuthenticated(!!googleUser);
      console.log("User email status:", user.isVerified);
      if (googleUser) {
        setEmailVerified(user.isVerified);
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked) return <Spinner />;

  return isAuthenticated && emailVerified ? children : isAuthenticated && !emailVerified? <EmailVerify/> : <Navigate to="/login" />;
};

export default ProtectedRoute;

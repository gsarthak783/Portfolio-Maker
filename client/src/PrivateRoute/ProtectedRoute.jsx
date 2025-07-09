import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/userContext";
import Spinner from "../components/Spinner";
import EmailVerify from "../components/EmailVerify";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!user) return <Navigate to="/login" />;

  if (!user.isVerified) return <EmailVerify />;

  return children;
};

export default ProtectedRoute;

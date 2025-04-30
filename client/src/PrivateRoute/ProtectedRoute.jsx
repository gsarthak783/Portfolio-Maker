import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/Firebase';
import Spinner from './Spinner';

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Spinner />;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

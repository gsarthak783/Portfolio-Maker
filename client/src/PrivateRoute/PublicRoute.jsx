import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/Firebase';
import Spinner from './Spinner';

const PublicRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Spinner />;

  return user ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;

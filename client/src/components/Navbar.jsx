import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useAuth } from '../context/userContext';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const {logout} = useAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    logout();
    localStorage.removeItem('name');
    localStorage.removeItem('email');
     localStorage.removeItem('gender');
    navigate('/');

  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50 ">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left Section: Home */}
        {!user ? (
          <Link to='/' className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300">
          Portfolio
        </Link>
        ) : (
          <Link to='dashboard' className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300">
            Portfolio
          </Link>
        )}

        {/* Right Section: Authentication Links */}
        <div className="flex items-center space-x-6">
          {!user ? (
            <>
              <Link
                to="/register"
                className="btn btn-outline btn-primary text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition duration-200"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="btn btn-outline btn-primary text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition duration-200"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <span className="text-lg font-semibold text-blue-600">{user?.displayName}</span>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-error text-red-600 font-semibold hover:bg-red-600 hover:text-white transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

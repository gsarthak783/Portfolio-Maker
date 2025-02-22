import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  let email = localStorage.getItem('email') || 'user';
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('name');
    localStorage.removeItem('email');
  };

  return (
    <nav className="bg-slate-700 p-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Home */}
        <Link to={`/${email}`} className="text-white font-bold text-lg">
          Home
        </Link>

        {/* Right Section: Other Links */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/register"
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg transition duration-200 hover:bg-blue-600"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg transition duration-200 hover:bg-blue-600"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {/* <button
                onClick={logout}
                className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg transition duration-200 hover:bg-red-600"
              >
                Logout
              </button> */}
            </>
          )}
          {/* <Link
            to="/experience"
            className="text-white font-bold text-lg px-4 py-2 transition duration-200 hover:text-slate-200"
          >
            Experience
          </Link>
          <Link
            to="/project"
            className="text-white font-bold text-lg px-4 py-2 transition duration-200 hover:text-slate-200"
          >
            Projects
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


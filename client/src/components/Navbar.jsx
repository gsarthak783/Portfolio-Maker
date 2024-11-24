import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // localStorage.setItem('name', currentUser.displayName);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('name');
  };

  return (
    <nav className="bg-slate-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold ">Home</Link>
        <div className="flex space-x-4 font-mono items-center">
          {user === null ? (
            <div className="flex space-x-4">
              <Link to="/register" className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg transition duration-200 hover:bg-yellow-600">Register</Link>
              <Link to="/login" className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg transition duration-200 hover:bg-yellow-600">Login</Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
               <span className="text-yellow-500 font-bold">{user.displayName}</span> 
              <button
                onClick={logout}
                className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg transition duration-200 hover:bg-yellow-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <Link to="/experience" className=" text-white font-bold px-4 py-2 transition duration-200 hover:text-slate-200">Experience</Link>
      </div>
    </nav>
  );
};

export default Navbar;

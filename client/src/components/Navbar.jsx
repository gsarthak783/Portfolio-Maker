import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/Firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useAuth } from '../context/userContext';
import Drawer from './Drawer';
import { Briefcase, Code2, User } from "lucide-react";
import LinkCard from "./LinkCard";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    setIsDrawerOpen(false)
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
          <Link to='/' className="text-2xl font-semibold text-gray-600  transition duration-300">
          ShowCaze
        </Link>
        ) : (
          <div className="flex items-center space-x-4">
        
        {/* Hamburger Button */}
        <button className=" border-0"onClick={() => setIsDrawerOpen((prev) => !prev)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* ShowCaze Link */}
        <Link
          to="/dashboard"
          className="text-2xl font-semibold text-gray-600 transition duration-300"
        >
          ShowCaze
        </Link>
      </div>
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
             
            </>
          )}
        </div>

        <Drawer
  isOpen={isDrawerOpen}
  onClose={() => setIsDrawerOpen(false)}
  side="left"
  width="w-64 sm:w-80 md:w-96"
>
  <h2 className="text-xl font-bold mb-4">Welcome, {user?.displayName}</h2>

          <div className="space-y-3">
  <LinkCard
    to="/dashboard"
    onClick={() => setIsDrawerOpen(false)}
    icon={<User className="h-6 w-6" />}
    title="Dashboard"
  />

  <LinkCard
    to="/personal-info"
    onClick={() => setIsDrawerOpen(false)}
    icon={<User className="h-6 w-6" />}
    title="Personal Info"
  />

  <LinkCard
    to="/experience-form"
    onClick={() => setIsDrawerOpen(false)}
    icon={<Briefcase className="h-6 w-6" />}
    title="Experience"
  />

  <LinkCard
    to="/project-form"
    onClick={() => setIsDrawerOpen(false)}
    icon={<Code2 className="h-6 w-6" />}
    title="Projects"
  />

  <LinkCard
    to="/education-form"
    onClick={() => setIsDrawerOpen(false)}
    icon={<User className="h-6 w-6" />}
    title="Education"
  />

  <LinkCard
    to="/certificate-form"
    onClick={() => setIsDrawerOpen(false)}
    icon={<User className="h-6 w-6" />}
    title="Certificates"
  />

  <LinkCard
    to="/footer-form"
    onClick={() => setIsDrawerOpen(false)}
    icon={<User className="h-6 w-6" />}
    title="Footer URLs"
  />
</div>

    <button
      onClick={handleLogout}
      className="btn btn-error btn-outline text-red-600 hover:text-white hover:bg-red-600 absolute bottom-3 left-1/2 transform -translate-x-1/2 transition duration-200"
    >
      Logout
    </button>

</Drawer>

      </div>

      

    </nav>
  );
};

export default Navbar;

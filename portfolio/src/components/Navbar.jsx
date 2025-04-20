import React, { useState } from "react";
import ThemeController from "./ThemeController";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isThemeControllerOpen, setIsThemeControllerOpen] = useState(false);
  const email = localStorage.getItem("email");

  const toggleThemeController = (event) => {
    event.preventDefault();
    setIsThemeControllerOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col ">
      {/* Navbar */}
      <nav className="navbar bg-base-100  px-4 fixed w-full z-50">
        <div className="flex-1">
          {/* Open Sidebar Button (Hamburger) */}
          <label htmlFor="nav-drawer" className="btn btn-square btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </label>
          <Link to={`/${email}`} className="btn btn-ghost text-xl">Portfolio</Link>
        </div>

        {/* Desktop Navigation Menu */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
            {/* <li><Link to={`/${email}`}>Home</Link></li> */}
            <li><Link to={`/${email}/experiences`}>Experience</Link></li>
            <li><Link to={`/${email}/projects`}>Projects</Link></li>
            <li><Link to={`/${email}/certificates`}>Certifications</Link></li>
            <li><Link to={`/${email}/resume`}>Resume</Link></li>
            <li><a onClick={toggleThemeController}>Theme</a></li>
          </ul>
        </div>
      </nav>

      {/* Sidebar Drawer */}
      <div className="drawer z-10">
        <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col pt-16">
          {/* Theme Controller */}
          <ThemeController
            className="rounded-t-none"
            isOpen={isThemeControllerOpen}
            close={() => setIsThemeControllerOpen(false)}
          />

        </div>

        {/* Sidebar Menu */}
        <div className="drawer-side">
          <label htmlFor="nav-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
            {/* Close Button (Hamburger) inside Sidebar */}
            <li className="mb-4">
              <label htmlFor="nav-drawer" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </label>
            </li>

            {/* <li><Link to={`/${email}`}>Home</Link></li> */}
            <li><Link to={`/${email}/experiences`}>Experience</Link></li>
            <li><Link to={`/${email}/projects`}>Projects</Link></li>
            <li><Link to={`/${email}/certificates`}>Certifications</Link></li>
            <li><a onClick={toggleThemeController}>Theme</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

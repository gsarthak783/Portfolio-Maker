import React, { useState } from 'react';
import ThemeController from './ThemeController';
import { useParams } from 'react-router-dom';

const Navbar = () => {
  const [isThemeControllerOpen, setIsThemeControllerOpen] = useState(false);

//   const { email } = useParams();
  const email = localStorage.getItem('email');

  const toggleThemeController = (event) => {
    event.preventDefault(); // Prevents page refresh
    setIsThemeControllerOpen((prev) => !prev);
    console.log(isThemeControllerOpen)
  

  };

  return (
    <nav className="navbar bg-base-100 relative">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a href='/' className="btn btn-ghost text-xl">Portfolio</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 ">
            <li><a href={`/${email}`} className="">Home</a></li>
            <li><a href={`/${email}/experiences`} className="">Experience</a></li>
            <li><a href={`/${email}/projects`} className="">Projects</a></li>
            <li>
              {/* Replaced <summary> with a button to fix refresh issue */}
              <a onClick={toggleThemeController} className="">
                Theme
              </a>
            </li>
          </ul>
        </div>
      </div>

     
      <ThemeController 
        className="rounded-t-none" 
        isOpen={isThemeControllerOpen} 
        close={() => setIsThemeControllerOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;

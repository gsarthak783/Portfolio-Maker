import React, { useState, useEffect, useRef } from 'react';

const themes = [
  "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "fantasy",
      "dracula",
      "cmyk",
      "night",
      "winter",
      "dim",
      "nord",
      "sunset",
];

const ThemeController = ({ isOpen, close }) => {
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme") || "light");
  const themeContainerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    // Close theme controller if clicked outside
    const handleClickOutside = (event) => {
      if (themeContainerRef.current && !themeContainerRef.current.contains(event.target)) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      ref={themeContainerRef}
      className="absolute top-20 right-0 p-4 bg-slate-100 rounded-lg shadow-lg z-10 "
    >
      
      <div className="grid grid-cols-4 gap-3">
        {themes.map((theme) => (
          <button
            key={theme}
            className="p-2 rounded-lg border-2 transition-all hover:scale-105  shadow-md border-gray-300"
            onClick={() => setCurrentTheme(theme)}
            data-theme={theme}
          >
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeController;

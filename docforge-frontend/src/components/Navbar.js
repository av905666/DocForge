import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const Navbar = ({ activeTool, setActiveTool, darkMode, setDarkMode }) => {
  const navItem = (tool, label) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${activeTool === tool
      ? "bg-green-600 text-white"
      : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">DocForge</h1>
        <button className="sm:hidden" >
          {/* Hamburger icon to toggle menu */}
          <FontAwesomeIcon icon={faBars} /></button>
          <div className="hidden sm:flex space-x-4">
            <button
              onClick={() => setActiveTool("merge")}
              className={navItem("merge", "Merge")}
            >
              Merge
            </button>

            <button
              onClick={() => setActiveTool("split")}
              className={navItem("split", "Split")}
            >
              Split
            </button>

            <button
              onClick={() => setActiveTool("watermark")}
              className={navItem("watermark", "Watermark")}
            >
              Watermark
            </button>

            <button
              onClick={() => setActiveTool("compress")}
              className={navItem("compress", "Compress")}
            >
              Compress
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 text-sm px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              {darkMode ? "Light" : "Dark"}
            </button>
        
        </div>
        </div>
    </nav>
  );
};

export default Navbar;
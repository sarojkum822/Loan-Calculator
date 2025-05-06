import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // For Sidebar toggle

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="flex justify-between border-b-2 items-center px-6 py-4 bg-sky-500 dark:bg-gray-900 text-white">
        <div className="text-2xl font-light">
          Loan Calculator
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 text-lg">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/exchange" className="hover:underline">Exchange Rates (Live)</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/404" className="hover:underline">Error Page</Link></li>
          </ul>
          <button 
            onClick={toggleDarkMode} 
            className="text-2xl ml-4"
            title="Toggle Dark Mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button 
          onClick={() => setIsOpen(true)} 
          className="text-2xl md:hidden"
        >
          ☰
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="block p-2 hover:bg-blue-100 text-blue-700 font-semibold" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/exchange" className="block p-2 hover:bg-blue-100" onClick={() => setIsOpen(false)}>
                Exchange Rates (Live)
              </Link>
            </li>
            <li>
              <Link to="/about" className="block p-2 hover:bg-blue-100" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/404" className="block p-2 hover:bg-blue-100" onClick={() => setIsOpen(false)}>
                Error Page
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;

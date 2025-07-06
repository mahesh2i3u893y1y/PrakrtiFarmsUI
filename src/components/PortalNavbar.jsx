import React from 'react';
import logo from '../assets/Prakrti_Farms_logo_Black-removebg-preview.png';

const PortalNavbar = ({ userName, toggleSidebar }) => {
  return (
    <div className="flex items-center font-poppins  justify-between px-6 py-4 bg-white shadow-md fixed top-0 left-0 w-full z-20 md:z-40">
      <img src={logo} alt="Logo" className="w-32 h-auto" />

      <div className="hidden md:block text-lg font-semibold text-gray-700">
        {userName}
      </div>

      {/* Hamburger for mobile */}
      <div className="md:hidden">
        <button onClick={toggleSidebar} className="text-gray-700 text-2xl font-bold cursor-pointer">
          ☰
        </button>
      </div>
    </div>
  );
};

export default PortalNavbar;

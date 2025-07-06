import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/Prakrti_Farms_logo_Black-removebg-preview.png';
import LoginPopup from './LoginPopup'; 

const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // 👈 For login popup

  const handleHome = () => {
    navigate("/")
  }

  return (
    <>
      <nav className="py-2 shadow-lg fixed top-0 left-0 w-full z-50 font-poppins bg-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <img src={logo} alt="logo" className="w-36 h-auto cursor-pointer" onClick={handleHome}  />

          {/* Desktop Links */}
          <div className="hidden md:flex justify-center items-center gap-6">
            <Link to="/aboutus" className="text-gray-700 font-semibold hover:text-[#31cc83] transition">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 font-semibold hover:text-[#31cc83]  transition">
              Contact
            </Link>
            <Link to="/products" className="text-gray-700 font-semibold hover:text-[#31cc83]  transition">
              Products
            </Link>
            <Link to="/reviews" className="text-gray-700 font-semibold hover:text-[#31cc83]  transition">
              Reviews
            </Link>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-[#31cc83] text-white font-semibold px-5 py-2 rounded-md cursor-pointer"
            >
              Login
            </button>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            {isOpen ? (
              <X className="h-7 w-7 cursor-pointer" onClick={() => setIsOpen(false)} />
            ) : (
              <Menu className="h-7 w-7 cursor-pointer" onClick={() => setIsOpen(true)} />
            )}
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 right-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          <div className="p-6 flex flex-col gap-6">
            <div className="flex justify-end mb-6">
              <X className="h-6 w-6 cursor-pointer" onClick={() => setIsOpen(false)} />
            </div>

            <Link to="/aboutus" className="text-gray-700 hover:text-blue-600 text-lg" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 text-lg" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 text-lg" onClick={() => setIsOpen(false)}>
              Products
            </Link>
            <Link to="/reviews" className="text-gray-700 hover:text-blue-600 text-lg" onClick={() => setIsOpen(false)}>
              Reviews
            </Link>
            <button
              onClick={() => {
                setShowLogin(true);
                setIsOpen(false);
              }}
              className="text-white rounded-lg px-4 py-2  bg-green-400 hover:bg-green-600 text text-lg text-start cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Render Login Popup */}
      {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Navbar;

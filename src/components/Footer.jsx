import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white px-6 py-10 font-poppins">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold mb-2">Prakrti Farms</h3>
          <p>
            Bringing you pure, natural, and chemical-free dairy and farm
            products — straight from our farm to your home.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="/aboutus" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/products" className="hover:underline">Our Products</a></li>
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>

        {/* Admin Login */}
        <div>
          <h4 className="font-semibold mb-2">Admin</h4>
          <ul>
            <li>
              <a href="/adminlogin" className="hover:underline">
                Admin Login
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-300"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-300"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-300"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="mt-10 border-t border-green-700 pt-4 text-center text-xs">
        © {new Date().getFullYear()} Prakrti Farms. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

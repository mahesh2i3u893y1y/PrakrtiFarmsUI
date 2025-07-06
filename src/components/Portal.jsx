import React, { useState } from 'react';
import PortalNavbar from '../components/PortalNavbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';

const Portal = () => {
  const userDetails = useSelector((state) => state.user.user)



  const [sidebarOpen, setSidebarOpen] = useState(false);
  
    if (!userDetails) return <LoadingSpinner/>
    const userName = userDetails.userName


  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <PortalNavbar
        userName={userName}
        toggleSidebar={() => setSidebarOpen(true)}
      />

      <Sidebar
        isOpen={sidebarOpen}
        userName={userName}
        closeSidebar={() => setSidebarOpen(false)}
      />

      {/* Main content changes based on route */}
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Portal;

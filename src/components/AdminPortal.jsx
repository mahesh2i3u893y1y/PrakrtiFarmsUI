import React, { useState } from 'react';

import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSideBar';

const AdminPortal = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  


  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <AdminNavbar
        toggleSidebar={() => setSidebarOpen(true)}
      />
      <AdminSidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      {/* Main content changes based on route */}
      <div className="md:ml-64 p-6 pt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPortal;

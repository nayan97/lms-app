import React, { useState } from "react";
import Sidebar from "../pages/Admin/Sidebar";
import Navbar from "../pages/Admin/Navbar";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer";
import Footer_Nav from "../pages/Shared/Footer_Nav";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // closed by default for mobile

  return (
    <div className="min-h-screen flex flex-col bg-white border border-blue-950">
      <div className="flex flex-1 max-w-7xl mx-auto w-full relative">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          <main className="p-4 lg:ml-10 flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="max-w-4xl lg:max-w-7xl mx-auto w-full mt-auto">
        <Footer_Nav />
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useState } from "react";
import Sidebar from "../pages/Admin/Sidebar";
import Navbar from "../pages/Admin/Navbar";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/Footer";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // console.log("Sidebar Open:", sidebarOpen);

  return (
    <>
      <div className="">
        <div className="flex h-screen max-w-7xl mx-auto bg-amber-50 border border-blue-950">
          <Sidebar isOpen={sidebarOpen} />
          <div className="flex-1 flex flex-col">
            <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <main className="p-4 flex-1 overflow-y-auto">
              <Outlet></Outlet>
            </main>
          </div>
        </div>

        <div className="max-w-4xl lg:max-w-7xl mx-auto mb-[-25px]">
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;

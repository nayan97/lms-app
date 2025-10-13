import React from "react";
import { Outlet } from "react-router";
import Header from "../pages/Shared/Header";
import Footer from "../pages/Shared/Footer";
import Footer_Nav from "../pages/Shared/Footer_Nav";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

const Layout = () => {
  const location = useLocation();
        const navigate = useNavigate();
        const page = location.pathname;
        console.log(page);
  return (
     <div className="bg-[#ff9100]">
  
      
      
      <div className="max-w-[1440px] mx-auto">
          <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;

import React from "react";
import { Outlet } from "react-router";
import Header from "../pages/Shared/Header";
import Footer from "../pages/Shared/Footer";

const Layout = () => {
  return (
    <div className="bg-[#ff9100]">
      <div className="max-w-4xl lg:max-w-[1440px] mx-auto">
        <Header></Header>
      
      </div>
      <div className="max-w-[1440px] mx-auto pt-16 mt-6">
          <Outlet></Outlet>
      </div>
      <div>
        <div className="mx-auto">
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;

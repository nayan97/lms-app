import React from "react";
import { Outlet } from "react-router";
import Header from "../pages/Shared/Header";
import Footer from "../pages/Shared/Footer";
import Footer_Nav from "../pages/Shared/Footer_Nav";

const Layout = () => {
  return (
    <div className="bg-[#ff9100]">
      <div className="max-w-4xl lg:max-w-[1440px] mx-auto">
        <Header showitem={false}></Header>
      
      </div>
      <div className="max-w-[1440px] mx-auto mt-2">
          <Outlet></Outlet>
      </div>
      <div>
        <div className="mx-auto">
          <Footer_Nav></Footer_Nav>
          {/* <Footer></Footer> */}
        </div>
      </div>
    </div>
  );
};

export default Layout;

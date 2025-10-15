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
      {page == "/"  && <div className="max-w-4xl lg:max-w-[1440px] mx-auto">
        <Header showitem={false}></Header>
        </div>} 
      
      
      <div className="lg:max-w-[1440px] mx-auto">
          <Outlet></Outlet>
      </div>
      <div>
        {page == "/" && <div className="mx-auto">
          <Footer_Nav></Footer_Nav>
          {/* <Footer></Footer> */}
        </div>}
        
      </div>
    </div>
  );
};

export default Layout;

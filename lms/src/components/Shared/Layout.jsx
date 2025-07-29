import React from "react";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="">
        <Header></Header>
        {children}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Layout;

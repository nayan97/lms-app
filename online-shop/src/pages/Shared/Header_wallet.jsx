import { t } from "i18next";
import React from "react";
import { Link, useLocation } from "react-router";
import { FaHistory } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";


const Header_wallet = () => {
  const location = useLocation();
  const page = location.pathname;
  

  // Get the last segment of the path
  const lastSegment = page.split("/").filter(Boolean).pop();
  console.log(lastSegment);

  return (
    <div>
      <div className="bg-[#ff9100] h-20 flex justify-around items-center gap-4 px-4">
        <Link
          to={"/wallet"}
          className="text-white bg-[#ff9100] p-3 rounded-full shadow-sm text-xl"
        >
          <FaArrowLeft />

        </Link>
        <h1 className="text-white mr-40 font-bold capitalize">
          {t(lastSegment || "wallet")}
        </h1>
        <div className="rounded-full p-3 shadow-sm text-white">
            <FaHistory />
        </div>

      </div>
    </div>
  );
};

export default Header_wallet;

import { t } from "i18next";
import React from "react";
import { Link, useLocation } from "react-router";

const Header_wallet = () => {
  const location = useLocation();
  const page = location.pathname;

  // Get the last segment of the path
  const lastSegment = page.split("/").filter(Boolean).pop();
  console.log(lastSegment);

  return (
    <div>
      <div className="bg-[#ff9100] h-20 flex items-center gap-4 px-4">
        <Link
          to={"/wallet"}
          className="text-white bg-[#ff9100] p-3 rounded-full shadow-sm text-xl"
        >
          ←
        </Link>
        <h1 className="text-white font-bold capitalize">
          {t(lastSegment || "wallet")}
        </h1>
      </div>
    </div>
  );
};

export default Header_wallet;

import React from "react";
import {
  BellIcon,
  HomeIcon,
  WalletIcon,
  UsersIcon,
  UserIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import logo from "../../../public/logo.png";
const Footer_Nav = () => {
    
  const { t } = useTranslation();
  return (
    <div className="fixed left-1/2 -translate-x-1/2 max-w-7xl h-[70px] text-gray-600 bottom-0  bg-white w-full p-2 border-t-2 border-gray-100 drop-shadow-2xl z-30">
      <nav className="btm-nav btm-nav-sm bg-white mt-auto flex justify-between items-center px-4">
        <Link
          to={"/"}
          className="hover:text-yellow-600 transition-colors flex flex-col items-center"
        >
          <HomeIcon className="w-5 h-5" />
          <span className="btm-nav-label text-xs">{t("Home")}</span>
        </Link>

        <Link to={"/wallet"} className="hover:text-yellow-500 transition-colors ml-10 flex flex-col items-center">
          <WalletIcon className="w-5 h-5" />
          <span className=" btm-nav-label text-xs">{t("Wallet")}</span>
        </Link>

        <Link
          to={"/shop"}
          className="bg-[#ff9100] object-fill drop-shadow-lg relative bottom-10 p-1 text-white rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
        >
          <img src={logo} className="w-12 h-12" />
        </Link>

        <Link to={"/mynetwork"} className="hover:text-yellow-500 mr-10 transition-colors flex flex-col items-center">
          <UsersIcon className="w-5 h-5" />
          <span className=" btm-nav-label break-words text-xs">
            <span>{t("My")}</span>
            <br />
            <span>{t("Network")}</span>{" "}
          </span>
        </Link>

        <Link to={"/profilepage"} className="hover:text-yellow-500 transition-colors flex flex-col items-center">
          <UserIcon className="w-5 h-5" />
          <span className="btm-nav-label text-xs">{t("Profile")}</span>
        </Link>
      </nav>
    </div>
  );
};

export default Footer_Nav;

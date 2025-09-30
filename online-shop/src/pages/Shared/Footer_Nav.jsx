import React from 'react';
import { BellIcon, HomeIcon, WalletIcon, UsersIcon, UserIcon, ShoppingBagIcon } from "lucide-react";
import { Link } from 'react-router';
const Footer_Nav = () => {
    return (
        <div className="fixed text-gray-600 bottom-0 left-0 bg-white w-full p-2 border-t-2 border-gray-100 shadow-sm z-50">
            <nav className="btm-nav btm-nav-sm bg-white shadow-lg mt-auto flex justify-between items-center px-4">
  <Link to={"/"} className="hover:text-yellow-600 transition-colors flex flex-col items-center">
     
    <HomeIcon className="w-6 h-6" />
    <span className="btm-nav-label text-xs">Home</span>
  </Link>

  <button className="hover:text-yellow-500 transition-colors flex flex-col items-center">
    <WalletIcon className="w-6 h-6" />
    <span className="btm-nav-label text-xs">Wallet</span>
  </button>

  <Link
    to={"shop"}
    className="bg-yellow-500 drop-shadow-sm absolute left-45 bottom-10 btn text-white rounded-full p-3 -mt-6 shadow-lg hover:bg-yellow-600 transition-colors"
  >
    <ShoppingBagIcon className="w-6 h-6" />
  </Link>

  <button className="hover:text-yellow-500 transition-colors flex flex-col items-center">
    <UsersIcon className="w-6 h-6" />
    <span className="btm-nav-label text-xs">My Network</span>
  </button>

  <button className="hover:text-yellow-500 transition-colors flex flex-col items-center">
    <UserIcon className="w-6 h-6" />
    <span className="btm-nav-label text-xs">Profile</span>
  </button>
</nav>
        </div>
    );
};

export default Footer_Nav;
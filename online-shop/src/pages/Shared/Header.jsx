import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import { IoCartOutline } from "react-icons/io5";
import { FaDownLong } from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { BellIcon } from "lucide-react";
import { useTranslation } from "react-i18next";


const Header = ({ showitem }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const axiosSecure = useAxiosSecure();
  const [cartCount, setCartCount] = useState(0);
  const [show, setShowitem] = useState(true);



  useEffect(() => {
    setShowitem(showitem);
  }, [show]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axiosSecure.get("/cart"); // API endpoint
        if (data.success) {
          setCartCount(data.cartItems.length);
        }
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };

    fetchCart();
  }, [axiosSecure]);

  const handleLogout = () => {
    logout()
      .then(() => {
        console.log("logout successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Navlinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-gray-900 font-bold my-2" : "my-2 text-white"
          }
        >
          {t("Home")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? "text-gray-900 font-bold my-2" : "my-2 text-white"
          }
        >
         {t("Shop")} 
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? "text-gray-900 font-bold my-2" : "my-2 text-white"
          }
        >
          {t("Wishlist")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? "text-gray-900 font-bold my-2" : "my-2 text-white"
          }
        >
         {t("OrderHistory")} 
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? "text-gray-900 font-bold my-2" : "my-2 text-white"
          }
        >
          {t("Transaction History")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? "text-gray-900 font-bold my-2" : "my-2 text-white"
          }
        >
          {t("AddBalance")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? "text-gray-900 font-bold my-2" : "my-2 text-white"
          }
        >
         {t("Withdrawl")}
        </NavLink>
      </li>
    </>
  );
  const Menulinks = (
    <>
      <li>
         {user ? (
          <>
            {" "}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">{user.displayName}</a>
                </li>
                <li>
                  <a className="justify-between">{user.email}</a>
                </li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  {" "}
                  <button className="" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <NavLink className="btn" to="/login">
              Login
            </NavLink>
            <NavLink className="btn btn-success text-white" to="/register">
              Register
            </NavLink>
          </>
        )}
      </li>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-gray-900 font-bold my-2" : "my-2"
          }
        >
          {t("Home")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? "text-gray-900 font-bold my-2" : "my-2"
          }
        >
          {t("Shop")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? "text-gray-900 font-bold my-2" : "my-2"
          }
        >
          {t("Wishlist")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/order-history"
          className={({ isActive }) =>
            isActive ? "text-gray-900 font-bold my-2" : "my-2"
          }
        >
          {t("OrderHistory")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/transaction-history"
          className={({ isActive }) =>
            isActive ? "text-gray-900 font-bold my-2" : "my-2"
          }
        >
          {t("TransactionHistory")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-balance"
          className={({ isActive }) =>
            isActive ? "text-gray-900 font-bold my-2" : "my-2"
          }
        >
          {t("AddBalance")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/withdrawl"
          className={({ isActive }) =>
            isActive ? "text-gray-900 font-bold my-2" : "my-2"
          }
        >
          {t("Withdrawl")}
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost text-white lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm bg-base-100 dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {Menulinks}
          </ul>
        </div>
        <Link className="text-white" to="/">{t("LifeChange")}</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Navlinks}</ul>
      </div>
      <div className="navbar-end space-x-2">
        

        <LanguageSwitcher />
        <div>
          <ul className="flex items-end space-x-1">
            <div className="relative">
          <button className="btn btn-circle btn-sm bg-white text-yellow-500 border-0">
            <BellIcon className="w-5 h-5" />
          </button>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            1
          </span>
        </div>
            {showitem && (
            <li>
              
        <li>
          <Link
            to="/my-cart"
            className="relative w-10 h-10 flex items-center justify-center rounded-full shadow-lg bg-amber-400"
          >
            <IoCartOutline className="text-2xl text-white" />
            <span className="badge badge-sm bg-white absolute -top-1 -right-1">
              {cartCount ?? 0}
            </span>
          </Link>
        </li>
     
            </li>
             )}
             {showitem && (
            <li>
              <Link
                to="/wishlist"
                className="relative w-10 h-10 flex items-center justify-center rounded-full shadow-lg bg-amber-400"
              >
                <FaDownLong className="text-2xl text-white" />
              </Link>
            </li>
            )}
          </ul>
        </div>
    
       
      </div>
    </div>
  );
};

export default Header;

import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { IoCartOutline, IoLanguageOutline } from "react-icons/io5";
import { FaDownLong } from "react-icons/fa6";
import { ArrowBigDownDash, BellIcon, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { IoWalletOutline } from "react-icons/io5";
import { FaHistory, FaSignOutAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import Swal from "sweetalert2";

const Header = ({ showitem }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
   

  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();
  const page = location.pathname;

  const [show, setShowItem] = useState(showitem);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update showitem prop
  useEffect(() => {
    setShowItem(showitem);
  }, [showitem]);

  // Fetch cart count
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axiosSecure.get("/cart");
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
      // Show SweetAlert success message
      Swal.fire({
        icon: "success",
        title: "Logged out",
        text: "You have successfully logged out.",
        timer: 2000,
        showConfirmButton: false,
      });

      // Navigate to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    })
    .catch((err) => {
      console.error(err);
      // Optional: Show error alert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Logout failed. Please try again.",
      });
    });
};
  const referCode = "45425486";

  const handleCopy = () => {
    navigator.clipboard.writeText(referCode);
    console.log("Copied code!");
    // Optional: nice feedback
    alert("Refer code copied!");
  };
 const Navlinks = (
  <>
   <span className="pt-5" > <span className="p-3">{t("Account")}</span>
    <li>
      <NavLink
        to="/order-history"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold flex items-center gap-2" : " flex items-center gap-2"
        }
      >
        <FaHistory size={15}/> {t("OrderHistory")}
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/transaction-history"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold  flex items-center gap-2" : " flex items-center gap-2"
        }
      >
        <IoWalletOutline size={15} /> {t("TransactionHistory")}
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/add-balance"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold  flex items-center gap-2" : " flex items-center gap-2"
        }
      >
        <MdAttachMoney size={15} /> {t("AddBalance")}
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/withdrawl"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold  flex items-center gap-2" : " flex items-center gap-2"
        }
      >
        <MdAttachMoney size={15} /> {t("Withdrawl")}
      </NavLink>
    </li>
    </span>
    <span className="pt-3" > <span className="p-3">{t("Language")}</span>
    <li>
      <div className="flex">
        <span><IoLanguageOutline size={15} className="text-yellow-500" /></span>
        <LanguageSwitcher />
      </div>
      
      
    </li>
    </span>
    <span className="pt-5"> <span className="p-3">{t("Logout")}</span>
    <li>
      <NavLink
        onClick={handleLogout}
        className={({ isActive }) =>
          isActive ? "text-red-900 font-bold  flex items-center gap-2" : " flex items-center gap-2"
        }
      >
        <FaSignOutAlt size={15} /> {t("Logout")}
      </NavLink>
    </li>
    </span>
  </>
);
  return (
    <div className="navbar bg-[#ff9100]   ">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center">
        {/* Hamburger icon for mobile */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="btn text-white btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </button>

        {/* Logo */}
        {page=="/" && <Link className="ml-2 text-xl text-white font-bold" to="/">
          {t("LifeChange")}
        </Link>}
        {page=="/wallet" && <Link className="ml-2 text-xl text-white font-bold" to="/">
          {t("Wallet")}
        </Link>}
      </div>

      {/* Navbar Center (Large screens) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Navlinks}</ul>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu + Overlay */}
      {openMenu && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setOpenMenu(false)}
            className="fixed inset-0 bg-black/50 z-40"
          ></div>

          {/* Sidebar Menu */}
          <ul
            ref={menuRef}
            className="menu p-0 menu-sm bg-base-100 fixed top-0 left-0 h-screen w-64 z-50 
                 shadow overflow-y-auto transform transition-transform duration-300"
          >
            <div>
              <div className="flex justify-between items-center ">
                <div className="bg-yellow-500 w-full h-full text-white p-2 flex flex-col justify-start">
                  <div className="flex flex-col items-start gap-4 ">
                    <div className="avatar mr-3">
                      <div className="w-10 h-10 rounded-full ring ring-white ring-offset-1 overflow-hidden">
                        <img
                          src="https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
                          alt="User Profile"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg";
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-bold leading-none">
                        Md. ÃL~Ãmĩn
                      </p>
                      <div className="flex items-center text-white">
                        <span>Refer Code: {referCode}</span>
                        <Copy
                          onClick={handleCopy}
                          className="size-4 ml-2 cursor-pointer text-white transition"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {Navlinks}
          </ul>
        </>
      )}

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-2">
        

        {/* Notification bell */}
       {page!=="/wallet" && <div className="relative">
          <button className="btn btn-circle btn-sm bg-[#ff9100] text-white border-0">
            <BellIcon className="w-5 h-5" />
          </button>
          <span className="absolute text-white top-0 right-0 bg-red-500  text-xs w-5 h-5 rounded-full flex items-center justify-center">
            1
          </span>
        </div>}
        {page=="/wallet" && 
          <div className="rounded-full p-3 shadow-sm text-white">
                      <FaHistory />
                  </div>
         }

        {/* Cart & Wishlist */}
        {show && (
          <>
            <Link
              to="/my-cart"
              className="relative w-10 h-10 flex items-center justify-center rounded-full shadow-lg bg-amber-400"
            >
              <IoCartOutline className="text-2xl " />
              <span className="badge badge-sm bg-white absolute -top-1 -right-1">
                {cartCount ?? 0}
              </span>
            </Link>

            <Link
              to="/wishlist"
              className="relative w-10 h-10 flex items-center justify-center rounded-full shadow-lg bg-amber-400"
            >
              <FaDownLong className="text-2xl " />
            </Link>
          </>
        )}

        {/* Arrow icon for specific pages */}
        {page.startsWith("/shop/") && (
          <div className="bg-white rounded-full p-1 text-yellow-500">
            <ArrowBigDownDash />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

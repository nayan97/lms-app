import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { IoCartOutline, IoLanguageOutline } from "react-icons/io5";
import { FaDownLong } from "react-icons/fa6";
import { ArrowBigDownDash, BellIcon, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CiHeart } from "react-icons/ci";
import { FaHistory, FaSignOutAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import help from "../../assets/help.png"
import facebook from "../../assets/fb.png"
import telegram from "../../assets/telegram.png"
import historyimg from "../../assets/history.png"
import balanceimg from "../../assets/balance.png"
import withdrawlimg from "../../assets/withdraw.png"
import orderhistoryimg from "../../assets/orderhistory.png"
import logoutimg from "../../assets/logout.png"

const Header_shop = ({ showitem }) => {
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
  const [profile, setProfile] = useState(null);
  console.log(profile);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch user data for profile image,name and refercode
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosSecure.get("/profile");
        // assuming API returns something like: { user: {...}, image: "..." }
        setProfile(response.data.user || response.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
         title: t("logout_title"),
  text: t("logout_message"),
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
          title: t("logout_error_title"),
    text: t("logout_error_message"),
        });
      });
  };
  const referCode = profile?.code;

  const handleCopy = () => {
    navigator.clipboard.writeText(referCode);
    console.log("Copied code!");
    // Optional: nice feedback
    alert("Refer code copied!");
  };
  const Navlinks = (
   <>
   <span className="pt-5" > <span className="font-bold text-md p-4">{t("Account")}</span>
    <li>
      <NavLink
        to="/order-history"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold flex items-center gap-2" : " flex text-lg p-3 items-center gap-2"
        }
      >
       <img className="w-6" src={orderhistoryimg}></img>{t("OrderHistory")}
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/transaction-history"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold  flex items-center gap-2" : " flex text-lg p-3 items-center gap-2"
        }
      >
        <img className="w-6" src={historyimg}></img> {t("TransactionHistory")}
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/addbalance"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold  flex items-center gap-2" : " flex text-lg p-3 items-center gap-2"
        }
      >
        <img className="w-6" src={balanceimg}></img> {t("AddBalance")}
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/withdrawl"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold  flex items-center gap-2" : " flex text-lg p-3 items-center gap-2"
        }
      >
        <img className="w-6" src={withdrawlimg}></img> {t("Withdrawl")}
      </NavLink>
    </li>
    </span>
   <span className="pt-5" > <span className="font-bold text-md p-4">{t("Support")}</span>
    <li>
      <NavLink
        to="/support"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold flex items-center gap-2" : " flex text-lg p-3 items-center gap-2"
        }
      >
       <img className="w-6" src={help}></img>{t("Helpcenter")}
      </NavLink>
    </li>
    <li>
      <NavLink
        to="https://t.me/+8g9iSB9QBo0zZjZl"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold  flex items-center gap-2" : " flex text-lg p-3 items-center gap-2"
        }
      >
        <img className="w-6" src={telegram}></img> {t("Telegramgroup")}
      </NavLink>
    </li>
    <li>
      <NavLink
        to="https://www.facebook.com/groups/1652606692365478/?ref=share_group_link&rdid=wezxRuNRR7pvYkcM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Fg%2F1A21B55pHp%2F#"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold  flex items-center gap-2" : " flex text-lg p-3 items-center gap-2"
        }
      >
        <img className="w-6" src={facebook}></img> {t("Facebookgroup")}
      </NavLink>
    </li>
    </span>
    <span className="pt-3" > <span className="font-bold text-md p-4">{t("Language")}</span>
    <li>
      <div className="flex">
        <span><IoLanguageOutline size={15} className="text-yellow-500" /></span>
        <LanguageSwitcher />
      </div>
      
      
    </li>
    </span>
    <span className="pt-5"> <span className="font-bold text-md p-4">{t("Logout")}</span>
      <li>
      <NavLink
        onClick={handleLogout}
        className={({ isActive }) =>
          isActive ? "text-red-900 font-bold text-lg flex items-center gap-2" : " flex text-lg p-3 items-center gap-2"
        }
      >
        <img className="w-6" src={logoutimg}></img> {t("Logout")}
      </NavLink>
    </li>
    </span>
  </>
  );
  const Navlinkslarge = (
    <>
  
    <li className="bg-white flex justify-center rounded-xl m-2">
      <NavLink
        to="/order-history"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold flex items-center gap-2" : " flex items-center gap-2"
        }
      >
         {t("OrderHistory")}
      </NavLink>
    </li>
    <li className="bg-white flex justify-center rounded-xl m-2">
      <NavLink
        to="/transaction-history"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold  flex items-center gap-2" : " flex items-center gap-2"
        }
      >
         {t("TransactionHistory")}
      </NavLink>
    </li>
    <li className="bg-white  flex justify-center rounded-xl m-2">
      <NavLink
        to="/addbalance"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold  flex items-center gap-2" : " flex items-center gap-2"
        }
      >
         {t("AddBalance")}
      </NavLink>
    </li>
    <li className="bg-white  flex justify-center rounded-xl m-2">
      <NavLink
        to="/withdrawl"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold  flex items-center gap-2" : " flex items-center gap-2"
        }
      >
       {t("Withdrawl")}
      </NavLink>
    </li>
   
    <li className="bg-white  flex justify-center rounded-xl m-2">
      <div className="flex">
        <span><IoLanguageOutline size={15} className="text-yellow-500" /></span>
        <LanguageSwitcher />
      </div>
      
      
    </li>
   
   
      <li className="bg-white  flex justify-center rounded-xl m-2">
      <NavLink
        onClick={handleLogout}
        className={({ isActive }) =>
          isActive ? "text-red-900 font-bold  flex items-center gap-2" : " flex items-center gap-2"
        }
      >
         {t("Logout")}
      </NavLink>
    </li>
    
  </>
  );

  return (
    <div className="navbar mx-auto max-w-7xl bg-[#ff9100]   ">
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
        <Link className="ml-2 text-xl text-white font-bold" to="/">
          {t("Shop")}
        </Link>
      </div>

      {/* Navbar Center (Large screens) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Navlinkslarge}</ul>
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
                <div className="bg-[#ff9100] w-full h-full text-white p-2 flex flex-col justify-start">
                  <div className="flex flex-col items-start gap-4 ">
                    <div className="avatar mr-3">
                      <div className="w-10 h-10 rounded-full ring ring-white ring-offset-1 overflow-hidden">
                        <img
                          src={profile?.avatar_url}
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
                        {profile?.name}
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
        {!show && <LanguageSwitcher />}

        {/* Notification bell */}
        {!show && (
          <div className="relative">
            <button className="btn btn-circle btn-sm bg-white text-yellow-500 border-0">
              <BellIcon className="w-5 h-5" />
            </button>
            <span className="absolute top-0 right-0 bg-red-500  text-xs w-5 h-5 rounded-full flex items-center justify-center">
              1
            </span>
          </div>
        )}

        {/* Cart & Wishlist */}
        {show && (
          <>
            <Link
              to="/wishlist"
              className="relative w-10 h-10 flex text-white items-center justify-center rounded-full shadow-lg bg-[#ff9100]"
            >
              <CiHeart size={20} className="text-2xl" />
            </Link>

            <Link
              to="/my-cart"
              className="relative w-10 h-10 text-white flex items-center justify-center rounded-full shadow-lg bg-[#ff9100]"
            >
              <IoCartOutline className="text-2xl " />
              <span className="badge badge-sm border-none text-white bg-red-600 absolute -top-1 -right-1">
                {cartCount ?? 0}
              </span>
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

export default Header_shop;

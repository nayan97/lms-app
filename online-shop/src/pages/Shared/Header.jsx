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
import help from "../../assets/help.png"
import facebook from "../../assets/fb.png"
import telegram from "../../assets/telegram.png"
import historyimg from "../../assets/history.png"
import balanceimg from "../../assets/balance.png"
import withdrawlimg from "../../assets/withdraw.png"
import orderhistoryimg from "../../assets/orderhistory.png"
import logoutimg from "../../assets/logout.png"


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
  const [profile, setProfile] = useState(null);
  console.log(profile);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showNotice, setShowNotice] = useState(false);



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
  const referCode = profile?.referred_code;

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
        to="/commingsoon"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold flex items-center gap-2" : " flex text-lg p-3 items-center gap-2"
        }
      >
       <img className="w-6" src={help}></img>{t("Helpcenter")}
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/commingsoon"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold  flex items-center gap-2" : " flex text-lg p-3 items-center gap-2"
        }
      >
        <img className="w-6" src={telegram}></img> {t("Telegramgroup")}
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/commingsoon"
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
    <div className="navbar bg-[#ff9100] mx-auto max-w-7xl ">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center">
        {/* Hamburger icon for mobile */}
        {user && <button
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
        </button>}

        {/* Logo */}
        {page=="/" && <div className="flex gap-3">
          <Link to="/">
          <img  className="hidden lg:block w-13" src="/logo.png" alt="" />
          </Link>
          
          <Link className="ml-2 block lg:hidden text-xl text-white font-bold" to="/">
          {t("LifeChange")}

        </Link>

        </div> }
        {page=="/wallet" && <Link className="ml-2 text-xl text-white font-bold" to="/">
          {t("Wallet")}
        </Link>}
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
                      <div className="w-13 h-13  rounded-full ring ring-white ring-offset-1 overflow-hidden">
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
                      <p className="text-lg p-1 font-bold leading-none">
                        {profile?.name}
                      </p>
                      <div className="flex p-1 items-center text-white">
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
        
       <button
  onClick={() => setShowNotice(true)}
  className="btn btn-circle btn-sm bg-[#ff9100] text-white border-0"
>
  <BellIcon className="w-10 h-10" />
</button>
          <span className="absolute text-white -top-3 -right-3 bg-red-500  text-xs w-5 h-5 rounded-full flex items-center justify-center">
            1
          </span>
          
        </div>}
        {page=="/wallet" && 
          <div className="rounded-full p-3 shadow-sm text-white">
             <Link to={"/incomehistory"}>
              <FaHistory />
             </Link>
                     
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
       {/* ✅ Life Good Notice Modal */}
      {showNotice && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999]">
          <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-lg overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setShowNotice(false)}
              className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center"
            >
              ✕
            </button>

            <div className=" text-center">
              
              <h2 className="text-xl font-bold p-3 text-gray-800 mb-3">Life Change Global Business</h2>
              <div className="bg-[#ff9100] ">
                <img src="/offer.png" alt="Life Good Logo" className="w-30 h-30  mx-auto mb-2" />
              </div>
               <div className="p-5">
                
             
              <div className="text-gray-700 text-left space-y-3">
                <p>💎 আপনাকে স্বাগতম লাইফ চেঞ্জ গ্লোবাল বিজনেস কোম্পানিতে!</p>
                <p>বাংলাদেশের সরকারিভাবে নিবন্ধিত ও বিশ্বস্ত এই প্রতিষ্ঠানে ইতোমধ্যে প্রায় ৭ লক্ষাধিক গ্রাহক সফলতার সাথে কাজ করছেন।</p>
                <p>🚀 বর্তমানে লাইফ চেঞ্জ-এ রয়েছে ১৮টি ইনকাম প্রজেক্ট...</p>
                <p>💥 ইনশাআল্লাহ খুব শীঘ্রই আরো কিছু চমকপ্রদ নতুন প্রজেক্ট যুক্ত হচ্ছে...</p>
                <p>👉 আমাদের অফিসিয়াল ফেসবুক গ্রুপে যুক্ত হোন:</p>
                <a
                  href="https://www.facebook.com/share/g/1HVLNaGK8d/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  https://www.facebook.com/share/g/1HVLNaGK8d/
                </a>
              </div>

               </div>
              
            </div>
          </div>
        </div>
      )}
      {/* ✅ End of Modal */}
    </div>
  );
};

export default Header;

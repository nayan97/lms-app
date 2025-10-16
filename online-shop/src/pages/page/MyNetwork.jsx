import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle, FaHome, FaShoppingBag, FaWallet, FaUsers } from "react-icons/fa";
import Footer_Nav from './../Shared/Footer_Nav';
import { t } from "i18next";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import { Copy } from "lucide-react";
import help from "../../assets/help.png"
import facebook from "../../assets/fb.png"
import telegram from "../../assets/telegram.png"
import historyimg from "../../assets/history.png"
import balanceimg from "../../assets/balance.png"
import withdrawlimg from "../../assets/withdraw.png"
import orderhistoryimg from "../../assets/orderhistory.png"
import logoutimg from "../../assets/logout.png"
import { IoLanguageOutline } from "react-icons/io5";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const MyNetwork = () => {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();
  

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



  const handleLogout = () => {
    logout()
      .then(() => console.log("Logout successful"))
      .catch((err) => console.log(err));
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
        to="comingsoon"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold flex items-center gap-2" : " flex text-lg p-3 items-center gap-2"
        }
      >
       <img className="w-6" src={help}></img>{t("Helpcenter")}
      </NavLink>
    </li>
    <li>
      <NavLink
        to="comingsoon"
        className={({ isActive }) =>
          isActive ? "text-gray-900 font-bold  flex items-center gap-2" : " flex text-lg p-3 items-center gap-2"
        }
      >
        <img className="w-6" src={telegram}></img> {t("Telegramgroup")}
      </NavLink>
    </li>
    <li>
      <NavLink
        to="comingsoon"
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

  const networkData = [
    {
      id: 1,
      name: "ফারজানা আক্তার",
      phone: "01839571959",
      ref: "13485528",
      level: 2,
      verified: true,
      verifiedDate: "Oct 3, 2025 6:39 PM",
      registerDate: "Oct 2, 2025 7:58 PM",
      image: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 2,
      name: "মেঘলা",
      phone: "01972963792",
      ref: "14772635",
      level: 3,
      registerDate: "Oct 1, 2025 4:32 PM",
      image: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: 3,
      name: "Farjana Munni",
      phone: "01755709761",
      ref: "41596509",
      level: 3,
      registerDate: "Sep 30, 2025 8:13 PM",
      image: "https://i.pravatar.cc/100?img=3",
    },
    {
      id: 4,
      name: "সিফাত",
      phone: "01302435861",
      ref: "75225828",
      level: 4,
      registerDate: "Sep 28, 2025 10:00 PM",
      image: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: 5,
      name: "Sharmin",
      phone: "01627277630",
      ref: "51969486",
      level: 3,
      registerDate: "Sep 28, 2025 3:32 PM",
      image: "https://i.pravatar.cc/100?img=5",
    },
  ];

  const filtered = networkData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      item.ref.includes(search)
  );

  return (
    <div className="min-h-screen mx-auto lg:max-w-7xl bg-[#ff9100]">
      
      {/* Header */}
      <div className="navbar-start flex w-full items-center">
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
        <div className="flex w-full justify-around">
            <Link className="ml-2 text-xl text-white font-bold" to="/">
          {t("MyNetwork")}
        </Link>
        <Link to={"/profilepage"}>
        <FaUserCircle className="text-3xl  text-white" />
        </Link>
        

        </div>
      <div className="flex items-center justify-between px-4 py-4">
        <button  className="text-2xl text-white">
          <i className="fas fa-bars"></i>
        </button>
        
        
      </div>
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
                <p className="text-lg font-bold leading-none">Md. ÃL~Ãmĩn</p>
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

        
        
      </div>
      

     
      {/* List */}
      <div className="bg-gray-100 rounded-t-3xl mt-4 p-4 space-y-4">
         {/* Search */}
      <div className="px-4 bg-gray-100">
        <div className="relative">
          <input
            type="text"
            placeholder="রেফার কোড সার্চ করুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full rounded-full pl-10 bg-white"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-500 text-xl" />
        </div>
      </div>

        {filtered.length > 0 ? (
          filtered.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-xl shadow flex gap-4 items-center"
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-lg">{user.name}</h3>
                  {user.verified && (
                    <span className="text-blue-500 text-lg">✔️</span>
                  )}
                </div>
                <p className="text-gray-700">{user.phone}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">বেকারঃ</span> {user.ref}{" "}
                  <button
                    onClick={() => navigator.clipboard.writeText(user.ref)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    📋
                  </button>
                </p>
                <p className="text-sm text-gray-600">
                  Level {user.level}
                </p>
                {user.verifiedDate && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">ভেরিফাইড তারিখঃ</span>{" "}
                    {user.verifiedDate}
                  </p>
                )}
                <p className="text-sm text-gray-600">
                  <span className="font-medium">রেজিস্ট্রেশন তারিখঃ</span>{" "}
                  {user.registerDate}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-600 font-medium">
            কোন রেফার কোড পাওয়া যায়নি
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <Footer_Nav></Footer_Nav>
    </div>
  );
};

export default MyNetwork;

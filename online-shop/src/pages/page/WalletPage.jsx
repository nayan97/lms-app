import React from "react";
import Footer_Nav from "../Shared/Footer_Nav";
import Header from "../Shared/Header";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { t } from "i18next"; // ✅ import t

// --- Icon Component ---
const WalletIcon = ({ className = "h-5 w-5", fill = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" fill="none" stroke="currentColor" />
    <path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" fill="none" stroke="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
  </svg>
);

// --- List Item Component ---
const WalletFeatureItem = ({ label, Icon, link }) => (
  <div className="flex justify-between items-center py-2 w-full px-2 hover:bg-gray-50 transition-colors rounded-lg">
    <div className="flex items-center">
      <div className="bg-yellow-500/20 text-yellow-500 p-2 rounded-full mr-4">
        <div className="w-8 h-8 relative">
          <Icon />
        </div>
      </div>
      <span className="text-gray-800 text-lg font-medium">{t(label)}</span>
    </div>

    
      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
        <FaArrowRight />
      </div>
    
  </div>
);

// --- Main WalletPage Component ---
const WalletPage = () => {
  const currentBalance = "150.44৳";

  const menuItems = [
    { label: "SeeVoucherBalance", Icon: WalletIcon, link: "/wallet/voucherbalance" },
    { label: "TodayEarning", Icon: WalletIcon, link: "/wallet/earning" },
    { label: "YesterdayEarning", Icon: WalletIcon, link: "/wallet/earning" },
    { label: "7 Days Earning", Icon: WalletIcon, link: "/wallet/earning" },
    { label: "30 Days Earning", Icon: WalletIcon, link: "/wallet/earning" },
    { label: "All Time Earning", Icon: WalletIcon, link: "/wallet/earning" },
    { label: "Total Income Withdraw", Icon: WalletIcon, link: "/wallet/earning" },
  ];

  return (
    <div className="min-h-screen mb-10 bg-yellow-500 font-sans antialiased flex flex-col max-w-xl mx-auto">
      <Header />
      <main className="flex-1 w-full relative -mt-4 rounded-t-3xl bg-gray-100 shadow-2xl overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Wallet Balance Section */}
          <div className="flex flex-col bg-white rounded-2xl items-center justify-center p-8">
            <div className="w-40 h-40 relative">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" fill="none" className="w-full h-full">
                <rect x="50" y="100" width="400" height="300" rx="60" ry="60" fill="#FACC15" stroke="#333" strokeWidth="20" />
                <rect x="330" y="200" width="100" height="40" rx="20" ry="20" fill="#fff" stroke="#333" strokeWidth="10" />
                <circle cx="380" cy="220" r="15" fill="#FACC15" stroke="#333" strokeWidth="10" />
                <path d="M50 160 Q 150 50, 250 100 L 250 160 L 50 160 Z" fill="#FACC15" stroke="#333" strokeWidth="20" />
                <text x="250" y="270" textAnchor="middle" fontSize="55" fontWeight="bold" fill="#333">
                  {currentBalance.replace("৳", "")}
                </text>
                <text x="350" y="270" textAnchor="end" fontSize="55" fontWeight="bold" fill="#333">
                  ৳
                </text>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-700 mt-4">{t("currentbalance")}</h2>
          </div>

          {/* Feature List */}
          <div className="mt-8 space-y-1">
            {menuItems.map((item, index) => (
                <div className="bg-white rounded-2xl">

                    <Link
      to={item.link}
      state={{ name: item.label }}
      className=" hover:bg-yellow-100 rounded-full items-center transition-colors"
    >
<WalletFeatureItem
                key={index}
                label={item.label}
                Icon={item.Icon}
                link={item.link}
              />

    </Link>
                    
                </div>
              
            ))}
          </div>
        </div>
      </main>
      <Footer_Nav />
    </div>
  );
};

export default WalletPage;

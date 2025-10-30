import React from "react";
import Footer_Nav from "../Shared/Footer_Nav";
import Header from "../Shared/Header";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { t } from "i18next"; // ✅ import t
import walletimg from "../../assets/wallet.jpg";

// --- Icon Component ---
const WalletIcon = ({ className = "h-5 w-5", fill = "currentColor" }) => (
  <img src={walletimg} alt="" />
);

// --- List Item Component ---
const WalletFeatureItem = ({ label, Icon, link }) => (
  <div className="flex justify-between items-center py-2 w-full px-2 hover:bg-gray-50 transition-colors rounded-lg">
    <div className="flex items-center">
      <div className="bg-[#ff9100]/20 text-yellow-500 p-2 rounded-full mr-4">
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
    {
      label: "SeeVoucherBalance",
      Icon: WalletIcon,
      link: "/wallet/voucherbalance",
    },
    { label: "TodayEarning", Icon: WalletIcon, link: "/wallet/earning" },
    { label: "YesterdayEarning", Icon: WalletIcon, link: "/wallet/earning" },
    { label: "DaysEarning", Icon: WalletIcon, link: "/wallet/earning" },
    { label: "daysEarning", Icon: WalletIcon, link: "/wallet/earning" },
    { label: "AllTimeEarning", Icon: WalletIcon, link: "/wallet/earning" },
    { label: "TotalIncomeWithdraw", Icon: WalletIcon, link: "/wallet/earning" },
  ];

  return (
    <div className="min-h-screen mb-10 bg-[#ff9100] font-sans antialiased flex flex-col max-w-xl lg:max-w-7xl mx-auto">
      <Header />
      <main className="flex-1 w-full relative -mt-4 rounded-t-3xl bg-gray-100 shadow-2xl overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Wallet Balance Section */}
          <div className="flex flex-col bg-white rounded-2xl items-center justify-center p-8">
            <div className="relative w-60 h-60 flex items-center justify-center">
              {/* Wallet image */}
              <img
                src={walletimg}
                alt="wallet"
                className="w-full h-full object-contain"
              />

              {/* Balance text overlay */}
              <h1 className="absolute text-xl font-bold text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-8 pr-2">
                {currentBalance.replace("৳", "")}
              </h1>
            </div>
            <h2 className="text-xl font-bold text-gray-700 mt-4">
              {t("currentbalance")}
            </h2>
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

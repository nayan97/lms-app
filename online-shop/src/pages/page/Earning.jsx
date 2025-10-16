import React, { useEffect, useState } from 'react';
import Footer_Nav from '../Shared/Footer_Nav';
import Header from '../Shared/Header';
import { FaArrowRight } from 'react-icons/fa6';
import Header_wallet from '../Shared/Header_wallet';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next'; // ✅ import t()
import walletimg from "../../assets/wallet.png";

const WalletIcon = ({ className = 'h-5 w-5', fill = 'currentColor' }) => (
  <img src={walletimg} className='h-5 w-5' alt="" />
);

const WalletFeatureItem = ({ label, Icon }) => (
  <button 
    className="flex justify-between items-center w-full py-4 px-2 border-b border-gray-100 hover:bg-gray-50 transition-colors rounded-lg"
    onClick={() => console.log(`Clicked: ${label}`)}
  >
    <div className="flex items-center">
      <div className="bg-[#ff9100]/20 text-yellow-500 p-2 rounded-full mr-4">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-gray-800 text-lg font-medium">{label}</span>
    </div>
    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
      <FaArrowRight />
    </div>
  </button>
);

const Earning = () => {
  const { t } = useTranslation(); // ✅ initialize translation hook
  const location = useLocation();
  const rawPageName = location.state?.name || "Today Earning";

  // ✅ translate page name using t()
  const pageName = t(rawPageName);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  const date = new Date();
  const options = { month: "long", year: "numeric" };
  const monthYear = date.toLocaleDateString("en-US", options);
  const dayWithOrdinal = getOrdinal(date.getDate());
  const formattedDate = `${monthYear.split(" ")[0]} ${dayWithOrdinal} ${date.getFullYear()}`;
  const formattedTime = currentDateTime.toLocaleTimeString();
  const currentBalance = "150.44৳";

  return (
    <div className="min-h-screen lg:max-w-7xl mb-10 bg-[#ff9100] font-sans antialiased flex flex-col max-w-xl mx-auto">
      <Header_wallet />

      <main className="flex-1 w-full relative -mt-4 rounded-t-[50px] bg-white overflow-hidden">
        <div className="p-6 md:p-8 bg-gray-100">
          <div className="flex flex-col bg-white rounded-2xl items-center justify-center p-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <img src={walletimg} alt="wallet" className="w-full h-full object-contain" />
              <h1 className="absolute text-xl font-bold text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {currentBalance.replace("৳", "")}
              </h1>
            </div>

            {/* ✅ Translated page name */}
            <h2 className="text-xl font-bold text-gray-700 mt-4">{pageName}</h2>
            <p className="text-gray-500 mt-2 text-sm">{formattedDate}, {formattedTime}</p>
          </div>
        </div>
      </main>

      <div className='h-50 bg-gray-100'></div>
    </div>
  );
};

export default Earning;

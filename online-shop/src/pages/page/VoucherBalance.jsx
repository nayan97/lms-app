import React from 'react';
import Footer_Nav from '../Shared/Footer_Nav';
import Header_wallet from '../Shared/Header_wallet';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router';
import { t } from 'i18next';
import walletimg from "../../assets/wallet.png"


// --- Icon Component ---
const WalletIcon = ({ className = 'h-5 w-5', fill = 'currentColor' }) => (
  <img src={walletimg} className = 'h-5 w-5' alt="" />
);

// --- List Item Component ---
const WalletFeatureItem = ({ label, Icon }) => (
  <div className="flex lg:max-w-7xl justify-between items-center w-full py-4 px-2 border-b border-gray-100 hover:bg-gray-50 transition-colors rounded-lg">
    <div className="flex items-center w-full">
      <div className="bg-[#ff9100]/20 text-yellow-500 p-2 rounded-full mr-4">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-gray-800 text-lg font-medium">{t(label)}</span>
    </div>

    <div className="rounded-full p-3 bg-amber-100">
      <FaArrowRight />
    </div>
  </div>
);

// --- Main VoucherBalance Component ---
const VoucherBalance = () => {
  const currentBalance = '150.44৳';

  const menuItems = [
    { label: 'AddVoucherBalance', Icon: WalletIcon, link: '/voucherbalanceadd' },
    { label: 'WithdrawVoucherBalance', Icon: WalletIcon, link: '/voucherbalancewithdraw' },
    { label: 'ExchangeBalance', Icon: WalletIcon, link: '/balanceexchange' },
    { label: 'TotalVoucherWithdraw', Icon: WalletIcon, link: '/total-withdraw' },
  ];

  return (
    <div className="min-h-screen lg:max-w-7xl mb-10 bg-[#ff9100] font-sans antialiased flex flex-col max-w-xl mx-auto">
      {/* Header */}
      <Header_wallet />

      {/* Main Content */}
      <main className="flex-1 w-full relative -mt-4 rounded-t-[50px] bg-gray-100 shadow-2xl overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Wallet Illustration */}
          <div className="flex flex-col items-center rounded-2xl bg-white justify-center p-8">
             <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Wallet image */}
              <img src={walletimg} alt="wallet" className="w-full h-full object-contain" />
            
              {/* Balance text overlay */}
              <h1 className="absolute text-xl font-bold text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {currentBalance.replace("৳", "")}
              </h1>
            </div>
            <h2 className="text-xl font-bold text-gray-700 mt-4">{t('CurrentVoucherBalance')}</h2>
          </div>

          {/* Feature List */}
          <div className="mt-8 space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="bg-white rounded-2xl flex items-center justify-center text-gray-600 hover:bg-amber-200 hover:text-yellow-600 transition-colors"
              >
                <WalletFeatureItem label={item.label} Icon={item.Icon} />
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <Footer_Nav />
    </div>
  );
};

export default VoucherBalance;

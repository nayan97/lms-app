import React from 'react';

import Footer_Nav from '../Shared/Footer_Nav';
import Header from '../Shared/Header';
import { FaArrowRight } from 'react-icons/fa6';
import Header_wallet from '../Shared/Header_wallet';
import { Link } from 'react-router';

// --- Icon Component ---
const WalletIcon = ({ className = 'h-5 w-5', fill = 'currentColor' }) => (
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
  <div className="flex justify-between items-center w-full py-4 px-2 border-b border-gray-100 hover:bg-gray-50 transition-colors rounded-lg">
    <div className="flex items-center">
      <div className="bg-yellow-500/20 text-yellow-500 p-2 rounded-full mr-4">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-gray-800 text-lg font-medium">{label}</span>
    </div>

    {/* Clickable Arrow */}
    <Link
      to={link}
      className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-gray-600 hover:bg-amber-200 hover:text-yellow-600 transition-colors"
    >
      <FaArrowRight />
    </Link>
  </div>
);

// --- Main VoucherBalance Component ---
const VoucherBalance = () => {
  const currentBalance = '150.44৳';

  const menuItems = [
    { label: 'Add Voucher Balance', Icon: WalletIcon, link: '/voucherbalancewithdraw' },
    { label: 'Withdraw Voucher Balance', Icon: WalletIcon, link: '/withdraw-voucher' },
    { label: 'Exchange Balance', Icon: WalletIcon, link: '/exchange-balance' },
    { label: 'Total Voucher Withdraw', Icon: WalletIcon, link: '/total-withdraw' },
  ];

  return (
    <div className="min-h-screen mb-10 bg-yellow-500 font-sans antialiased flex flex-col max-w-xl mx-auto">
      {/* Header */}
      <Header_wallet />

      {/* Main Content */}
      <main className="flex-1 w-full relative -mt-4 rounded-t-[50px] bg-white shadow-2xl overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Wallet Illustration */}
          <div className="flex flex-col items-center justify-center p-8">
            <div className="w-40 h-40 relative">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" fill="none" className="w-full h-full">
                <rect x="50" y="100" width="400" height="300" rx="60" ry="60" fill="#FACC15" stroke="#333" strokeWidth="20" />
                <rect x="330" y="200" width="100" height="40" rx="20" ry="20" fill="#fff" stroke="#333" strokeWidth="10" />
                <circle cx="380" cy="220" r="15" fill="#FACC15" stroke="#333" strokeWidth="10" />
                <path d="M50 160 Q 150 50, 250 100 L 250 160 L 50 160 Z" fill="#FACC15" stroke="#333" strokeWidth="20" />
                <text x="250" y="270" textAnchor="middle" fontSize="55" fontWeight="bold" fill="#333">
                  {currentBalance.replace('৳', '')}
                </text>
                <text x="350" y="270" textAnchor="end" fontSize="55" fontWeight="bold" fill="#333">
                  ৳
                </text>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-700 mt-4">Current Voucher Balance</h2>
          </div>

          {/* Feature List */}
          <div className="mt-8 space-y-1">
            {menuItems.map((item, index) => (
              <WalletFeatureItem key={index} label={item.label} Icon={item.Icon} link={item.link} />
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

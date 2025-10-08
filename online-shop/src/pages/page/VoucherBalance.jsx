import React from 'react';
import Footer_Nav from '../Shared/Footer_Nav';
import Header from '../Shared/Header';
import { FaArrowRight } from 'react-icons/fa6';
import Header_wallet from '../Shared/Header_wallet';

// --- Icon Component (DaisyUI/Lucide style) ---
// Using custom SVG for the yellow wallet icon to match the image precisely
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
const WalletFeatureItem = ({ label, Icon }) => (
  <button 
    className="flex justify-between items-center w-full py-4 px-2 border-b border-gray-100 hover:bg-gray-50 transition-colors rounded-lg"
    onClick={() => console.log(`Clicked: ${label}`)}
  >
    <div className="flex items-center">
      {/* Icon with yellow background matching the list style in the image */}
      <div className="bg-yellow-500/20 text-yellow-500 p-2 rounded-full mr-4">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-gray-800 text-lg font-medium">{label}</span>
    </div>
    
    {/* Right Arrow Icon */}
    
    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
      <FaArrowRight />
    
    </div>
  </button>
);


// --- Bottom Navigation Icon Component ---
const NavIcon = ({ Icon, label, isActive }) => (
  <button 
    className={`flex flex-col items-center justify-center p-2 flex-1 transition-colors duration-200 ${
      isActive ? 'text-yellow-500' : 'text-gray-500 hover:text-gray-700'
    }`}
    onClick={() => console.log(`Navigating to ${label}`)}
  >
    <Icon className="h-6 w-6" />
    <span className="text-xs mt-1 font-medium truncate">{label}</span>
  </button>
);

// --- Main WalletPage Component ---
const VoucherBalance = () => {
  const currentBalance = "150.44৳";

  const menuItems = [
    { label: "Add Voucher Balance", Icon: WalletIcon },
    { label: "Withdraw Voucher Balance", Icon: WalletIcon },
    { label: "Exchange Balance", Icon: WalletIcon },
    { label: "Total Voucher Withdraw", Icon: WalletIcon },
    
  ];

  const navItems = [
    { label: 'Home', icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6m-6 0a1 1 0 00-1 1v3M9 21h6" /></svg> },
    { label: 'Wallet', icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m4 0h6m-6 0v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-6m0 0h14m-7 0a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, isActive: true },
    { label: 'Shop', icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a5 5 0 00-5 5c0 2.485 2.015 4.5 4.5 4.5s4.5-2.015 4.5-4.5a5 5 0 00-5-5zm0 13c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z" /></svg> }, 
    { label: 'My Network', icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h-5m-5 0h10m-10-8H5a2 2 0 01-2-2V7a2 2 0 012-2h5m0 0h.01M17 5h2a2 2 0 012 2v3m-5-3h.01M12 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { label: 'Profile', icon: (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
  ];

  return (
    <div className="min-h-screen mb-10 bg-yellow-500 font-sans antialiased flex flex-col max-w-xl mx-auto">
      
      {/* Fixed Top Header (Yellow Section) */}
      <Header_wallet></Header_wallet>

      {/* Main Content Card */}
      <main className="flex-1 w-full relative -mt-4 rounded-t-3xl bg-white shadow-2xl overflow-hidden">
        <div className="p-6 md:p-8">
          
          {/* Wallet Illustration and Balance */}
          <div className="flex flex-col items-center justify-center p-8">
            <div className="w-40 h-40 relative">
              {/* This complex SVG simulates the wallet icon from the image */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 500 500" 
                fill="none"
                className="w-full h-full"
              >
                {/* Main Yellow Body */}
                <rect x="50" y="100" width="400" height="300" rx="60" ry="60" fill="#FACC15" stroke="#333" strokeWidth="20" />
                {/* Inner White Clasp */}
                <rect x="330" y="200" width="100" height="40" rx="20" ry="20" fill="#fff" stroke="#333" strokeWidth="10" />
                {/* Inner Yellow Circle (clasp center) */}
                <circle cx="380" cy="220" r="15" fill="#FACC15" stroke="#333" strokeWidth="10" />
                {/* Yellow flap (at top left) */}
                <path d="M50 160 Q 150 50, 250 100 L 250 160 L 50 160 Z" fill="#FACC15" stroke="#333" strokeWidth="20" />
                
                {/* Current Balance Text (Overlay on the wallet icon) */}
                <text x="250" y="270" textAnchor="middle" fontSize="55" fontWeight="bold" fill="#333">
                  {currentBalance.replace("৳", "")}
                </text>
                <text x="350" y="270" textAnchor="end" fontSize="55" fontWeight="bold" fill="#333">
                  ৳
                </text>

              </svg>
            </div>
            
            <h2 className="text-xl font-bold text-gray-700 mt-4">Current Balance</h2>
          </div>

          {/* Feature List */}
          <div className="mt-8 space-y-1">
            {menuItems.map((item, index) => (
              <WalletFeatureItem 
                key={index} 
                label={item.label} 
                Icon={item.Icon}
              />
            ))}
          </div>

        </div>
      </main>

      {/* Bottom Fixed Navigation Bar */}
      <Footer_Nav></Footer_Nav>
    </div>
  );
};

export default VoucherBalance;

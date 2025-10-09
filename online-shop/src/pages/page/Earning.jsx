import React, { useEffect, useState } from 'react';
import Footer_Nav from '../Shared/Footer_Nav';
import Header from '../Shared/Header';
import { FaArrowRight } from 'react-icons/fa6';
import Header_wallet from '../Shared/Header_wallet';
import { useLocation } from 'react-router';
import walletimg from "../../assets/wallet.png"


// --- Icon Component (DaisyUI/Lucide style) ---
// Using custom SVG for the yellow wallet icon to match the image precisely
const WalletIcon = ({ className = 'h-5 w-5', fill = 'currentColor' }) => (
  <img src={walletimg} className = 'h-5 w-5' alt="" />
);

// --- List Item Component ---
const WalletFeatureItem = ({ label, Icon }) => (
    
  <button 
    className="flex justify-between items-center w-full py-4 px-2 border-b border-gray-100 hover:bg-gray-50 transition-colors rounded-lg"
    onClick={() => console.log(`Clicked: ${label}`)}
  >
    <div className="flex items-center">
      {/* Icon with yellow background matching the list style in the image */}
      <div className="bg-[#ff9100]/20 text-yellow-500 p-2 rounded-full mr-4">
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
const Earning = () => {
    const location = useLocation();
  const pageName = location.state?.name || "Today Earning";
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

     // Update every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer); // cleanup on unmount
  }, []);


  function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
  const date = new Date(); // current date
const options = { month: "long", year: "numeric" }; // e.g., October 2025
const monthYear = date.toLocaleDateString("en-US", options);

const dayWithOrdinal = getOrdinal(date.getDate()); // e.g., 8th

const formattedDate = `${monthYear.split(" ")[0]} ${dayWithOrdinal} ${date.getFullYear()}`;


  // Format date and time
  
  const formattedTime = currentDateTime.toLocaleTimeString(); // e.g., 11:35:22
  const currentBalance = "150.44৳";
  
  
  

  return (
    <div className="min-h-screen mb-10 bg-[#ff9100] font-sans antialiased flex flex-col max-w-xl mx-auto">
      
      {/* Fixed Top Header (Yellow Section) */}
      <Header_wallet></Header_wallet>

      {/* Main Content Card */}
      <main className="flex-1 w-full relative -mt-4 rounded-t-[50px] bg-white overflow-hidden">
        <div className="p-6 md:p-8 bg-gray-100">
          
          {/* Wallet Illustration and Balance */}
          <div className="flex flex-col bg-white rounded-2xl items-center justify-center p-8">
            <div className="w-40 h-40 relative">
              {/* This complex SVG simulates the wallet icon from the image */}
               <div className="relative w-40 h-40 flex items-center justify-center">
                            {/* Wallet image */}
                            <img src={walletimg} alt="wallet" className="w-full h-full object-contain" />
                          
                            {/* Balance text overlay */}
                            <h1 className="absolute text-xl font-bold text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              {currentBalance.replace("৳", "")}
                            </h1>
                          </div>
              
            </div>
            
            <h2 className="text-xl font-bold text-gray-700 mt-4">{pageName}</h2>
            <p className="text-gray-500 mt-2 text-sm">{formattedDate}, {formattedTime}</p>
          </div>
        </div>
      </main>

     <div className='h-50 bg-gray-100'>

     </div>
    </div>
  );
};

export default Earning;

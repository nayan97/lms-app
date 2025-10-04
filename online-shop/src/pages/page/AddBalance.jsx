import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Main App component for adding voucher balance
const AddBalance = () => {
 const { t } = useTranslation();
    
  const [amount, setAmount] = useState('');
  const voucherBalance = '5.27'; // Hardcoded current balance from the image

  const handlePayNow = () => {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      // Use console log as a non-intrusive alternative to alert()
      console.error("Please enter a valid amount greater than zero.");
      // In a real application, display an error message on the screen.
      return;
    }

    // Simulate payment initiation (In a real app, this would be an API call)
    console.log(`Initiating payment for amount: ৳${numericAmount.toFixed(2)}`);
    // Reset form after simulated action
    setAmount('');
    // You would typically redirect or show a success message here.
  };

  return (
    <div className="min-h-screen bg-yellow-50 font-sans antialiased flex flex-col items-center">
      {/* Top Header Section (Yellow Background) */}
      <div className="w-full bg-[#ff9100]  p-4 pb-16 shadow-lg text-white">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center mb-10 pt-4">
          {/* Back Arrow Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <h1 className="text-xl font-bold">{t("AddVoucherBalance")}</h1>
          {/* History Icon (Clock/Reload) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>

        {/* Voucher Balance Display */}
        <div className="text-center mt-4">
          <span className="text-lg font-semibold block"> {t("VoucherBalance")}</span>
          <span className="text-4xl font-extrabold mt-1 block">৳ {voucherBalance}</span>
        </div>
      </div>

      {/* Payment Form Card (White Background) */}
      <div className="w-full max-w-lg -mt-10 p-6 bg-white rounded-t-3xl rounded-b-lg shadow-2xl space-y-6">
        
        {/* Amount Input */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-bold text-lg">{t("Amount")}</span>
          </label>
          <input
            type="number"
            placeholder="Enter your amount"
            className="input w-full rounded-lg h-12 border-none bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg px-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
          />
        </div>

        {/* Pay Now Button (DaisyUI btn class) */}
        <button
          className="btn w-full mt-8 bg-[#ff9100]  hover:bg-yellow-600 text-white font-bold text-xl rounded-lg border-none shadow-md transition-all duration-300 disabled:bg-gray-400 disabled:text-gray-600 h-14"
          onClick={handlePayNow}
          disabled={!parseFloat(amount) || parseFloat(amount) <= 0}
        >
          {t("PayNow")}
        </button>
      </div>
    </div>
  );
};

export default AddBalance;

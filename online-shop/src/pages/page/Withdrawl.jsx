import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';


// Define the main App component using standard JavaScript and Hooks
const Withdrawl = () => {
    const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [paymentNumber, setPaymentNumber] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  // Calculate received amount
  // Assumes a 2% charge (২% চার্জ কেটে নেওয়া হবে) as mentioned in the original image text
  const chargeRate = 0.02;
  const numericAmount = parseFloat(amount) || 0;
  const receivedAmount = numericAmount > 0 ? numericAmount * (1 - chargeRate) : 0;

  const handleWithdrawal = () => {
    // This is where you would typically make an API call.
    console.log({
      selectedWallet,
      paymentMethod,
      paymentNumber,
      amount: numericAmount,
      receivedAmount,
    });
    // IMPORTANT: Since we cannot use alert(), this is a placeholder log.
    // In a real application, you would show a success modal here.
    console.log("Withdrawal initiated successfully (Simulated)");
  };

  return (
    <div className="min-h-screen lg:max-w-7xl bg-yellow-50 font-sans antialiased flex flex-col items-center">
      {/* Top Header Section (Yellow Background) */}
      <div className="w-full bg-[#ff9100] p-4 pb-16 shadow-lg text-white">
        <div className="flex items-center space-x-4 mb-8 pt-4">
          {/* Back Arrow Icon (Lucide-react equivalent SVG) */}
          <Link to={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          
          </Link>
          
          <h1 className="text-xl font-bold">{t("Withdrawl")}</h1>
        </div>

        {/* Balance Display */}
        <div className="flex justify-around text-center mt-4">
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{t("IncomeBalance")}</span>
            <span className="text-3xl font-extrabold">৳ 150.44 BDT</span>
          </div>
          <div className="flex flex-col opacity-80">
            <span className="text-lg font-semibold">{t("VoucherBalance")}</span>
            <span className="text-3xl font-extrabold">৳ 5.27 BDT</span>
          </div>
        </div>
      </div>

      {/* Withdrawal Form Card (White Background) */}
      <div className="w-full max-w-lg lg:max-w-7xl -mt-10 p-6 bg-white rounded-t-3xl rounded-b-lg shadow-2xl space-y-5">

        {/* Select Wallet (DaisyUI select class) */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">{t("SelectWallet")}</span>
          </label>
          <select
            className="select select-bordered w-full rounded-lg h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={selectedWallet}
            onChange={(e) => setSelectedWallet(e.target.value)}
          >
            <option value="" disabled>{t("SelectWallet")}</option>
            <option value="income">{t("IncomeWallet")} (৳150.44)</option>
            <option value="voucher">{t("VoucherWallet")} (৳5.27)</option>
          </select>
        </div>

        {/* Payment Method (DaisyUI select class) */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">{t("PaymentMethod")}</span>
          </label>
          <select
            className="select select-bordered w-full rounded-lg h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="" disabled>{t("SelectPaymentMethod")}</option>
            <option value="bKash">bKash</option>
            <option value="Nagad">Nagad</option>
          </select>
        </div>

        {/* Payment Number (DaisyUI input class) */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">{t("PaymentNumber")}</span>
          </label>
          <input
            type="tel"
            placeholder={t("EnterPaymentNumber")}
            className="input input-bordered w-full rounded-lg h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={paymentNumber}
            onChange={(e) => setPaymentNumber(e.target.value)}
          />
        </div>

        {/* Amount Input (DaisyUI input class) */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">{t("Amount")}</span>
          </label>
          <input
            type="number"
            placeholder={t("EnterAmount")}
            className="input input-bordered w-full rounded-lg h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {/* Received Amount Calculation Display */}
          <p className="text-sm mt-2 text-gray-600">
            {t("Youwillreceive")} <span className="font-bold text-lg text-red-500">{receivedAmount.toFixed(2)}</span> Tk
          </p>
        </div>

        {/* Withdrawal Button (DaisyUI btn class) */}
        <button
          className="btn w-full mt-8 bg-[#ff9100] hover:bg-yellow-600 text-white font-bold text-lg rounded-lg border-none shadow-md transition-all duration-300 disabled:bg-gray-400"
          onClick={handleWithdrawal}
          // Button is disabled if essential fields are not filled
          disabled={!numericAmount || !selectedWallet || !paymentMethod || !paymentNumber}
        >
          {t("Withdraw")}
        </button>
      </div>

      {/* Warning/Instructional Text in Bengali */}
      <div className="w-full max-w-lg p-6 text-center text-red-600 text-sm mt-4">
        <p className="leading-relaxed">
          পেমেন্ট রিকুয়েস্ট দেওয়ার ২৪ থেকে ৭২ ঘন্টার মধ্যে পেমেন্ট করা হয়। সর্বনিম্ন ২৫০ টাকা উত্তোলন দিতে পারবেন এবং উত্তোলন দেওয়ার সময় ২% চার্জ কেটে নেওয়া হবে, ধন্যবাদ।
        </p>
      </div>
    </div>
  );
};

export default Withdrawl;

import React, { useState } from "react";
import Header_wallet from "../Shared/Header_wallet";
import { t } from "i18next";

const VoucherBalanceAdd = () => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      alert("দয়া করে সঠিক টাকার পরিমাণ লিখুন");
      return;
    }
    alert(`Voucher Balance Added: ${amount} BDT`);
    setAmount("");
  };

  return (
    <div className="min-h-screen mx-auto lg:max-w-7xl bg-[#ff9100] flex flex-col items-center pt-8">
      {/* Header */}
      <div className="w-full">
        <Header_wallet />
      </div>

      {/* Page Title */}
      <div className="flex mb-5 items-center flex-col">
              <h2 className="text-gray-300 text-xs font-bold ">
               {t("voucherbalance")}
            </h2>
            <h1 className="text-white font-bold">150</h1>
            </div>

      {/* Form Card */}
      <div className="bg-gray-100 lg:max-w-7xl h-svh w-full rounded-t-[50px] p-6 shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              টাকার পরিমাণ
            </label>
            <input
              type="number"
              placeholder="টাকার পরিমাণ লিখুন"
              className="input border-none rounded-2xl w-full focus:outline-none focus:ring-0 focus:border-transparent"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-[#ff9100] hover:bg-[#e57e00] text-white w-full rounded-xl font-bold"
          >
            যোগ করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default VoucherBalanceAdd;

import React, { useState } from "react";
import Header_wallet from "../Shared/Header_wallet";

const VoucherBalanceWithdraw = () => {
  const [wallet, setWallet] = useState("");
  const [method, setMethod] = useState("");
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [youGet, setYouGet] = useState(0);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    const afterCharge = value - value * 0.02; // 2% charge
    setYouGet(afterCharge > 0 ? afterCharge.toFixed(2) : 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Withdraw Requested: ${amount} BDT`);
  };

  return (
    <div className="min-h-screen mx-auto lg:max-w-7xl bg-[#ff9100] flex flex-col items-center pt-8 ">
      {/* Header */}
      <div className="w-full">
        <Header_wallet></Header_wallet>
      </div>

      {/* Balance Section */}
      <div className="bg-[#ff9100] text-white text-center space-x-8 mb-6">
        <span className="font-semibold">
          ইনকাম ব্যালান্স: <span className="text-xl font-bold">৳150.44</span>
        </span>
        <span className="font-semibold">
          ভাউচার ব্যালান্স: <span className="text-xl font-bold">৳5.27</span>
        </span>
      </div>

      {/* Form Card */}
      <div className="bg-gray-100 w-full lg:max-w-7xl rounded-t-[50px] p-6 shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Wallet Select */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              ওয়ালেট নির্বাচন করুন
            </label>
            <select
              className="select border-none rounded-2xl w-full focus:outline-none focus:ring-0 focus:border-transparent shadow-none"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              required
            >
              <option value="">ওয়ালেট নির্বাচন করুন</option>
              <option value="income">ইনকাম ব্যালান্স</option>
              <option value="voucher">ভাউচার ব্যালান্স</option>
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              পেমেন্ট মেথড
            </label>
            <select
              className="select border-none rounded-2xl w-full focus:outline-none focus:ring-0 focus:border-transparent shadow-none"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              required
            >
              <option value="">পেমেন্ট মেথড নির্বাচন করুন</option>
              <option value="bkash">বিকাশ</option>
              <option value="nagad">নগদ</option>
              <option value="rocket">রকেট</option>
            </select>
          </div>

          {/* Payment Number */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              পেমেন্ট নাম্বার
            </label>
            <input
              type="text"
              placeholder="পেমেন্ট নাম্বার লিখুন"
              className="input border-none rounded-2xl w-full focus:outline-none focus:ring-0 focus:border-transparent"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              টাকার পরিমাণ
            </label>
            <input
              type="number"
              placeholder="টাকার পরিমাণ লিখুন"
              className="input border-none rounded-2xl w-full focus:outline-none focus:ring-0 focus:border-transparent"
              value={amount}
              onChange={handleAmountChange}
              required
            />
          </div>

          {/* You Get */}
          <p className="text-gray-700 font-semibold">
            আপনি পাবেন: <span className="text-black">{youGet} Tk</span>
          </p>

          {/* Submit */}
          <button
            type="submit"
            className="btn bg-[#ff9100] hover:bg-[#e57e00] text-white w-full rounded-xl font-bold"
          >
            উইথড্র
          </button>
        </form>

        {/* Note */}
        <p className="text-red-500 text-sm mt-4 text-center">
          পেমেন্ট রিকুয়েস্ট দেওয়ার ২৪ থেকে ৭২ ঘণ্টার মধ্যে পেমেন্ট করা হয়।
          সর্বনিম্ন ২৫০ টাকা উইথড্র দিতে পারবেন এবং উইথড্র দেওয়ার সময় ২% চার্জ
          কেটে নেওয়া হবে, ধন্যবাদ।
        </p>
      </div>
    </div>
  );
};

export default VoucherBalanceWithdraw;

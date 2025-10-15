import React, { useState } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import Header_wallet from "../Shared/Header_wallet";

const IncomeHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const earnings = [
    {
      id: 1,
      title: "Account verification commission from level 3 from 98931131",
      amount: 25.0,
      date: "Oct 8, 2025 5:56 PM",
      status: "Completed",
    },
    {
      id: 2,
      title: "Account verification commission from level 2 from 13485528",
      amount: 40.0,
      date: "Oct 3, 2025 6:39 PM",
      status: "Completed",
    },
    {
      id: 3,
      title: "Recharge Commission from level 1 from 24578891",
      amount: 0.04,
      date: "Sep 19, 2025 11:40 PM",
      status: "Completed",
    },
    {
      id: 4,
      title: "Earning from typing job",
      amount: 1.0,
      date: "Sep 18, 2025 9:15 PM",
      status: "Completed",
    },
    {
      id: 5,
      title: "Account verification commission from level 3 from 18128906",
      amount: 25.0,
      date: "Sep 18, 2025 6:39 PM",
      status: "Completed",
    },
    {
      id: 6,
      title: "Earning from quiz job",
      amount: 1.0,
      date: "Sep 18, 2025 3:56 PM",
      status: "Completed",
    },
    {
      id: 7,
      title: "Ads View Earning",
      amount: 1.0,
      date: "Sep 18, 2025 3:54 PM",
      status: "Completed",
    },
  ];

  // Filter by search
  const filteredEarnings = earnings.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col max-w-xl lg:max-w-7xl mx-auto font-sans">
      {/* Header */}
      <Header_wallet></Header_wallet>
      <div className="bg-[#ff9100]">
         <div className="py-10 bg-gray-100 rounded-t-[50px]">
        {/* Search bar */}
      <div className="bg-white px-4 py-3 sticky shadow-sm">
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="রেফার কোড সার্চ করুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm"
          />
        </div>
      </div>

      {/* Earning list */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {filteredEarnings.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <p className="text-sm text-gray-800 font-medium leading-snug flex-1">
                {item.title}
              </p>
              <button className="text-gray-400 ml-2 hover:text-gray-600">
                <MdContentCopy size={16} />
              </button>
            </div>

            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-500">{item.date}</p>
              <div className="text-right">
                <p className="text-green-600 text-xs font-semibold">
                  {item.status}
                </p>
                <p className="text-gray-900 font-bold">
                  ৳{item.amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filteredEarnings.length === 0 && (
          <p className="text-center text-gray-500 mt-10 text-sm">
            কোনো ফলাফল পাওয়া যায়নি।
          </p>
        )}
      </div>

      </div>

      </div>
     

      
    </div>
  );
};

export default IncomeHistory;

import React, { useState } from "react";
import Header_wallet from "../Shared/Header_wallet";

const operators = [
  { id: 1, name: "Banglalink", logo: "https://upload.wikimedia.org/wikipedia/en/5/55/Banglalink_logo.png" },
  { id: 2, name: "Grameenphone", logo: "https://upload.wikimedia.org/wikipedia/en/1/1b/Grameenphone_logo.svg" },
  { id: 3, name: "Robi", logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Robi_Axiata_Limited_Logo.png" },
  { id: 4, name: "Airtel", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/Airtel_logo.svg" },
  { id: 5, name: "Teletalk", logo: "https://upload.wikimedia.org/wikipedia/en/9/93/Teletalk_logo.png" },
];

const offers = [
  { id: 1, title: "50 GB 1500 MIN – (ALL BD)", days: "30 দিন", price: 998, cost: 78.75 },
  { id: 2, title: "150 GB – (ALL BD)", days: "30 দিন", price: 849, cost: 66.15 },
  { id: 3, title: "30 GB 700 MIN – (ALL BD)", days: "30 দিন", price: 759, cost: 72.45 },
  { id: 4, title: "100 GB – (ALL BD)", days: "30 দিন", price: 749, cost: 34.65 },
  { id: 5, title: "1000 MIN – (ALL BD)", days: "30 দিন", price: 629, cost: 44.1 },
  { id: 6, title: "30/40/50 GB – (ALL BD)", days: "30 দিন", price: 569, cost: 56.7 },
  { id: 7, title: "30 GB 300 MIN – (ALL BD CHECK)", days: "30 দিন", price: 559, cost: 54.18 },
  { id: 8, title: "800 MIN – (ALL BD)", days: "30 দিন", price: 509, cost: 34.65 },
  { id: 9, title: "10 GB 200 MIN – (ALL BD)", days: "30 দিন", price: 459, cost: 12.6 },
  { id: 10, title: "15 GB – (ALL BD)", days: "30 দিন", price: 429, cost: 18.9 },
];

const DriveOffer = () => {
  const [selectedOperator, setSelectedOperator] = useState(1);

  return (
    <div className="min-h-screen mx-auto lg:max-w-7xl bg-[#ff9100]">
      {/* Header */}
      <Header_wallet></Header_wallet>

      {/* Operator Tabs */}
      <div className="bg-white rounded-t-[50px] p-3">
        <div className="flex justify-between overflow-x-auto space-x-3 pb-3">
          {operators.map((op) => (
            <div
              key={op.id}
              onClick={() => setSelectedOperator(op.id)}
              className={`p-2 rounded-lg flex-shrink-0 border-2 transition-all ${
                selectedOperator === op.id
                  ? "border-yellow-400 bg-yellow-100"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <img src={op.logo} alt={op.name} className="w-12 h-12 object-contain" />
            </div>
          ))}
        </div>

        {/* Offers List */}
        <div className="space-y-3 mt-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-xl shadow p-3 border border-gray-200"
            >
              <h2 className="font-semibold text-gray-800">{offer.title}</h2>
              <p className="text-gray-500 text-sm">{offer.days}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-lg text-gray-800">{offer.price.toFixed(2)}৳</span>
                <span className="text-sm text-gray-500">C: {offer.cost.toFixed(2)}৳</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriveOffer;

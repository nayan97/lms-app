import React from "react";
import { BellIcon, HomeIcon, WalletIcon, UsersIcon, UserIcon, ShoppingBagIcon } from "lucide-react";

const projects1 = [
  { name: "Mobile Recharge", icon: "💳" },
  { name: "Drive Offer", icon: "🎁" },
  { name: "Reselling", icon: "🛒" },
  { name: "Ads View", icon: "🖼️" },
  { name: "Micro Job", icon: "📄" },
  { name: "Job Post", icon: "➕" },
  
];

const projects2 = [
  { name: "Quiz Job", icon: "❓" },
  { name: "Typing Job", icon: "⌨️" },
  { name: "Welcome Offer", icon: "🎉" },
  { name: "Digital Service", icon: "💻" },
  { name: "Rank", icon: "📊" },
  { name: "Cross Line", icon: "➗" },
  { name: "E-commerce", icon: "🛍️" },
  { name: "Domain Hosting", icon: "🌐" },
  { name: "Apply Vendor", icon: "🏪" },
  { name: "User Fund", icon: "💰" },
  { name: "Free Omra Hajj", icon: "🕋" },
];

export default function LifeGoodHome() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Life Good</h1>
        <div className="relative">
          <button className="btn btn-circle btn-sm bg-white text-yellow-500 border-0">
            <BellIcon className="w-5 h-5" />
          </button>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            1
          </span>
        </div>
      </header>

      {/* Banner */}
      <div className="p-4">
        <div className="w-full h-32 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
          Business Plan Banner
        </div>
      </div>

      {/* Projects */}
      <div className="px-4">
        <h2 className="text-lg font-semibold mb-3">Our Projects</h2>
        <div className="grid grid-cols-3 gap-4">
          {projects1.map((p, i) => (
            <button
              key={i}
              className="btn w-full h-full flex flex-col items-center justify-center bg-white shadow rounded-xl py-6"
            >
              <span className="text-3xl">{p.icon}</span>
              <span className="text-sm mt-2">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Free Ads Banner */}
      <div className="px-4 mt-6">
        <div className="w-full py-4 bg-yellow-400 text-white font-bold rounded-xl text-center shadow">
          FREE ADS MARKETING
        </div>
      </div>
      {/* After ads banner */}
      <div className="px-4">
        <div className="grid  grid-cols-3 gap-4">
          {projects2.map((p, i) => (
            <button
              key={i}
              className="btn w-full h-full flex flex-col items-center justify-center bg-white shadow rounded-xl py-6"
            >
              <span className="text-3xl">{p.icon}</span>
              <span className="text-sm mt-2">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="btm-nav flex  btm-nav-sm bg-white shadow-lg mt-auto">
        <button className="text-yellow-500">
          <HomeIcon className="w-6 h-6" />
          <span className="btm-nav-label">Home</span>
        </button>
        <button>
          <WalletIcon className="w-6 h-6" />
          <span className="btm-nav-label">Wallet</span>
        </button>
        <button className="bg-yellow-500 text-white rounded-full p-3 -mt-6 shadow-lg">
          <ShoppingBagIcon className="w-6 h-6" />
        </button>
        <button>
          <UsersIcon className="w-6 h-6" />
          <span className="btm-nav-label">My Network</span>
        </button>
        <button>
          <UserIcon className="w-6 h-6" />
          <span className="btm-nav-label">Profile</span>
        </button>
      </nav>
    </div>
  );
}

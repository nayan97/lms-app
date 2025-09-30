import React from "react";
import { BellIcon, HomeIcon, WalletIcon, UsersIcon, UserIcon, ShoppingBagIcon } from "lucide-react";
import { Link } from 'react-router';
import { useTranslation } from "react-i18next";

const projects1 = [
  { name: "MobileRecharge", icon: "💳", isActive: false, link: "/mobile-recharge" },
  { name: "DriveOffer", icon: "🎁", isActive:false },
  { name: "ResellingProduct", icon: "🛒", isActive:false },
  { name: "AdsViewIncome", icon: "🖼️", isActive:false },
  { name: "MicroJob", icon: "📄", isActive:false },
  { name: "JobPost", icon: "➕", isActive:false },
  { name: "TypingJob", icon: "⌨️",  isActive: true },
  { name: "QuizJob", icon: "❓" , isActive: true},
  { name: "WatchVideo", icon: "🎥" , isActive:true, link:"comingsoon"},
  { name: "MarkSalary", icon: "🗄️", isActive:true },
  { name: "DailyTargetBonus", icon: "$", isActive:true },
  { name: "FreelancingCourse", icon: "💻", isActive:true },
];

export default function LifeGoodHome() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col rounded-[50px] bg-gray-50">

      {/* Banner */}
      <div className="px-4 pt-4">
        <div className="w-full h-32 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
          {t("Business")} {t("plan")} {t("Banner")}
        </div>
      </div>

      {/* Projects */}
      <div className="px-4">
        <h2 className="text-lg font-semibold mb-3">{t("Projects")}</h2>
        <div className="grid grid-cols-3 gap-2">
          {projects1.map((p, i) => (
            <Link
              key={i}
              to={p.isActive ? p.link : "#"}
              className={`
                btn w-full h-full flex flex-col items-center justify-center
                bg-white shadow rounded-xl py-6
                ${!p.isActive ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:shadow-lg"}
              `}
            >
              <span className="text-3xl">{p.icon}</span>
              <span className="text-xs mt-2">{t(p.name)}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Free Ads Banner */}
      <div className="px-4 pb-20 mt-6">
        <div className="w-full py-4 bg-white text-green-400 font-bold rounded-xl text-center shadow">
          {t("Free")} {t("Ads")} {t("Banner")}
        </div>
      </div>

    </div>
  );
}

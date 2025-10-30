import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import driveimg from "../../assets/drive.png"
import videoimg from "../../assets/video.png"
import applyvendor from "../../assets/applyvendor.png"
import videocourseimg from "../../assets/videocourse.png"
import rankimg from "../../assets/rank.png"
import addsimg from "../../assets/add.png"
import quizimg from "../../assets/quiz.png"
import rechargeimg from "../../assets/recharge.png"
import jobimg from "../../assets/job.png"
import microimg from "../../assets/micro.png"
import resellimg from "../../assets/resell.png"
import bonusimg from "../../assets/bonus.jpg"
import freeimg from "../../assets/freelance.png"
import dailyimg from "../../assets/daily.png"
import microjobimg from "../../assets/microjob.png"

// You can use local images stored in /public/assets/
const projects1 = [
  { name: "MobileRecharge", icon: rechargeimg, isActive: true, link: "comingsoon" },
  { name: "DriveOffer", icon: driveimg, isActive: true, link: "/driveoffer" },
  { name: "ResellingProduct", icon: resellimg, isActive: true , link: "comingsoon"},
  { name: "AdsViewIncome", icon: addsimg, isActive: true, link: "adsview" },
  { name: "MicroJob", icon: microjobimg, isActive: true , link: "comingsoon"},
  { name: "JobPost", icon: jobimg, isActive: true , link: "/typing-job"},
  { name: "TypingJob", icon: microimg, isActive: true, link: "comingsoon" },
  { name: "QuizJob", icon: quizimg, isActive: true, link: "comingsoon" },
  { name: "WatchVideo", icon: videoimg, isActive: true, link: "comingsoon" },
  { name: "MarkSalary", icon: bonusimg, isActive: true, link: "comingsoon" },
  { name: "DailyTargetBonus", icon: dailyimg, isActive: true, link: "comingsoon" },
  { name: "FreelancingCourse", icon: freeimg, isActive: true, link: "comingsoon" },
  { name: "VideoCourse", icon: videocourseimg, isActive: true, link: "comingsoon" },
  { name: "Rank", icon: rankimg, isActive: true, link: "comingsoon" },
  { name: "Applyvendor", icon: applyvendor, isActive: true, link: "comingsoon" },
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
        <h2 className="text-lg font-semibold my-3">{t("OurProjects")}</h2>
        <div className="grid grid-cols-3 gap-2">
          {projects1.map((p, i) => (
            <Link
              key={i}
              to={p.isActive ? p.link : "#"}
              state={{ name: p.name }}
              className={`
                btn w-full h-full flex flex-col items-center justify-center
                bg-white shadow rounded-xl py-6
                ${!p.isActive ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:shadow-lg"}
              `}
            >
              {/* Icon as image */}
              {p.icon ? (
                <img
                  src={p.icon}
                  alt={p.name}
                  className="w-10 h-10 rounded-full object-contain"
                />
              ) : (
                <span className="text-2xl">❓</span> // fallback if no image
              )}
              <span className="text-xs mt-2">{t(p.name)}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Free Ads Banner */}
      <div className="px-4 pb-20 mt-6">
        <Link to={"/adsmarketing"}>
         <div className="w-full py-4 mb-4 bg-white text-green-400 font-bold rounded-xl text-center shadow">
          {t("Free")} {t("Ads")} {t("Banner")}
        </div>
        
        </Link>
       
      </div>
    </div>
  );
}

import React from "react";
import Header from "../Shared/Header";
import { Link, useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next"; // ✅ useTranslation hook

const ComingSoon = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const page = location.pathname;
  const pageName = location.state?.name;

  const { t } = useTranslation(); // ✅ get t() function

  return (
    <div>
      <div className="bg-[#ff9100] w-full h-20">
        <div className="flex items-center gap-4">
          <Link
            to={"/"}
            className="text-white bg-[#ff9100] p-3 rounded-full shadow-sm text-xl"
          >
            ←
          </Link>
          <h1 className="text-white font-bold">
            {t(pageName)} {/* ✅ translated page name */}
          </h1>
        </div>
      </div>

      <div className="flex flex-col rounded-t-[50px] items-center justify-center min-h-screen bg-white px-4">
        {/* Animated Icon */}
        <div
          className="mb-2 w-10 h-10"
          style={{
            animation: "sideway 1.5s ease-in-out infinite alternate",
          }}
        >
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>

          <style>
            {`
              @keyframes sideway {
                0% { transform: translateX(0); }
                50% { transform: translateX(20px); }
                100% { transform: translateX(0); }
              }
            `}
          </style>
        </div>

        {/* Translated Headings */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center animate-pulse">
          {t("Coming Soon")} {/* ✅ translation key */}
        </h1>
        <p className="text-lg md:text-2xl text-center opacity-80 mb-8 animate-fadeIn">
          {t("We Are Working On It")} {/* ✅ translation key */}
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;

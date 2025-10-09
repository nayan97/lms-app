import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-center">
      {/* Big Error Code */}
      <h1 className="text-9xl font-extrabold text-[#ff9100] tracking-widest">
        404
      </h1>

      {/* Divider Line */}
      <div className="bg-[#ff9100] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>

      {/* Message */}
      <p className="mt-10 text-gray-700 text-lg md:text-xl">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Go Home Button */}
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 bg-[#ff9100] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#e57f00] transition-all"
      >
        ← Back to Home
      </Link>

      {/* Simple floating animation */}
      <style>
        {`
          .floating {
            animation: float 3s ease-in-out infinite;
          }

          @keyframes float {
            0% { transform: translatey(0px); }
            50% { transform: translatey(-10px); }
            100% { transform: translatey(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default ErrorPage;

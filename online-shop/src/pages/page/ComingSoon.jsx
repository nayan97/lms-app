import React from "react";

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Animated Logo or Icon */}
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

  {/* Inline keyframes */}
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


      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center animate-pulse">
        Coming Soon
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-2xl text-center opacity-80 mb-8 animate-fadeIn">
        We are working on it!
      </p>

    </div>
  );
};

export default ComingSoon;

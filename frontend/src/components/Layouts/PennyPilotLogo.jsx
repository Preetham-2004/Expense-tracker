import React from "react";

const PennyPilotLogo = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      {/* Paper Airplane Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="url(#gradient)"
        className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10.5l19.5-8.25-8.25 19.5-4.125-8.25L3 10.5z"
        />
      </svg>

      {/* Logo Text */}
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-fuchsia-500 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(139,92,246,0.6)] transition-all group-hover:scale-105">
        PennyPilot
      </h1>
    </div>
  );
};

export default PennyPilotLogo;

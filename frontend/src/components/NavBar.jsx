import React, { useState } from "react";

const NavBar = () => {
  return (
    <div className="flex justify-center w-full pt-4 px-4">
      <nav className="flex items-center max-w-2xl w-full justify-around border mx-4 border-slate-700 px-6 py-4 rounded-full text-white text-sm relative">
        {/* logo */}
        <a href="/">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="4.706" cy="16" r="4.706" fill="#D9D9D9" />
            <circle cx="16.001" cy="4.706" r="4.706" fill="#D9D9D9" />
            <circle cx="16.001" cy="27.294" r="4.706" fill="#D9D9D9" />
            <circle cx="27.294" cy="16" r="4.706" fill="#D9D9D9" />
          </svg>
        </a>

        {/* desktop menu */}
        <div className="hidden md:flex items-center gap-6 ml-7 text-md">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

import React, { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { motion } from "framer-motion";
import SideMenu from "./SideMenu";
import PennyPilotLogo from "./PennyPilotLogo";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        openSideMenu &&
        !event.target.closest("#side-menu") &&
        !event.target.closest("#menu-btn")
      ) {
        setOpenSideMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [openSideMenu]);

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="relative flex items-center justify-between gap-5
        bg-[#12111C]/90 backdrop-blur-lg
        border border-purple-700/30
        rounded-b-2xl
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] 
        ring-1 ring-purple-500/10
        sticky top-0 z-[100]
        px-8 py-4
        transition-all duration-500
        hover:shadow-purple-700/60
        hover:ring-purple-500/30"
    >
      {/* Menu Button */}
      <motion.button
        id="menu-btn"
        whileHover={{
          scale: 1.1,
          rotate: 2,
          boxShadow: "0px 0px 10px rgba(139, 92, 246, 0.8)",
        }}
        whileTap={{ scale: 0.95 }}
        className="block lg:hidden text-white p-3 rounded-full 
          bg-gradient-to-br from-purple-600 to-purple-800/80
          hover:from-purple-700 hover:to-purple-900/80
          transition-all duration-300"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </motion.button>

      {/* Logo */}
      <motion.div
        whileHover={{
          scale: 1.05,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
        }}
      >
        <PennyPilotLogo />
      </motion.div>

      {/* Optional: Glowing Bottom Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-fuchsia-500 via-purple-400 to-indigo-400 blur-sm opacity-70"></div>
    </motion.div>
  );
};

export default Navbar;

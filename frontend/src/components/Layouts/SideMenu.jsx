import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../cards/CharAvatar";
import { motion } from "framer-motion";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => navigate(route);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="w-64 h-full bg-gradient-to-b from-[#18151f] via-[#1a1827] to-[#221c39] 
        border-r border-purple-900/40 p-5 sticky top-[61px] z-20 
        shadow-xl overflow-y-auto backdrop-blur-md"
    >
      {/* User Info */}
      <div className="flex flex-col items-center justify-center gap-4 mt-3 mb-8">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          className="relative group"
        >
          {user?.profileImageUrl ? (
            <img
              src={user?.profileImageUrl || ""}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-purple-500 object-cover 
                shadow-lg transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <CharAvatar
              fullName={user?.fullName}
              width="w-28"
              height="h-28"
              style="text-3xl"
            />
          )}

          {/* Subtle glow ring */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            className="absolute inset-0 rounded-full bg-gradient-to-r 
              from-purple-500 to-blue-500 blur-2xl scale-110 z-[-1]"
          />
        </motion.div>

        <motion.h5
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-100 font-semibold text-xl"
        >
          {user?.fullName || ""}
        </motion.h5>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-3">
        {SIDE_MENU_DATA.filter((item) => item.path !== "logout").map(
          (item, index) => {
            const isActive = activeMenu === item.label;

            return (
              <motion.button
                key={`menu_${index}`}
                onClick={() => handleClick(item.path)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 150,
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow:
                    "0 4px 20px rgba(128, 90, 213, 0.4), 0 2px 10px rgba(99, 102, 241, 0.3)",
                }}
                className={`flex items-center gap-4 py-3 px-5 rounded-xl transition-all duration-1 
                  ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md scale-[1.02]"
                      : "bg-[#211e37] text-gray-300 hover:bg-gradient-to-r hover:from-[#2c2749] hover:to-[#352e5c]"
                  }`}
              >
                <item.icon
                  className={`text-2xl transition-transform ${
                    isActive
                      ? "text-white scale-110"
                      : "text-purple-400"
                  }`}
                />
                <span className="font-medium tracking-wide text-[1rem]">
                  {item.label}
                </span>
              </motion.button>
            );
          }
        )}
      </div>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-auto pt-10"
      >
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 4px 20px rgba(244, 63, 94, 0.4), 0 2px 10px rgba(236, 72, 153, 0.3)",
          }}
          onClick={handleLogout}
          className="flex items-center justify-center w-full gap-3 py-3 px-5 rounded-xl 
            bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold 
            transition-all duration-300"
        >
          <span className="text-md">Logout</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SideMenu;

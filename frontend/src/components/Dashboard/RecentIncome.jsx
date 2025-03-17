import React from "react";
import { TrendingUp, ArrowRight } from "lucide-react";
import moment from "moment";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
    },
  },
};

const iconHover = {
  hover: {
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const buttonHover = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 24px rgba(94, 234, 212, 0.35)",
    transition: {
      type: "spring",
      stiffness: 300,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full md:w-[640px]"
    >
      {/* Outer Container - No background or border */}
      <motion.div
        className="h-[540px]" // Keep height if you want
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="p-0"> {/* Removed padding to keep it raw, adjust if needed */}
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                variants={iconHover}
                whileHover="hover"
                className="p-2 bg-green-600 rounded-xl shadow-lg shadow-green-500/30 cursor-pointer"
              >
                <TrendingUp className="h-5 w-5 text-white" />
              </motion.div>
              <h5 className="text-lg font-bold text-white tracking-wide">
                Recent Income
              </h5>
            </div>

            <motion.button
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              onClick={onSeeMore}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white transition-all duration-300 shadow-md"
            >
              See All
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Transaction Items */}
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {transactions?.length > 0 ? (
              transactions.slice(0, 5).map((item) => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <motion.div
                    layout
                    transition={{ layout: { duration: 0.3, type: "spring" } }}
                    className="flex items-center justify-between p-4 rounded-xl bg-[#28243D] border border-purple-900/20 transition-all duration-300 hover:bg-[#322C50] shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <motion.div className="flex items-center gap-4">
                      <motion.div
                        variants={iconHover}
                        whileHover="hover"
                        className="p-3 rounded-xl shadow-md bg-green-600 shadow-green-500/30 transition-all duration-300"
                      >
                        <TrendingUp className="h-5 w-5 text-white" />
                      </motion.div>
                      <div>
                        <h6 className="font-semibold text-white">
                          {item.source}
                        </h6>
                        <p className="text-xs text-white/60">
                          {moment(item.date).format("Do MMM YYYY")}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1.08 }}
                      transition={{
                        type: "spring",
                        damping: 12,
                        stiffness: 100,
                      }}
                      className="px-4 py-2 rounded-lg font-semibold text-sm bg-green-600 text-white shadow-inner transition-all duration-300"
                    >
                      <span>+${item.amount}</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-white/40">
                No income transactions found.
              </p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RecentIncome;

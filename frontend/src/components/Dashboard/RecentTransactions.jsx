import React from "react";
import { ArrowRight, TrendingUp, TrendingDown, Clock } from "lucide-react";
import moment from 'moment';
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const glowVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full md:w-[640px]"
    >
      <div className="relative">
        {/* Background glow effects */}
        <motion.div
          variants={glowVariants}
          animate="animate"
          className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/90 rounded-full blur-3xl"
        />
        <motion.div
          variants={glowVariants}
          animate="animate"
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
        />

        <div className="relative bg-[#0A0F1C]/80 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl shadow-black/20">
          {/* Header Section */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-white/5"
                >
                  <Clock className="h-6 w-6 text-blue-400" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Recent Transactions
                  </h2>
                  <p className="text-sm text-white/50">Last 5 transactions</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSeeMore}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-white/5 group transition-all duration-300"
              >
                <span className="text-blue-400 text-sm font-medium">View All</span>
                <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="p-6 space-y-4">
            {transactions?.slice(0, 5)?.map((item, index) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      className={`p-3 rounded-xl ${
                        item.type === "expense"
                          ? "bg-gradient-to-br from-rose-500/10 to-red-500/10 text-rose-400"
                          : "bg-gradient-to-br from-emerald-500/10 to-green-500/10 text-emerald-400"
                      } border border-white/5`}
                    >
                      {item.type === "expense" ? (
                        <TrendingDown className="h-5 w-5" />
                      ) : (
                        <TrendingUp className="h-5 w-5" />
                      )}
                    </motion.div>
                    
                    <div>
                      <h6 className="font-medium text-white group-hover:text-blue-400 transition-colors duration-300">
                        {item.type === "expense" ? item.category : item.source}
                      </h6>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-white/40" />
                        <p className="text-xs text-white/40">
                          {moment(item.date).format("MMM Do, YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`px-4 py-2 rounded-xl font-medium ${
                      item.type === "expense"
                        ? "bg-rose-500/10 text-rose-400"
                        : "bg-emerald-500/10 text-emerald-400"
                    } border border-white/5`}
                  >
                    <span className="text-sm">
                      {item.type === "expense" ? "-" : "+"}${item.amount}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {(!transactions || transactions.length === 0) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-white/40"
              >
                <Clock className="h-12 w-12 mb-4" />
                <p className="text-center">No recent transactions</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentTransactions;
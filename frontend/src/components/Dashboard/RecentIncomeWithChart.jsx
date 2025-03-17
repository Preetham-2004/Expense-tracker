import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, PieChart } from "lucide-react";
import CustomPieChart from "../charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

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

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  const statCards = data?.map((item, index) => ({
    title: item?.source,
    amount: item?.amount,
    icon: index % 2 === 0 ? DollarSign : TrendingUp,
    color:
      index % 3 === 0
        ? "teal"
        : index % 3 === 1
        ? "green"
        : "red",
  }));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full md:w-[620px]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        // ✅ Entire container card: NO background, NO shadow, NO border
        className="p-6" // Just padding for layout
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              variants={iconHover}
              whileHover="hover"
              className="p-2 bg-teal-400/20 dark:bg-teal-600/20 rounded-xl shadow-lg shadow-teal-500/20 dark:shadow-teal-500/30 cursor-pointer"
            >
              <PieChart className="h-5 w-5 text-teal-400 dark:text-teal-300" />
            </motion.div>
            <h5 className="text-lg font-bold bg-gradient-to-r from-teal-300 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-wide">
              Recent Income Overview
            </h5>
          </div>
        </div>

        {/* Stat Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {statCards?.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group p-4 rounded-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  variants={iconHover}
                  whileHover="hover"
                  className={`p-3 rounded-xl backdrop-blur-xl
                    bg-white/10 dark:bg-white/5
                    shadow-md transition-all duration-300 
                    ${
                      stat.color === "red"
                        ? "shadow-red-400/20 dark:shadow-red-700/20"
                        : stat.color === "green"
                        ? "shadow-green-400/20 dark:shadow-green-700/20"
                        : "shadow-teal-400/20 dark:shadow-teal-700/20"
                    }`}
                >
                  <stat.icon
                    className={`h-5 w-5 ${
                      stat.color === "red"
                        ? "text-red-400 dark:text-red-300"
                        : stat.color === "green"
                        ? "text-green-400 dark:text-green-300"
                        : "text-teal-400 dark:text-teal-300"
                    }`}
                  />
                </motion.div>

                <div>
                  <h6 className="font-semibold text-white/90 dark:text-white">
                    {stat.title}
                  </h6>
                  <p className="text-xs text-white/50 dark:text-white/60">
                    Income Source
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1, scale: 1.08 }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 100,
                }}
                className={`mt-4 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 shadow-inner 
                  ${
                    stat.color === "red"
                      ? "text-red-300 dark:text-red-400"
                      : stat.color === "green"
                      ? "text-green-300 dark:text-green-400"
                      : "text-teal-300 dark:text-teal-400"
                  }`}
              >
                <span>${stat.amount.toLocaleString()}</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          className="h-[260px] flex items-center justify-center mt-6"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            className="w-full h-full flex items-center justify-center"
          >
            <CustomPieChart
              data={chartData}
              label="Total Income"
              totalAmount={`$${totalIncome.toLocaleString()}`}
              colors={COLORS}
              showTextAnchor
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RecentIncomeWithChart;

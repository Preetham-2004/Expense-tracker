import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Calendar } from 'lucide-react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../charts/CustomBarChart';

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

const Last30DaysExpense = ({ data = [] }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const result = prepareExpenseBarChartData(data);
      setChartData(result);
    } else {
      setChartData([]);
    }
  }, [data]);

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
          className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={glowVariants}
          animate="animate"
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"
        />

        <div className="relative bg-[#070B14]/90 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl shadow-black/20">
          {/* Header */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="p-3 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-xl border border-white/5"
              >
                <BarChart2 className="h-6 w-6 text-emerald-400" />
              </motion.div>
              <div>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Last 30 Days Expenses
                </h2>
                <p className="text-sm text-white/50">Track your spending activity</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Filter Button */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 w-fit px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 hover:from-emerald-500/20 hover:to-cyan-500/20 text-emerald-400 transition-all duration-300 border border-white/5 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">30 Days</span>
            </motion.div>

            {/* Chart Section */}
            {chartData.length > 0 ? (
              <motion.div
                variants={itemVariants}
                className="bg-white/5 rounded-2xl border border-white/5 p-6"
              >
                <div className="h-[280px] flex items-center justify-center">
                  <CustomBarChart data={chartData} />
                </div>
                <div className="mt-4 text-center text-sm text-white/60">
                  Expenses over the past month
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center justify-center flex-1 py-16 px-4 space-y-4"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 rounded-full bg-emerald-400/20 shadow-lg shadow-emerald-500/20"
                >
                  <BarChart2 className="h-6 w-6 text-emerald-400" />
                </motion.div>
                <p className="text-white/70 text-sm">
                  No data available for the last 30 days
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Last30DaysExpense;

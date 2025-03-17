import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, DollarSign, TrendingUp, Wallet, Clock } from 'lucide-react';
import CustomPieChart from '../charts/CustomPieChart';

const COLORS = ["#3B82F6", "#10B981", "#6366F1"];

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

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expenses", amount: totalExpense }
  ];

  const statCards = [
    {
      title: "Total Balance",
      amount: totalBalance,
      icon: Wallet,
      color: "blue",
      gradient: "from-blue-500/10 to-blue-600/10",
      textColor: "text-blue-400"
    },
    {
      title: "Total Income",
      amount: totalIncome,
      icon: DollarSign,
      color: "emerald",
      gradient: "from-emerald-500/10 to-emerald-600/10",
      textColor: "text-emerald-400"
    },
    {
      title: "Total Expenses",
      amount: totalExpense,
      icon: TrendingUp,
      color: "violet",
      gradient: "from-violet-500/10 to-violet-600/10",
      textColor: "text-violet-400"
    }
  ];

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
          className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={glowVariants}
          animate="animate"
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl"
        />

        <div className="relative bg-[#070B14]/90 backdrop-blur-xl rounded-3xl border border-white/5 shadow-2xl shadow-black/20">
          {/* Header Section */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
                className="p-3 bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-xl border border-white/5"
              >
                <PieChart className="h-6 w-6 text-blue-400" />
              </motion.div>
              <div>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Financial Overview
                </h2>
                <p className="text-sm text-white/50">Your financial summary</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-4">
              {statCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} border border-white/5 hover:border-white/10 transition-all duration-300`}>
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className="p-2 rounded-xl bg-white/5 border border-white/5"
                      >
                        <stat.icon className={`h-4 w-4 ${stat.textColor}`} />
                      </motion.div>
                      <span className="text-sm text-white/70">{stat.title}</span>
                    </div>
                    <div className={`text-lg font-semibold ${stat.textColor}`}>
                      ${stat.amount.toLocaleString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pie Chart */}
            <motion.div
              variants={itemVariants}
              className="bg-white/5 rounded-2xl border border-white/5 p-6"
            >
              <div className="h-[280px] flex items-center justify-center">
                <CustomPieChart
                  data={balanceData}
                  label="Total Balance"
                  totalAmount={`$${totalBalance.toLocaleString()}`}
                  colors={COLORS}
                  showTextAnchor
                />
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                {balanceData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-sm text-white/60">{item.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FinanceOverview;
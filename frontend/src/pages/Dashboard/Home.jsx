import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpense from "../../components/Dashboard/Last30DaysExpense";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);

      if (response?.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      setError("Failed to fetch dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto space-y-6">
        {loading && <p className="text-gray-500">Loading dashboard data...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Balance */}
          <div className="transform transition duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30 animate-fadeInUp delay-100">
            <InfoCard
              icon={<IoMdCard />} 
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
              color="bg-gradient-to-br from-[#2563EB] to-[#38BDF8]" // Indigo to Sky Blue
            />
          </div>

          {/* Total Income */}
          <div className="transform transition duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 animate-fadeInUp delay-200">
            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
              color="bg-gradient-to-br from-[#10B981] to-[#14B8A6]" // Emerald to Teal
            />
          </div>

          {/* Total Expense */}
          <div className="transform transition duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-pink-600/30 animate-fadeInUp delay-300">
            <InfoCard
              icon={<LuHandCoins />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
              color="bg-gradient-to-br from-[#EC4899] to-[#8B5CF6]" // Pink to Violet
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpense
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
            data={
              dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
            }
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;

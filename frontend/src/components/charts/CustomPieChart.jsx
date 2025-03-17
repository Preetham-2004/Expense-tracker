import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ✅ Dummy CustomTooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#1E1A2F] p-2 rounded-lg shadow-lg border border-purple-100/20 dark:border-purple-900/20 text-sm">
        <p className="font-semibold">{payload[0].name}</p>
        <p>${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }

  return null;
};

const CustomPieChart = ({
  data = [],
  label = "Total",
  totalAmount = "$0",
  colors = ["#875CF5", "#FA2C37", "#FF6900"],
  showTextAnchor = true,
}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        {/* Gradients for pie slices */}
        <defs>
          {colors.map((color, index) => (
            <radialGradient
              key={`gradient-${index}`}
              id={`gradient-${index}`}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop offset="0%" stopColor={color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={color} stopOpacity={1} />
            </radialGradient>
          ))}
          {/* Center Gradient */}
          <linearGradient
            id="centerGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#5F27CD" />
          </linearGradient>
        </defs>

        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={95}
          labelLine={false}
          isAnimationActive={true}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`url(#gradient-${index % colors.length})`}
              stroke="#fff"
              strokeWidth={2}
              style={{
                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.filter =
                  "drop-shadow(0 6px 16px rgba(0, 0, 0, 0.3))";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.filter =
                  "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))";
                e.target.style.transform = "scale(1)";
              }}
            />
          ))}
        </Pie>

        {/* Custom Tooltip */}
        <Tooltip content={<CustomTooltip />} />

        {/* Center Labels */}
        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="url(#centerGradient)"
              fontSize="14px"
              fontWeight="500"
              letterSpacing="1px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy="20"
              textAnchor="middle"
              fontSize="28px"
              fontWeight="700"
              fill="url(#centerGradient)"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
              }}
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;

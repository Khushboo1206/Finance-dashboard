import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useState } from "react";

export default function SpendingChart({ transactions }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const categoryTotals = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    "#8b5cf6",
    "#22c55e",
    "#3b82f6",
    "#facc15",
    "#ec4899",
    "#06b6d4",
  ];

  return (
    <div className="bg-[#0b0f14] p-6 rounded-2xl border border-white/5">

      <h2 className="text-lg font-semibold">Spending</h2>
      <p className="text-gray-400 text-sm mb-4">By category</p>

      {/* DONUT */}
      <div className="h-[220px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              isAnimationActive={true}
              animationDuration={800}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  style={{
                    transform:
                      activeIndex === index ? "scale(1.08)" : "scale(1)",
                    transformOrigin: "center",
                    transition: "all 0.3s ease",
                    filter:
                      activeIndex === index
                        ? "brightness(1.2)"
                        : "brightness(1)",
                  }}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0b0f14",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor:
                    COLORS[index % COLORS.length],
                }}
              />
              <span className="text-gray-300">
                {item.name}
              </span>
            </div>

            <span className="text-white font-medium">
              ${item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
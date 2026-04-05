import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

export default function Charts({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);

  const chartData = transactions.map((t) => ({
    date: t.date,
    amount: t.type === "income" ? t.amount : -t.amount,
  }));

  const barData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  const COLORS = ["#10b981", "#ef4444"]; // emerald + red

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* LINE CHART */}
      <div className="bg-[#0b0f14] p-4 rounded-xl border border-white/5">
        <h2 className="mb-3 font-semibold">Balance Trend</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <XAxis stroke="#666" dataKey="date" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="bg-[#0b0f14] p-4 rounded-xl border border-white/5">
        <h2 className="mb-3 font-semibold">Income vs Expense</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData}>
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Bar dataKey="value">
              {barData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
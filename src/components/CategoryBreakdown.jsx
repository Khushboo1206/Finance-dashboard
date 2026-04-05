export default function CategoryBreakdown({ transactions }) {

  // CALCULATE CATEGORY DATA
  const categoryTotals = {};
  let totalExpense = 0;

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
      totalExpense += t.amount;
    }
  });

  const sorted = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percent: ((amount / totalExpense) * 100).toFixed(1),
    }))
    .sort((a, b) => b.amount - a.amount);

  const colors = [
    "bg-purple-400",
    "bg-yellow-400",
    "bg-orange-400",
    "bg-blue-400",
    "bg-emerald-400",
    "bg-pink-400",
    "bg-cyan-400",
  ];

  return (
    <div className="bg-[#0b0f14] p-6 rounded-2xl border border-white/5">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">
            Full Category Breakdown
          </h2>
          <p className="text-gray-400 text-sm">
            All spending categories ranked
          </p>
        </div>

        <span className="text-yellow-400 text-xl">🏆</span>
      </div>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-5 text-xs text-gray-400 pb-3 border-b border-white/5">
        <span>#</span>
        <span>Category</span>
        <span>Total</span>
        <span>%</span>
        <span>Visual</span>
      </div>

      {/* ROWS */}
      <div className="mt-4 space-y-4">

        {sorted.map((item, i) => (
          <div
            key={item.category}
            className="grid grid-cols-5 items-center text-sm"
          >

            {/* RANK */}
            <span className="text-gray-400">
              {i < 3 ? "🏅" : `#${i + 1}`}
            </span>

            {/* CATEGORY */}
            <span className="text-white">
              {item.category}
            </span>

            {/* AMOUNT */}
            <span className="font-medium">
              ${item.amount}
            </span>

            {/* PERCENT */}
            <span className="text-gray-400">
              {item.percent}%
            </span>

            {/* BAR */}
            <div className="w-full bg-gray-800 h-2 rounded">
              <div
                className={`${colors[i % colors.length]} h-2 rounded`}
                style={{ width: `${item.percent}%` }}
              />
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
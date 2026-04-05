import { useMemo } from "react";
import { InsightCard, ProgressCard } from "../components/InsightCards";
import { PiggyBank, ArrowUpRight } from "lucide-react";
import CategoryBreakdown from "../components/CategoryBreakdown";

export default function Insights({ transactions }) {

  const insights = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((a, t) => a + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((a, t) => a + t.amount, 0);

    const balance = income - expense;

    const savingsRate = income ? ((income - expense) / income) * 100 : 0;
    const expenseRatio = income ? (expense / income) * 100 : 0;

    // CATEGORY TOTALS
    const categoryTotals = {};
    transactions.forEach((t) => {
      if (t.type === "expense") {
        categoryTotals[t.category] =
          (categoryTotals[t.category] || 0) + t.amount;
      }
    });

    const sortedCategories = Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    );

    const topCategory = sortedCategories[0];

    return {
      income,
      expense,
      balance,
      savingsRate,
      expenseRatio,
      sortedCategories,
      topCategory,
    };
  }, [transactions]);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Insights</h1>
        <p className="text-gray-400 text-sm">
          Understand your spending patterns
        </p>
      </div>

      {/* 🔥 TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">

        <InsightCard
          title="Top Spending Category"
          value={insights.topCategory?.[0] || "N/A"}
          sub={`$${insights.topCategory?.[1] || 0} spent`}
          color="purple"
          icon={<PiggyBank size={18} />}
        />

        <ProgressCard
          title="Savings Rate"
          value={`${insights.savingsRate.toFixed(1)}%`}
          percent={insights.savingsRate}
          color="emerald"
          note="Excellent savings habits!"
        />

        <InsightCard
          title="Month vs Month"
          value="+6.1%"
          sub="Expenses increased"
          color="red"
          icon={<ArrowUpRight size={18} />}
        />

        <InsightCard
          title="Avg Monthly Spend"
          value={`$${(insights.expense / 6 || 0).toFixed(0)}`}
          sub="Avg income / month"
          color="yellow"
        />
      </div>

      {/* 🔥 SECOND ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <InsightCard
          title="Net Position"
          value={`$${insights.balance}`}
          sub="You are in the green!"
          color="emerald"
        />

        <ProgressCard
          title="Expense Ratio"
          value={`${insights.expenseRatio.toFixed(1)}%`}
          percent={insights.expenseRatio}
          color="red"
          note="Keep below 80%"
        />
      </div>

      {/* 🔥 CATEGORY + MONTHLY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* CATEGORY BARS */}
        <div className="bg-[#0b0f14] p-5 rounded-2xl border border-white/5">
          <h2 className="font-semibold mb-4">Top Expense Categories</h2>

          {insights.sortedCategories.map(([cat, val]) => (
            <div key={cat} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>{cat}</span>
                <span>${val}</span>
              </div>

              <div className="h-2 bg-gray-800 rounded">
                <div
                  className="h-2 bg-purple-400 rounded"
                  style={{
                    width: `${
                      (val / insights.sortedCategories[0][1]) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* MONTHLY COMPARISON */}
        <div className="bg-[#0b0f14] p-5 rounded-2xl border border-white/5">
          <h2 className="font-semibold mb-4">Monthly Comparison</h2>

          {["Jan", "Feb", "Mar", "Apr"].map((m, i) => (
            <div key={i} className="flex justify-between mb-3 text-sm">
              <span className="text-gray-400">{m}</span>

              <div className="flex gap-4">
                <span className="text-emerald-400">
                  ${(Math.random() * 9000).toFixed(0)}
                </span>
                <span className="text-red-400">
                  ${(Math.random() * 4000).toFixed(0)}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
      <CategoryBreakdown transactions={transactions} />
    </div>
  );
}
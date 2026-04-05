import Charts from "../components/Charts";
import SpendingChart from "../components/SpendingChart";

export default function Dashboard({ transactions }) {

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400 text-sm">
          Your financial overview at a glance
        </p>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <Card title="Balance" value={`$${balance}`} color="emerald" />
        <Card title="Income" value={`$${income}`} color="emerald" />
        <Card title="Expenses" value={`$${expense}`} color="red" />
        <Card title="Transactions" value={transactions.length} color="purple" />
      </div>

      {/* 🔥 MAIN SECTION (FIXED ALIGNMENT) */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">

        {/* LEFT SIDE */}
        <div className="bg-[#0b0f14] p-5 rounded-2xl border border-white/5">
          <Charts transactions={transactions} />
        </div>

        {/* RIGHT SIDE (DONUT ONLY ONCE) */}
        <SpendingChart transactions={transactions} />

      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* MONTHLY NET */}
        <div className="bg-[#0b0f14] p-5 rounded-2xl border border-white/5">
          <h2 className="font-semibold mb-4">Monthly Net</h2>

          <div className="space-y-3">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-400">{m}</span>
                <span className="text-emerald-400">
                  ${(Math.random() * 8000).toFixed(0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="bg-[#0b0f14] p-5 rounded-2xl border border-white/5">
          <h2 className="font-semibold mb-4">Recent Transactions</h2>

          <div className="space-y-4 max-h-[250px] overflow-y-auto">
            {transactions.slice(0, 5).map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="text-sm">{t.category}</p>
                  <p className="text-xs text-gray-400">{t.date}</p>
                </div>

                <p
                  className={`font-medium ${
                    t.type === "income"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}${t.amount}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* CARD */
function Card({ title, value, color }) {
  const colors = {
    emerald: "text-emerald-400",
    red: "text-red-400",
    purple: "text-purple-400",
  };

  return (
    <div className="bg-[#0b0f14] p-5 rounded-2xl border border-white/5">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className={`text-2xl font-bold mt-1 ${colors[color]}`}>
        {value}
      </h2>
    </div>
  );
}
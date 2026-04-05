import { ArrowUpRight, ArrowDownRight, PiggyBank, Wallet } from "lucide-react";

/* 🔹 MAIN CARD */
export function InsightCard({ title, value, sub, color = "emerald", icon }) {
  const colorMap = {
    emerald: "from-emerald-500/10 to-transparent text-emerald-400",
    red: "from-red-500/10 to-transparent text-red-400",
    purple: "from-purple-500/10 to-transparent text-purple-400",
    yellow: "from-yellow-500/10 to-transparent text-yellow-400",
  };

  return (
    <div className="relative bg-[#0b0f14] p-5 rounded-2xl border border-white/5 overflow-hidden">

      {/* GLOW */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorMap[color]} blur-2xl opacity-30`}
      />

      {/* CONTENT */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <p className="text-gray-400 text-xs uppercase tracking-wide">
            {title}
          </p>
          {icon}
        </div>

        <h2 className="text-2xl font-bold">{value}</h2>

        <p className="text-gray-400 text-sm mt-2">{sub}</p>
      </div>
    </div>
  );
}

/* 🔹 PROGRESS CARD */
export function ProgressCard({
  title,
  value,
  percent,
  color = "emerald",
  note,
}) {
  const barColor = {
    emerald: "bg-emerald-400",
    red: "bg-red-400",
  };

  return (
    <div className="relative bg-[#0b0f14] p-5 rounded-2xl border border-white/5 overflow-hidden">

      {/* GLOW */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${
          color === "emerald" ? "bg-emerald-500/10" : "bg-red-500/10"
        } blur-2xl`}
      />

      <div className="relative z-10">
        <p className="text-gray-400 text-xs uppercase">{title}</p>

        <h2 className="text-2xl font-bold mt-2">{value}</h2>

        {note && (
          <p className="text-gray-400 text-sm mt-2">{note}</p>
        )}

        {/* PROGRESS BAR */}
        <div className="h-2 bg-gray-800 rounded mt-4">
          <div
            className={`${barColor[color]} h-2 rounded`}
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
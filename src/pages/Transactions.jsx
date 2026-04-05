import { Trash2 } from "lucide-react";

export default function Transactions({
  filtered,
  income,
  expense,
  role,
  addTransaction,
  deleteTransaction,
  setSearch,
}) {
  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-gray-400 text-sm">
            Manage and explore your transactions
          </p>
        </div>

        {role === "admin" && (
          <button
            onClick={addTransaction}
            className="bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition"
          >
            + Add Transaction
          </button>
        )}
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search transactions..."
        className="mb-4 p-3 bg-[#0f1720] border border-white/10 rounded-xl w-full outline-none"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-3 mb-5">
        <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10">
          Showing: {filtered.length} results
        </div>

        <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-xl">
          Income: ${income}
        </div>

        <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-xl">
          Expenses: ${expense}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#0f1720] border border-white/10 rounded-2xl overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          
          {/* HEADER */}
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Amount</th>
              {role === "admin" && <th className="p-4 text-left">Actions</th>}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-400">
                  No transactions found
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  {/* DATE */}
                  <td className="p-4">{t.date}</td>

                  {/* CATEGORY */}
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs">
                      {t.category}
                    </span>
                  </td>

                  {/* TYPE */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs capitalize ${
                        t.type === "income"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>

                  {/* AMOUNT */}
                  <td
                    className={`p-4 font-medium ${
                      t.type === "income"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    ${t.amount}
                  </td>

                  {/* DELETE ACTION */}
                  {role === "admin" && (
                    <td className="p-4">
                      <button
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            "Are you sure you want to delete this transaction?"
                          );
                          if (confirmDelete) {
                            deleteTransaction(t.id);
                          }
                        }}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 border border-white/10 transition group"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
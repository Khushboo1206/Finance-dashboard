import { Trash2 } from "lucide-react";

function TransactionTable({ transactions, deleteTransaction, role }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-gray-700">
      <table className="w-full text-left min-w-[600px]">

        {/* HEADER */}
        <thead className="bg-gray-800/60 text-gray-300 text-sm">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Category</th>
            <th className="p-3">Type</th>
            <th className="p-3">Amount</th>
            {role === "admin" && <th className="p-3">Actions</th>}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-5 text-gray-400">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((t) => (
              <tr
                key={t.id}
                className="border-t border-gray-700 hover:bg-gray-800/60 transition"
              >
                <td className="p-3">{t.date}</td>

                <td className="p-3">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs">
                    {t.category}
                  </span>
                </td>

                <td
                  className={`p-3 font-medium capitalize ${
                    t.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {t.type}
                </td>

                <td
                  className={`p-3 font-semibold ${
                    t.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  ₹{t.amount}
                </td>

                {/* DELETE BUTTON */}
                {role === "admin" && (
                  <td className="p-3">
                    <button
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          "Delete this transaction?"
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
  );
}

export default TransactionTable;
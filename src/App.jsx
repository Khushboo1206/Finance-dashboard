import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import Dashboard from "./pages/Dashboard";

import {
  fetchTransactions,
  createTransaction,
  removeTransaction,
} from "./api/mockApi";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("viewer");
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔌 FETCH (MOCK API)
  useEffect(() => {
    fetchTransactions().then((data) => {
      setTransactions(data);
    });
  }, []);

  // 🔍 FILTER
  const filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  // ➕ ADD (API)
  const addTransaction = async () => {
    const amount = prompt("Enter amount:");
    const category = prompt("Enter category:");
    const type = prompt("Type (income/expense):");

    if (!amount || !category || !type) return;

    const newTx = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      amount: Number(amount),
      category,
      type,
    };

    const updated = await createTransaction(newTx);
    setTransactions(updated);
  };

  // ❌ DELETE (API)
  const deleteTransaction = async (id) => {
    const updated = await removeTransaction(id);
    setTransactions(updated);
  };

  return (
    <div className="flex min-h-screen text-white bg-[#050505]">

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#0b0f14] p-2 rounded-lg border border-white/5"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0b0f14] border-r border-white/5 p-5 z-40 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <button
          className="md:hidden mb-6 text-gray-400"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        <h1 className="text-xl font-bold text-emerald-400 mb-10">
          FinFlow
        </h1>

        {/* NAV */}
        <div className="space-y-2">
          {["dashboard", "transactions", "insights"].map((item) => (
            <div
              key={item}
              onClick={() => {
                setPage(item);
                setSidebarOpen(false);
              }}
              className={`p-3 rounded-xl cursor-pointer transition capitalize ${
                page === item
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-gray-400 hover:bg-white/5"
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* ROLE */}
        <div className="mt-10 bg-white/5 p-4 rounded-xl border border-white/5">
          <p className="text-xs text-gray-400 mb-2">CURRENT ROLE</p>

          <select
            className="w-full p-2 bg-[#050505] rounded text-white border border-white/10"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* MAIN CONTENT WITH ANIMATION */}
      <motion.div
        key={page}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 p-4 md:p-6 max-w-7xl mx-auto md:ml-64"
      >
        {/* DASHBOARD */}
        {page === "dashboard" && (
          <Dashboard transactions={transactions} />
        )}

        {/* TRANSACTIONS */}
        {page === "transactions" && (
          <Transactions
            filtered={filtered}
            role={role}
            addTransaction={addTransaction}
            deleteTransaction={deleteTransaction}
            setSearch={setSearch}
          />
        )}

        {/* INSIGHTS */}
        {page === "insights" && (
          <Insights transactions={transactions} />
        )}
      </motion.div>
    </div>
  );
}

export default App;
<div className="w-64 bg-[#0F172A] p-5 hidden md:flex flex-col justify-between">

  {/* TOP */}
  <div>
    <h1 className="text-xl font-bold text-green-400 mb-10">FinFlow</h1>

    <p className="text-xs text-gray-500 mb-3 tracking-widest">NAVIGATION</p>

    <div className="space-y-2">

      <div
        onClick={() => setPage("dashboard")}
        className={`p-3 rounded-xl cursor-pointer ${
          page === "dashboard"
            ? "bg-green-500/10 text-green-400 border border-green-500/20"
            : "text-gray-400 hover:bg-gray-800"
        }`}
      >
        Dashboard
      </div>

      <div
        onClick={() => setPage("transactions")}
        className={`p-3 rounded-xl cursor-pointer ${
          page === "transactions"
            ? "bg-green-500/10 text-green-400 border border-green-500/20"
            : "text-gray-400 hover:bg-gray-800"
        }`}
      >
        Transactions
      </div>

      <div
        onClick={() => setPage("insights")}
        className={`p-3 rounded-xl cursor-pointer ${
          page === "insights"
            ? "bg-green-500/10 text-green-400 border border-green-500/20"
            : "text-gray-400 hover:bg-gray-800"
        }`}
      >
        Insights
      </div>

    </div>
  </div>

  {/* BOTTOM ROLE BOX */}
  <div className="bg-[#111827] p-4 rounded-2xl border border-gray-700">
    <p className="text-xs text-gray-500 mb-2">CURRENT ROLE</p>

    <select
      className="w-full p-2 bg-gray-800 rounded text-white"
      value={role}
      onChange={(e) => setRole(e.target.value)}
    >
      <option value="viewer">Viewer</option>
      <option value="admin">Admin</option>
    </select>
  </div>

</div>
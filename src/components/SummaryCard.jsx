import { motion } from "framer-motion";

function SummaryCard({ title, amount, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-20"></div>

      <div className="flex justify-between items-center relative z-10">
        <p className="text-gray-400 text-sm">{title}</p>
        <div className="text-green-400">{icon}</div>
      </div>

      <h2 className="text-2xl font-bold mt-3 relative z-10">
        ₹{amount}
      </h2>
    </motion.div>
  );
}

export default SummaryCard;
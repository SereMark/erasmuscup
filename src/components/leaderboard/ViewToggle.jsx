import React from "react";
import { motion } from "framer-motion";

export function ViewToggle({ viewMode, setViewMode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
      }}
      className="bg-black/50 backdrop-blur-sm rounded-full p-1.5 flex items-center"
    >
      <button
        onClick={() => setViewMode("table")}
        className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
          viewMode === "table" 
            ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg" 
            : "text-gray-400 hover:text-white"
        }`}
        aria-pressed={viewMode === "table"}
        aria-label="Switch to table view"
      >
        Table View
      </button>
      <button
        onClick={() => setViewMode("cards")}
        className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
          viewMode === "cards" 
            ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg" 
            : "text-gray-400 hover:text-white"
        }`}
        aria-pressed={viewMode === "cards"}
        aria-label="Switch to card view"
      >
        Card View
      </button>
    </motion.div>
  );
}
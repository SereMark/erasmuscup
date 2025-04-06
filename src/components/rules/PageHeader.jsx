import React from "react";
import { motion } from "framer-motion";

/**
 * Header component for the House Cup Rules page
 */
function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-6 sm:mb-12 text-center"
    >
      <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-1 rounded-2xl shadow-[0_10px_30px_rgba(79,70,229,0.2)]">
        <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-4 sm:p-8 md:p-10 border border-purple-900/30">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-lg">
            🏆 House Cup Rules 🏆
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              The official rulebook governing the definitely-not-a-cult competition among Erasmus students.
              Read at your own peril.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default PageHeader;
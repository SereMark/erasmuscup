import React from "react";
import { motion } from "framer-motion";

/**
 * Toggle button for showing/hiding the table of contents on mobile
 */
function MobileTableOfContentsToggle({ showTOC, setShowTOC }) {
  return (
    <div className="lg:hidden mb-6 text-center">
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowTOC(!showTOC)}
        className="bg-gradient-to-r from-purple-600 to-indigo-700 px-4 py-2 rounded-lg text-white font-medium inline-flex items-center space-x-2 shadow-lg"
        aria-expanded={showTOC}
        aria-controls="table-of-contents"
      >
        <span>{showTOC ? "Hide" : "Show"} Table of Contents</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 transition-transform duration-300 ${showTOC ? "rotate-180" : ""}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </motion.button>
    </div>
  );
}

export default MobileTableOfContentsToggle;
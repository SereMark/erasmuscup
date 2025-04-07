import React from "react";
import { motion } from "framer-motion";

/**
 * Individual table of contents item
 */
function TOCItem({ id, label, icon, scrollToSection, activeSection }) {
  const isActive = activeSection === id;
  
  return (
    <li className="group">
      <motion.button
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollToSection(id)}
        className={`flex items-center w-full px-3 py-2 rounded-lg text-left transition-all duration-300 group-hover:bg-purple-900/30 ${
          isActive ? "bg-purple-900/40 text-white" : "text-gray-300"
        }`}
      >
        <span className="mr-2">{icon}</span>
        <span className="truncate">{label}</span>
        
        {isActive && (
          <motion.span
            layoutId="active-indicator"
            className="ml-auto h-2 w-2 rounded-full bg-purple-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.button>
    </li>
  );
}

export default TOCItem;
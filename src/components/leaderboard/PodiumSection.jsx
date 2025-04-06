import React from "react";
import { motion } from "framer-motion";
import { PodiumCard } from "./PodiumCard";

export default function PodiumSection({ sortedHouseTotals, isMobile }) {
  return (
    <div className="px-4 sm:px-6 max-w-6xl mx-auto -mt-10 sm:-mt-16 mb-10 sm:mb-16 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
      >
        {sortedHouseTotals.slice(0, 3).map((house, index) => (
          <PodiumCard 
            key={house.key}
            house={house}
            rank={index + 1}
            isMobile={isMobile}
          />
        ))}
      </motion.div>
    </div>
  );
}
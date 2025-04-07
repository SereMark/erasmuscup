import React from "react";
import { motion } from "framer-motion";
import { ScoreCard } from "./ScoreCard";
import { SCOREBOARD_DATA } from "../../../../constants/scoreboardData";

export function CardView({ sortedHouseTotals }) {
  return (
    <motion.div
      key="card-view"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 sm:space-y-6"
    >
      {SCOREBOARD_DATA.map((row, index) => (
        <ScoreCard 
          key={row.id} 
          row={row} 
          index={index} 
          sortedHouseTotals={sortedHouseTotals} 
        />
      ))}
    </motion.div>
  );
}
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { HOUSES } from "../../../../constants/houseData";
import { ANIMATION_STAGGER_DELAY } from "../../../../constants/animations";
import { ScoreItem } from "./ScoreItem";

export function ScoreCard({ row, index, sortedHouseTotals }) {
  const dateDisplay = row.date ? row.date : row.adjustment ? "Adjustment" : "";
  const eventDisplay = row.event || row.adjustment;
  
  // Sort houses by their scores for this specific row
  const sortedRowHouses = useMemo(() => {
    return [...HOUSES].sort((a, b) => {
      if (row.adjustment === "Buffaloes") {
        const aVal = row[a.key] != null ? row[a.key] : 0;
        const bVal = row[b.key] != null ? row[b.key] : 0;
        return bVal - aVal;
      } else {
        const aVal = row[a.key] != null ? row[a.key] : -Infinity;
        const bVal = row[b.key] != null ? row[b.key] : -Infinity;
        return bVal - aVal;
      }
    });
  }, [row]);
  
  // Create ranking mapping for this row
  const rowRankMapping = useMemo(() => {
    const rankings = {};
    sortedRowHouses.forEach((house, idx) => {
      rankings[house.key] = idx + 1;
    });
    return rankings;
  }, [sortedRowHouses]);
  
  const cardBgClass = row.total 
    ? "bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/30" 
    : "bg-black/70 border border-purple-900/20";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * ANIMATION_STAGGER_DELAY }}
      className={`p-4 sm:p-6 rounded-xl shadow-xl backdrop-blur-md ${cardBgClass}`}
    >
      <div className="mb-3 sm:mb-4 flex justify-between items-start">
        <div>
          {row.adjustment && !row.total && (
            <span className="inline-block bg-purple-900/30 text-purple-300 text-xs px-2 py-0.5 rounded-md mb-1 sm:mb-2">
              ADJUSTMENT
            </span>
          )}
          <h3 className={`text-lg sm:text-xl ${row.total ? "text-xl sm:text-2xl font-bold text-purple-200" : "font-medium text-white"}`}>
            {eventDisplay}
          </h3>
          {dateDisplay && (
            <p className="text-xs sm:text-sm text-gray-400 font-mono mt-1">{dateDisplay}</p>
          )}
        </div>
        {row.total && (
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center bg-purple-600 ${
                  i === 0 ? "z-30" : i === 1 ? "z-20" : "z-10"
                }`}
              >
                <span className="text-xs">🏆</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
        {sortedRowHouses.map(house => (
          <ScoreItem 
            key={house.key}
            house={house}
            value={row[house.key]}
            isTotal={row.total}
            rowRankMapping={rowRankMapping}
          />
        ))}
      </div>
    </motion.div>
  );
}
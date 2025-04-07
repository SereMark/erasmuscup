import React from "react";
import { motion } from "framer-motion";
import { ScoreCell } from "./ScoreCell";
import { ANIMATION_STAGGER_DELAY } from "../../../../constants/animations";

export function TableRow({ row, index, sortedHouseTotals, rankMapping }) {
  const dateDisplay = row.date ? row.date : row.adjustment ? "Adjustment" : "";
  const eventDisplay = row.event || row.adjustment;
  const rowClasses = row.total
    ? "font-bold border-t-4 border-t-purple-700/50 bg-black/80"
    : "hover:bg-purple-950/40 transition-all duration-300";
  
  return (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * ANIMATION_STAGGER_DELAY }}
      className={rowClasses}
    >
      <td className="px-6 py-5 text-left text-sm whitespace-nowrap">
        {dateDisplay && (
          <span className="font-mono bg-black/70 px-3 py-1 rounded-md text-gray-300">
            {dateDisplay}
          </span>
        )}
      </td>
      <td className="px-6 py-5 text-left text-base font-medium text-white">
        {row.adjustment && !row.total && (
          <span className="inline-block bg-purple-900/30 text-purple-300 text-xs px-2 py-0.5 rounded-md mr-2">
            ADJUSTMENT
          </span>
        )}
        {eventDisplay}
      </td>
      {sortedHouseTotals.map(house => (
        <ScoreCell 
          key={house.key}
          house={house}
          value={row[house.key]}
          isTotal={row.total}
          rankMapping={rankMapping}
        />
      ))}
    </motion.tr>
  );
}
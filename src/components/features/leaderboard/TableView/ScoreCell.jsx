import React from "react";
import { motion } from "framer-motion";
import { getColumnStyle } from "../../../../utils/leaderboardUtils";

export function ScoreCell({ house, value, isTotal, rankMapping }) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  
  return (
    <td
      className={`px-6 py-5 text-center ${getColumnStyle(house.key, rankMapping)}`}
    >
      {value !== null && value !== undefined ? (
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className={`font-bold text-base ${
            isTotal ? "text-2xl text-white" : isPositive ? "text-green-400" : isNegative ? "text-red-400" : "text-white"
          }`}
        >
          {isPositive && !isTotal && "+"}
          {value}
        </motion.div>
      ) : (
        <span className="text-gray-500">-</span>
      )}
    </td>
  );
}
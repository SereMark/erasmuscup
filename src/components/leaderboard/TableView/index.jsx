import React from "react";
import { motion } from "framer-motion";
import { TableRow } from "./TableRow";
import { SCOREBOARD_DATA } from "../../../constants/scoreboardData";
import { getColumnStyle } from "../../../utils/leaderboardUtils";

export function TableView({ sortedHouseTotals, rankMapping }) {
  return (
    <motion.div
      key="table-view"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden"
    >
      <div className="bg-black/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-purple-900/30">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-purple-950/80 text-gray-100">
              <tr>
                <th className="px-6 py-5 text-left text-sm font-medium tracking-wider">Date</th>
                <th className="px-6 py-5 text-left text-sm font-medium tracking-wider">Event / Adjustment</th>
                {sortedHouseTotals.map(house => (
                  <th
                    key={house.key}
                    className={`px-6 py-5 text-center text-sm font-medium tracking-wider ${getColumnStyle(house.key, rankMapping)}`}
                  >
                    <div className="flex flex-col items-center">
                      <span className="mb-1.5">{house.name}</span>
                      <div className="w-8 h-8 bg-black/30 rounded-full p-0.5 flex items-center justify-center">
                        <img 
                          src={house.logo} 
                          alt={`${house.name} logo`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/20">
              {SCOREBOARD_DATA.map((row, index) => (
                <TableRow 
                  key={row.id} 
                  row={row} 
                  index={index} 
                  sortedHouseTotals={sortedHouseTotals} 
                  rankMapping={rankMapping} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
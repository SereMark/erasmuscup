import React from "react";
import { motion } from "framer-motion";
import { getMedalEmoji } from "../../utils/leaderboardUtils";

export function PodiumCard({ house, rank, isMobile }) {
  const podiumHeight = rank === 1 ? "h-48 sm:h-64" : rank === 2 ? "h-40 sm:h-56" : "h-32 sm:h-48";
  const delay = rank === 1 ? 0.6 : rank === 2 ? 0.4 : 0.8;
  const mobileOrder = isMobile ? (rank === 1 ? "order-first" : "") : "";
  const desktopOrder = rank === 1 ? "sm:order-2" : rank === 2 ? "sm:order-1" : "sm:order-3";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      className={`relative ${mobileOrder} ${desktopOrder}`}
    >
      <div className={`bg-gradient-to-br ${house.gradient} p-1 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.4)]`}>
        <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
            className="absolute -top-8 sm:-top-10 text-3xl sm:text-4xl"
          >
            {getMedalEmoji(rank)}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full p-1 shadow-lg"
          >
            <img 
              src={house.logo} 
              alt={`${house.name} logo`}
              className="w-full h-full object-contain rounded-full"
              loading="lazy"
            />
          </motion.div>
          <h3 className="text-lg sm:text-xl font-bold mb-1 text-white">{house.name}</h3>
          <div className="text-3xl sm:text-4xl font-black mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            {house.points}
          </div>
          <div className="text-xs sm:text-sm text-gray-300 font-semibold">Rank #{rank}</div>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.7, delay: delay + 0.3 }}
            className={`w-full mt-3 sm:mt-4 bg-gradient-to-t ${house.gradient} rounded-lg opacity-20`}
            style={{ height: podiumHeight }}
          />
        </div>
      </div>
    </motion.div>
  );
}
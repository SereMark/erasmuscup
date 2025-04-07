import React from "react";
import { motion } from "framer-motion";
import { PodiumCard } from "../../features/leaderboard/PodiumCard";

export default function PodiumSection({ sortedHouseTotals, isMobile }) {
  // Get top 3 houses, or fewer if not enough data
  const topHouses = sortedHouseTotals.slice(0, Math.min(3, sortedHouseTotals.length));
  
  // Fill with placeholders if less than 3 houses
  const topThree = Array(3).fill(null).map((_, i) => topHouses[i] || null);
  
  // Animation settings
  const containerAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.2 }
  };

  return (
    <div className="px-4 sm:px-6 max-w-6xl mx-auto -mt-10 sm:-mt-16 mb-10 sm:mb-16 relative z-10">
      {isMobile ? (
        // Mobile layout - vertical stack with 1st at top
        <motion.div
          {...containerAnimation}
          className="flex flex-col gap-6"
        >
          {topHouses.map((house, index) => (
            <PodiumCard 
              key={house?.key || `place-${index}`}
              house={house}
              rank={index + 1}
              isMobile={true}
            />
          ))}
        </motion.div>
      ) : (
        // Desktop layout - podium style with same baseline
        <motion.div
          {...containerAnimation}
          className="flex items-end justify-center gap-4"
        >
          {/* Second place */}
          <div className="w-1/3">
            {topThree[1] && (
              <PodiumCard 
                house={topThree[1]} 
                rank={2} 
                isMobile={false}
              />
            )}
          </div>
          
          {/* First place */}
          <div className="w-1/3">
            {topThree[0] && (
              <PodiumCard 
                house={topThree[0]} 
                rank={1} 
                isMobile={false}
              />
            )}
          </div>
          
          {/* Third place */}
          <div className="w-1/3">
            {topThree[2] && (
              <PodiumCard 
                house={topThree[2]} 
                rank={3} 
                isMobile={false}
              />
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
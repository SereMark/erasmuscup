import React, { useState, useEffect, memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTiltEffect } from '../../utils/animationUtils';
import { getHouseTheme } from '../../utils/houseTheme';

const HouseStandingCard = memo(({ house, rank, score, maxScore, index }) => {
  const tiltRef = useTiltEffect({ max: 5, scale: 1.02 });
  const [width, setWidth] = useState(0);
  
  // Use the global house theme utility
  const houseTheme = getHouseTheme(house.key);
  
  // Calculate the percentage width for the progress bar
  useEffect(() => {
    const percentage = (score / maxScore) * 100;
    
    // Animate the width with a slight delay
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 300 + index * 150);
    
    return () => clearTimeout(timer);
  }, [score, maxScore, index]);

  // Visual indicator for first place
  const isFirstPlace = rank === 1;

  return (
    <motion.div
      ref={tiltRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={`relative overflow-hidden ${isFirstPlace ? 'shadow-lg ' + houseTheme.glowStrong : ''}`}
    >
      {/* Card */}
      <div className={`bg-dark-800 rounded-xl overflow-hidden ${isFirstPlace ? 'ring-1 ' + houseTheme.ring : ''}`}>
        {/* House color top bar */}
        {isFirstPlace && <div className={`h-1 w-full ${houseTheme.bg}`} aria-hidden="true"></div>}
        
        <div className="p-3 sm:p-4 md:p-5">
          <div className="flex items-center mb-3 md:mb-4">
            {/* Rank */}
            <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${houseTheme.bgLight} mr-3 md:mr-4 ${isFirstPlace ? 'ring-2 ' + houseTheme.border : ''}`}>
              <span className={`font-bold text-base sm:text-lg ${isFirstPlace ? houseTheme.textPrimary : houseTheme.text}`}>
                {rank}
              </span>
            </div>
            
            {/* House Logo */}
            <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 overflow-hidden mr-3 md:mr-4 bg-dark-900/60 rounded-full p-1 flex items-center justify-center">
              <img 
                src={house.logo} 
                alt={house.name}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain" 
                loading="lazy"
              />
            </div>
            
            {/* House Name and Info */}
            <div className="flex-grow">
              <h4 className="text-white font-bold text-base sm:text-lg">{house.name}</h4>
            </div>
            
            {/* Score */}
            <div className="text-right ml-2 sm:ml-4 flex flex-col items-end">
              <div className={`text-xl sm:text-2xl font-bold ${isFirstPlace ? 'neon-text' : houseTheme.textPrimary}`}>
                {score}
              </div>
              <div className="text-xs text-dark-400">points</div>
            </div>
          </div>
          
          {/* Progress Bar with animation */}
          <div className="h-1.5 sm:h-2 bg-dark-700 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${houseTheme.bg}`}
              initial={{ width: 0 }}
              animate={{ width: `${width}%` }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
              aria-label={`${house.name} has ${score} points, which is ${Math.round(width)}% of the top score`}
              aria-hidden="true"
            />
          </div>
          
          {/* Background gradient */}
          {isFirstPlace && (
            <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${houseTheme.gradient} opacity-30`} aria-hidden="true"></div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

// Set display name for memoized component
HouseStandingCard.displayName = 'HouseStandingCard';

const HouseStandings = ({ houses, scores }) => {
  // Find the total score for each house
  const houseScores = useMemo(() => {
    const lastScoreEntry = scores.find((entry) => entry.type === 'total') || scores[scores.length - 1];
    const result = [];
    
    // Process house scores
    houses.forEach((house) => {
      const score = lastScoreEntry.points[house.key] || 0;
      result.push({ house, score });
    });
    
    // Sort by score (highest first)
    return result.sort((a, b) => b.score - a.score);
  }, [houses, scores]);
  
  // Find max score for scaling the progress bars
  const maxScore = useMemo(() => {
    return Math.max(...houseScores.map((item) => item.score));
  }, [houseScores]);

  return (
    <div className="mb-10 md:mb-16">
      {/* Section Header with animation */}
      <motion.div 
        className="mb-6 md:mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">Current Standings</h3>
        <p className="text-dark-300 text-sm md:text-base">Rankings based on total points earned across all events</p>
        <div className="w-12 md:w-16 h-1 bg-brand-500/70 mx-auto rounded-full mt-3 md:mt-4"></div>
      </motion.div>
      
      {/* House Cards Grid - Single column on mobile, two columns on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5 max-w-4xl mx-auto">
        {houseScores.map((item, index) => (
          <HouseStandingCard
            key={item.house.key}
            house={item.house}
            rank={index + 1}
            score={item.score}
            maxScore={maxScore}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(HouseStandings);
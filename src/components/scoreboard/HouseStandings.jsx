import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTiltEffect } from '../../utils/animationUtils';
import { getHouseTheme } from '../../utils/houseTheme';

const HouseStandingCard = ({ house, rank, score, maxScore, index }) => {
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

  return (
    <motion.div
      ref={tiltRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={`relative overflow-hidden ${rank === 1 ? 'shadow-lg ' + houseTheme.glowStrong : ''}`}
    >
      {/* Card */}
      <div className={`bg-dark-800 rounded-xl overflow-hidden ${rank === 1 ? 'ring-1 ' + houseTheme.ring : ''}`}>
        {/* House color top bar */}
        {rank === 1 && <div className={`h-1 w-full ${houseTheme.bg}`}></div>}
        
        <div className="p-4 sm:p-5">
          <div className="flex items-center mb-4">
            {/* Rank */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${houseTheme.bgLight} mr-4 ${rank === 1 ? 'ring-2 ' + houseTheme.border : ''}`}>
              <span className={`font-bold text-lg ${rank === 1 ? houseTheme.textPrimary : houseTheme.text}`}>{rank}</span>
            </div>
            
            {/* House Logo */}
            <div className="h-12 w-12 overflow-hidden mr-4 bg-dark-900/60 rounded-full p-1 flex items-center justify-center">
              <img 
                src={house.logo} 
                alt={house.name}
                className="w-10 h-10 object-contain" 
              />
            </div>
            
            {/* House Name and Info */}
            <div className="flex-grow">
              <h4 className="text-white font-bold text-lg">{house.name}</h4>
              <div className="flex flex-col sm:flex-row sm:items-center text-xs">
                <span className="hidden sm:block mx-2 text-dark-500">•</span>
                <span className="italic text-dark-300 text-xs truncate">"{house.motto}"</span>
              </div>
            </div>
            
            {/* Score */}
            <div className="text-right ml-4 flex flex-col items-end">
              <div className={`text-2xl font-bold ${rank === 1 ? 'neon-text' : houseTheme.textPrimary}`}>
                {score}
              </div>
              <div className="text-xs text-dark-400">points</div>
            </div>
          </div>
          
          {/* Progress Bar with animation */}
          <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${houseTheme.bg}`}
              initial={{ width: 0 }}
              animate={{ width: `${width}%` }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
            />
          </div>
          
          {/* Background gradient */}
          {rank === 1 && (
            <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${houseTheme.gradient} opacity-30`}></div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const HouseStandings = ({ houses, scores }) => {
  // Find the total score for each house
  const lastScoreEntry = scores.find((entry) => entry.type === 'total') || scores[scores.length - 1];
  const houseScores = [];
  
  // Process house scores and sort by score (descending)
  houses.forEach((house) => {
    const score = lastScoreEntry.points[house.key] || 0;
    houseScores.push({ house, score });
  });
  
  // Sort by score (highest first)
  houseScores.sort((a, b) => b.score - a.score);
  
  // Find max score for scaling the progress bars
  const maxScore = Math.max(...houseScores.map((item) => item.score));

  return (
    <div className="mb-16">
      {/* Section Header with animation */}
      <motion.div 
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Current Standings</h3>
        <p className="text-dark-300">Rankings based on total points earned across all events</p>
        <div className="w-16 h-1 bg-brand-500/70 mx-auto rounded-full mt-4"></div>
      </motion.div>
      
      {/* House Cards with Grid for Larger Screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
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

export default HouseStandings;
import React from 'react';
import { motion } from 'framer-motion';
import { getPointBadgeClass, getHouseClass } from '../../utils/houseTheme';

const ScoreboardTable = ({ houses, scores }) => {
  // Filter out the total row (we'll display it separately)
  const eventScores = scores.filter(score => score.type !== 'total');
  const totalScore = scores.find(score => score.type === 'total');

  // Animation variants for table rows
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="overflow-x-auto w-full mb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-xl shadow-lg overflow-hidden border border-dark-800/50"
      >
        <table className="w-full text-left text-white">
          <thead>
            <tr className="border-b border-dark-700 bg-dark-800/70">
              <th className="p-4 font-semibold">Event</th>
              <th className="p-4 font-semibold">Date</th>
              {houses.map((house) => (
                <th key={house.key} className="p-4 font-semibold">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-dark-900/60 rounded-full p-1 flex items-center justify-center mr-2 hidden sm:flex">
                      <img 
                        src={house.logo} 
                        alt={house.name}
                        className="w-6 h-6" 
                      />
                    </div>
                    <span className={getHouseClass(house.key, 'textPrimary')}>
                      {house.name}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {eventScores.map((score, index) => (
              <motion.tr 
                key={score.id}
                className={`border-b border-dark-800/30 hover:bg-dark-800/30 transition-colors ${
                  score.type === 'adjustment' ? 'bg-dark-800/10' : ''
                }`}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={tableRowVariants}
              >
                <td className="p-4 font-medium">
                  {score.eventName}
                  {score.type === 'adjustment' && (
                    <span className="badge-accent ml-2 text-xs">Adjustment</span>
                  )}
                </td>
                <td className="p-4 text-dark-300">{score.date}</td>
                {houses.map((house) => {
                  const points = score.points[house.key] || 0;
                  
                  // Find if this is the highest score for this event
                  const highestPoint = Math.max(...Object.values(score.points));
                  const isHighest = points === highestPoint && points > 0;
                  
                  return (
                    <td 
                      key={`${score.id}-${house.key}`} 
                      className="p-4"
                    >
                      <span className={`inline-block px-3 py-1.5 rounded-lg text-center min-w-[60px] ${getPointBadgeClass(points)} ${isHighest ? 'shadow-sm' : ''}`}>
                        {points > 0 ? `+${points}` : points}
                      </span>
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
          {totalScore && (
            <tfoot>
              <motion.tr 
                className="bg-dark-700/40 font-bold"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <td className="p-4 text-lg" colSpan="2">
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="text-brand-400 mr-2"
                    >
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                      <path d="M4 22h16"></path>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>
                    Total Points
                  </div>
                </td>
                {houses.map((house) => {
                  const totalPoints = totalScore.points[house.key] || 0;
                  
                  // Find highest total score
                  const highestTotal = Math.max(...Object.values(totalScore.points));
                  const isHighest = totalPoints === highestTotal;
                  
                  return (
                    <td key={`total-${house.key}`} className="p-4">
                      <span className={`text-lg ${getHouseClass(house.key, 'textPrimary')} ${isHighest ? 'font-extrabold' : ''}`}>
                        {totalPoints}
                      </span>
                    </td>
                  );
                })}
              </motion.tr>
            </tfoot>
          )}
        </table>
      </motion.div>
    </div>
  );
};

export default ScoreboardTable;
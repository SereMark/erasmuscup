import React from 'react';
import { motion } from 'framer-motion';
import { useTiltEffect } from '../../utils/animationUtils';
import { getHouseTheme } from '../../utils/houseTheme';

const EventCard = ({ event, houses, index }) => {
  const tiltRef = useTiltEffect({ max: 5, scale: 1.02 });
  
  // Find the highest score in this event
  const highestScore = Math.max(...Object.values(event.points).filter(score => !isNaN(score)));
  
  // Determine if this is a special event
  const isAdjustment = event.type === 'adjustment';
  const isTotal = event.type === 'total';
  
  // Get the house with the highest score for this event
  const winningHouse = houses.find(house => event.points[house.key] === highestScore);
  const winningHouseTheme = winningHouse ? getHouseTheme(winningHouse.key) : getHouseTheme('theHoo');
  const brandTheme = getHouseTheme('theHoo'); // For total card and defaults

  return (
    <motion.div
      ref={tiltRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`overflow-hidden rounded-xl ${isTotal ? 'shadow-lg' : ''}`}
    >
      <div className={`h-full flex flex-col ${isTotal ? 'bg-dark-900 ring-1 ' + brandTheme.ringLight : 'bg-dark-800'} rounded-xl relative`}>
        {/* Top accent bar for special events */}
        {isTotal && <div className="h-1 w-full bg-gradient-to-r from-brand-400 to-brand-500"></div>}
        {isAdjustment && <div className="h-1 w-full bg-accent-500"></div>}
        
        {/* Event Header */}
        <div className="p-3 sm:p-4 md:p-5 border-b border-dark-700/50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`font-bold text-base sm:text-lg ${isTotal ? 'text-white' : 'text-dark-100'}`}>
                {event.eventName}
              </h3>
              {!isTotal && (
                <p className="text-xs sm:text-sm text-dark-400">{event.date}</p>
              )}
            </div>
            
            {/* Badge for adjustments */}
            {isAdjustment && (
              <span className="badge-accent text-xs">Adjustment</span>
            )}
            
            {/* Trophy for totals */}
            {isTotal && (
              <div className={`${brandTheme.bgLighter} p-1.5 sm:p-2 rounded-lg`}>
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
                  className={brandTheme.textPrimary}
                >
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                </svg>
              </div>
            )}
          </div>
        </div>
        
        {/* Points by House */}
        <div className="p-3 sm:p-4 md:p-5 space-y-3 md:space-y-4 flex-grow">
          {houses.map((house) => {
            const points = event.points[house.key] || 0;
            const isHighest = !isNaN(points) && points === highestScore && points > 0;
            const houseTheme = getHouseTheme(house.key);
            
            return (
              <div key={house.key} className={`flex items-center justify-between ${isHighest && !isTotal ? 'p-1.5 sm:p-2 -mx-1.5 sm:-mx-2 rounded-lg ' + houseTheme.bgLight : ''}`}>
                <div className="flex items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 bg-dark-900/60 rounded-full p-1 flex items-center justify-center">
                    <img
                      src={house.logo}
                      alt={house.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className={`text-sm sm:text-base ${isHighest ? 'font-medium text-white' : 'text-dark-200'}`}>{house.name}</span>
                </div>
                
                <div 
                  className={`font-bold ${
                    isTotal 
                      ? houseTheme.textPrimary
                      : isHighest
                        ? 'text-white'
                        : points < 0 
                          ? 'text-accent-400'
                          : 'text-dark-300'
                  } ${isTotal ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'}`}
                >
                  {points > 0 && !isTotal ? '+' : ''}{points}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Footer for special events */}
        {isTotal && (
          <div className="p-3 sm:p-4 bg-dark-800/40 text-center text-xs sm:text-sm text-dark-300 border-t border-dark-700/50">
            <span>Final standings as of the last event</span>
          </div>
        )}
        
        {/* Gradient background for winner */}
        {isTotal && (
          <div className="absolute inset-0 -z-10 opacity-20 rounded-xl overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${brandTheme.gradient}`}></div>
          </div>
        )}
        
        {/* Highlight for highest scoring house */}
        {!isTotal && isAdjustment === false && highestScore > 0 && (
          <div className="absolute top-0 right-0">
            <div className={`w-6 h-6 sm:w-8 sm:h-8 ${winningHouseTheme.textPrimary} flex items-center justify-center`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="sm:w-4 sm:h-4"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ScoreboardCards = ({ houses, scores }) => {
  // Filter to show total at top
  const totalEvent = scores.find(event => event.type === 'total');
  const regularEvents = scores.filter(event => event.type !== 'total');
  
  // Stagger animation for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 mb-8 md:mb-12">
      {/* Total Event Card - Featured at Top */}
      {totalEvent && (
        <div className="max-w-2xl mx-auto">
          <EventCard
            key={totalEvent.id}
            event={totalEvent}
            houses={houses}
            index={0}
          />
        </div>
      )}
      
      {/* Regular Events Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
      >
        {regularEvents.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            houses={houses}
            index={index + 1}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ScoreboardCards;
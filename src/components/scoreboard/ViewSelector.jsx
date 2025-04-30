import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

const ViewSelector = ({ viewOptions, currentView, onChange }) => {
  // Define icons for each view option
  const getViewIcon = useMemo(() => ({
    table: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="3" y1="15" x2="21" y2="15"></line>
        <line x1="9" y1="3" x2="9" y2="21"></line>
        <line x1="15" y1="3" x2="15" y2="21"></line>
      </svg>
    ),
    cards: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    ),
    stats: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    )
  }), []);
  
  // Format the view mode label
  const formatViewLabel = (mode) => {
    return mode.charAt(0).toUpperCase() + mode.slice(1);
  };
  
  // Handle view change
  const handleViewChange = (mode) => {
    if (mode !== currentView) {
      onChange(mode);
    }
  };

  return (
    <div className="flex justify-center mb-8 md:mb-12 mx-auto" role="tablist" aria-label="Scoreboard view options">
      <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl p-1 sm:p-1.5 inline-flex shadow-lg">
        {viewOptions.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleViewChange(option)}
            className={`relative px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 min-w-[70px] sm:min-w-[100px] flex items-center justify-center ${
              currentView === option
                ? 'text-white'
                : 'text-dark-300 hover:text-white'
            }`}
            role="tab"
            aria-selected={currentView === option}
            aria-controls={`${option}-panel`}
            id={`${option}-tab`}
          >
            {/* Animated background for active tab */}
            {currentView === option && (
              <motion.span
                layoutId="viewSelector"
                className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg z-0"
                initial={false}
                transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
                aria-hidden="true"
              />
            )}
            
            {/* Icon and label with relative z-index */}
            <span className="relative z-10 flex items-center">
              <span className="mr-1.5 sm:mr-2">{getViewIcon[option]}</span>
              <span className="whitespace-nowrap">{formatViewLabel(option)}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default memo(ViewSelector);
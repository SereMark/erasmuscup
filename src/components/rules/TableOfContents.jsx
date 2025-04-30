import React, { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * Table of Contents component for navigation within rules
 */
const TableOfContents = ({ data, currentSectionId, onSectionClick }) => {
  // Handle section click
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    onSectionClick(sectionId);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const groupVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className="bg-dark-900 rounded-xl border border-dark-800 shadow-md mb-4 sm:mb-8 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="bg-dark-800 py-3 px-4 border-b border-dark-700">
        <h3 className="text-base sm:text-lg font-bold text-white">Contents</h3>
      </div>
      
      {/* Table of Contents Groups */}
      <div className="p-3 sm:p-4 max-h-[350px] sm:max-h-[500px] overflow-y-auto custom-scrollbar">
        <div className="space-y-3 sm:space-y-4">
          {data.map((group, groupIndex) => (
            <motion.div 
              key={groupIndex} 
              className="mb-3 sm:mb-4 last:mb-0"
              variants={groupVariants}
            >
              {/* Group Title */}
              {group.title && (
                <div className="mb-1 sm:mb-2">
                  <h4 className="text-brand-400 font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                    {group.title}
                  </h4>
                </div>
              )}
              
              {/* Group Items */}
              <ul className="space-y-1 sm:space-y-1.5 pl-1">
                {group.items.map((item) => (
                  <motion.li key={item.id} variants={itemVariants}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleSectionClick(e, item.id)}
                      className={`flex items-center py-2 px-3 text-xs sm:text-sm rounded-md transition-colors hover:bg-dark-800 focus:outline-none focus:ring-1 focus:ring-brand-500/50 w-full ${
                        currentSectionId === item.id
                          ? 'bg-brand-500/10 text-brand-400 font-medium border-l-2 border-brand-500'
                          : 'text-dark-200 hover:text-white'
                      }`}
                      aria-current={currentSectionId === item.id ? 'true' : undefined}
                    >
                      {/* Icon */}
                      <span className="mr-2 text-dark-400 flex-shrink-0" aria-hidden="true">{item.icon}</span>
                      
                      {/* Label */}
                      <span className="truncate w-full">{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(TableOfContents);
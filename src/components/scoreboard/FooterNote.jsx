import React, { memo } from 'react';
import { motion } from 'framer-motion';

const FooterNote = ({ messageHtml }) => {
  // Don't render if no message is provided
  if (!messageHtml) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto mb-8 md:mb-12"
    >
      <div className="glass-card rounded-xl overflow-hidden shadow-lg">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-brand-400 to-brand-500" aria-hidden="true"></div>
        
        <div className="p-4 sm:p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3 sm:mr-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-500/20 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-brand-400 sm:w-5 sm:h-5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Strategy Tip</h4>
              <div 
                className="text-dark-200 prose prose-sm max-w-none text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: messageHtml }}
              />
            </div>
          </div>
        </div>
        
        {/* Decorative bottom pattern */}
        <div className="h-1 w-full bg-dark-800" aria-hidden="true"></div>
      </div>
    </motion.div>
  );
};

export default memo(FooterNote);
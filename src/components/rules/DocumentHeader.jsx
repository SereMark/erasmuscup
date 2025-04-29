import React from 'react';
import { motion } from 'framer-motion';

const DocumentHeader = ({ data }) => {
  const { title, icon, info, note } = data;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass-card mb-12 overflow-hidden rounded-xl shadow-lg border border-dark-800/50"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-500 to-brand-600"></div>
      
      {/* Header Content */}
      <div className="p-6 md:p-8 border-b border-dark-800">
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0 bg-brand-500/20 text-brand-400 w-12 h-12 rounded-full flex items-center justify-center">
            <span className="text-2xl">{icon}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white ml-4">{title}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {info.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-dark-800/30 rounded-lg p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
            >
              <div className="flex flex-col">
                <span className="text-dark-400 text-sm mb-1">{item.label}</span>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Note Section */}
      <motion.div 
        className="p-6 md:p-8 bg-dark-800/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4 mt-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-brand-400"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div 
            className="flex-grow text-dark-200 prose prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: note }}
          />
        </div>
      </motion.div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
        <div className="absolute -top-6 -right-6 w-12 h-12 rotate-45 bg-brand-500/20"></div>
      </div>
    </motion.div>
  );
};

export default DocumentHeader;
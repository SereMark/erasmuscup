import React from 'react';
import { motion } from 'framer-motion';

const RulesHero = ({ data }) => {
  const { title, subtitle } = data;

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden bg-dark-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-brand-900/50 to-dark-950/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        
        <motion.div 
          className="absolute inset-0 dot-pattern opacity-10"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        
        {/* Decorative floating elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-brand-500/5 blur-2xl"
          animate={{ 
            y: [0, -15, 0],
            opacity: [0.3, 0.5, 0.3]
          }} 
          transition={{ 
            duration: 6,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-32 sm:w-48 h-32 sm:h-48 rounded-full bg-accent-500/5 blur-2xl"
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.2, 0.4, 0.2]
          }} 
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 2
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h1 className="mb-4 sm:mb-6 gradient-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{title}</h1>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full mb-4 sm:mb-6"></div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="text-base sm:text-lg md:text-xl text-white/90"
          >
            {subtitle}
          </motion.p>
          
          {/* Document badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 sm:mt-8 inline-block"
          >
            <div className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-dark-800/80 backdrop-blur-sm border border-dark-700">
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
                className="text-brand-400 mr-2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span className="text-xs sm:text-sm font-medium text-dark-100">Official Rulebook • April 2025 Edition</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gradient divider */}
      <div className="absolute bottom-0 left-0 w-full h-12 sm:h-16">
        <div className="w-full h-full bg-gradient-to-t from-dark-950 to-transparent"></div>
      </div>
    </section>
  );
};

export default RulesHero;
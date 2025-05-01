import React, { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * Enhanced Hero component for the Events page
 * Features dynamic background handling and smooth animations
 */
const EventsHero = ({ data }) => {
  const { title, subtitle, backgroundImage } = data;

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.7,
        staggerChildren: 0.15
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const floatAnimation = {
    hidden: { y: 0 },
    visible: {
      y: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative py-24 md:py-28 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        {backgroundImage ? (
          <>
            {/* Dark overlay for text contrast */}
            <div className="absolute inset-0 bg-dark-950/70 z-10"></div>
            
            {/* Background image with subtle zoom effect */}
            <motion.div 
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${backgroundImage})` }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 to-dark-950"></div>
        )}
        
        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-5"></div>
        
        {/* Subtle accent lighting elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-brand-500/5 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-accent-500/5 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        ></motion.div>
      </div>

      {/* Content */}
      <motion.div 
        className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Floating trophy icon */}
          <motion.div
            variants={elementVariants}
            initial="hidden"
            animate="visible"
            className="mb-6 inline-block"
          >
            <motion.div 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-dark-800/80 backdrop-blur-sm border border-brand-500/30 flex items-center justify-center mx-auto shadow-xl"
              variants={floatAnimation}
            >
              <span className="text-2xl sm:text-3xl">🏆</span>
            </motion.div>
          </motion.div>
          
          {/* Title with gradient text */}
          <motion.div variants={titleVariants}>
            <h1 className="mb-5 gradient-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              {title}
            </h1>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full mb-5"></div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={elementVariants}
            className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
          
          {/* Season badge */}
          <motion.div
            variants={elementVariants}
            className="mt-8 sm:mt-10 inline-block"
          >
            <div className="flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-dark-800/90 backdrop-blur-sm border border-dark-700/70 shadow-lg">
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
                className="text-brand-400 mr-2"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="text-sm font-medium text-dark-100">Spring Season • February-June 2025</span>
            </div>
          </motion.div>
          
        </div>
      </motion.div>

      {/* Bottom gradient fade for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-20" aria-hidden="true">
        <div className="w-full h-full bg-gradient-to-t from-dark-950 to-transparent"></div>
      </div>
    </section>
  );
};

export default memo(EventsHero);
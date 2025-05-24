import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

const ScoreboardHero = ({ data }) => {
  const { title, subtitle, backgroundImage, gradient } = data;

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, delay: 0.2, ease: 'easeOut' } 
    }
  };
  
  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.5, delay: 0.4, type: 'spring' } 
    }
  };
  
  const clockIconAnimation = {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: "linear" }
  };

  return (
    <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchpriority="high"
              aria-hidden="true"
            />
          </motion.div>
          
          {/* Custom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-950/70 to-dark-950/90 backdrop-blur-sm" aria-hidden="true"></div>
          <div className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-30`} aria-hidden="true"></div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={contentVariants}
          >
            <h1 className="mb-3 md:mb-4 text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{title}</h1>
            <div className="w-16 md:w-20 h-1 bg-brand-500 mx-auto rounded-full mb-4 md:mb-6"></div>
          </motion.div>

          {/* Animated Subtitle */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={subtitleVariants}
            className="text-base sm:text-lg md:text-xl text-white/90"
          >
            {subtitle}
          </motion.p>

          {/* Animated Badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={badgeVariants}
            className="mt-6 md:mt-8 inline-flex"
          >
            <div className="flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-500/20 border border-brand-500/30 rounded-lg">
              <motion.div
                animate={clockIconAnimation}
                className="mr-2"
                aria-hidden="true"
              >
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
                  className="text-brand-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </motion.div>
              <span className="text-xs sm:text-sm font-medium text-brand-300">
                Last Updated: 24/05/2025
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gradient-to-t from-dark-950 via-dark-950/90 to-transparent z-10" aria-hidden="true"></div>
    </section>
  );
};

export default memo(ScoreboardHero);
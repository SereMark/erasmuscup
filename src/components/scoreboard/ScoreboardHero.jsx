import React from 'react';
import { motion } from 'framer-motion';

const ScoreboardHero = ({ data }) => {
  const { title, subtitle, backgroundImage, gradient } = data;

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
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
              alt="Scoreboard Background"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          
          {/* Custom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-950/70 to-dark-950/90 backdrop-blur-sm"></div>
          <div className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-30`}></div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h1 className="mb-4 text-white">{title}</h1>
            <div className="w-20 h-1 bg-brand-500 mx-auto rounded-full mb-6"></div>
          </motion.div>

          {/* Animated Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="text-lg md:text-xl text-white/90"
          >
            {subtitle}
          </motion.p>

          {/* Animated Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4, type: 'spring' }}
            className="mt-8 inline-flex"
          >
            <div className="flex items-center px-4 py-2 bg-brand-500/20 border border-brand-500/30 rounded-lg">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
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
                  className="text-brand-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </motion.div>
              <span className="text-sm font-medium text-brand-300">
                Last Updated: 4/29/2025
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-dark-950 via-dark-950/90 to-transparent z-10"></div>
    </section>
  );
};

export default ScoreboardHero;
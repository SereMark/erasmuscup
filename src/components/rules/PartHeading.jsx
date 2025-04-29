import React from 'react';
import { motion } from 'framer-motion';

const PartHeading = ({ partNumber, title, id }) => {
  return (
    <motion.div 
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="my-10 sm:my-16 pt-6 sm:pt-8 scroll-mt-20 sm:scroll-mt-24 relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-dark-800 via-brand-500/30 to-dark-800"></div>
        <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-radial from-brand-500/5 to-transparent rounded-full"></div>
      </div>
      
      {/* Part Number */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-3 sm:mb-4"
      >
        <div className="inline-flex items-center justify-center h-10 w-10 sm:h-14 sm:w-14 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg sm:rounded-xl shadow-lg shadow-brand-500/20">
          <span className="text-xl sm:text-2xl font-bold text-white">{partNumber}</span>
        </div>
      </motion.div>
      
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
          Part {partNumber}: {title}
        </h2>
        
        {/* Gradient underline */}
        <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-brand-500 via-brand-400 to-brand-500/30 rounded-full"></div>
      </motion.div>
      
      {/* Decorative side element */}
      <div className="absolute top-6 sm:top-8 right-0 w-1/3 h-px bg-gradient-to-r from-transparent to-dark-800/50"></div>
    </motion.div>
  );
};

export default PartHeading;
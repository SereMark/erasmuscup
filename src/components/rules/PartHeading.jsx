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
      className="my-16 pt-8 scroll-mt-24 relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-dark-800 via-brand-500/30 to-dark-800"></div>
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-radial from-brand-500/5 to-transparent rounded-full"></div>
      </div>
      
      {/* Part Number */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-4"
      >
        <div className="inline-flex items-center justify-center h-14 w-14 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl shadow-lg shadow-brand-500/20">
          <span className="text-2xl font-bold text-white">{partNumber}</span>
        </div>
      </motion.div>
      
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Part {partNumber}: {title}
        </h2>
        
        {/* Gradient underline */}
        <div className="w-32 h-1 bg-gradient-to-r from-brand-500 via-brand-400 to-brand-500/30 rounded-full"></div>
      </motion.div>
      
      {/* Decorative side element */}
      <div className="absolute top-8 right-0 w-1/3 h-px bg-gradient-to-r from-transparent to-dark-800/50"></div>
    </motion.div>
  );
};

export default PartHeading;
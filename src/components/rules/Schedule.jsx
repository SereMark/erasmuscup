import React, { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * Schedule component for the House Cup Register
 */
const Schedule = ({ schedule, isActive }) => {
  const { id, title, emoji, fields } = schedule;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5 } 
    }
  };

  const indicatorVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0 
    }
  };

  const documentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, delay: 0.2 } 
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, delay: 0.4 } 
    }
  };

  return (
    <motion.div
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`mb-10 sm:mb-16 scroll-mt-20 sm:scroll-mt-28 ${isActive ? 'relative' : ''}`}
    >
      {/* Active section indicator */}
      {isActive && (
        <motion.div
          variants={indicatorVariants}
          initial="hidden"
          animate="visible"
          className="absolute -left-2 sm:-left-8 top-3 w-1 sm:w-2 h-8 sm:h-12 bg-gradient-to-b from-brand-400 to-brand-600 rounded-r-full"
          layoutId="sectionIndicator"
          aria-hidden="true"
        />
      )}

      {/* Schedule header */}
      <div className="flex items-center mb-4 sm:mb-8 group">
        <div 
          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-dark-800 rounded-lg text-base sm:text-xl mr-3 sm:mr-4"
          aria-hidden="true"
        >
          {emoji}
        </div>
        
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-brand-400 transition-colors">
          {title}
        </h3>
        
        {/* Copy link button */}
        <button
          onClick={() => {
            const url = `${window.location.origin}${window.location.pathname}#${id}`;
            navigator.clipboard.writeText(url);
          }}
          className="ml-2 sm:ml-3 p-1.5 sm:p-2 text-dark-400 hover:text-brand-400 
                     sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:scale-110 
                     focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-brand-500"
          aria-label="Copy link to section"
          title="Copy link to section"
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
            className="sm:w-4 sm:h-4"
            aria-hidden="true"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="ml-11 sm:ml-14">
        <motion.div 
          className="glass-card overflow-hidden rounded-xl border border-dark-800/50 shadow-lg"
          variants={documentVariants}
        >
          {/* Document header */}
          <div className="bg-gradient-to-r from-brand-950 to-dark-900 p-4 sm:p-6 border-b border-dark-800/70">
            <div className="flex items-center justify-center mb-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-brand-400 mr-2 sm:w-6 sm:h-6"
                aria-hidden="true"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="text-base sm:text-lg font-semibold text-white">Official House Cup Register</span>
            </div>
            <p className="text-center text-dark-200 text-xs sm:text-sm">
              {fields.title}
            </p>
          </div>
          
          {/* Document content */}
          <div className="p-4 sm:p-6 bg-dark-900/70 font-mono text-dark-200">
            {/* Signature fields */}
            <div className="mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {fields.headers.map((header, index) => (
                <div key={`header-${index}`} className="border-b border-dark-700/50 pb-2">
                  <span className="text-dark-400 text-xs sm:text-sm">{header.name}:</span>
                  <div className="h-4 sm:h-6 mt-2 border-b border-dashed border-dark-700/50"></div>
                </div>
              ))}
            </div>
            
            {/* Render each section (House Captains, Participants) */}
            {fields.sections.map((section, sectionIndex) => (
              <div key={`section-${sectionIndex}`} className="mb-6 sm:mb-8">
                <h4 className="text-xs sm:text-sm font-semibold text-white bg-dark-800/70 rounded-md py-1.5 sm:py-2 px-2 sm:px-3 mb-3 sm:mb-4">
                  {section.title}:
                </h4>
                
                <div className={`${section.title === 'Participants' ? 'grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3' : 'space-y-2 sm:space-y-3'} pl-1 sm:pl-2`}>
                  {Array.from({ length: section.rows }).map((_, index) => (
                    <div key={`${section.title.toLowerCase()}-${index}`} className="flex">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-dark-800/70 rounded-md flex items-center justify-center text-xs mr-2 sm:mr-3 text-dark-300">
                        {index + 1}
                      </div>
                      <div className="flex-grow border-b border-dashed border-dark-700/50"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 sm:pt-4 border-t border-dark-700/50 mt-6 sm:mt-8">
              <div className="mb-3 sm:mb-0">
                <span className="text-dark-400 text-xs sm:text-sm">{fields.footer.left.label}:</span>
                <div className="h-4 sm:h-6 w-32 sm:w-40 mt-1 sm:mt-2 border-b border-dashed border-dark-700/50"></div>
              </div>
              
              <div>
                <span className="text-dark-400 text-xs sm:text-sm">{fields.footer.right.label}:</span>
                <div className="h-4 sm:h-6 w-24 sm:w-32 mt-1 sm:mt-2 border-b border-dashed border-dark-700/50"></div>
              </div>
            </div>
          </div>
          
          {/* Document footer with official seal */}
          <div className="p-3 sm:p-4 bg-dark-800/50 border-t border-dark-800/70 flex justify-between items-center">
            <div className="text-xs text-dark-400">Form HC-REG-2025</div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-dark-900/70 border border-brand-500/30 flex items-center justify-center" aria-hidden="true">
              <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full border-2 border-brand-500/20 flex items-center justify-center text-xs text-brand-400 font-bold">SEAL</div>
            </div>
          </div>
        </motion.div>

        {/* Call to action card */}
        <motion.div
          className="mt-6 sm:mt-8 glass-card p-4 sm:p-6 rounded-xl border border-brand-500/20 shadow-lg bg-gradient-to-br from-dark-900 to-dark-900/70"
          variants={ctaVariants}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3 sm:mr-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-500/20 rounded-full flex items-center justify-center">
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
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold text-sm sm:text-base mb-1 sm:mb-2">Want to become a Participant?</h4>
              <p className="text-dark-200 text-xs sm:text-sm mb-3 sm:mb-4">
                Take the sorting quiz at the next event to discover your House and sign the official register. All House members earn points together toward the House Cup!
              </p>
              
              <a 
                href="/events" 
                className="inline-flex items-center text-xs sm:text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors focus:outline-none focus:underline"
              >
                View upcoming events
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-3 w-3 sm:h-4 sm:w-4 ml-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default memo(Schedule);
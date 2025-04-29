import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { processRuleText } from '../../utils/termHighlighter.jsx';

const RuleSection = ({ section, terms, isActive }) => {
  const { id, title, emoji, text } = section;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-10% 0px -10% 0px", once: false });

  // Process the text content with term highlighting
  const processedContent = processRuleText(text, terms);
  
  // Check if this is an amended section
  const isAmended = text.includes('Amendment of 4 April 2025');

  return (
    <motion.div
      id={id}
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`mb-8 sm:mb-12 pb-6 sm:pb-10 border-b border-dark-800/30 scroll-mt-20 sm:scroll-mt-28 ${
        isActive ? 'relative' : ''
      }`}
    >
      {/* Active section indicator */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute -left-2 sm:-left-8 top-3 w-1 sm:w-2 h-8 sm:h-12 bg-gradient-to-b from-brand-400 to-brand-600 rounded-r-full"
          layoutId="sectionIndicator"
        />
      )}

      {/* Section header */}
      <div className="flex items-center mb-4 sm:mb-6 group">
        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-dark-800 rounded-lg text-base sm:text-xl mr-3 sm:mr-4">
          {emoji}
        </div>
        
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-brand-400 transition-colors">
          {title}
        </h3>
        
        {/* Copy link button - hidden on mobile, visible on hover for desktop */}
        <button
          onClick={() => {
            const url = `${window.location.origin}${window.location.pathname}#${id}`;
            navigator.clipboard.writeText(url);
          }}
          className="ml-2 sm:ml-3 p-1.5 sm:p-2 text-dark-400 hover:text-brand-400 
                     sm:opacity-0 sm:group-hover:opacity-100 transition-all hover:scale-110"
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
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </button>
        
        {/* Amendment badge */}
        {isAmended && (
          <div className="ml-auto">
            <span className="badge-accent py-0.5 sm:py-1 px-1.5 sm:px-2 text-xs">
              Amended
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <motion.div 
        className={`ml-11 sm:ml-14 transition-all duration-300 ${
          isInView ? 'opacity-100' : 'opacity-80'
        }`}
        animate={{ 
          opacity: isInView ? 1 : 0.8,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="prose prose-invert prose-xs sm:prose-sm md:prose-base max-w-none">
          {processedContent}
        </div>

        {/* Amendment highlight */}
        {isAmended && (
          <motion.div 
            className="mt-4 sm:mt-6 p-3 sm:p-5 rounded-lg bg-dark-800/50 border-l-4 border-accent-500"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-2 sm:mr-3 mt-1">
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
                  className="text-accent-400"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <path d="M14 2v6h6"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                  <path d="M10 9H9H8"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-accent-400 font-semibold text-xs sm:text-sm mb-1">Amendment of April 4, 2025</h4>
                <p className="text-dark-200 text-xs sm:text-sm">
                  This section was amended by Alex to clarify limitations and introduce additional possibilities for bonus points. The amendment applies to all future events.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default RuleSection;
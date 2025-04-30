import React, { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { renderNestedContent } from '../../utils/termHighlighter';

/**
 * Rule section component that displays a single rule with its content
 */
const RuleSection = ({ section, isActive, termDefinitions }) => {
  const { id, title, emoji, content } = section;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-10% 0px -10% 0px", once: false });

  // Check if section has an amendment
  const hasAmendment = content.some(item => item.type === 'amendment');

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

  const contentVariants = {
    hidden: { opacity: 0.8 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      id={id}
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`mb-8 sm:mb-12 pb-6 sm:pb-10 border-b border-dark-800/30 scroll-mt-20 sm:scroll-mt-28 ${
        isActive ? 'relative' : ''
      }`}
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

      {/* Section header */}
      <div className="flex items-center mb-4 sm:mb-6 group">
        <div 
          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-dark-800 rounded-lg text-base sm:text-xl mr-3 sm:mr-4"
          aria-hidden="true"
        >
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
        
        {/* Amendment badge */}
        {hasAmendment && (
          <div className="ml-auto">
            <span className="badge-accent py-0.5 sm:py-1 px-1.5 sm:px-2 text-xs">
              Amended
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <motion.div 
        className={`ml-11 sm:ml-14 transition-all duration-300`}
        animate={isInView ? 'visible' : 'hidden'}
        variants={contentVariants}
      >
        <div className="prose prose-invert prose-xs sm:prose-sm md:prose-base max-w-none">
          {renderNestedContent(content, termDefinitions)}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default memo(RuleSection);
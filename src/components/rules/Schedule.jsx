import React from 'react';
import { motion } from 'framer-motion';

const Schedule = ({ schedule, isActive }) => {
  const { id, title, emoji, text } = schedule;

  // Split the text content into lines
  const lines = text.split('\n');

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`mb-16 scroll-mt-28 ${isActive ? 'relative' : ''}`}
    >
      {/* Active section indicator */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute -left-8 top-3 w-2 h-12 bg-gradient-to-b from-brand-400 to-brand-600 rounded-r-full"
          layoutId="sectionIndicator"
        />
      )}

      {/* Schedule header */}
      <div className="flex items-center mb-8 group">
        <div className="w-10 h-10 flex items-center justify-center bg-dark-800 rounded-lg text-xl mr-4">
          {emoji}
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-brand-400 transition-colors">
          {title}
        </h3>
        
        {/* Copy link button */}
        <button
          onClick={() => {
            const url = `${window.location.origin}${window.location.pathname}#${id}`;
            navigator.clipboard.writeText(url);
          }}
          className="ml-3 p-2 text-dark-400 hover:text-brand-400 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
          aria-label="Copy link to section"
          title="Copy link to section"
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
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="ml-14">
        <motion.div 
          className="glass-card overflow-hidden rounded-xl border border-dark-800/50 shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Document header */}
          <div className="bg-gradient-to-r from-brand-950 to-dark-900 p-6 border-b border-dark-800/70">
            <div className="flex items-center justify-center mb-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-brand-400 mr-2"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="text-lg font-semibold text-white">Official House Cup Register</span>
            </div>
            <p className="text-center text-dark-200 text-sm">
              {lines[0]}
            </p>
          </div>
          
          {/* Document content */}
          <div className="p-6 bg-dark-900/70 font-mono text-dark-200">
            {/* Signature fields */}
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-b border-dark-700/50 pb-2">
                <span className="text-dark-400 text-sm">Name:</span>
                <div className="h-6 mt-2 border-b border-dashed border-dark-700/50"></div>
              </div>
              
              <div className="border-b border-dark-700/50 pb-2">
                <span className="text-dark-400 text-sm">Signature:</span>
                <div className="h-6 mt-2 border-b border-dashed border-dark-700/50"></div>
              </div>
            </div>
            
            {/* House Captains section */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-white bg-dark-800/70 rounded-md py-2 px-3 mb-4">
                House Captains:
              </h4>
              
              <div className="space-y-3 pl-2">
                {lines.slice(6, 10).map((line, index) => (
                  <div key={`captain-${index}`} className="flex">
                    <div className="w-6 h-6 bg-dark-800/70 rounded-md flex items-center justify-center text-xs mr-3 text-dark-300">
                      {index + 1}
                    </div>
                    <p className="text-dark-200">{line}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Participants section */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-white bg-dark-800/70 rounded-md py-2 px-3 mb-4">
                Participants:
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
                {lines.slice(12, -2).map((line, index) => (
                  <div key={`participant-${index}`} className="flex">
                    <div className="w-6 h-6 bg-dark-800/70 rounded-md flex items-center justify-center text-xs mr-3 text-dark-300">
                      {index + 1}
                    </div>
                    <p className="text-dark-200 truncate">{line}</p>
                  </div>
                ))}
                
                {/* Empty slots for new participants */}
                {[...Array(4)].map((_, index) => (
                  <div key={`empty-${index}`} className="flex">
                    <div className="w-6 h-6 bg-dark-800/30 rounded-md flex items-center justify-center text-xs mr-3 text-dark-500">
                      {lines.slice(12, -2).length + index + 1}
                    </div>
                    <div className="flex-grow border-b border-dashed border-dark-700/30"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-dark-700/50 mt-8">
              <div className="mb-4 sm:mb-0">
                <span className="text-dark-400 text-sm">Assent of the House Captains:</span>
                <div className="h-6 w-40 mt-2 border-b border-dashed border-dark-700/50"></div>
              </div>
              
              <div>
                <span className="text-dark-400 text-sm">Date:</span>
                <div className="h-6 w-32 mt-2 border-b border-dashed border-dark-700/50"></div>
              </div>
            </div>
          </div>
          
          {/* Document footer with official seal */}
          <div className="p-4 bg-dark-800/50 border-t border-dark-800/70 flex justify-between items-center">
            <div className="text-xs text-dark-400">Form HC-REG-2025</div>
            <div className="w-12 h-12 rounded-full bg-dark-900/70 border border-brand-500/30 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-brand-500/20 flex items-center justify-center text-xs text-brand-400 font-bold">SEAL</div>
            </div>
          </div>
        </motion.div>

        {/* Call to action card */}
        <motion.div
          className="mt-8 glass-card p-6 rounded-xl border border-brand-500/20 shadow-lg bg-gradient-to-br from-dark-900 to-dark-900/70"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-10 h-10 bg-brand-500/20 rounded-full flex items-center justify-center">
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
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-2">Want to become a Participant?</h4>
              <p className="text-dark-200 text-sm mb-4">
                Take the sorting quiz at the next event to discover your House and sign the official register. All House members earn points together toward the House Cup!
              </p>
              
              <a 
                href="/events" 
                className="inline-flex items-center text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors"
              >
                View upcoming events
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
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

export default Schedule;
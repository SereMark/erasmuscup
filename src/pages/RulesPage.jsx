import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import rulesData from '../data/rulesData.json';

// Import components
import RulesHero from '../components/rules/RulesHero';
import DocumentHeader from '../components/rules/DocumentHeader';
import TableOfContents from '../components/rules/TableOfContents';
import PartHeading from '../components/rules/PartHeading';
import RuleSection from '../components/rules/RuleSection';
import Schedule from '../components/rules/Schedule';

/**
 * Rules Page Component
 * Displays the complete House Cup rules with navigation
 */
const RulesPage = () => {
  const location = useLocation();
  const [activeSectionId, setActiveSectionId] = useState('');
  const [tocVisible, setTocVisible] = useState(false);
  const mainContentRef = useRef(null);
  
  // Prepare term definitions for highlighting
  const termDefinitions = useMemo(() => rulesData.termDefinitions, []);
  
  // Extract all section IDs for navigation
  const allSectionIds = useMemo(() => {
    return [
      ...rulesData.sections.map(section => section.id),
      rulesData.schedule.id
    ];
  }, []);
  
  // Handle URL hash navigation on initial load and route changes
  useEffect(() => {
    // Get section ID from URL hash (remove the # character)
    const sectionId = location.hash.replace('#', '');
    
    // If there's a hash in the URL and it's a valid section ID
    if (sectionId && allSectionIds.includes(sectionId)) {
      // Small delay to ensure the DOM is fully loaded
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          setActiveSectionId(sectionId);
          // Close mobile TOC after navigation
          setTocVisible(false);
        }
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [location, allSectionIds]);
  
  // Function to handle TOC clicks
  const handleSectionClick = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSectionId(sectionId);
      // Close mobile TOC after clicking
      setTocVisible(false);
    }
  }, []);

  // Toggle TOC visibility for mobile
  const toggleToc = useCallback(() => {
    setTocVisible(prev => !prev);
  }, []);

  // Group sections by part for rendering
  const sectionsByPart = useMemo(() => {
    // Part definitions
    const parts = {};
    
    // Initialize parts from part headings
    rulesData.partHeadings.forEach(part => {
      parts[part.partNumber] = {
        ...part,
        sections: []
      };
    });
    
    // Group intro sections (no part)
    const introSections = rulesData.sections.filter(section => 
      section.id === 'section-1' || section.id === 'section-2'
    );
    
    // Group remaining sections by their part number
    rulesData.sections.forEach(section => {
      if (section.id !== 'section-1' && section.id !== 'section-2') {
        // Extract part number from section number (e.g., section-3 is part 1)
        const sectionNumber = parseInt(section.id.split('-')[1]);
        
        // Determine part number based on section number ranges
        let partNumber;
        if (sectionNumber >= 3 && sectionNumber <= 5) partNumber = 1;
        else if (sectionNumber >= 6 && sectionNumber <= 7) partNumber = 2;
        else if (sectionNumber >= 8 && sectionNumber <= 10) partNumber = 3;
        else if (sectionNumber >= 11 && sectionNumber <= 12 || section.id.startsWith('section-12')) partNumber = 4;
        else if (sectionNumber >= 13 && sectionNumber <= 18) partNumber = 5;
        else if (sectionNumber >= 19) partNumber = 6;
        
        // Add section to the appropriate part
        if (partNumber && parts[partNumber]) {
          parts[partNumber].sections.push(section);
        }
      }
    });
    
    return { introSections, parts };
  }, []);

  return (
    <>
      <Helmet>
        <title>Rules | Erasmus House Cup 2025</title>
        <meta
          name="description"
          content="Official rulebook for the Erasmus House Cup 2025. Learn about House Points, Gambits, Super Gambits, and what happens if you lose."
        />
      </Helmet>
      
      <div className="rules-page min-h-screen">
        {/* Hero Section */}
        <RulesHero data={rulesData.pageHeader} />
        
        {/* Main Content */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Document Header */}
            <DocumentHeader data={rulesData.documentHeader} />
            
            {/* Mobile ToC toggle */}
            <div className="lg:hidden mb-6">
              <button 
                onClick={toggleToc}
                aria-expanded={tocVisible}
                aria-controls="mobile-toc"
                className="flex items-center justify-between w-full px-4 py-3 bg-dark-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <span className="font-medium text-white">Table of Contents</span>
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
                  className={`transition-transform duration-300 ${tocVisible ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              {/* Mobile ToC dropdown */}
              <AnimatePresence>
                {tocVisible && (
                  <motion.div 
                    id="mobile-toc"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 overflow-hidden"
                  >
                    <TableOfContents 
                      data={rulesData.tableOfContents}
                      currentSectionId={activeSectionId}
                      onSectionClick={handleSectionClick}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Content Area with Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
              {/* Sidebar - Table of Contents (desktop only) */}
              <div className="hidden lg:block lg:col-span-1 sticky top-20 self-start">
                <TableOfContents 
                  data={rulesData.tableOfContents}
                  currentSectionId={activeSectionId}
                  onSectionClick={handleSectionClick}
                />
              </div>
              
              {/* Main Content */}
              <div ref={mainContentRef} className="lg:col-span-3">
                {/* Render introduction sections (no part heading) */}
                {sectionsByPart.introSections.map(section => (
                  <RuleSection 
                    key={section.id}
                    section={section}
                    termDefinitions={termDefinitions}
                    isActive={activeSectionId === section.id}
                  />
                ))}
                
                {/* Render each part with its sections */}
                {Object.values(sectionsByPart.parts).map(part => (
                  <div key={part.id}>
                    <PartHeading 
                      partNumber={part.partNumber}
                      title={part.title}
                      id={part.id}
                    />
                    
                    {part.sections.map(section => (
                      <RuleSection 
                        key={section.id}
                        section={section}
                        termDefinitions={termDefinitions}
                        isActive={activeSectionId === section.id}
                      />
                    ))}
                  </div>
                ))}
                
                {/* Render Schedule */}
                <Schedule 
                  schedule={rulesData.schedule}
                  isActive={activeSectionId === rulesData.schedule.id}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Call-to-Action Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-dark-900 to-dark-950 relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 dot-pattern opacity-5" aria-hidden="true"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Join the Competition?</h2>
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-400 to-brand-500 mx-auto rounded-full mb-4 sm:mb-6"></div>
              <p className="text-dark-200 max-w-2xl mx-auto mb-6 sm:mb-10 text-sm sm:text-base">
                Now that you've read the rules, it's time to discover your House and compete for the Cup.
                Take the quiz and join the excitement!
              </p>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">
              <motion.a 
                href="/events" 
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg shadow-lg hover:shadow-xl hover:shadow-brand-500/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Join the next event!
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 sm:h-5 sm:w-5 ml-2" 
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
              </motion.a>
              
              <motion.a 
                href="/scoreboard" 
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-dark-600 rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                View Scoreboard
              </motion.a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RulesPage;
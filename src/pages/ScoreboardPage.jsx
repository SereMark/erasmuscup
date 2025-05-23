import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import scoreboardData from '../data/scoreboardData.json';

// Import components
import ScoreboardHero from '../components/scoreboard/ScoreboardHero';
import ViewSelector from '../components/scoreboard/ViewSelector';
import HouseStandings from '../components/scoreboard/HouseStandings';
import ScoreboardTable from '../components/scoreboard/ScoreboardTable';
import ScoreboardCards from '../components/scoreboard/ScoreboardCards';
import ScoreboardStats from '../components/scoreboard/ScoreboardStats';
import FooterNote from '../components/scoreboard/FooterNote';

// Animation variants
const contentAnimations = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 }
};

const ScoreboardPage = () => {
  // Get data from JSON
  const { config, heroSection, houses, scores, footerNote } = scoreboardData;
  
  // State for view mode
  const [viewMode, setViewMode] = useState(config.defaultViewMode);
  const [isMobile, setIsMobile] = useState(false);
  
  // Effect to check screen size and adjust view mode if needed
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < config.mobileBreakpoint;
      setIsMobile(mobile);
      
      // If we're on mobile and using table view, switch to cards
      if (mobile && viewMode === 'table') {
        setViewMode('cards');
      }
    };
    
    // Check on initial load
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [config.mobileBreakpoint, viewMode]);
  
  // Function to handle view mode change
  const handleViewChange = (mode) => {
    setViewMode(mode);
  };
  
  // Filtered view options for mobile
  const viewOptions = useMemo(() => {
    return isMobile 
      ? config.viewOptions.filter(option => option !== 'table') 
      : config.viewOptions;
  }, [isMobile, config.viewOptions]);
  
  // Render the current view based on viewMode
  const renderScoreView = () => {
    switch (viewMode) {
      case 'table':
        return <ScoreboardTable houses={houses} scores={scores} />;
      case 'cards':
        return <ScoreboardCards houses={houses} scores={scores} />;
      case 'stats':
        return <ScoreboardStats houses={houses} scores={scores} />;
      default:
        return <ScoreboardTable houses={houses} scores={scores} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Scoreboard | Erasmus House Cup 2025</title>
        <meta
          name="description"
          content="Live scoreboard for the Erasmus House Cup 2025. Track points earned by all houses across events, gambits, and special challenges."
        />
      </Helmet>
      
      <div className="scoreboard-page">
        {/* Hero Section */}
        <ScoreboardHero data={heroSection} />
        
        {/* Main Content */}
        <section className="py-10 md:py-16 lg:py-20 bg-dark-950 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* House Standings */}
            <HouseStandings houses={houses} scores={scores} />
            
            {/* View Selector with motion effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="overflow-x-auto py-2 -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              <ViewSelector 
                viewOptions={viewOptions}
                currentView={viewMode}
                onChange={handleViewChange}
              />
            </motion.div>
            
            {/* Render current view with content transition */}
            <motion.div
              key={viewMode}
              initial={contentAnimations.initial}
              animate={contentAnimations.animate}
              exit={contentAnimations.exit}
              transition={contentAnimations.transition}
            >
              {renderScoreView()}
            </motion.div>
            
            {/* Footer Note */}
            <FooterNote messageHtml={footerNote.messageHtml} />
          </div>
        </section>
        
        {/* Call-to-Action Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-dark-900 to-dark-950 relative overflow-hidden"
        >
          {/* Decorative pattern */}
          <div className="absolute inset-0 dot-pattern opacity-5"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Join the Competition?</h2>
              <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-brand-400 to-brand-500 mx-auto rounded-full mb-6"></div>
              <p className="text-dark-200 max-w-2xl mx-auto mb-6 md:mb-10 text-sm md:text-base">
                Don't miss your chance to be part of the legendary Erasmus House Cup 2025. 
                Take the quiz, join a house, and start earning points!
              </p>
            </motion.div>
            
            <motion.a 
              href="/events" 
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg shadow-lg hover:shadow-xl hover:shadow-brand-500/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join the next event!
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 md:h-5 md:w-5 ml-2" 
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
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default ScoreboardPage;
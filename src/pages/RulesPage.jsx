import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import rulesData from '../data/rulesData.json';

// Import components
import RulesHero from '../components/rules/RulesHero';
import DocumentHeader from '../components/rules/DocumentHeader';
import TableOfContents from '../components/rules/TableOfContents';
import PartHeading from '../components/rules/PartHeading';
import RuleSection from '../components/rules/RuleSection';
import Schedule from '../components/rules/Schedule';

const RulesPage = () => {
  const location = useLocation();
  const [activeSectionId, setActiveSectionId] = useState('');
  const [tocVisible, setTocVisible] = useState(false);
  const mainContentRef = useRef(null);
  
  // Extract section IDs for all sections including schedule
  const allSectionIds = [
    ...rulesData.sections.map(section => section.id),
    rulesData.schedule.id
  ];
  
  // Handle URL hash navigation on initial load and route changes
  useEffect(() => {
    // Get section ID from URL hash (remove the # character)
    const sectionId = location.hash.replace('#', '');
    
    // If there's a hash in the URL and it's a valid section ID
    if (sectionId && allSectionIds.includes(sectionId)) {
      // Small delay to ensure the DOM is fully loaded
      setTimeout(() => {
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
    }
  }, [location, allSectionIds]);
  
  // Function to handle TOC clicks
  const handleSectionClick = (sectionId) => {
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
  };

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
                onClick={() => setTocVisible(!tocVisible)}
                className="flex items-center justify-between w-full px-4 py-3 bg-dark-800 rounded-lg shadow-md"
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
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              {/* Mobile ToC dropdown */}
              <div className={`mt-2 transition-all duration-300 overflow-hidden ${
                tocVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <TableOfContents 
                  data={rulesData.tableOfContents}
                  currentSectionId={activeSectionId}
                  onSectionClick={handleSectionClick}
                />
              </div>
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
                {rulesData.tableOfContents[0].items.map(tocItem => {
                  const section = rulesData.sections.find(s => s.id === tocItem.id);
                  if (!section) return null;
                  
                  return (
                    <RuleSection 
                      key={section.id}
                      section={section}
                      terms={rulesData.termHighlighting}
                      isActive={activeSectionId === section.id}
                    />
                  );
                })}
                
                {/* Render each part with its sections */}
                {rulesData.partHeadings.map((part, partIndex) => {
                  // Get the section IDs from tableOfContents for this part (partIndex + 1 because first TOC group is intro)
                  const tocGroup = rulesData.tableOfContents[partIndex + 1];
                  if (!tocGroup || !tocGroup.items) return null;
                  
                  const sectionIds = tocGroup.items.map(item => item.id);
                  
                  // Find the matching sections from the sections array
                  const partSections = rulesData.sections.filter(section => 
                    sectionIds.includes(section.id)
                  );
                  
                  return (
                    <div key={part.id}>
                      <PartHeading 
                        partNumber={part.partNumber}
                        title={part.title}
                        id={part.id}
                      />
                      
                      {partSections.map(section => (
                        <RuleSection 
                          key={section.id}
                          section={section}
                          terms={rulesData.termHighlighting}
                          isActive={activeSectionId === section.id}
                        />
                      ))}
                    </div>
                  );
                })}
                
                {/* Render Schedule (last item in TOC) */}
                {rulesData.tableOfContents[7] && rulesData.tableOfContents[7].items && (
                  rulesData.tableOfContents[7].items.map(tocItem => {
                    if (tocItem.id === rulesData.schedule.id) {
                      return (
                        <Schedule 
                          key={rulesData.schedule.id}
                          schedule={rulesData.schedule}
                          isActive={activeSectionId === rulesData.schedule.id}
                        />
                      );
                    }
                    return null;
                  })
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Call-to-Action Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-dark-900 to-dark-950 relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 dot-pattern opacity-5"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Join the Competition?</h2>
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-400 to-brand-500 mx-auto rounded-full mb-4 sm:mb-6"></div>
              <p className="text-dark-200 max-w-2xl mx-auto mb-6 sm:mb-10 text-sm sm:text-base">
                Now that you've read the rules, it's time to discover your House and compete for the Cup.
                Take the quiz and join the excitement!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">
              <a 
                href="/events" 
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg shadow-lg hover:shadow-xl hover:shadow-brand-500/20 transition-all duration-300"
              >
                Join the next event!
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 sm:h-5 sm:w-5 ml-2" 
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
              
              <a 
                href="/scoreboard" 
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-dark-600 rounded-lg transition-colors duration-300"
              >
                View Scoreboard
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RulesPage;
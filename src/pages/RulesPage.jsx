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
      
      <div className="rules-page min-h-screen bg-dark-950">
        {/* Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-brand-500/5 to-transparent rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-accent-500/5 to-transparent rounded-full filter blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-[size:20px_20px] opacity-5"></div>
        </div>
        
        {/* Hero Section */}
        <RulesHero data={rulesData.pageHeader} />
        
        {/* Main Content */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Document Header */}
            <DocumentHeader data={rulesData.documentHeader} />
            
            {/* Content Area with Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar - Table of Contents */}
              <div className="lg:col-span-1">
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
        <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-950 relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 dot-pattern opacity-5"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Join the Competition?</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-400 to-brand-500 mx-auto rounded-full mb-6"></div>
              <p className="text-dark-200 max-w-2xl mx-auto mb-10">
                Now that you've read the rules, it's time to discover your House and compete for the Cup.
                Take the quiz and join the excitement!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <a 
                href="/events" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg shadow-lg hover:shadow-xl hover:shadow-brand-500/20 transition-all duration-300"
              >
                Join the next event!
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
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
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-dark-800 hover:bg-dark-700 border border-dark-700 hover:border-dark-600 rounded-lg transition-colors duration-300"
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
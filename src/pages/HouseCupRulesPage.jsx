import React, { useState, useEffect, useCallback } from "react";
import { SCROLL_THRESHOLD, SCROLL_OFFSET, TOC_DELAY } from "../constants/rulesData";

// UI Components
import BackToTopButton from "../components/ui/BackToTopButton";

// Rules Page Components
import PageHeader from "../components/rules/PageHeader";
import MobileTableOfContentsToggle from "../components/rules/MobileTableOfContentsToggle";
import TableOfContents from "../components/rules/TableOfContents";
import RulesContent from "../components/rules/RulesContent";

/**
 * House Cup Rules page component
 * Displays the complete rulebook with table of contents navigation
 */
function HouseCupRulesPage() {
  const [activeSection, setActiveSection] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    // Initial check
    checkScreenSize();
    
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > SCROLL_THRESHOLD);
      
      const sectionElements = document.querySelectorAll('[id]');
      
      let newActiveSection = '';
      
      for (const section of sectionElements) {
        const rect = section.getBoundingClientRect();
        const topPosition = rect.top - SCROLL_OFFSET;
        
        if (topPosition <= 10) {
          newActiveSection = section.id;
        } else {
          break;
        }
      }
      
      if (newActiveSection && newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };
    
    let isScrolling = false;
    const throttledScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        
        window.requestAnimationFrame(() => {
          handleScroll();
          isScrolling = false;
        });
      }
    };
    
    window.addEventListener("scroll", throttledScroll);
    
    handleScroll();
    
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [activeSection]);

  // Scroll to section helper
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + SCROLL_OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
      
      // Close mobile TOC after selection
      if (!isDesktop) {
        setTimeout(() => {
          setShowTOC(false);
        }, TOC_DELAY);
      }
    }
  }, [isDesktop]);

  // Scroll to top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-black min-h-screen pt-6 sm:pt-8 pb-20 relative text-white">
      <BackToTopButton showBackToTop={showBackToTop} scrollToTop={scrollToTop} />
      
      <section className="max-w-5xl mx-auto px-3 sm:px-6">
        <PageHeader />
        
        <MobileTableOfContentsToggle showTOC={showTOC} setShowTOC={setShowTOC} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
          <TableOfContents 
            showTOC={showTOC} 
            isDesktop={isDesktop} 
            activeSection={activeSection} 
            scrollToSection={scrollToSection} 
          />

          <RulesContent />
        </div>
      </section>
    </div>
  );
}

export default HouseCupRulesPage;
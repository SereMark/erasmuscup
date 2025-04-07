import React, { useState, useEffect, useCallback } from "react";
import { SCROLL_THRESHOLD, SCROLL_OFFSET, TOC_DELAY } from "../constants/rulesData";
import { useResponsive } from "../hooks/useResponsive";
import { useActiveSection } from "../hooks/useActiveSection";

// UI Components
import BackToTopButton from "../components/common/ui/BackToTopButton";

// Rules Page Components
import PageHeader from "../components/sections/rules/PageHeader";
import MobileTableOfContentsToggle from "../components/features/navigation/MobileTableOfContentsToggle";
import TableOfContents from "../components/features/navigation/TableOfContents";
import RulesContent from "../components/sections/rules/RulesContent";

/**
 * House Cup Rules page component
 * Displays the complete rulebook with table of contents navigation
 */
function HouseCupRulesPage() {
  const activeSection = useActiveSection();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const { isDesktop } = useResponsive(1024);

  // Handle scroll events for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > SCROLL_THRESHOLD);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
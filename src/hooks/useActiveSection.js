import { useState, useEffect } from "react";
import { SCROLL_OFFSET } from "../constants/rulesData";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("");
  
  useEffect(() => {
    const handleScroll = () => {
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

  return activeSection;
}
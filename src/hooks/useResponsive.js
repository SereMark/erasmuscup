import { useState, useEffect } from "react";

/**
 * Custom hook for responsive breakpoints
 * @param {number} breakpoint - Width in pixels for desktop breakpoint
 * @returns {Object} - Object containing responsive state variables
 */
export function useResponsive(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  
  useEffect(() => {
    const checkScreenSize = () => {
      const isDesktopView = window.innerWidth >= breakpoint;
      setIsDesktop(isDesktopView);
      setIsMobile(!isDesktopView);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener("resize", checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);
  
  return { isDesktop, isMobile };
}
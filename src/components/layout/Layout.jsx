import React, { useEffect, memo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Background elements component - memoized to prevent unnecessary re-renders
 */
const BackgroundElements = memo(() => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
    {/* Top-left gradient orb */}
    <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-brand-500/5 to-transparent rounded-full filter blur-3xl"></div>
    
    {/* Bottom-right gradient orb */}
    <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-accent-500/5 to-transparent rounded-full filter blur-3xl"></div>
    
    {/* Subtle dot pattern */}
    <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-[size:20px_20px] opacity-5"></div>
  </div>
));

// Set display name for debugging
BackgroundElements.displayName = 'BackgroundElements';

/**
 * Main layout component that handles common layout elements
 * and functionality across all pages
 */
const Layout = () => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: location.state?.scrollBehavior || 'instant'
    });
  }, [location.pathname, location.state]);

  // Update page title based on route
  useEffect(() => {
    // Default title fallback if helmet doesn't set one
    document.title = 'Erasmus House Cup 2025';
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-dark-950">
      {/* Background elements */}
      <BackgroundElements />
      
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-brand-500 focus:text-white focus:p-4"
      >
        Skip to content
      </a>
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content area */}
      <main id="main-content" className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
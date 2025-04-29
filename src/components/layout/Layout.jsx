import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

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
      behavior: 'instant'
    });
  }, [location.pathname]);

  // Static background elements shared across all pages
  const BackgroundElements = () => (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Top-left gradient orb */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-brand-500/5 to-transparent rounded-full filter blur-3xl"></div>
      
      {/* Bottom-right gradient orb */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-accent-500/5 to-transparent rounded-full filter blur-3xl"></div>
      
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-[size:20px_20px] opacity-5"></div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-dark-950">
      {/* Background elements */}
      <BackgroundElements />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content area */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
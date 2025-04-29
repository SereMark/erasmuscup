import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Main layout component
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

  // Static background elements
  const BackgroundElements = () => (
    <>
      {/* Top-right gradient orb */}
      <div className="fixed top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-brand-500/10 to-transparent rounded-full filter blur-3xl -z-10 pointer-events-none" />
      
      {/* Bottom-left gradient orb */}
      <div className="fixed bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-accent-500/10 to-transparent rounded-full filter blur-3xl -z-10 pointer-events-none" />
      
      {/* Subtle grid pattern overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-[size:20px_20px] opacity-5 -z-20 pointer-events-none" />
    </>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundElements />
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
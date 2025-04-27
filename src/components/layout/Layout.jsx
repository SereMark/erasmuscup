import React, { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Handle scroll event for back-to-top button
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative flex flex-col min-h-dynamic-screen overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gradient-radial from-brand-900/5 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-[url('/assets/textures/grid.svg')] bg-repeat opacity-5 pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={handleScrollToTop}
            aria-label="Back to top"
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-2 sm:p-3 rounded-full bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-lg hover:from-brand-500 hover:to-brand-600 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp className="text-base sm:text-lg" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
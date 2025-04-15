import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="fixed inset-0 bg-gradient-radial from-brand-900/5 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-[url('/assets/textures/grid.svg')] bg-repeat opacity-5 pointer-events-none -z-10" /> {/* TODO */}

      <Navbar />

      <main className="flex-1 relative">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, position: "absolute", width: "100%" }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={handleScrollToTop}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-lg hover:from-brand-500 hover:to-brand-600 active:scale-95 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
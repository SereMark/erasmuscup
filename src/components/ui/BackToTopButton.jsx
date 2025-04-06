import React from "react";
import { motion } from "framer-motion";

/**
 * Button component that appears when user scrolls down and allows them to scroll back to top
 */
function BackToTopButton({ showBackToTop, scrollToTop }) {
  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: showBackToTop ? 1 : 0,
        scale: showBackToTop ? 1 : 0.8,
        y: showBackToTop ? 0 : 20
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full p-2 sm:p-3 shadow-lg text-white"
      aria-label="Back to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </motion.button>
  );
}

export default BackToTopButton;
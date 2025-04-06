import React from "react";
import { motion } from "framer-motion";

export default function HeroBanner({ y }) {
  return (
    <div className="relative w-full h-[90vh] sm:h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="/assets/logos/house-cup-cover.png"
          alt="Events Background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 filter brightness-75"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-black opacity-70" />
      </motion.div>

      <div className="relative flex items-center justify-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl p-6 md:p-10 bg-black/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-2xl"
          >
            House Cup Events
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-xl md:text-2xl font-light mb-6 text-gray-200 leading-relaxed"
          >
            From weekly challenges to fun gatherings, check out our sample events below.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="#upcoming" 
              className="group bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold px-6 py-3 rounded-full transition-transform duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
            >
              <span>Upcoming Events</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a 
              href="#calendar" 
              className="group bg-transparent border-2 border-white text-white font-bold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center hover:bg-white hover:text-black"
            >
              <span>View Calendar</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center"
      >
        <div className="animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeInVariants } from "../../../constants/animations";
import MonthSelector from "./MonthSelector";
import CalendarGrid from "./CalendarGrid";

export default function CalendarSection({ activeMonth, setActiveMonth }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <motion.div 
      ref={ref} 
      initial="hidden" 
      animate={inView ? "visible" : "hidden"} 
      variants={fadeInVariants} 
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 opacity-50 rounded-3xl blur-xl transform -rotate-1"></div>
      <div className="relative bg-black/70 p-6 sm:p-10 rounded-3xl border border-purple-900/30 shadow-2xl backdrop-blur-lg">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Event Calendar 2025
        </motion.h2>
        
        <MonthSelector 
          activeMonth={activeMonth} 
          setActiveMonth={setActiveMonth} 
        />
        
        <CalendarGrid inView={inView} />
      </div>
    </motion.div>
  );
}
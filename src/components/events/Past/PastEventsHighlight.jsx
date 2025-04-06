import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { fadeInVariants, staggerContainerVariants, itemVariants } from "../../../constants/animations";
import { PAST_EVENTS } from "../../../constants/eventsData";

export default function PastEventsHighlight() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <motion.div 
      ref={ref} 
      initial="hidden" 
      animate={inView ? "visible" : "hidden"} 
      variants={fadeInVariants} 
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-purple-900/20 opacity-50 rounded-3xl blur-xl transform rotate-1"></div>
      <div className="relative bg-black/70 p-6 sm:p-10 rounded-3xl border border-purple-900/30 shadow-2xl backdrop-blur-lg">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-400"
        >
          Past Events
        </motion.h2>
        
        <motion.div variants={staggerContainerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PAST_EVENTS.map((event, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants} 
              className="p-5 rounded-2xl bg-black/30 backdrop-blur-sm border border-purple-900/20 hover:border-purple-500/40 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-2 text-white">{event.title}</h3>
              <div className="text-xs text-gray-400 mb-3">{event.date}</div>
              <p className="text-sm text-gray-300 mb-3">{event.description}</p>
              <div className="text-sm font-medium text-purple-300">{event.points}</div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} 
          transition={{ duration: 0.5, delay: 0.6 }} 
          className="mt-8 text-center"
        >
          <Link
            to="/leaderboard"
            className="group inline-flex items-center bg-black hover:bg-purple-800 text-gray-300 hover:text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-300"
          >
            <span>View Leaderboard</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
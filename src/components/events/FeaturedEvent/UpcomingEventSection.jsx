import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeInVariants } from "../../../constants/animations";
import EventFeatureContent from "./EventFeatureContent";

export default function UpcomingEventSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <motion.div 
      ref={ref} 
      initial="hidden" 
      animate={inView ? "visible" : "hidden"} 
      variants={fadeInVariants} 
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 opacity-30 rounded-3xl blur-xl transform rotate-1"></div>
      <div className="relative overflow-hidden bg-black/70 rounded-3xl border border-purple-900/30 shadow-2xl backdrop-blur-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-700/20 to-indigo-700/20 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-700/20 to-purple-700/20 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/4"></div>
        
        <div className="relative p-6 sm:p-10">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              Next Upcoming Event
            </h2>
          </div>
          
          <EventFeatureContent inView={inView} />
        </div>
      </div>
    </motion.div>
  );
}
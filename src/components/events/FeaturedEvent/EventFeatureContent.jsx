import React from "react";
import { motion } from "framer-motion";
import { FEATURED_EVENT } from "../../../constants/eventsData";
import EventDetailsBar from "../EventDetailsBar";

export default function EventFeatureContent({ inView }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10">
      <div className="lg:col-span-3 space-y-4">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
        >
          {FEATURED_EVENT.title}
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-lg text-gray-300 leading-relaxed"
        >
          {FEATURED_EVENT.description}
        </motion.p>
        
        <EventDetailsBar 
          event={FEATURED_EVENT} 
          inView={inView} 
          delay={0.4} 
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6"
        >
          <a
            href="#"
            className="group inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-900/30"
          >
            <span>Add to Calendar</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="lg:col-span-2 aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-black/30 border border-purple-900/20"
      >
        <img 
          src="/assets/logos/house-cup-logo.png" 
          alt="Event highlight" 
          className="w-full h-full object-cover object-center opacity-80"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}
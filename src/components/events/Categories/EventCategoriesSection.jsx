import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeInVariants, staggerContainerVariants, itemVariants } from "../../../constants/animations";
import { FILTER_CATEGORIES } from "../../../constants/eventsData";

export default function EventCategoriesSection({ activeFilter, setActiveFilter }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  return (
    <motion.div 
      ref={ref} 
      initial="hidden" 
      animate={inView ? "visible" : "hidden"} 
      variants={fadeInVariants} 
      className="relative"
    >
      <div className="bg-black/70 p-6 sm:p-8 rounded-3xl border border-purple-900/30 shadow-xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400"
        >
          Categories
        </motion.h2>
        
        <motion.div variants={staggerContainerVariants} className="flex flex-wrap gap-3 sm:gap-4">
          {FILTER_CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              onClick={() => setActiveFilter(category.id)}
              className={`flex items-center px-4 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-lg"
                  : "bg-black/50 text-gray-400 hover:bg-purple-900/20 hover:text-white"
              }`}
              aria-pressed={activeFilter === category.id}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
              </svg>
              {category.name}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
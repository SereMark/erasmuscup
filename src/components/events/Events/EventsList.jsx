import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeInVariants, staggerContainerVariants, itemVariants } from "../../../constants/animations";
import EventCard from "../EventCard";

export default function EventsList({ displayedEvents }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <motion.div 
      ref={ref} 
      initial="hidden" 
      animate={inView ? "visible" : "hidden"} 
      variants={fadeInVariants}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300"
      >
        Upcoming Events
      </motion.h2>
      
      <motion.div variants={staggerContainerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </motion.div>
      
      {displayedEvents.length === 0 && (
        <motion.div 
          variants={itemVariants}
          className="text-center p-8 rounded-xl bg-black/30 border border-purple-900/20"
        >
          <p className="text-gray-400">No events found in this category.</p>
        </motion.div>
      )}
    </motion.div>
  );
}
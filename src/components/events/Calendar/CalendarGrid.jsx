import React from "react";
import { motion } from "framer-motion";
import { DAYS_OF_WEEK, DAYS_WITH_EVENTS } from "../../../constants/eventsData";
import { staggerContainerVariants, itemVariants } from "../../../constants/animations";

export default function CalendarGrid({ inView }) {
  return (
    <div className="bg-black/30 rounded-xl p-4 sm:p-6 border border-purple-900/20">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-xs sm:text-sm text-center font-medium text-purple-300 py-2">
            {day}
          </div>
        ))}
      </div>
      
      <motion.div 
        variants={staggerContainerVariants} 
        initial="hidden" 
        animate={inView ? "visible" : "hidden"} 
        className="grid grid-cols-7 gap-1 sm:gap-2"
      >
        {Array.from({ length: 30 }, (_, i) => {
          const hasEvent = DAYS_WITH_EVENTS.includes(i + 1);
          return (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`aspect-square rounded-lg p-1 sm:p-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                hasEvent
                  ? "bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/40 hover:border-purple-500"
                  : "bg-black/30 hover:bg-black/50"
              }`}
              aria-label={`${i + 1}${hasEvent ? ' (has event)' : ''}`}
            >
              <span className="text-xs sm:text-sm font-medium">{i + 1}</span>
              {hasEvent && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mt-1" />}
            </motion.div>
          );
        })}
      </motion.div>
      
      <div className="mt-4 text-xs text-gray-400 text-center">
        * Click on a day with events (purple) to see details
      </div>
    </div>
  );
}
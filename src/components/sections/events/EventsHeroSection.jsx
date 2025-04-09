import React from "react";
import { motion } from "framer-motion";
import { 
  getActiveEvents, 
  getUpcomingEvents, 
  getEventHeroTexts 
} from "../../../constants/eventData";

export default function EventsHeroSection() {
  // Get events status dynamically
  const [activeEvents, setActiveEvents] = React.useState([]);
  const [upcomingEvents, setUpcomingEvents] = React.useState([]);
  
  // Update event statuses at regular intervals
  React.useEffect(() => {
    const updateEventStatuses = () => {
      setActiveEvents(getActiveEvents());
      setUpcomingEvents(getUpcomingEvents());
    };
    
    // Update immediately
    updateEventStatuses();
    
    // Update every minute to check for status changes
    const intervalId = setInterval(updateEventStatuses, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const hasActiveEvents = activeEvents.length > 0;
  
  // Get hero texts for the most important active event (first in the list)
  const getHeroTexts = () => {
    if (hasActiveEvents) {
      const primaryEvent = activeEvents[0];
      return getEventHeroTexts(primaryEvent);
    }
    
    return {
      title: "Upcoming Trials & Challenges",
      message: "Ready to earn glory for your House? These events will test your loyalty, cunning, and dignity.",
      badgeText: null // No badge for upcoming events
    };
  };
  
  // Get hero texts
  const heroTexts = getHeroTexts();
  
  return (
    <div className="relative w-full h-[25vh] sm:h-[30vh] overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <img
          src="/assets/logos/house-cup-cover.png"
          alt="Events background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
          loading="eager"
          width="1920"
          height="1080"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${hasActiveEvents ? 'from-red-900 via-purple-900' : 'from-purple-900 via-indigo-900'} to-black opacity-85`} />
      </motion.div>
      <div className="relative w-full h-full flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="px-4 sm:px-6 max-w-3xl text-center backdrop-blur-sm bg-black/20 p-4 sm:p-6 rounded-2xl border border-white/10"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-lg">
            {heroTexts.title}
          </h1>
          <p className="text-sm sm:text-base font-light text-gray-200 leading-relaxed">
            {heroTexts.message}
          </p>
          {hasActiveEvents && heroTexts.badgeText && (
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="mt-4"
            >
              <span className="inline-block bg-red-600/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                {heroTexts.badgeText}
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
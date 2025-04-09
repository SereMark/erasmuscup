import React from "react";
import { motion } from "framer-motion";
import { fadeInVariants } from "../constants/animations";
import EventsHeroSection from "../components/sections/events/EventsHeroSection";
import BirthdayGambitEvent from "../components/sections/events/BirthdayGambitEvent";
import CaptureTheFlagEvent from "../components/sections/events/CaptureTheFlagEvent";
import { SectionTitle } from "../components/features/rules/SectionTitle";
import { getActiveEvents } from "../constants/eventData";

export default function EventsPage() {
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const activeEvents = getActiveEvents();
  
  // Automatically show content after a short delay, regardless of scroll
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 300); // Short delay after page load
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero section */}
      <EventsHeroSection />
      
      {/* Content sections container */}
      <div className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="py-6 sm:py-8 space-y-8 sm:space-y-12">
          {/* Active Events Section - Only show if there are active events */}
          {activeEvents.length > 0 && (
            <motion.div
              initial="hidden"
              animate={hasAnimated ? "visible" : "hidden"}
              variants={fadeInVariants}
              className="relative z-10"
            >
              <div className="text-center mb-8 sm:mb-12">
                <SectionTitle 
                  title="Active Events"
                  subtitle="These events are happening right now! Check them out and participate to earn points for your House."
                  gradient="from-red-300 to-purple-300"
                  align="center"
                />
              </div>
              
              <div className="space-y-8 sm:space-y-12">
                {/* Capture the Flag Easter Hunt Event - This is currently active */}
                <CaptureTheFlagEvent />
              </div>
            </motion.div>
          )}
          
          {/* Upcoming Events Section */}
          <motion.div
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
            variants={fadeInVariants}
            className="relative z-10"
          >
            <div className="text-center mb-8 sm:mb-12">
              <SectionTitle 
                title="Upcoming Events"
                subtitle="Join us for these epic House Cup battles! Remember, missing an event might cost your House precious points (section 5)."
                gradient="from-indigo-300 to-purple-300"
                align="center"
              />
            </div>
            
            <div className="space-y-8 sm:space-y-12">
              {/* Marco's Special Secret Gambit Event */}
              <BirthdayGambitEvent />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
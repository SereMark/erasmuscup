import React from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../hooks/useAnimation";
import { fadeInVariants } from "../constants/animations";
import EventsHeroSection from "../components/sections/events/EventsHeroSection";
import BirthdayGambitEvent from "../components/sections/events/BirthdayGambitEvent";
import CaptureTheFlagEvent from "../components/sections/events/CaptureTheFlagEvent";
import { SectionTitle } from "../components/features/rules/SectionTitle";

export default function EventsPage() {
  const { ref, hasBeenInView } = useAnimation({threshold: 0, rootMargin: "0px 0px -100px 0px"});
  
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero section */}
      <EventsHeroSection />
      
      {/* Content sections container */}
      <div className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="py-6 sm:py-8 space-y-8 sm:space-y-12">
          {/* Upcoming Events Section */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={hasBeenInView ? "visible" : "hidden"}
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
              {/* Capture the Flag Easter Hunt Event */}
              <CaptureTheFlagEvent />

              {/* Marco's Special Secret Gambit Event */}
              <BirthdayGambitEvent />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
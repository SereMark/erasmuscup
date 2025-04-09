import React from "react";
import { motion } from "framer-motion";
import { fadeInVariants } from "../constants/animations";
import EventsHeroSection from "../components/sections/events/EventsHeroSection";
import BirthdayGambitEvent from "../components/sections/events/BirthdayGambitEvent";
import CaptureTheFlagEvent from "../components/sections/events/CaptureTheFlagEvent";
import { SectionTitle } from "../components/features/rules/SectionTitle";
import { 
  getActiveEvents, 
  getUpcomingEvents,
  getCompletedEvents,
  birthdayGambitEventData,
  captureFlagEventData
} from "../constants/eventData";

// Component for each section (Active, Upcoming, Completed)
const EventSection = ({ title, subtitle, gradient, events, renderEvent, hasAnimated }) => {
  if (events.length === 0) return null;
  
  return (
    <motion.div
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={fadeInVariants}
      className="relative z-10"
    >
      <div className="text-center mb-8 sm:mb-12">
        <SectionTitle 
          title={title}
          subtitle={subtitle}
          gradient={gradient}
          align="center"
        />
      </div>
      
      <div className="space-y-8 sm:space-y-12">
        {events.map(eventData => renderEvent(eventData))}
      </div>
    </motion.div>
  );
};

export default function EventsPage() {
  const [hasAnimated, setHasAnimated] = React.useState(false);
  
  // Create state for events with their dynamic statuses
  const [activeEvents, setActiveEvents] = React.useState([]);
  const [upcomingEvents, setUpcomingEvents] = React.useState([]);
  const [completedEvents, setCompletedEvents] = React.useState([]);
  
  // Update event statuses at regular intervals
  React.useEffect(() => {
    const updateEventStatuses = () => {
      setActiveEvents(getActiveEvents());
      setUpcomingEvents(getUpcomingEvents());
      setCompletedEvents(getCompletedEvents());
    };
    
    // Update immediately
    updateEventStatuses();
    
    // Update every minute to check for status changes
    const intervalId = setInterval(updateEventStatuses, 60000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Automatically show content after a short delay, regardless of scroll
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 300); // Short delay after page load
    
    return () => clearTimeout(timer);
  }, []);
  
  // Helper function to render the appropriate event component
  const renderEventComponent = (eventData) => {
    switch(eventData.title) {
      case birthdayGambitEventData.title:
        return <BirthdayGambitEvent key="birthday-gambit" />;
      case captureFlagEventData.title:
        return <CaptureTheFlagEvent key="capture-flag" />;
      default:
        return null;
    }
  };
  
  // Check if there are any events at all
  const hasEvents = activeEvents.length > 0 || upcomingEvents.length > 0 || completedEvents.length > 0;
  
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero section */}
      <EventsHeroSection />
      
      {/* Content sections container */}
      <div className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="py-6 sm:py-8 space-y-8 sm:space-y-12">
          {/* Active Events Section */}
          <EventSection
            title="Active Events"
            subtitle="These events are happening right now! Check them out and participate to earn points for your House."
            gradient="from-red-300 to-purple-300"
            events={activeEvents}
            renderEvent={renderEventComponent}
            hasAnimated={hasAnimated}
          />
          
          {/* Upcoming Events Section */}
          <EventSection
            title="Upcoming Events"
            subtitle="Join us for these epic House Cup battles! Remember, missing an event might cost your House precious points (section 5)."
            gradient="from-indigo-300 to-purple-300"
            events={upcomingEvents}
            renderEvent={renderEventComponent}
            hasAnimated={hasAnimated}
          />
          
          {/* Completed Events Section */}
          <EventSection
            title="Past Events"
            subtitle="These events have already concluded. Check out upcoming events to participate in new challenges!"
            gradient="from-gray-300 to-blue-300"
            events={completedEvents}
            renderEvent={renderEventComponent}
            hasAnimated={hasAnimated}
          />
          
          {/* Show a message when no events are present */}
          {!hasEvents && (
            <motion.div
              initial="hidden"
              animate={hasAnimated ? "visible" : "hidden"}
              variants={fadeInVariants}
              className="relative z-10 text-center py-16"
            >
              <h2 className="text-2xl font-bold text-gray-300 mb-4">No events scheduled</h2>
              <p className="text-gray-400">Check back later for upcoming House Cup events!</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
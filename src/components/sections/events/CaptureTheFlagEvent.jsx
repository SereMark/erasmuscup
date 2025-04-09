import React from "react";
import EventCard from "../../features/events/EventCard";
import EventDetails from "../../features/events/EventDetails";
import EventInfoItem from "../../features/events/EventInfoItem";
import EventNote from "../../features/events/EventNote";
import EventPointsSystem from "../../features/events/EventPointsSystem";
import EventRule from "../../features/events/EventRule";
import { 
  captureFlagEventData, 
  isEventActive, 
  getActivePhase,
  getEventStatus 
} from "../../../constants/eventData";
import { motion } from "framer-motion";

// Component for the pulsing LIVE badge
const LiveBadge = ({ phaseName }) => (
  <motion.div
    animate={{ 
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8]
    }}
    transition={{ 
      duration: 2,
      repeat: Infinity,
      repeatType: "loop"
    }}
    className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 ml-3"
  >
    <span className="h-2 w-2 bg-white rounded-full block"></span>
    <span>{phaseName || "LIVE"}</span>
  </motion.div>
);

// Icons mapping for the event
const eventIcons = {
  flag: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
    </svg>
  ),
  cake: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 002 2h6a2 2 0 002-2v-1a2 2 0 00-2-2V6a1 1 0 10-2 0v1H8V6zm10 8a1 1 0 01-1 1H5a1 1 0 110-2h12a1 1 0 011 1zM5 12a1 1 0 100 2h.01a1 1 0 100-2H5z" clipRule="evenodd" />
    </svg>
  )
};

// Calculate time remaining for the active phase or event
const useTimeRemaining = (event) => {
  const [timeRemaining, setTimeRemaining] = React.useState("");
  
  React.useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      
      // Check if the event is active
      if (!isEventActive(event)) {
        return "Event not active";
      }
      
      // Get end time from active phase or overall event
      const activePhase = getActivePhase(event);
      const endDate = activePhase ? activePhase.endTime : event.endTime;
      
      // Calculate the time difference
      const diff = endDate - now;
      
      // Convert to days, hours, and minutes
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (diff <= 0) {
        return "Phase ended!";
      }
      
      let timeString = "";
      if (days > 0) {
        timeString += `${days}d `;
      }
      return `${timeString}${hours}h ${minutes}m remaining`;
    };
    
    // Update time remaining every minute
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 60000);
    
    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());
    
    return () => clearInterval(timer);
  }, [event]);
  
  return timeRemaining;
};

export default function CaptureTheFlagEvent() {
  const {
    type,
    typeColor,
    typeTextColor,
    title,
    gradient,
    gradientText,
    rotation,
    iconElement,
    iconBgColor,
    description,
    schedule,
    notes,
    pointsSystem,
    rules,
    organizer
  } = captureFlagEventData;
  
  // Get dynamic event data
  const eventStatus = getEventStatus(captureFlagEventData);
  const activePhase = getActivePhase(captureFlagEventData);
  const timeRemaining = useTimeRemaining(captureFlagEventData);
  const isLive = eventStatus === "LIVE";
  
  // Dynamically determine the display date
  const getDisplayDate = () => {
    if (isLive && activePhase) {
      return `${activePhase.name} Active!`;
    } else if (eventStatus === "UPCOMING") {
      return "Coming Soon";
    } else {
      return "Event Completed";
    }
  };
  
  // Get badge label for the active phase
  const getLiveBadgeLabel = () => {
    if (activePhase) {
      if (activePhase.name === "Setup Phase") {
        return "SETUP";
      } else if (activePhase.name === "Hunt Phase") {
        return "HUNT";
      }
    }
    return "LIVE";
  };
  
  return (
    <EventCard
      type={type}
      typeColor={typeColor}
      typeTextColor={typeTextColor}
      date={getDisplayDate()}
      title={title}
      gradient={gradient}
      gradientText={gradientText}
      rotation={rotation}
      icon={eventIcons[iconElement]}
      iconBgColor={iconBgColor}
      delay={0.2}
    >
      <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
        {isLive && (
          <div className="flex items-center mb-4">
            <LiveBadge phaseName={getLiveBadgeLabel()} />
            <div className="ml-3 text-sm font-medium text-indigo-300">
              {timeRemaining}
            </div>
          </div>
        )}
        
        <p className="text-gray-300 mb-4">
          {description}
        </p>
        
        <EventDetails title="Event Schedule:">
          {schedule.map((item, index) => {
            // Determine if this schedule item is active based on phases
            const isActive = 
              activePhase && 
              activePhase.label === item.label;
              
            return (
              <EventInfoItem 
                key={index}
                icon={item.icon}
                label={item.label}
                value={item.value}
                isActive={isActive}
              />
            );
          })}
        </EventDetails>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {notes.map((note, index) => (
            <EventNote 
              key={index}
              title={note.title}
              bgColor={note.bgColor}
              borderColor={note.borderColor}
              textColor={note.textColor}
            >
              <p className="text-sm text-gray-400 mb-0">
                {note.content}
              </p>
            </EventNote>
          ))}
        </div>
        
        <EventPointsSystem 
          title={pointsSystem.title}
          bgColor={pointsSystem.bgColor}
          borderColor={pointsSystem.borderColor}
          textColor={pointsSystem.textColor}
          points={pointsSystem.points}
        />
        
        <div className="mt-6">
          <h3 className="text-sm uppercase font-semibold text-purple-400 mb-3">Important Rules:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {rules.map((rule, index) => (
              <EventRule key={index} type={rule.type}>
                {rule.content}
              </EventRule>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="text-gray-400 text-xs italic">
          <span>Event organized by {organizer}</span>
        </div>
        {isLive && activePhase && (
          <div className="bg-indigo-900/20 text-indigo-300 px-3 py-1 rounded text-xs font-medium">
            {activePhase.name} active
          </div>
        )}
      </div>
    </EventCard>
  );
}
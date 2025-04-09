import React from "react";
import EventCard from "../../features/events/EventCard";
import EventDetails from "../../features/events/EventDetails";
import EventInfoItem from "../../features/events/EventInfoItem";
import EventNote from "../../features/events/EventNote";
import EventPointsSystem from "../../features/events/EventPointsSystem";
import EventRule from "../../features/events/EventRule";
import { captureFlagEventData } from "../../../constants/eventData";
import { motion } from "framer-motion";

// Component for the pulsing LIVE badge
const LiveBadge = () => (
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
    <span>LIVE</span>
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

// Calculate time remaining in the hunt
const useTimeRemaining = () => {
  const [timeRemaining, setTimeRemaining] = React.useState("");
  
  React.useEffect(() => {
    // Set end time to Friday 23:59
    const calculateTimeRemaining = () => {
      const now = new Date();
      const endDate = new Date();
      
      // Set to next Friday 23:59
      const dayOfWeek = now.getDay(); // 0 is Sunday, 5 is Friday
      const daysToFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 7 - dayOfWeek + 5;
      
      endDate.setDate(now.getDate() + daysToFriday);
      endDate.setHours(23, 59, 0, 0);
      
      // Calculate the time difference
      const diff = endDate - now;
      
      // Convert to hours and minutes
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (diff <= 0) {
        return "Hunt ended!";
      }
      
      return `${hours}h ${minutes}m remaining`;
    };
    
    // Update time remaining every minute
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 60000);
    
    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());
    
    return () => clearInterval(timer);
  }, []);
  
  return timeRemaining;
};

export default function CaptureTheFlagEvent() {
  const {
    type,
    typeColor,
    typeTextColor,
    status,
    date,
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
  
  const timeRemaining = useTimeRemaining();
  const isLive = status === "LIVE";
  
  return (
    <EventCard
      type={type}
      typeColor={typeColor}
      typeTextColor={typeTextColor}
      date={date}
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
            <LiveBadge />
            <div className="ml-3 text-sm font-medium text-indigo-300">
              {timeRemaining}
            </div>
          </div>
        )}
        
        <p className="text-gray-300 mb-4">
          {description}
        </p>
        
        <EventDetails title="Event Schedule:">
          {schedule.map((item, index) => (
            <EventInfoItem 
              key={index}
              icon={item.icon}
              label={item.label}
              value={item.value}
              isActive={item.isActive}
            />
          ))}
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
        {isLive && (
          <div className="bg-indigo-900/20 text-indigo-300 px-3 py-1 rounded text-xs font-medium">
            Hunt phase active
          </div>
        )}
      </div>
    </EventCard>
  );
}
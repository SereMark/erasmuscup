import React from "react";
import EventCard from "../../features/events/EventCard";
import EventDetails from "../../features/events/EventDetails";
import EventInfoItem from "../../features/events/EventInfoItem";
import EventNote from "../../features/events/EventNote";
import { birthdayGambitEventData } from "../../../constants/eventData";

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

export default function BirthdayGambitEvent() {
  const {
    type,
    typeColor,
    typeTextColor,
    date,
    title,
    gradient,
    gradientText,
    rotation,
    iconElement,
    iconBgColor,
    description,
    details,
    notes,
    organizer
  } = birthdayGambitEventData;
  
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
    >
      <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
        <p className="text-gray-300 mb-4">
          {description}
        </p>
        
        <EventDetails title="Event Details:">
          {details.map((item, index) => (
            <EventInfoItem 
              key={index}
              icon={item.icon}
              label={item.label}
              value={item.value}
            />
          ))}
        </EventDetails>
        
        <div className="space-y-4 mt-4">
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
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="text-gray-400 text-xs italic">
          <span>Event organized by {organizer}</span>
        </div>
      </div>
    </EventCard>
  );
}
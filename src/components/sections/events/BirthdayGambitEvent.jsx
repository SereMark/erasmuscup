import React from "react";
import EventCard from "../../features/events/EventCard";
import EventDetails from "../../features/events/EventDetails";
import EventInfoItem from "../../features/events/EventInfoItem";
import EventNote from "../../features/events/EventNote";

export default function BirthdayGambitEvent() {
  return (
    <EventCard
      type="SPECIAL GAMBIT"
      typeColor="bg-pink-500/20"
      typeTextColor="text-pink-300"
      date="This Friday"
      title="Marco's Birthday Gambit"
      gradient="from-pink-800 to-purple-800"
      gradientText="from-pink-300 to-purple-300"
      rotation="rotate-1"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 002 2h6a2 2 0 002-2v-1a2 2 0 00-2-2V6a1 1 0 10-2 0v1H8V6zm10 8a1 1 0 01-1 1H5a1 1 0 110-2h12a1 1 0 011 1zM5 12a1 1 0 100 2h.01a1 1 0 100-2H5z" clipRule="evenodd" />
        </svg>
      }
      iconBgColor="bg-gradient-to-br from-pink-600/30 to-purple-600/30 border-pink-500/20"
    >
      <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
        <p className="text-gray-300 mb-4">
          This Friday is Marco's birthday and he's organizing a Special Secret Gambit at Pleschinger See.
          Celebrate his birthday with House Cup challenges, favorite snacks to share, and a Buffalo-free evening
          (at least from the birthday boy)!
        </p>
        
        <EventDetails title="Event Details:">
          <EventInfoItem 
            icon="time"
            label="When:"
            value="Friday evening"
          />
          <EventInfoItem 
            icon="location"
            label="Where:"
            value="Pleschinger See"
          />
          <EventInfoItem 
            icon="info"
            label="What to expect:"
            value="House Cup challenges (rules revealed on-site)"
          />
          <EventInfoItem 
            icon="bring"
            label="Bring:"
            value="Your favorite snacks to share"
          />
        </EventDetails>
        
        <div className="space-y-4 mt-4">
          <EventNote 
            title="RSVP Required"
            bgColor="bg-pink-900/10" 
            borderColor="border-pink-700/20"
            textColor="text-pink-300"
          >
            <p className="text-sm text-gray-400 mb-0">
              Marco needs to know who can attend before finalizing plans. Please respond in the WhatsApp group if you're available this Friday evening.
            </p>
          </EventNote>
          
          <EventNote 
            title="Buffalo-Free Zone"
            bgColor="bg-pink-900/10" 
            borderColor="border-pink-700/20"
            textColor="text-pink-300"
          >
            <p className="text-sm text-gray-400 mb-0">
              Since it's Marco's birthday, he'll be nice and won't be watching for any "buffaloes" - though everyone else still can! 😉
            </p>
          </EventNote>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="text-gray-400 text-xs italic">
          <span>Event organized by Marco</span>
        </div>
      </div>
    </EventCard>
  );
}
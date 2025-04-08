import React from "react";
import EventCard from "../../features/events/EventCard";
import EventDetails from "../../features/events/EventDetails";
import EventInfoItem from "../../features/events/EventInfoItem";
import EventNote from "../../features/events/EventNote";
import EventPointsSystem from "../../features/events/EventPointsSystem";
import EventRule from "../../features/events/EventRule";

export default function CaptureTheFlagEvent() {
  return (
    <EventCard
      type="MAIN EVENT"
      typeColor="bg-purple-600/20"
      typeTextColor="text-purple-300"
      date="Running Now!"
      title="Capture the Flag Easter Hunt"
      gradient="from-purple-800 to-indigo-900"
      gradientText="from-indigo-300 to-purple-300"
      rotation="-rotate-1"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
        </svg>
      }
      iconBgColor="bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border-indigo-500/20"
      delay={0.2}
    >
      <div className="prose prose-invert prose-sm sm:prose-base max-w-none">
        <p className="text-gray-300 mb-4">
          In the spirit of Easter, we will be hunting down house flags! Each team will hide a flag with their 
          house logo somewhere in Julius Raab Heim. Teams will receive points for finding another House's 
          flag, or if their flag survives until the clock strikes midnight on Friday!
        </p>
        
        <EventDetails title="Event Schedule:">
          <EventInfoItem 
            icon="time"
            label="Set-up:"
            value="Monday midnight to Wednesday 23:59"
          />
          <EventInfoItem 
            icon="time"
            label="Hunt:"
            value="Thursday midnight to Friday 23:59"
          />
        </EventDetails>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <EventNote 
            title="Flag Requirements"
            bgColor="bg-indigo-900/10" 
            borderColor="border-indigo-700/20"
            textColor="text-indigo-300"
          >
            <p className="text-sm text-gray-400 mb-0">
              Each house receives one flag (approx. 1/4 of A4 size). Flags must remain intact in their original form – no folding, rolling, or tearing allowed.
            </p>
          </EventNote>
          
          <EventNote 
            title="Proof of Capture"
            bgColor="bg-indigo-900/10" 
            borderColor="border-indigo-700/20"
            textColor="text-indigo-300"
          >
            <p className="text-sm text-gray-400 mb-0">
              When capturing a flag, take a photo showing: the found flag, at least one member of your house, and where the flag was hidden.
            </p>
          </EventNote>
        </div>
        
        <EventPointsSystem 
          title="Points System"
          bgColor="bg-indigo-900/10" 
          borderColor="border-indigo-700/20"
          textColor="text-indigo-300"
          points={[
            { type: "positive", label: "Each captured flag", value: "+50 points" },
            { type: "positive", label: "If your flag survives", value: "+25 points" },
            { type: "negative", label: "Cheating or breaking rules", value: "-50 points" }
          ]}
        />
        
        <div className="mt-6">
          <h3 className="text-sm uppercase font-semibold text-purple-400 mb-3">Important Rules:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <EventRule type="positive">
              Flags must be in common areas (stairs, corridors, kitchens, elevator, entrance hall)
            </EventRule>
            <EventRule type="warning">
              Common rooms are off-limits (count as locked rooms)
            </EventRule>
            <EventRule type="warning">
              No hiding in personal rooms, outside, behind reception, or in any locked/closed room
            </EventRule>
            <EventRule type="positive">
              You must retrieve your flag at the end of the week to claim survival points
            </EventRule>
            <EventRule type="warning">
              No changing flag location once the hunt begins
            </EventRule>
            <EventRule type="warning">
              Cheating penalty is -50 points (higher than standard -30)
            </EventRule>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="text-gray-400 text-xs italic">
          <span>Event organized by Max</span>
        </div>
      </div>
    </EventCard>
  );
}
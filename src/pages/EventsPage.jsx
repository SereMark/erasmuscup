import React, { useState, useMemo } from "react";
import { useScroll, useTransform } from "framer-motion";

// Import components
import HeroBanner from "../components/events/HeroBanner";
import CalendarSection from "../components/events/Calendar/CalendarSection";
import UpcomingEventSection from "../components/events/FeaturedEvent/UpcomingEventSection";
import EventCategoriesSection from "../components/events/Categories/EventCategoriesSection";
import EventsList from "../components/events/Events/EventsList";
import PastEventsHighlight from "../components/events/Past/PastEventsHighlight";

// Import data
import { EVENTS_DATA } from "../constants/eventsData";

export default function EventsPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeMonth, setActiveMonth] = useState("April");
  
  // Filter events based on selected category
  const displayedEvents = useMemo(() => {
    if (activeFilter === "all") return EVENTS_DATA;
    return EVENTS_DATA.filter(event => event.type === activeFilter);
  }, [activeFilter]);

  return (
    <section className="min-h-screen bg-black text-white overflow-hidden">
      <HeroBanner y={y} />
      
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24 px-4 sm:px-6 py-12 sm:py-16">
        <section id="calendar" className="scroll-mt-16">
          <CalendarSection 
            activeMonth={activeMonth} 
            setActiveMonth={setActiveMonth} 
          />
        </section>
        
        <section id="upcoming" className="scroll-mt-16">
          <UpcomingEventSection />
        </section>
        
        <EventCategoriesSection 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
        />
        
        <EventsList displayedEvents={displayedEvents} />
        
        <PastEventsHighlight />
      </div>
    </section>
  );
}
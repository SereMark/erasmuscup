import React, { useEffect, useState } from "react"
import eventsData from "../data/eventsData.json"
import EventsHero from "../components/events/EventsHero"
import EventSection from "../components/events/EventSection"
import EmptyState from "../components/events/EmptyState"
import { eventUtils } from "../utils/eventUtils"

export default function EventsPage() {
  // Set page title
  useEffect(() => {
    document.title = "House Cup 2025 | Events"
  }, [])

  // State for featured event
  const [featuredEvent, setFeaturedEvent] = useState(null)
  
  // Process events data
  const processedEvents = eventUtils.processEvents(eventsData.eventList)
  const activeEvents = eventUtils.getActiveEvents(processedEvents)
  const upcomingEvents = eventUtils.getUpcomingEvents(processedEvents, activeEvents)
  
  // Set featured event based on priority and status
  useEffect(() => {
    if (activeEvents.length) {
      // Use highest priority active event
      const featured = [...activeEvents].sort((a, b) => (b.priority || 0) - (a.priority || 0))[0]
      setFeaturedEvent(featured)
    } else if (upcomingEvents.length) {
      // Use highest priority upcoming event if no active events
      const featured = [...upcomingEvents].sort((a, b) => (b.priority || 0) - (a.priority || 0))[0]
      setFeaturedEvent(featured)
    } else {
      setFeaturedEvent(null)
    }
  }, [activeEvents, upcomingEvents])

  return (
    <main className="min-h-dynamic-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      {/* Hero Section */}
      <EventsHero
        currentEvent={featuredEvent || (processedEvents.length > 0 ? processedEvents[0] : null)}
        defaultHero={eventsData.config.defaultHero}
      />
      
      {/* Active Events Section */}
      {activeEvents.length > 0 && (
        <EventSection
          title={eventsData.config.sectionStyles.active.title}
          subtitle={eventsData.config.sectionStyles.active.subtitle}
          events={activeEvents}
          eventTypes={eventsData.eventTypes}
          eventIcons={eventsData.eventIcons}
          infoIcons={eventsData.infoIcons}
          templateTypes={eventsData.templateTypes}
          emptyStateMessage={eventsData.config.emptyStateMessage}
          isActive
        />
      )}
      
      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <EventSection
          title={eventsData.config.sectionStyles.upcoming.title}
          subtitle={eventsData.config.sectionStyles.upcoming.subtitle}
          events={upcomingEvents}
          eventTypes={eventsData.eventTypes}
          eventIcons={eventsData.eventIcons}
          infoIcons={eventsData.infoIcons}
          templateTypes={eventsData.templateTypes}
          emptyStateMessage={eventsData.config.emptyStateMessage}
        />
      )}
      
      {/* Empty State when no events */}
      {activeEvents.length === 0 && upcomingEvents.length === 0 && (
        <EmptyState
          message={eventsData.config.emptyStateMessage}
          resetFilters={() => {}}
        />
      )}
    </main>
  )
}
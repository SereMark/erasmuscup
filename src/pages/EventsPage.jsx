import React, { useEffect, useState, useRef } from "react"
import eventsData from "../data/eventsData.json"
import EventsHero from "../components/events/EventsHero"
import EventSection from "../components/events/EventSection"
import EmptyState from "../components/events/EmptyState"
import { eventUtils } from "../utils/eventUtils"

export default function EventsPage() {
  useEffect(() => {
    document.title = "House Cup 2025 | Events"
  }, [])

  const [featuredEvent, setFeaturedEvent] = useState(null)
  const processedEvents = eventUtils.processEvents(eventsData.eventList)
  const activeEvents = eventUtils.getActiveEvents(processedEvents)
  const upcomingEvents = eventUtils.getUpcomingEvents(processedEvents, activeEvents)

  useEffect(() => {
    if (activeEvents.length) {
      const featured = [...activeEvents].sort((a, b) => (b.priority || 0) - (a.priority || 0))[0]
      setFeaturedEvent(featured)
    } else if (upcomingEvents.length) {
      const featured = [...upcomingEvents].sort((a, b) => (b.priority || 0) - (a.priority || 0))[0]
      setFeaturedEvent(featured)
    } else {
      setFeaturedEvent(null)
    }
  }, [activeEvents, upcomingEvents])

  return (
    <div className="min-h-screen">
      <EventsHero
        currentEvent={featuredEvent || (processedEvents.length > 0 ? processedEvents[0] : null)}
        defaultHero={eventsData.config.defaultHero}
      />
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
      {activeEvents.length === 0 && upcomingEvents.length === 0 && (
        <EmptyState
          message={eventsData.config.emptyStateMessage}
          resetFilters={() => {}}
        />
      )}
    </div>
  )
}
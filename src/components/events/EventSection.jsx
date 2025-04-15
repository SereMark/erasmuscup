import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import EventCard from "./EventCard"

export default function EventSection({
  title,
  subtitle,
  events,
  eventTypes,
  eventIcons,
  infoIcons,
  templateTypes,
  emptyStateMessage,
  isActive = false
}) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }
  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [.22, 1, .36, 1] } }
  }

  return (
    <motion.section
      ref={sectionRef}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.div variants={titleVariants} className="mb-10 text-center max-w-3xl mx-auto">
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
            isActive
              ? "bg-gradient-to-r from-brand-600/60 to-brand-500/60 text-white"
              : "bg-dark-800/70 text-gray-300"
          }`}
        >
          {isActive ? "HAPPENING NOW" : title.toUpperCase()}
        </span>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500 mb-3">
          {title}
        </h2>
        {subtitle && <p className="text-gray-400">{subtitle}</p>}
      </motion.div>
      {events.length > 0 ? (
        <div className="space-y-6">
          {events.map((event, i) => (
            <EventCard
              key={event.id}
              event={event}
              eventTypes={eventTypes}
              eventIcons={eventIcons}
              infoIcons={infoIcons}
              templateTypes={templateTypes}
              isActive={isActive}
              index={i}
            />
          ))}
        </div>
      ) : (
        <motion.div variants={titleVariants} className="glass-card p-12 text-center">
          <div className="flex flex-col items-center">
            <img
              src={emptyStateMessage.image}
              alt="No events"
              className="w-24 h-24 mb-6 opacity-50 invert"
            />
            <h3 className="text-xl font-semibold text-white mb-2">{emptyStateMessage.title}</h3>
            <p className="text-gray-400 max-w-md mx-auto">{emptyStateMessage.subtitle}</p>
          </div>
        </motion.div>
      )}
    </motion.section>
  )
}
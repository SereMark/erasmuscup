import React from "react"
import { motion } from "framer-motion"
import { dateUtils } from "../../utils/dateUtils"

export default function EventCard({
  event,
  eventTypes,
  eventIcons,
  infoIcons,
  templateTypes,
  isActive = false,
  index = 0
}) {
  const eventType = eventTypes[event.type]
  const iconKey = event.icon
  const iconData = eventIcons[iconKey]
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        delay: index * 0.1, 
        duration: 0.5, 
        ease: [.43, .13, .23, .96] 
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className={`glass-card overflow-hidden group ${isActive ? "border-l-4 border-brand-500" : "border-l-4 border-white/10"}`}
    >
      {/* Card header */}
      <div className="px-6 py-5 relative">
        <div className="absolute inset-0 bg-brand-500/0 group-hover:bg-brand-500/5 transition-colors duration-300" />
        
        <div className="flex justify-between items-start relative">
          <div>
            {/* Event type badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-900/50 text-brand-300 mb-2 border border-brand-800/30">
              {eventType.label}
              {isActive && (
                <span className="ml-2 relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
                </span>
              )}
            </div>
            
            {/* Event title */}
            <h3 className="text-xl font-bold text-white group-hover:text-brand-300 transition-colors duration-300 flex items-center">
              {iconData && (
                <img
                  src={iconData.svgUrl}
                  alt={`${iconKey} icon`}
                  className="w-5 h-5 mr-2 invert opacity-80"
                />
              )}
              {event.title}
            </h3>
          </div>
        </div>
        
        {/* Event timing */}
        <div className="mt-4 text-sm text-gray-400">
          {event.timing?.phases?.length > 0 ? (
            <div className="flex items-center p-2 rounded-md bg-dark-800/30 border border-dark-700/20">
              <img
                src={infoIcons.calendar}
                alt="Calendar"
                className="w-4 h-4 mr-1.5 invert opacity-60"
              />
              <span>
                Current Phase: <span className="text-white">{event.timing.phases[0].name}</span>
                <span className="px-2 py-0.5 ml-2 text-xs bg-brand-900/40 rounded border border-brand-800/30">
                  {event.timing.phases[0].value}
                </span>
              </span>
            </div>
          ) : event.timing?.dynamicDateRef ? (
            <div className="flex items-center p-2 rounded-md bg-dark-800/30 border border-dark-700/20">
              <img
                src={infoIcons.calendar}
                alt="Calendar"
                className="w-4 h-4 mr-1.5 invert opacity-60"
              />
              <span>
                {event.timing.startTime} - {event.timing.endTime} on{" "}
                {dateUtils.formatDynamicReference(event.timing.dynamicDateRef)}
              </span>
            </div>
          ) : (
            <div className="p-2 rounded-md bg-dark-800/30 border border-dark-700/20 text-center">
              Dates to be announced
            </div>
          )}
        </div>
        
        {/* Event description */}
        <div className="mt-4 text-sm text-gray-300 leading-relaxed">
          {event.description}
        </div>
      </div>
      
      {/* Event details section */}
      <div className="px-6 py-4 border-t border-white/5 bg-dark-900/20">
        {/* Event details grid */}
        {event.details && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <div className="w-1 h-5 bg-brand-500 mr-2 rounded-full"></div>
              Event Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-dark-800/20 rounded-lg border border-dark-700/20">
              {event.details.map((detail, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-900/30 text-brand-400 mr-3 flex-shrink-0">
                    <img
                      src={infoIcons[detail.icon]}
                      alt={detail.icon}
                      className="w-4 h-4 invert opacity-80"
                    />
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">{detail.label}</span>{" "}
                    <span className="text-white font-medium">{detail.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Event notes */}
        {event.notes && event.notes.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <div className="w-1 h-5 bg-brand-500 mr-2 rounded-full"></div>
              Notes
            </h4>
            <div className="space-y-3">
              {event.notes.map((note, idx) => {
                const bgColor = getTemplateColor(note.templateType, "bg", templateTypes)
                const borderColor = getTemplateColor(note.templateType, "border", templateTypes)
                return (
                  <div key={idx} className={`p-4 rounded-lg ${bgColor} ${borderColor}`}>
                    <h5 className="font-medium text-brand-300 mb-2">{note.title}</h5>
                    <div
                      className="text-sm text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: note.contentHtml }}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}
        
        {/* Points system */}
        {event.pointsSystem && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <div className="w-1 h-5 bg-brand-500 mr-2 rounded-full"></div>
              {event.pointsSystem.title}
            </h4>
            <div className="p-4 rounded-lg bg-dark-800/30 border border-dark-700/40">
              <ul className="space-y-3">
                {event.pointsSystem.points.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center p-2 rounded hover:bg-dark-800/40 transition-colors duration-200"
                  >
                    <span className="text-gray-300">{point.label}</span>
                    <span
                      className={`px-3 py-1 rounded-full font-mono font-medium ${
                        point.type === "positive"
                          ? "bg-emerald-900/30 text-emerald-400 border border-emerald-800/30"
                          : point.type === "negative"
                          ? "bg-rose-900/30 text-rose-400 border border-rose-800/30"
                          : "bg-gray-800/30 text-gray-400 border border-gray-700/30"
                      }`}
                    >
                      {point.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {/* Event rules */}
        {event.rules && event.rules.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
              <div className="w-1 h-5 bg-brand-500 mr-2 rounded-full"></div>
              Rules
            </h4>
            <div className="p-4 rounded-lg bg-dark-800/30 border border-dark-700/40">
              <ul className="space-y-3">
                {event.rules.map((rule, idx) => (
                  <li
                    key={idx}
                    className="flex items-start p-2 rounded hover:bg-dark-800/40 transition-colors duration-200"
                  >
                    <span
                      className={`inline-block w-6 h-6 rounded-full mr-3 flex-shrink-0 ${
                        rule.type === "positive"
                          ? "bg-emerald-900/50 text-emerald-400 border border-emerald-800/50"
                          : "bg-rose-900/50 text-rose-400 border border-rose-800/50"
                      } flex items-center justify-center text-xs font-bold`}
                    >
                      {rule.type === "positive" ? "✓" : "!"}
                    </span>
                    <span
                      className="text-gray-300 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: rule.contentHtml }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {/* Event organizer */}
        {event.organizer && (
          <div className="text-sm bg-brand-900/20 p-3 rounded-lg border border-brand-800/30 text-gray-300 flex items-center">
            <div className="w-6 h-6 rounded-full bg-dark-800/80 flex items-center justify-center mr-2 text-brand-400">
              {infoIcons.people ? (
                <img
                  src={infoIcons.people}
                  alt="Organizer"
                  className="w-4 h-4 invert opacity-80"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              )}
            </div>
            Organized by: <span className="text-white font-medium ml-1">{event.organizer}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/**
 * Helper function to get the appropriate template styling
 */
function getTemplateColor(templateType, part, templateTypes) {
  const colorMap = {
    warning: { 
      bg: "bg-amber-900/20", 
      border: "border border-amber-800/30", 
      text: "text-amber-400" 
    },
    info: { 
      bg: "bg-blue-900/20", 
      border: "border border-blue-800/30", 
      text: "text-blue-400" 
    },
    success: { 
      bg: "bg-emerald-900/20", 
      border: "border border-emerald-800/30", 
      text: "text-emerald-400" 
    },
    default: { 
      bg: "bg-dark-800/30", 
      border: "border border-dark-700/40", 
      text: "text-gray-300" 
    },
    neutral: { 
      bg: "bg-gray-800/30", 
      border: "border border-gray-700/30", 
      text: "text-gray-400" 
    }
  }
  
  // Use template type from templateTypes if available, otherwise use default mapping
  let t = colorMap[templateType] || colorMap.default
  if (templateTypes && templateTypes[templateType]) {
    const template = templateTypes[templateType]
    if (template.styles && template.styles[part]) {
      return template.styles[part]
    }
  }
  
  return t[part]
}
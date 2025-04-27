import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaMinus, FaArrowUp, FaArrowDown } from "react-icons/fa"

export default function ScoreCards({ scores, houses, housesFilter }) {
  const cardsRef = useRef(null)
  const isInView = useInView(cardsRef, { once: false, amount: 0.1 })
  
  // Filter scores and houses
  const eventScores = scores.filter(s => s.type !== "total")
  const filteredHouses = housesFilter
    .map(key => houses.find(h => h.key === key))
    .filter(Boolean)
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [.43, .13, .23, .96]
      }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  }
  
  // Helper function for point trend icon
  const getPointTrendIcon = points => {
    if (points == null) return <FaMinus className="text-gray-500" />
    if (points < 0) return <FaArrowDown className="text-rose-500" />
    if (points > 0) return <FaArrowUp className="text-green-500" />
    return <FaMinus className="text-gray-500" />
  }

  return (
    <motion.div
      ref={cardsRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
    >
      {/* Event cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {eventScores.map((event, i) => (
          <motion.div
            key={event.id || i}
            variants={cardVariants}
            whileHover="hover"
            className={`glass-card group ${
              event.type === "adjustment"
                ? "border-l-4 border-brand-500"
                : ""
            }`}
          >
            {/* Card header */}
            <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-white/5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white group-hover:text-brand-300 transition-colors duration-300">
                    {event.eventName}
                  </h3>
                </div>
                {event.date ? (
                  <div className="flex items-center text-xs sm:text-sm text-gray-400 bg-dark-800/30 px-2 sm:px-3 py-1 rounded-full w-fit">
                    <span className="font-mono">{event.date}</span>
                  </div>
                ) : event.type === "adjustment" && (
                  <div className="flex items-center text-xs sm:text-sm text-brand-400 bg-dark-800/30 px-2 sm:px-3 py-1 rounded-full w-fit">
                    <span>Point Adjustment</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Card content */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {filteredHouses.map(house => (
                  <div
                    key={`${event.id}-${house.key}`}
                    className="flex items-center gap-3 p-2 rounded-lg bg-dark-800/20 hover:bg-dark-800/30 transition-colors duration-200"
                  >
                    {/* House logo */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-dark-800 flex-shrink-0 border border-white/10">
                      <img
                        src={house.logo}
                        alt={house.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* House name and points */}
                    <div className="flex flex-grow items-center justify-between">
                      <div className={`text-sm font-medium text-house-${house.key}`}>
                        {house.name}
                      </div>
                      <div
                        className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 ml-1 rounded-full text-xs sm:text-sm font-medium ${
                          event.points[house.key] > 0
                            ? `bg-house-${house.key}/20 border border-house-${house.key}/30`
                            : event.points[house.key] < 0
                              ? 'bg-rose-900/20 border border-rose-800/30'
                              : 'bg-dark-700 border border-white/5'
                        } ${
                          event.points[house.key] > 0
                            ? `text-house-${house.key}`
                            : event.points[house.key] < 0
                              ? 'text-rose-400'
                              : 'text-gray-300'
                        }`}
                      >
                        <span className="mr-1">{getPointTrendIcon(event.points[house.key])}</span>
                        {event.points[house.key] == null
                          ? "-"
                          : event.points[house.key] > 0
                            ? `+${event.points[house.key]}`
                            : event.points[house.key]
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hover effect */}
            <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-dark-900/0 to-brand-900/10" />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Total score card */}
      {scores.filter(s => s.type === "total").map((total, i) => (
        <motion.div
          key={`total-${i}`}
          variants={cardVariants}
          className="glass-card mt-6 sm:mt-8 overflow-hidden bg-gradient-to-br from-dark-800/70 to-dark-900/70 border border-brand-900/30 shadow-inner-light"
        >
          {/* Card header */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10">
            <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">
              {total.eventName}
            </h3>
          </div>
          
          {/* Card content */}
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {housesFilter
                .map(key => houses.find(h => h.key === key))
                .filter(Boolean)
                .map(house => (
                  <div
                    key={house.key}
                    className={`flex flex-col items-center p-3 sm:p-4 rounded-lg bg-house-${house.key}/10 border border-house-${house.key}/20`}
                  >
                    {/* House logo */}
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-dark-800 mb-2 sm:mb-3 border border-white/10">
                      <img
                        src={house.logo}
                        alt={house.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* House name and total points */}
                    <div className={`text-xs sm:text-sm text-house-${house.key} mb-1`}>
                      {house.name}
                    </div>
                    <div className={`text-xl sm:text-2xl font-bold text-house-${house.key}`}>
                      {total.points[house.key] || 0}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
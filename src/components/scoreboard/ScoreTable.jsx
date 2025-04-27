import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaMinus, FaArrowUp, FaArrowDown, FaChevronRight } from "react-icons/fa"

export default function ScoreTable({ scores, houses, housesFilter }) {
  const tableRef = useRef(null)
  const isInView = useInView(tableRef, { once: false, amount: 0.2 })
  
  // Filter scores and houses
  const eventScores = scores.filter(s => s.type !== "total")
  const filteredHouses = housesFilter
    .map(key => houses.find(h => h.key === key))
    .filter(Boolean)
  
  // Animation variants
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  }
  
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [.43, .13, .23, .96]
      }
    }
  }
  
  // Helper function for point trend icon
  const getPointTrendIcon = points => {
    if (points == null) return <FaMinus className="text-gray-500" />
    if (points < 0) return <FaArrowDown className="text-rose-500" />
    if (points > 0) return <FaArrowUp className="text-green-500" />
    return <FaMinus className="text-gray-500" />
  }

  // Mobile Card View
  const MobileScoreView = () => (
    <div className="sm:hidden space-y-4">
      {/* Mobile Event Cards */}
      {eventScores.map((event, i) => (
        <motion.div
          key={event.id || i}
          variants={rowVariants}
          className={`glass-card overflow-hidden ${
            event.type === "adjustment" ? "border-l-4 border-brand-500" : ""
          }`}
        >
          {/* Event Header */}
          <div className="px-4 py-3 border-b border-white/10 bg-dark-800/30">
            <div className="font-medium text-white">
              {event.eventName}
            </div>
            <div className="flex justify-between items-center mt-1">
              <div className="text-xs text-gray-400 font-mono">
                {event.date}
              </div>
              <div className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-dark-800/50 text-gray-300 border border-white/10">
                {event.type === "adjustment" ? "Adjustment" : "Competition"}
              </div>
            </div>
          </div>
          
          {/* House Points */}
          <div className="divide-y divide-white/5">
            {filteredHouses.map(house => (
              <div key={house.key} className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-dark-800 flex-shrink-0 border border-white/10 mr-2">
                    <img
                      src={house.logo}
                      alt={house.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className={`text-sm font-medium text-house-${house.key}`}>
                    {house.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="mr-1.5">
                    {getPointTrendIcon(event.points[house.key])}
                  </span>
                  <span
                    className={`text-sm ${
                      event.points[house.key] > 0
                        ? `text-house-${house.key}`
                        : event.points[house.key] < 0
                          ? 'text-rose-400'
                          : 'text-gray-300'
                    }`}
                  >
                    {event.points[house.key] == null
                      ? "-"
                      : event.points[house.key] > 0
                        ? `+${event.points[house.key]}`
                        : event.points[house.key]
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
      
      {/* Mobile Total Card */}
      {scores.filter(x => x.type === "total").map((total, i) => (
        <motion.div
          key={`total-${i}`}
          variants={rowVariants}
          className="glass-card overflow-hidden border-2 border-brand-900/30"
        >
          <div className="px-4 py-3 bg-gradient-to-r from-brand-900/30 to-dark-800/80 border-b border-white/10">
            <div className="text-lg font-bold text-white">
              {total.eventName}
            </div>
            <div className="text-xs text-gray-400 font-mono">
              Current Standings
            </div>
          </div>
          
          <div className="p-4 grid grid-cols-2 gap-3">
            {filteredHouses.map(house => (
              <div
                key={house.key}
                className={`flex items-center justify-between p-2.5 rounded-lg bg-house-${house.key}/10 border border-house-${house.key}/20`}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-dark-800 flex-shrink-0 border border-white/10 mr-2">
                    <img
                      src={house.logo}
                      alt={house.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className={`text-xs font-medium text-house-${house.key}`}>
                    {house.name}
                  </span>
                </div>
                <div className={`text-lg font-bold text-house-${house.key}`}>
                  {total.points[house.key] || 0}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.div
      ref={tableRef}
      variants={tableVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
    >
      {/* Mobile Card View */}
      <MobileScoreView />
      
      {/* Desktop Table View */}
      <div className="hidden sm:block">
        <div className="glass-card overflow-hidden border border-brand-900/30">
          <div className="w-full overflow-x-auto scrollbar-thin">
            <table className="min-w-full divide-y divide-white/10 table-fixed md:table-auto">
              {/* Table Header */}
              <thead>
                <motion.tr variants={rowVariants} className="bg-dark-800/70">
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  {filteredHouses.map(house => (
                    <th
                      key={house.key}
                      className={`px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium uppercase tracking-wider text-house-${house.key}`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full overflow-hidden bg-dark-800 flex-shrink-0 border border-white/10">
                          <img
                            src={house.logo}
                            alt={house.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="truncate">{house.name}</span>
                      </div>
                    </th>
                  ))}
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                </motion.tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-white/5">
                {/* Event Rows */}
                {eventScores.map((event, i) => (
                  <motion.tr
                    key={event.id || i}
                    variants={rowVariants}
                    className={`${
                      event.type === "adjustment"
                        ? "bg-dark-900/80"
                        : "hover:bg-dark-800/30"
                    } transition-colors duration-200`}
                  >
                    {/* Event Name */}
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {event.eventName}
                      </div>
                      {event.type === "adjustment" && (
                        <div className="text-xs text-brand-400">
                          Point Adjustment
                        </div>
                      )}
                    </td>
                    
                    {/* Event Date */}
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400 font-mono">
                        {event.date}
                      </div>
                    </td>
                    
                    {/* House Points */}
                    {filteredHouses.map(house => (
                      <td key={house.key} className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="mr-2">
                            {getPointTrendIcon(event.points[house.key])}
                          </span>
                          <span
                            className={`text-sm ${
                              event.points[house.key] > 0
                                ? `text-house-${house.key}`
                                : event.points[house.key] < 0
                                  ? 'text-rose-400'
                                  : 'text-gray-300'
                            }`}
                          >
                            {event.points[house.key] == null
                              ? "-"
                              : event.points[house.key] > 0
                                ? `+${event.points[house.key]}`
                                : event.points[house.key]
                            }
                          </span>
                        </div>
                      </td>
                    ))}
                    
                    {/* Event Type */}
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-dark-800/50 text-gray-300 border border-white/10">
                        {event.type === "adjustment" ? "Adjustment" : "Competition"}
                      </div>
                    </td>
                  </motion.tr>
                ))}
                
                {/* Total Row */}
                {scores.filter(x => x.type === "total").map((total, i) => (
                  <motion.tr
                    key={`total-${i}`}
                    variants={rowVariants}
                    className="bg-gradient-to-r from-brand-900/30 to-dark-800/80 border-t-2 border-white/10 font-bold"
                  >
                    {/* Total Label */}
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-lg font-bold text-white">
                        {total.eventName}
                      </div>
                    </td>
                    
                    {/* Current */}
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400 font-mono">
                        Current
                      </div>
                    </td>
                    
                    {/* House Total Points */}
                    {filteredHouses.map(house => (
                      <td key={house.key} className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className={`text-lg font-bold text-house-${house.key}`}>
                          {total.points[house.key] || 0}
                        </div>
                      </td>
                    ))}
                    
                    {/* Final Total */}
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-brand-900/30 text-brand-300 border border-brand-800/30">
                        Final Total
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
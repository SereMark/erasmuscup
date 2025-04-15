import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaMinus, FaArrowUp, FaArrowDown } from "react-icons/fa"

export default function ScoreTable({ scores, houses, housesFilter }) {
  const tableRef = useRef(null)
  const isInView = useInView(tableRef, { once: false, amount: 0.2 })
  const eventScores = scores.filter(s => s.type !== "total")
  const filteredHouses = housesFilter
    .map(key => houses.find(h => h.key === key))
    .filter(Boolean)
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
  const getPointTrendIcon = points => {
    if (points == null) return <FaMinus className="text-gray-500" />
    if (points < 0) return <FaArrowDown className="text-rose-500" />
    if (points > 0) return <FaArrowUp className="text-green-500" />
    return <FaMinus className="text-gray-500" />
  }

  return (
    <motion.div
      ref={tableRef}
      variants={tableVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="glass-card overflow-hidden border border-brand-900/30">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <motion.tr variants={rowVariants} className="bg-dark-800/70">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Event</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                {filteredHouses.map(house => (
                  <th
                    key={house.key}
                    className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-house-${house.key}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full overflow-hidden bg-dark-800 flex-shrink-0 border border-white/10">
                        <img
                          src={house.logo}
                          alt={house.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{house.name}</span>
                    </div>
                  </th>
                ))}
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
              </motion.tr>
            </thead>
            <tbody className="divide-y divide-white/5">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{event.eventName}</div>
                    {event.type === "adjustment" && (
                      <div className="text-xs text-brand-400">Point Adjustment</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400 font-mono">{event.date}</div>
                  </td>
                  {filteredHouses.map(house => (
                    <td key={house.key} className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="mr-2">{getPointTrendIcon(event.points[house.key])}</span>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-dark-800/50 text-gray-300 border border-white/10">
                      {event.type === "adjustment" ? "Adjustment" : "Competition"}
                    </div>
                  </td>
                </motion.tr>
              ))}
              {scores.filter(x => x.type === "total").map((total, i) => (
                <motion.tr
                  key={`total-${i}`}
                  variants={rowVariants}
                  className="bg-gradient-to-r from-brand-900/30 to-dark-800/80 border-t-2 border-white/10 font-bold"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-white">{total.eventName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400 font-mono">Current</div>
                  </td>
                  {filteredHouses.map(house => (
                    <td key={house.key} className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-lg font-bold text-house-${house.key}`}>
                        {total.points[house.key] || 0}
                      </div>
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap">
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
    </motion.div>
  )
}
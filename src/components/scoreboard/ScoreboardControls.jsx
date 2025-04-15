import React from "react"
import { motion } from "framer-motion"
import { FaTable, FaThLarge, FaChartBar, FaFilter, FaTimesCircle } from "react-icons/fa"

export default function ScoreboardControls({
  config,
  currentView,
  setCurrentView,
  housesFilter,
  setHousesFilter,
  houses
}) {
  const viewIcons = {
    table: <FaTable />,
    cards: <FaThLarge />,
    stats: <FaChartBar />
  }
  const controlsVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [.22, 1, .36, 1], staggerChildren: 0.1, when: "beforeChildren" }
    }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }
  const toggleHouseFilter = key => {
    if (housesFilter.includes(key)) {
      if (housesFilter.length === 1) {
        setHousesFilter(houses.map(h => h.key))
      } else {
        setHousesFilter(housesFilter.filter(x => x !== key))
      }
    } else {
      setHousesFilter([...housesFilter, key])
    }
  }
  const resetFilters = () => {
    setHousesFilter(houses.map(h => h.key))
  }

  return (
    <motion.div
      variants={controlsVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-6"
    >
      <div className="glass-card p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-6 border border-brand-900/30">
        <motion.div
          variants={itemVariants}
          className="flex bg-dark-800/50 backdrop-blur-sm rounded-full p-1 border border-white/5 overflow-x-auto no-scrollbar"
        >
          {config.viewOptions.map(view => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                currentView === view
                  ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="mr-2">{viewIcons[view]}</span>
              <span className="hidden sm:inline capitalize">{view} View</span>
            </button>
          ))}
        </motion.div>
        <motion.div variants={itemVariants} className="w-full sm:w-auto">
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="flex items-center text-gray-400 text-sm">
              <FaFilter className="mr-1.5" /> Filter Houses:
            </div>
            {housesFilter.length < houses.length && (
              <button
                onClick={resetFilters}
                className="text-xs text-brand-400 hover:text-brand-300 flex items-center"
              >
                <FaTimesCircle className="mr-1" />Reset
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            {houses.map(house => (
              <motion.button
                key={house.key}
                onClick={() => toggleHouseFilter(house.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  housesFilter.includes(house.key)
                    ? `bg-house-${house.key} text-white shadow-sm`
                    : "bg-dark-800/50 text-gray-400 hover:text-white border border-white/5"
                }`}
              >
                <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={house.logo}
                    alt={house.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>{house.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
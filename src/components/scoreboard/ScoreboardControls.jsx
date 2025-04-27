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
  // View type icons
  const viewIcons = {
    table: <FaTable />,
    cards: <FaThLarge />,
    stats: <FaChartBar />
  }
  
  // Animation variants
  const controlsVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [.22, 1, .36, 1], 
        staggerChildren: 0.1, 
        when: "beforeChildren" 
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.3 } 
    }
  }
  
  // Toggle a house in the filter
  const toggleHouseFilter = key => {
    if (housesFilter.includes(key)) {
      // Don't allow removing the last house
      if (housesFilter.length === 1) {
        setHousesFilter(houses.map(h => h.key))
      } else {
        setHousesFilter(housesFilter.filter(x => x !== key))
      }
    } else {
      setHousesFilter([...housesFilter, key])
    }
  }
  
  // Reset filters to show all houses
  const resetFilters = () => {
    setHousesFilter(houses.map(h => h.key))
  }

  return (
    <motion.div
      variants={controlsVariants}
      initial="hidden"
      animate="visible"
      className="container px-4 sm:px-6 lg:px-8 py-4 sm:py-6 mx-auto"
    >
      <div className="glass-card p-4 sm:p-6 flex flex-col gap-5">
        {/* View type selector */}
        <motion.div variants={itemVariants}>
          <div className="text-sm text-gray-400 mb-2 px-1 flex items-center">
            <span className="mr-2">View Mode:</span>
          </div>
          <div className="w-full bg-dark-800/50 backdrop-blur-sm rounded-full p-1 border border-white/5 overflow-x-auto no-scrollbar">
            <div className="flex w-full min-w-fit">
              {config.viewOptions.map(view => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`flex items-center justify-center px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex-1 min-w-fit ${
                    currentView === view
                      ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="mr-1.5 sm:mr-2">{viewIcons[view]}</span>
                  <span className="capitalize whitespace-nowrap">{view}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* House filter */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="flex items-center text-gray-400 text-sm">
              <FaFilter className="mr-1.5" /> Filter Houses:
            </div>
            
            {/* Only show reset button when filters are active */}
            {housesFilter.length < houses.length && (
              <button
                onClick={resetFilters}
                className="text-xs text-brand-400 hover:text-brand-300 flex items-center"
              >
                <FaTimesCircle className="mr-1" />Reset
              </button>
            )}
          </div>
          
          {/* House filter buttons */}
          <div className="flex flex-wrap gap-2">
            {houses.map(house => (
              <motion.button
                key={house.key}
                onClick={() => toggleHouseFilter(house.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex-grow-0 ${
                  housesFilter.includes(house.key)
                    ? `bg-house-${house.key} text-white shadow-sm`
                    : "bg-dark-800/50 text-gray-400 hover:text-white border border-white/5"
                }`}
              >
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full overflow-hidden flex-shrink-0">
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
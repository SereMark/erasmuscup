import React, { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Area, AreaChart
} from "recharts"
import { FaArrowUp, FaArrowDown, FaMinus, FaChevronDown, FaChevronUp } from "react-icons/fa"

export default function StatsView({ scores, houses, housesFilter }) {
  const statsRef = useRef(null)
  const isInView = useInView(statsRef, { once: false, amount: 0.1 })
  
  // State for collapsible sections on mobile
  const [expandedSection, setExpandedSection] = useState("progression")
  
  // Filter houses based on selected filters
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
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [.43, .13, .23, .96]
      }
    }
  }
  
  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }
  
  // Prepare chart data
  // Line chart - cumulative score progression
  const lineChartData = (() => {
    const eventScores = scores.filter(s => s.type !== "total")
    const runningTotals = {}
    filteredHouses.forEach(h => (runningTotals[h.key] = 0))
    
    return eventScores.map(event => {
      const dataPoint = { name: event.eventName }
      filteredHouses.forEach(house => {
        const p = event.points[house.key]
        if (p != null) runningTotals[house.key] += p
        dataPoint[house.key] = runningTotals[house.key]
      })
      return dataPoint
    })
  })()
  
  // Bar chart - event performance breakdown
  const barChartData = (() => {
    const regularEvents = scores.filter(x => !x.type)
    return regularEvents.map(event => {
      const dataPoint = { name: event.eventName }
      filteredHouses.forEach(house => {
        dataPoint[house.key] = event.points[house.key] || 0
      })
      return dataPoint
    })
  })()
  
  // Pie chart - points distribution
  const pieChartData = (() => {
    const totalScore = scores.find(x => x.type === "total")
    if (!totalScore) return []
    
    return filteredHouses.map(h => ({
      name: h.name,
      value: totalScore.points[h.key] || 0,
      key: h.key
    }))
  })()
  
  // Top events by points
  const topEventsData = (() => {
    const regularEvents = scores.filter(x => !x.type)
    return regularEvents
      .map(event => {
        const totalPoints = Object.values(event.points).reduce((sum, p) => sum + (p || 0), 0)
        return { 
          name: event.eventName, 
          totalPoints, 
          date: event.date 
        }
      })
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 5)
  })()
  
  // Event type breakdown
  const eventBreakdown = (() => {
    const regularEvents = scores.filter(x => !x.type).length
    const adjustmentEvents = scores.filter(x => x.type === "adjustment").length
    
    return [
      { name: "Competitions", value: regularEvents },
      { name: "Adjustments", value: adjustmentEvents }
    ]
  })()
  
  // House event rankings
  const eventRankings = (() => {
    const regularEvents = scores.filter(x => !x.type)
    const rankings = {}
    
    regularEvents.forEach(event => {
      const sorted = [...filteredHouses].sort((a, b) => (event.points[b.key] || 0) - (event.points[a.key] || 0))
      if (sorted.length > 0) {
        const winner = sorted[0]
        const winnerPoints = event.points[winner.key] || 0
        
        if (winnerPoints > 0) {
          if (!rankings[winner.key]) rankings[winner.key] = { wins: 0, eventNames: [] }
          rankings[winner.key].wins += 1
          rankings[winner.key].eventNames.push(event.eventName)
        }
      }
    })
    
    return rankings
  })()
  
  // Calculate house performance trends
  const houseTrends = (() => {
    const eventScores = scores.filter(s => s.type !== "total" && !s.type)
    const trends = {}
    
    filteredHouses.forEach(h => {
      const housePoints = eventScores.map(e => e.points[h.key] || 0)
      
      if (housePoints.length < 2) {
        trends[h.key] = { direction: "neutral", percentage: "0", lastPointsChange: 0 }
        return
      }
      
      const lastPoints = housePoints[housePoints.length - 1]
      const beforeLastPoints = housePoints[housePoints.length - 2]
      let percentageChange = 0
      
      if (beforeLastPoints !== 0) {
        percentageChange = ((lastPoints - beforeLastPoints) / Math.abs(beforeLastPoints)) * 100
      } else if (lastPoints > 0) {
        percentageChange = 100
      }
      
      let direction = "neutral"
      if (percentageChange > 0) direction = "up"
      else if (percentageChange < 0) direction = "down"
      
      trends[h.key] = {
        direction,
        percentage: Math.abs(percentageChange).toFixed(0),
        lastPointsChange: lastPoints - beforeLastPoints
      }
    })
    
    return trends
  })()
  
  // House colors for charts
  const houseColors = {
    theHoo: "rgb(var(--color-house-theHoo))",
    brewCrew: "rgb(var(--color-house-brewCrew))",
    redStorm: "rgb(var(--color-house-redStorm))",
    deepJungle: "rgb(var(--color-house-deepJungle))"
  }
  
  // Helper function for trend icons
  const getTrendIcon = direction => {
    if (direction === "up") return <FaArrowUp className="text-green-500" />
    if (direction === "down") return <FaArrowDown className="text-rose-500" />
    return <FaMinus className="text-gray-500" />
  }
  
  // Chart theme for consistent styling
  const chartTheme = {
    backgroundColor: "rgba(15,23,42,0.9)",
    gridStroke: "rgba(255,255,255,0.1)",
    axisStroke: "rgba(255,255,255,0.2)",
    axisTickColor: "rgba(255,255,255,0.7)",
    tooltipBackgroundColor: "rgba(15,23,42,0.9)",
    tooltipBorderColor: "rgba(255,255,255,0.1)"
  }
  
  // Collapsible section component
  const CollapsibleSection = ({ id, title, children }) => {
    const isExpanded = expandedSection === id
    
    return (
      <motion.div
        variants={itemVariants}
        className="glass-card p-4 sm:p-6 border border-brand-900/30 mb-6 overflow-hidden"
      >
        {/* Mobile header with toggle */}
        <div 
          className="flex justify-between items-center cursor-pointer md:cursor-default"
          onClick={() => toggleSection(id)}
        >
          <h3 className="text-lg sm:text-xl font-bold text-white">
            {title}
          </h3>
          <button className="md:hidden text-gray-400 p-1.5">
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
        
        {/* Content - always visible on desktop, toggleable on mobile */}
        <div className={`mt-4 transition-all duration-300 ${!isExpanded ? 'max-h-0 overflow-hidden md:max-h-none md:overflow-visible' : 'max-h-[2000px]'}`}>
          {children}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={statsRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-10"
    >
      {/* Cumulative Score Progression Chart */}
      <CollapsibleSection id="progression" title="Cumulative Score Progression">
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineChartData} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
              <defs>
                {filteredHouses.map((house, index) => (
                  <linearGradient
                    key={`area-gradient-${house.key}`}
                    id={`area-gradient-${house.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={houseColors[house.key]} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={houseColors[house.key]} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridStroke} />
              <XAxis
                dataKey="name"
                stroke={chartTheme.axisStroke}
                tick={{ fill: chartTheme.axisTickColor, fontSize: 10 }}
                axisLine={{ stroke: chartTheme.axisStroke }}
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
              />
              <YAxis
                stroke={chartTheme.axisStroke}
                tick={{ fill: chartTheme.axisTickColor }}
                axisLine={{ stroke: chartTheme.axisStroke }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartTheme.tooltipBackgroundColor,
                  borderColor: chartTheme.tooltipBorderColor,
                  borderRadius: "0.5rem",
                  color: "white",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
              />
              <Legend />
              {filteredHouses.map((house) => (
                <Area
                  key={house.key}
                  type="monotone"
                  dataKey={house.key}
                  name={house.name}
                  stroke={houseColors[house.key]}
                  fillOpacity={1}
                  fill={`url(#area-gradient-${house.key})`}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CollapsibleSection>
      
      {/* Event Performance Breakdown Chart */}
      <CollapsibleSection id="breakdown" title="Event Performance Breakdown">
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridStroke} />
              <XAxis
                dataKey="name"
                stroke={chartTheme.axisStroke}
                tick={{ fill: chartTheme.axisTickColor, fontSize: 9 }}
                axisLine={{ stroke: chartTheme.axisStroke }}
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
              />
              <YAxis
                stroke={chartTheme.axisStroke}
                tick={{ fill: chartTheme.axisTickColor }}
                axisLine={{ stroke: chartTheme.axisStroke }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartTheme.tooltipBackgroundColor,
                  borderColor: chartTheme.tooltipBorderColor,
                  borderRadius: "0.5rem",
                  color: "white",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
              />
              <Legend />
              {filteredHouses.map(house => (
                <Bar
                  key={house.key}
                  dataKey={house.key}
                  name={house.name}
                  fill={houseColors[house.key]}
                  opacity={0.8}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CollapsibleSection>
      
      {/* Two-column charts - Single column on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Points Distribution Pie Chart */}
        <CollapsibleSection id="distribution" title="Points Distribution">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={{ stroke: "rgba(255,255,255,0.3)" }}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`pie-cell-${index}`}
                      fill={houseColors[entry.key] || "#cccccc"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} points`, name]}
                  contentStyle={{
                    backgroundColor: chartTheme.tooltipBackgroundColor,
                    borderColor: chartTheme.tooltipBorderColor,
                    borderRadius: "0.5rem",
                    color: "white",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CollapsibleSection>
        
        {/* Top Events Chart */}
        <CollapsibleSection id="topEvents" title="Top Events by Points">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={topEventsData}
                margin={{ top: 5, right: 20, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridStroke} />
                <XAxis
                  type="number"
                  stroke={chartTheme.axisStroke}
                  tick={{ fill: chartTheme.axisTickColor }}
                  axisLine={{ stroke: chartTheme.axisStroke }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke={chartTheme.axisStroke}
                  tick={{ fill: chartTheme.axisTickColor, fontSize: 10 }}
                  width={60}
                  axisLine={{ stroke: chartTheme.axisStroke }}
                />
                <Tooltip
                  formatter={value => [`${value} points`, "Total Points"]}
                  labelFormatter={label => `Event: ${label}`}
                  contentStyle={{
                    backgroundColor: chartTheme.tooltipBackgroundColor,
                    borderColor: chartTheme.tooltipBorderColor,
                    borderRadius: "0.5rem",
                    color: "white",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  }}
                />
                <Bar
                  dataKey="totalPoints"
                  name="Total Points"
                  fill="url(#topEventsGradient)"
                  radius={[0, 4, 4, 0]}
                />
                <defs>
                  <linearGradient id="topEventsGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CollapsibleSection>
      </div>
      
      {/* House Performance Trends */}
      <CollapsibleSection id="trends" title="House Performance Trends">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredHouses.map(house => {
            const trend = houseTrends[house.key]
            const wins = eventRankings[house.key]?.wins || 0
            const bestEvents = eventRankings[house.key]?.eventNames || []
            
            return (
              <div
                key={house.key}
                className={`flex flex-col p-4 sm:p-5 rounded-lg bg-house-${house.key}/5 border border-house-${house.key}/20`}
              >
                {/* House header */}
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-dark-800 flex-shrink-0 border border-white/10">
                    <img
                      src={house.logo}
                      alt={house.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <div className={`text-house-${house.key} font-medium text-base sm:text-lg`}>
                      {house.name}
                    </div>
                    <div className="flex items-center text-xs sm:text-sm bg-dark-900/50 px-2 py-1 rounded-full mt-1">
                      <span className="mr-1.5">{getTrendIcon(trend.direction)}</span>
                      <span
                        className={`${
                          trend.direction === "up"
                            ? "text-green-400"
                            : trend.direction === "down"
                              ? "text-rose-400"
                              : "text-gray-400"
                        }`}
                      >
                        {trend.direction === "up" && "+"}
                        {trend.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* House stats */}
                <div className="mt-2 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Events Won:</span>
                    <span className="text-white">{wins} event{wins !== 1 ? 's' : ''}</span>
                  </div>
                  {bestEvents.length > 0 && (
                    <div className="flex justify-between items-start">
                      <span className="text-gray-400">Best At:</span>
                      <span className="text-white text-right">
                        {bestEvents.slice(0, 2).join(', ')}
                        {bestEvents.length > 2 && '...'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CollapsibleSection>
      
      {/* House Details */}
      <CollapsibleSection id="details" title="House Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredHouses.map(house => {
            // Find best event for this house
            const regularEvents = scores.filter(s => !s.type)
            let bestEvent = { name: "None", points: 0 }
            regularEvents.forEach(event => {
              const points = event.points[house.key] || 0
              if (points > bestEvent.points) {
                bestEvent = { name: event.eventName, points }
              }
            })
            
            // Calculate totals
            const totalScore = scores.find(s => s.type === "total")
            const totalPoints = totalScore ? totalScore.points[house.key] || 0 : 0
            const adjustments = scores.filter(s => s.type === "adjustment")
            const adjustmentTotal = adjustments.reduce((a, adj) => a + (adj.points[house.key] || 0), 0)
            
            return (
              <div
                key={house.key}
                className="flex flex-col h-full glass-card p-4 sm:p-6 bg-dark-900/50 border border-white/5 rounded-xl"
              >
                {/* House header */}
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-dark-800 flex-shrink-0 border border-white/10 mr-3">
                    <img
                      src={house.logo}
                      alt={house.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className={`text-lg sm:text-xl font-bold text-house-${house.key}`}>
                      {house.name}
                    </h4>
                    <div className="text-xs sm:text-sm text-gray-400">
                      {house.animal}
                    </div>
                  </div>
                </div>
                
                {/* House motto */}
                <div className="text-xs sm:text-sm italic text-gray-300 mb-3 sm:mb-4 border-l-2 border-white/10 pl-3">
                  "{house.motto}"
                </div>
                
                {/* House stats */}
                <div className="space-y-2 mt-auto pt-3 sm:pt-4 border-t border-white/10">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-400">Best Event:</span>
                    <span className="text-white font-medium">
                      {bestEvent.name} ({bestEvent.points} pts)
                    </span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-400">Adjustments:</span>
                    <span className={`font-medium ${
                      adjustmentTotal > 0
                        ? "text-green-400"
                        : adjustmentTotal < 0
                          ? "text-rose-400"
                          : "text-gray-300"
                    }`}>
                      {adjustmentTotal > 0 ? "+" : ""}{adjustmentTotal}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/5 text-sm sm:text-base">
                    <span className="text-gray-300 font-medium">Total Points:</span>
                    <span className={`text-base sm:text-lg font-bold text-house-${house.key}`}>
                      {totalPoints}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CollapsibleSection>
    </motion.div>
  )
}
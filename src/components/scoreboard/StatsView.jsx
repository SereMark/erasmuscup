import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Area, AreaChart
} from "recharts"
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa"

export default function StatsView({ scores, houses, housesFilter }) {
  const statsRef = useRef(null)
  const isInView = useInView(statsRef, { once: false, amount: 0.1 })
  const filteredHouses = housesFilter
    .map(key => houses.find(h => h.key === key))
    .filter(Boolean)
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
  const pieChartData = (() => {
    const totalScore = scores.find(x => x.type === "total")
    if (!totalScore) return []
    return filteredHouses.map(h => ({
      name: h.name,
      value: totalScore.points[h.key] || 0,
      key: h.key
    }))
  })()
  const eventBreakdown = (() => {
    const regularEvents = scores.filter(x => !x.type).length
    const adjustmentEvents = scores.filter(x => x.type === "adjustment").length
    return [
      { name: "Competitions", value: regularEvents },
      { name: "Adjustments", value: adjustmentEvents }
    ]
  })()
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
  const calculateHouseTrends = () => {
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
  }
  const houseTrends = calculateHouseTrends()
  const houseColors = {
    theHoo: "rgb(var(--color-house-theHoo))",
    brewCrew: "rgb(var(--color-house-brewCrew))",
    redStorm: "rgb(var(--color-house-redStorm))",
    deepJungle: "rgb(var(--color-house-deepJungle))"
  }
  const eventTypeColors = ["#3b82f6", "#8b5cf6"]
  const getTrendIcon = direction => {
    if (direction === "up") return <FaArrowUp className="text-green-500" />
    if (direction === "down") return <FaArrowDown className="text-rose-500" />
    return <FaMinus className="text-gray-500" />
  }
  const chartTheme = {
    backgroundColor: "rgba(15,23,42,0.9)",
    gridStroke: "rgba(255,255,255,0.1)",
    axisStroke: "rgba(255,255,255,0.2)",
    axisTickColor: "rgba(255,255,255,0.7)",
    tooltipBackgroundColor: "rgba(15,23,42,0.9)",
    tooltipBorderColor: "rgba(255,255,255,0.1)"
  }

  return (
    <motion.div
      ref={statsRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10"
    >
      <motion.div
        variants={itemVariants}
        className="glass-card p-6 border border-brand-900/30"
      >
        <h3 className="text-xl font-bold text-white mb-6">Cumulative Score Progression</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                {filteredHouses.map((house, index) => (
                  <linearGradient
                    key={`scoreboard-area-gradient-${house.key}-${index}`}
                    id={`scoreboard-area-gradient-${house.key}-${index}`}
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
                tick={{ fill: chartTheme.axisTickColor }}
                axisLine={{ stroke: chartTheme.axisStroke }}
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
              {filteredHouses.map((house, index) => (
                <Area
                  key={house.key}
                  type="monotone"
                  dataKey={house.key}
                  name={house.name}
                  stroke={houseColors[house.key]}
                  fillOpacity={1}
                  fill={`url(#scoreboard-area-gradient-${house.key}-${index})`}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="glass-card p-6 border border-brand-900/30"
      >
        <h3 className="text-xl font-bold text-white mb-6">Event Performance Breakdown</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.gridStroke} />
              <XAxis
                dataKey="name"
                stroke={chartTheme.axisStroke}
                tick={{ fill: chartTheme.axisTickColor }}
                axisLine={{ stroke: chartTheme.axisStroke }}
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
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div
          variants={itemVariants}
          className="glass-card p-6 lg:col-span-2 border border-brand-900/30"
        >
          <h3 className="text-xl font-bold text-white mb-6">Points Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={{ stroke: "rgba(255,255,255,0.3)" }}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`scoreboard-pie-cell-${index}`}
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
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="glass-card p-6 lg:col-span-2 border border-brand-900/30"
        >
          <h3 className="text-xl font-bold text-white mb-6">Top Events by Points</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={(() => {
                  const regularEvents = scores.filter(x => !x.type)
                  return regularEvents
                    .map(event => {
                      const totalPoints = Object.values(event.points).reduce((sum, p) => sum + (p || 0), 0)
                      return { name: event.eventName, totalPoints, date: event.date }
                    })
                    .sort((a, b) => b.totalPoints - a.totalPoints)
                    .slice(0, 5)
                })()}
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
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
                  tick={{ fill: chartTheme.axisTickColor }}
                  width={80}
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
        </motion.div>
      </div>
      <motion.div
        variants={itemVariants}
        className="glass-card p-6 border border-brand-900/30"
      >
        <h3 className="text-xl font-bold text-white mb-6">House Performance Trends</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredHouses.map(house => {
            const trend = houseTrends[house.key]
            const wins = eventRankings[house.key]?.wins || 0
            const bestEvents = eventRankings[house.key]?.eventNames || []
            return (
              <div
                key={house.key}
                className={`flex flex-col p-5 rounded-lg bg-house-${house.key}/5 border border-house-${house.key}/20`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-dark-800 flex-shrink-0 border border-white/10">
                    <img
                      src={house.logo}
                      alt={house.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className={`text-house-${house.key} font-medium text-lg`}>{house.name}</div>
                    <div className="flex items-center text-sm bg-dark-900/50 px-2 py-1 rounded-full mt-1">
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
                <div className="mt-2 space-y-2 text-sm">
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
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="glass-card p-6 border border-brand-900/30"
      >
        <h3 className="text-xl font-bold text-white mb-6">House Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredHouses.map(house => {
            const regularEvents = scores.filter(s => !s.type)
            let bestEvent = { name: "None", points: 0 }
            regularEvents.forEach(event => {
              const points = event.points[house.key] || 0
              if (points > bestEvent.points) {
                bestEvent = { name: event.eventName, points }
              }
            })
            const totalScore = scores.find(s => s.type === "total")
            const totalPoints = totalScore ? totalScore.points[house.key] || 0 : 0
            const adjustments = scores.filter(s => s.type === "adjustment")
            const adjustmentTotal = adjustments.reduce((a, adj) => a + (adj.points[house.key] || 0), 0)
            return (
              <div
                key={house.key}
                className="flex flex-col h-full glass-card-inner p-6 bg-dark-900/50 border border-white/5 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-dark-800 flex-shrink-0 border border-white/10 mr-3">
                    <img
                      src={house.logo}
                      alt={house.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold text-house-${house.key}`}>{house.name}</h4>
                    <div className="text-sm text-gray-400">{house.animal}</div>
                  </div>
                </div>
                <div className="text-sm italic text-gray-300 mb-4 border-l-2 border-white/10 pl-3">
                  "{house.motto}"
                </div>
                <div className="space-y-2 mt-auto pt-4 border-t border-white/10">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Best Event:</span>
                    <span className="text-white font-medium">{bestEvent.name} ({bestEvent.points} pts)</span>
                  </div>
                  <div className="flex justify-between">
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
                  <div className="flex justify-between pt-2 border-t border-white/5">
                    <span className="text-gray-300 font-medium">Total Points:</span>
                    <span className={`text-lg font-bold text-house-${house.key}`}>{totalPoints}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
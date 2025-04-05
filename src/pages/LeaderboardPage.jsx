import React from "react"
import { motion } from "framer-motion"

export default function LeaderboardPage() {
  const houses = [
    { key: "theHoo", label: "The Hoo" },
    { key: "brewCrew", label: "Brew Crew" },
    { key: "redStorm", label: "Red Storm" },
    { key: "deepJungle", label: "Deep Jungle" }
  ]

  const scoreboardData = [
    { id: 1, date: "21.03.2025", event: "Jackbox", theHoo: 50, brewCrew: 75, redStorm: 25, deepJungle: 100 },
    { id: 2, date: "28.03.2025", event: "Petanque", theHoo: 27, brewCrew: 76, redStorm: 55, deepJungle: 102 },
    { id: 3, adjustment: "Public Nudity", theHoo: 30, brewCrew: null, redStorm: 30, deepJungle: null },
    { id: 4, adjustment: "Buffaloes", theHoo: null, brewCrew: -10, redStorm: null, deepJungle: -20 },
    { id: 5, total: true, event: "Total", theHoo: 107, brewCrew: 141, redStorm: 110, deepJungle: 182 }
  ]

  const totalRow = scoreboardData.find(row => row.total)
  const houseTotals = houses.map(h => ({ ...h, points: totalRow[h.key] }))
  const sortedHouseTotals = [...houseTotals].sort((a, b) => b.points - a.points)
  const rankMapping = {}
  sortedHouseTotals.forEach((house, index) => {
    rankMapping[house.key] = index + 1
  })

  const getColumnStyle = (key) => {
    const rank = rankMapping[key]
    if (rank === 1) return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black"
    if (rank === 2) return "bg-gradient-to-r from-gray-400 to-gray-500 text-black"
    if (rank === 3) return "bg-gradient-to-r from-[#CD7F32] to-[#A97142] text-white"
    return "bg-gray-800 text-white"
  }

  return (
    <section className="pb-12">
      <div className="relative w-full h-[40vh] overflow-hidden rounded-xl shadow-xl mb-10 mx-auto max-w-5xl">
        <img
          src="/assets/logos/house-cup-cover.png"
          alt="Leaderboard background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-gradient-start to-brand-gradient-end opacity-90" />
        
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="px-4 max-w-3xl text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white drop-shadow-lg">
              Who Rules Them All?
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-light text-gray-200 leading-relaxed">
              The scoreboard refreshes live with every event, Buffalo call, and stealthy Nudity Challenge. 
              <br className="hidden sm:block" />
              Will your House reign supreme, or end up yard-chugging your way to freedom?
            </p>
          </motion.div>
        </div>
      </div>

      <div className="px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold mb-6 text-center tracking-tight text-gray-100"
        >
          Current Standings
        </motion.h2>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#2a2a2a]/90 backdrop-blur-md rounded-lg overflow-hidden shadow-lg text-gray-200"
        >
          <table className="min-w-full">
            <thead className="bg-[#3a3a3a]/90 text-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm sm:text-base">Date</th>
                <th className="px-4 py-3 text-left text-sm sm:text-base">Event / Adjustment</th>
                {sortedHouseTotals.map(house => (
                  <th
                    key={house.key}
                    className={`px-4 py-3 text-center text-sm sm:text-base ${getColumnStyle(house.key)}`}
                  >
                    {house.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {scoreboardData.map((row, index) => {
                const dateDisplay = row.date ? row.date : row.adjustment ? "Adjustment" : ""
                const eventDisplay = row.event || row.adjustment
                const rowClasses = row.total
                  ? "font-bold border-t-4 border-t-indigo-500"
                  : "hover:bg-[#3a3a3a]/50 transition-colors"
                return (
                  <motion.tr
                    key={row.id}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={rowClasses}
                  >
                    <td className="px-4 py-3 text-left text-sm sm:text-base">{dateDisplay}</td>
                    <td className="px-4 py-3 text-left text-sm sm:text-base">{eventDisplay}</td>
                    {sortedHouseTotals.map(house => (
                      <td
                        key={house.key}
                        className={`px-4 py-3 text-center text-sm sm:text-base ${getColumnStyle(house.key)}`}
                      >
                        {row[house.key] !== null && row[house.key] !== undefined
                          ? row[house.key]
                          : "-"}
                      </td>
                    ))}
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </motion.div>

        <p className="text-center text-gray-400 mt-4 text-xs sm:text-sm leading-relaxed">
          Think your House is unbeatable? Or too far behind to care?
          <br />
          Try a <em>Super Gambit</em> (sec. 12a) for that sweet multiplier, 
          or go for some <em>Public Nudity</em> (sec. 16) if your neighbors can handle it!
        </p>
      </div>
    </section>
  )
}
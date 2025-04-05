import React, { useState } from "react"
import { motion } from "framer-motion"

export default function LeaderboardPage() {
  const [scores] = useState([
    { house: "Brew Crew", points: 141 },
    { house: "Red Storm", points: 110 },
    { house: "The Hoo", points: 107 },
    { house: "Deep Jungle", points: 182 }
  ])

  const sortedScores = [...scores].sort((a, b) => b.points - a.points)

  const getRankStyles = (rank) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500 text-black"
    if (rank === 3) return "bg-gradient-to-r from-amber-700 to-amber-900 text-white"
    return "bg-[#3a3a3a]"
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
                <th className="px-4 py-3 font-semibold text-left text-sm sm:text-base w-16">
                  Rank
                </th>
                <th className="px-4 py-3 font-semibold text-left text-sm sm:text-base w-2/3">
                  House
                </th>
                <th className="px-4 py-3 font-semibold text-left text-sm sm:text-base w-1/3">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedScores.map((s, i) => {
                const rank = i + 1
                return (
                  <motion.tr
                    key={s.house}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="border-b border-gray-600 last:border-0 hover:bg-[#3a3a3a]/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`flex w-10 h-10 rounded-full items-center justify-center font-bold text-sm sm:text-base ${getRankStyles(rank)}`}
                      >
                        {rank}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-base flex items-center space-x-3">
                      <span>{s.house}</span>
                      {rank === 1 && <span className="text-brand-gradient-end">🏆</span>}
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-base">
                      {s.points}
                    </td>
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
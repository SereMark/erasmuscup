import React, { useState } from "react"
import { motion } from "framer-motion"

export default function LeaderboardPage() {
  const [scores] = useState([
    { house: "Brew Crew", points: 150 },
    { house: "House Tiger", points: 120 },
    { house: "House Hoo", points: 95 },
    { house: "Deep Jungle", points: 85 }
  ])

  return (
    <section className="p-6 max-w-5xl mx-auto">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-extrabold mb-6 text-center tracking-tight text-gray-100"
      >
        Leaderboard
      </motion.h1>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#2a2a2a]/90 backdrop-blur-md rounded-lg overflow-hidden shadow-lg text-gray-200"
      >
        <table className="min-w-full">
          <thead className="bg-[#3a3a3a]/90 text-gray-100">
            <tr>
              <th className="px-4 py-3 font-semibold text-left text-lg w-2/3">
                House
              </th>
              <th className="px-4 py-3 font-semibold text-left text-lg w-1/3">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, i) => {
              const isFirst = i === 0
              return (
                <tr
                  key={i}
                  className={
                    "border-b border-gray-600 last:border-0 hover:bg-[#3a3a3a]/70 transition-colors " +
                    (isFirst ? "bg-[#3a3a3a]/60" : "")
                  }
                >
                  <td className="px-4 py-3 text-base flex items-center space-x-3">
                    {isFirst && (
                      <span className="text-brand-gradient-end">🏆</span>
                    )}
                    <span>{s.house}</span>
                  </td>
                  <td className="px-4 py-3 text-base">
                    {s.points}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </motion.div>

      <p className="text-center text-gray-400 mt-4 text-sm">
        Don’t see your House on top? 
        Try a <em>Super Gambit</em> or snag some <em>Public Nudity</em> points. 
        The Strawberry Moon won’t wait!
      </p>
    </section>
  )
}
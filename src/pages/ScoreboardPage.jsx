import React, { useEffect, useState } from "react"
import scoreboardData from "../data/scoreboardData.json"
import { AnimatePresence } from "framer-motion"
import ScoreboardHero from "../components/scoreboard/ScoreboardHero"
import ScoreboardControls from "../components/scoreboard/ScoreboardControls"
import ScoreTable from "../components/scoreboard/ScoreTable"
import ScoreCards from "../components/scoreboard/ScoreCards"
import StatsView from "../components/scoreboard/StatsView"
import ScoreboardFooter from "../components/scoreboard/ScoreboardFooter"

export default function ScoreboardPage() {
  useEffect(() => {
    document.title = "House Cup 2025 | Scoreboard"
  }, [])
  const [currentView, setCurrentView] = useState(scoreboardData.config.defaultViewMode || "table")
  const [housesFilter, setHousesFilter] = useState(scoreboardData.houses.map(h => h.key))

  return (
    <div className="min-h-screen">
      <ScoreboardHero
        data={scoreboardData.heroSection}
        houses={scoreboardData.houses}
        scores={scoreboardData.scores}
      />
      <ScoreboardControls
        config={scoreboardData.config}
        currentView={currentView}
        setCurrentView={setCurrentView}
        housesFilter={housesFilter}
        setHousesFilter={setHousesFilter}
        houses={scoreboardData.houses}
      />
      <AnimatePresence mode="wait">
        {currentView === "table" && (
          <ScoreTable
            key="table"
            scores={scoreboardData.scores}
            houses={scoreboardData.houses}
            housesFilter={housesFilter}
          />
        )}
        {currentView === "cards" && (
          <ScoreCards
            key="cards"
            scores={scoreboardData.scores}
            houses={scoreboardData.houses}
            housesFilter={housesFilter}
          />
        )}
        {currentView === "stats" && (
          <StatsView
            key="stats"
            scores={scoreboardData.scores}
            houses={scoreboardData.houses}
            housesFilter={housesFilter}
          />
        )}
      </AnimatePresence>
      <ScoreboardFooter data={scoreboardData.footerNote} />
    </div>
  )
}
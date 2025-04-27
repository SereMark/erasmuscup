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
  // Set page title
  useEffect(() => {
    document.title = "House Cup 2025 | Scoreboard"
  }, [])
  
  // Initialize view state based on device size
  const [currentView, setCurrentView] = useState(() => {
    const isMobile = window.innerWidth < 768
    return isMobile ? "cards" : (scoreboardData.config.defaultViewMode || "table")
  })
  
  // Initialize with all houses visible
  const [housesFilter, setHousesFilter] = useState(scoreboardData.houses.map(h => h.key))

  // Switch to cards view on mobile devices
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      if (isMobile && currentView === "table") {
        setCurrentView("cards")
      }
    }
    
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentView])

  return (
    <main className="min-h-dynamic-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 overflow-hidden">
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
            key="table-view"
            scores={scoreboardData.scores}
            houses={scoreboardData.houses}
            housesFilter={housesFilter}
          />
        )}
        
        {currentView === "cards" && (
          <ScoreCards
            key="cards-view"
            scores={scoreboardData.scores}
            houses={scoreboardData.houses}
            housesFilter={housesFilter}
          />
        )}
        
        {currentView === "stats" && (
          <StatsView
            key="stats-view"
            scores={scoreboardData.scores}
            houses={scoreboardData.houses}
            housesFilter={housesFilter}
          />
        )}
      </AnimatePresence>
      
      <ScoreboardFooter data={scoreboardData.footerNote} />
    </main>
  )
}
import React from "react"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import LandingPage from "./pages/LandingPage"
import LeaderboardPage from "./pages/LeaderboardPage"
import HouseCupRulesPage from "./pages/HouseCupRulesPage"
import EventsPage from "./pages/EventsPage"

export default function App() {
  return (
    <div className="min-h-screen text-gray-100">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/housecup-rules" element={<HouseCupRulesPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Route>
      </Routes>
    </div>
  )
}
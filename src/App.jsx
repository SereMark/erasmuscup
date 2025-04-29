import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Import pages
import LandingPage from "./pages/LandingPage";
import ScoreboardPage from "./pages/ScoreboardPage";
import RulesPage from "./pages/RulesPage";

/**
 * Main application component
 * Defines the routes
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="scoreboard" element={<ScoreboardPage />} />
        <Route path="rules" element={<RulesPage />} />
      </Route>
    </Routes>
  );
}
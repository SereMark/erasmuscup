import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Import pages
import LandingPage from "./pages/LandingPage";
import ScoreboardPage from "./pages/ScoreboardPage";
import RulesPage from "./pages/RulesPage";

/**
 * Main application component
 * Defines routes using React Router v6
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/scoreboard" element={<ScoreboardPage />} />
        <Route path="/rules" element={<RulesPage />} />
      </Route>
    </Routes>
  );
}
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import ScoreboardPage from "./pages/ScoreboardPage";
import EventsPage from "./pages/EventsPage";
import RulesPage from "./pages/RulesPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/scoreboard" element={<ScoreboardPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/rules" element={<RulesPage />} />
      </Route>
    </Routes>
  );
}
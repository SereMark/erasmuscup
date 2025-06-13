import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import scoreboardData from "../data/scoreboardData.json";

export default function GoodbyePage() {
  const totals = scoreboardData.scores.find((s) => s.type === "total").points;
  const ranking = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const houseMeta = Object.fromEntries(scoreboardData.houses.map((h) => [h.key, h]));
  const [topKey, topPts] = ranking[0];
  const topHouse = houseMeta[topKey];

  return (
    <>
      <Helmet>
        <title>House Cup 2025 • Until Next Time</title>
      </Helmet>

      <main className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-dark-950 via-brand-900 to-dark-800 text-center overflow-hidden relative px-4 py-6 space-y-7">
        {/* soft glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[100vw] h-[100vw] rounded-full bg-brand-600 opacity-10 blur-3xl" />
        </div>

        {/* champion banner */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 space-y-2"
        >
          <h1 className="gradient-text text-4xl sm:text-5xl font-extrabold flex items-center justify-center gap-2">
            <span>🏆</span>
            <span>{topHouse.name}</span>
          </h1>
          <p className="text-dark-200 text-sm sm:text-base">{topPts} points • champions of 2025</p>
        </motion.header>

        {/* leaderboard */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative z-10 w-full max-w-sm space-y-2"
        >
          {ranking.map(([key, pts], i) => (
            <li
              key={key}
              className={`glass-card flex items-center justify-between px-4 py-2 rounded-lg ${i === 0 ? "ring-2 ring-brand-400" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-5 text-right font-semibold text-sm">{i + 1}</span>
                <img src={houseMeta[key].logo} alt={houseMeta[key].name} className="w-7 h-7" />
                <span className="text-sm sm:text-base">{houseMeta[key].name}</span>
              </div>
              <span className="text-brand-200 font-medium text-sm sm:text-base">{pts}</span>
            </li>
          ))}
        </motion.ul>

        {/* farewell text */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 max-w-md space-y-4 text-dark-100 text-sm sm:text-base leading-snug"
        >
          <p>
            Brew Crew, Red Storm and The Hoo — the scoreboard may be final, but our story keeps
            rolling. Under that Strawberry Moon we clinked glasses, sang until our voices gave
            out, and wrapped one another in the kind of hugs that turn strangers into family.
          </p>
          <p>
            Deep Jungle, guard that trophy — and guard these friendships harder.
            When life gets quiet, shout “Buffalo!” and feel us answering across
            continents.
          </p>
          <p className="text-[11px] italic text-dark-400">With gratitude and mischief — the Founders ♥</p>
        </motion.section>
      </main>
    </>
  );
}

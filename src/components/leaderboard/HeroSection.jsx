import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[40vh] sm:h-[50vh] overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <img
          src="/assets/logos/house-cup-cover.png"
          alt="Leaderboard background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black opacity-85" />
      </motion.div>
      <div className="relative w-full h-full flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="px-4 sm:px-6 max-w-3xl text-center backdrop-blur-sm bg-black/20 p-6 sm:p-8 rounded-2xl border border-white/10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-lg">
            Who Rules Them All?
          </h1>
          <p className="text-sm sm:text-base md:text-xl font-light text-gray-200 leading-relaxed">
            <span className="block mb-2">
              The scoreboard refreshes live with every event, Buffalo call, and stealthy Nudity Challenge.
            </span>
            <span className="block">
              Will your House reign supreme, or end up yard-chugging your way to freedom?
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
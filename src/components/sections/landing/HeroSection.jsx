import React from "react";
import { motion, useTransform } from "framer-motion";
import { PrimaryButton, SecondaryButton } from "../../common/ui/Buttons";

export default function HeroSection({ y }) {
  // Transform the scroll Y position into a parallax effect
  const backgroundY = useTransform(y, [0, 500], [0, 150]);
  
  return (
    <div className="relative w-full h-[90vh] sm:h-screen overflow-hidden">
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <img
          src="/assets/logos/house-cup-cover.png"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 filter brightness-75"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-black opacity-70" />
      </motion.div>
      <div className="relative flex items-center justify-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl p-6 md:p-10 bg-black/50 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-2xl"
          >
            House Cup 2025
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-xl md:text-2xl font-light mb-6 sm:mb-8 text-gray-200 leading-relaxed"
          >
            Join us for a definitely-not-a-cult competition among eager Erasmus students,{" "}
            <em className="font-medium">lovingly guided by the House Cup Rules 2025.</em>
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <PrimaryButton to="/events">
              Join the Competition
            </PrimaryButton>
            <SecondaryButton to="/leaderboard">
              Check Leaderboard
            </SecondaryButton>
          </motion.div>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center"
      >
        <div className="animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
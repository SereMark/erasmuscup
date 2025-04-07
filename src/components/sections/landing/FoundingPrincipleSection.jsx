import React from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../../../hooks/useAnimation";
import { fadeInVariants } from "../../../constants/animations";
import { GradientCard } from "../../common/ui/GradientCard";
import { SectionTitle } from "../../common/ui/SectionTitle";

export default function FoundingPrincipleSection() {
  const { ref, inView } = useAnimation({ threshold: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInVariants}
      className="relative"
    >
      <GradientCard 
        gradient="from-indigo-800 to-purple-800" 
        rotation="-rotate-2"
        className="p-6 sm:p-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title="The Founding Principle"
            gradient="from-indigo-300 to-purple-300"
          />
        </motion.div>
        
        <div className="relative">
          <div className="absolute -top-8 sm:-top-12 -right-8 sm:-right-12 w-28 sm:w-40 h-28 sm:h-40 bg-purple-800/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 sm:-bottom-12 -left-8 sm:-left-12 w-28 sm:w-40 h-28 sm:h-40 bg-indigo-800/10 rounded-full blur-3xl"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 bg-black/30 p-4 sm:p-6 rounded-2xl border border-indigo-900/20 mb-4 sm:mb-6"
          >
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200">
              On the sacred night of the <strong className="text-indigo-300">Strawberry Moon</strong>, whichever House sits 
              atop the leaderboard seizes the <strong className="text-indigo-300">House Pokal</strong>. Everyone else has a 
              week to conquer a <em className="text-purple-300">Yardie</em> (a yard of beer) or accept comedic doom.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10"
          >
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
              Yes, there's no penalty for murder—but skip an event or commit Treason, 
              and you'll learn the real meaning of "house loyalty." Good luck.
            </p>
          </motion.div>
        </div>
      </GradientCard>
    </motion.div>
  );
}
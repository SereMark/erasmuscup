import React from "react";
import { motion } from "framer-motion";

export default function ScoreboardFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-8 sm:mt-10 text-center"
    >
      <p className="text-center text-gray-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto bg-black/30 p-4 sm:p-6 rounded-xl backdrop-blur-sm">
        Think your House is unbeatable? Or too far behind to care?
        <br className="hidden sm:block" />
        Try a <em className="text-purple-300 font-semibold">Super Gambit</em> (sec. 12a) for that sweet multiplier, 
        or go for some <em className="text-pink-300 font-semibold">Public Nudity</em> (sec. 16) if your neighbors can handle it!
      </p>
    </motion.div>
  );
}
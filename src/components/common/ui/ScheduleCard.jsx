import React from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../../../hooks/useAnimation";

/**
 * Special card component for the Schedule section
 */
function ScheduleCard({ id, text, variants }) {
  const { ref, inView } = useAnimation({ threshold: 0.1 });
  
  return (
    <motion.div id={id} ref={ref} variants={variants} className="mt-10 scroll-mt-24">
      <div className="bg-gradient-to-br from-black/70 to-purple-900/20 p-1 rounded-xl shadow-lg border border-purple-900/20 hover:border-purple-500/40 transition-all duration-500">
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">
              <span className="text-xl">📜</span>
            </div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
            >
              Schedule 1: House Cup Register
            </motion.h3>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed text-gray-300 font-mono bg-black/50 p-4 rounded-lg border border-purple-900/20"
          >
            {text}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ScheduleCard;
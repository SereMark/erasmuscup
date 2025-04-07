import React from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../../../hooks/useAnimation";
import { GradientCard } from "./GradientCard";

/**
 * Component for part section headings in the rules page
 */
function PartHeading({ partNumber, title, id, variants }) {
  const { ref, inView } = useAnimation({ threshold: 0.1 });
  
  return (
    <motion.div id={id} ref={ref} variants={variants} className="my-10">
      <GradientCard 
        gradient="from-indigo-900/30 to-purple-900/30" 
        rotation="-rotate-1"
        className="p-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 flex items-center"
        >
          <span className="text-2xl mr-3">🗂</span>
          <span>
            Part {partNumber}: {title}
          </span>
        </motion.h2>
      </GradientCard>
    </motion.div>
  );
}

export default PartHeading;
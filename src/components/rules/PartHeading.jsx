import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * Component for part section headings in the rules page
 */
function PartHeading({ partNumber, title, id, variants }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <motion.div id={id} ref={ref} variants={variants} className="my-10">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl blur-xl transform -rotate-1"></div>
        <div className="relative bg-gradient-to-br from-black/80 to-purple-900/20 p-6 rounded-xl border border-indigo-900/30 shadow-2xl backdrop-blur-lg">
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
        </div>
      </div>
    </motion.div>
  );
}

export default PartHeading;
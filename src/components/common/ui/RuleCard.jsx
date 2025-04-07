import React from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../../../hooks/useAnimation";
import { HIGHLIGHT_MAP } from "../../../constants/rulesData";

/**
 * Card component for individual rule sections
 */
function RuleCard({ id, title, text, emoji = "👉", variants }) {
  const { ref, inView } = useAnimation({ threshold: 0.1 });
  
  // Apply text highlighting based on predefined terms
  let enhancedText = text;
  HIGHLIGHT_MAP.forEach(({ term, replacement }) => {
    const regex = new RegExp(term, "g");
    enhancedText = enhancedText.replace(regex, replacement);
  });

  return (
    <motion.div id={id} ref={ref} variants={variants} className="scroll-mt-24 mb-6 sm:mb-8">
      <div className="bg-gradient-to-br from-black/70 to-purple-900/20 p-1 rounded-xl shadow-lg border border-purple-900/20 group hover:border-purple-500/40 transition-all duration-500">
        <div className="bg-black/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl h-full">
          <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-900/30 flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-base sm:text-xl">{emoji}</span>
            </div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300"
            >
              {title}
            </motion.h3>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-xs sm:text-sm md:text-base whitespace-pre-line sm:whitespace-pre-wrap leading-relaxed text-gray-300 ml-1 sm:ml-2 pl-8 sm:pl-10"
            dangerouslySetInnerHTML={{ __html: enhancedText }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default RuleCard;
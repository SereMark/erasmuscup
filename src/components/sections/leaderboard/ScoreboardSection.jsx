import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { containerVariants, fadeInUpVariant } from "../../../constants/animations";
import { TableView } from "../../features/leaderboard/TableView";
import { CardView } from "../../features/leaderboard/CardView";
import { SectionTitle } from "../../common/ui/SectionTitle";

const ScoreboardSection = forwardRef(({ viewMode, setViewMode, isMobile, sortedHouseTotals, rankMapping, inView }, ref) => {
  return (
    <div className="px-4 sm:px-6 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between"
      >
        <motion.div variants={fadeInUpVariant}>
          <SectionTitle 
            title="Scoreboard Details"
            gradient="from-purple-300 to-pink-300"
          />
        </motion.div>
      </motion.div>

      {/* Conditionally render table or card view */}
      <motion.div>
        {!isMobile ? (
          <TableView 
            sortedHouseTotals={sortedHouseTotals} 
            rankMapping={rankMapping} 
          />
        ) : (
          <CardView 
            sortedHouseTotals={sortedHouseTotals} 
          />
        )}
      </motion.div>
      
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
    </div>
  );
});

export default ScoreboardSection;
import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { containerVariants, fadeInUpVariant } from "../../constants/animations";
import { ViewToggle } from "./ViewToggle";
import { TableView } from "./TableView";
import { CardView } from "./CardView";
import ScoreboardFooter from "./ScoreboardFooter";

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
        <motion.h2
          variants={fadeInUpVariant}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-0 text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300"
        >
          Scoreboard Details
        </motion.h2>
        
        {!isMobile && (
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        )}
      </motion.div>

      {/* Conditionally render table or card view */}
      <motion.div>
        {viewMode === "table" && !isMobile ? (
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
      
      <ScoreboardFooter />
    </div>
  );
});

export default ScoreboardSection;
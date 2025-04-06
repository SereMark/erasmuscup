import React from "react";
import { motion } from "framer-motion";
import RuleCard from "./RuleCard";
import PartHeading from "./PartHeading";
import ScheduleCard from "./ScheduleCard";
import { containerVariants, itemVariants } from "../../constants/animations";
import * as ruleSections from "../../constants/ruleSections";

function RulesContent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="lg:col-span-3 space-y-6 sm:space-y-10"
    >
      <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
        <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-1 rounded-xl shadow-lg">
          <div className="bg-black/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-indigo-900/30">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-900/40 flex items-center justify-center mr-2 sm:mr-3">
                <span className="text-base sm:text-xl">📜</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Official Document</h2>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line sm:whitespace-pre-wrap text-gray-300">
              <strong>Public Act:</strong> <em>2025 No 3</em>
              {"\n"}
              <strong>Date of Assent:</strong> <em>21 March 2025</em>
              {"\n"}
              <strong>Commencement:</strong> <em>see section 3(2)</em>
              {"\n\n"}
              This document includes every word of the original Act (including <strong>4 April 2025
              amendments</strong>) with improved styling, emojis, and clickable anchors for easy navigation.
              <em> No text has been removed or altered.</em>
            </p>
          </div>
        </div>
      </motion.div>

      <RuleCard id="section-1" title="1 Interpretation" text={ruleSections.section1} emoji="🔍" variants={itemVariants} />
      <RuleCard id="section-2" title="2 Object and Purpose" text={ruleSections.section2} emoji="🎯" variants={itemVariants} />

      <PartHeading partNumber={1} title="The House Cup" id="part-1" variants={itemVariants} />
      <RuleCard id="section-3" title="3 House Rules" text={ruleSections.section3} emoji="📝" variants={itemVariants} />
      <RuleCard id="section-4" title="4 Participants" text={ruleSections.section4} emoji="👥" variants={itemVariants} />
      <RuleCard id="section-5" title="5 House Events" text={ruleSections.section5} emoji="🎉" variants={itemVariants} />

      <PartHeading partNumber={2} title="House Points" id="part-2" variants={itemVariants} />
      <RuleCard id="section-6" title="6 Award of House Points" text={ruleSections.section6} emoji="✨" variants={itemVariants} />
      <RuleCard id="section-7" title="7 Revocation of House Points" text={ruleSections.section7} emoji="⚠️" variants={itemVariants} />

      <PartHeading partNumber={3} title="Recommendations" id="part-3" variants={itemVariants} />
      <RuleCard id="section-8" title="8 Event Selection and Decision" text={ruleSections.section8} emoji="🤝" variants={itemVariants} />
      <RuleCard id="section-9" title="9 Overthrowing the Event Organisers" text={ruleSections.section9} emoji="💥" variants={itemVariants} />
      <RuleCard id="section-10" title="10 Constructive Feedback" text={ruleSections.section10} emoji="🧐" variants={itemVariants} />

      <PartHeading partNumber={4} title="Bonus Points" id="part-4" variants={itemVariants} />
      <RuleCard id="section-11" title="11 Attendance and Pride" text={ruleSections.section11} emoji="🎖" variants={itemVariants} />
      <RuleCard id="section-12" title="12 Gambits" text={ruleSections.section12} emoji="🎲" variants={itemVariants} />
      <RuleCard id="section-12a" title="12a Super Gambits" text={ruleSections.section12a} emoji="💥" variants={itemVariants} />
      <RuleCard id="section-12b" title="12b Armistices" text={ruleSections.section12b} emoji="🤝" variants={itemVariants} />

      <PartHeading partNumber={5} title="Punishment" id="part-5" variants={itemVariants} />
      <RuleCard id="section-13" title="13 Establishment of House Crimes" text={ruleSections.section13} emoji="🚫" variants={itemVariants} />
      <RuleCard id="section-14" title="14 Cheating" text={ruleSections.section14} emoji="❌" variants={itemVariants} />
      <RuleCard id="section-15" title="15 Treason" text={ruleSections.section15} emoji="⚔️" variants={itemVariants} />
      <RuleCard id="section-16" title="16 Public Nudity" text={ruleSections.section16} emoji="🍑" variants={itemVariants} />
      <RuleCard id="section-17" title="17 Murder" text={ruleSections.section17} emoji="🔪" variants={itemVariants} />
      <RuleCard id="section-18" title="18 Losing the House Cup" text={ruleSections.section18} emoji="⚰️" variants={itemVariants} />

      <PartHeading partNumber={6} title="Roles" id="part-6" variants={itemVariants} />
      <RuleCard id="section-19" title="19 House Roles" text={ruleSections.section19} emoji="🎩" variants={itemVariants} />

      <ScheduleCard id="schedule-1" text={ruleSections.schedule1Text} variants={itemVariants} />
    </motion.div>
  );
}

export default RulesContent;
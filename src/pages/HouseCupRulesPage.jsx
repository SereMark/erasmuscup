import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

function HouseCupRulesPage() {
  const [activeSection, setActiveSection] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showTOC, setShowTOC] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setShowTOC(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-[#121212] min-h-screen pt-6 sm:pt-8 pb-20 relative">
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0.8,
          y: showBackToTop ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full p-2 sm:p-3 shadow-lg text-white"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>

      <section className="max-w-5xl mx-auto px-3 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-12 text-center"
        >
          <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-1 rounded-2xl shadow-[0_10px_30px_rgba(79,70,229,0.2)]">
            <div className="bg-[#1a1a1a]/90 backdrop-blur-sm rounded-2xl p-4 sm:p-8 md:p-10 border border-purple-900/30">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-lg">
                🏆 House Cup Rules 🏆
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  The official rulebook governing the definitely-not-a-cult competition among Erasmus students.
                  Read at your own peril.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="lg:hidden mb-6 text-center">
          <button 
            onClick={() => setShowTOC(!showTOC)}
            className="bg-gradient-to-r from-purple-600 to-indigo-700 px-4 py-2 rounded-lg text-white font-medium inline-flex items-center space-x-2"
          >
            <span>{showTOC ? "Hide" : "Show"} Table of Contents</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 transition-transform duration-300 ${showTOC ? "rotate-180" : ""}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
          <AnimatePresence>
            {(showTOC || window.innerWidth >= 1024) && (
              <motion.div
                key="toc"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-1 overflow-hidden"
              >
                <div className={`${!showTOC && "hidden"} lg:block lg:sticky lg:top-8`}>
                  <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-1 rounded-xl shadow-lg">
                    <div className="bg-[#1a1a1a]/90 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-indigo-900/30">
                      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                        Table of Contents
                      </h2>
                      <div className="space-y-3 max-h-[70vh] lg:max-h-[calc(100vh-240px)] overflow-y-auto pr-2 custom-scrollbar">
                      <div className="space-y-4 max-h-[calc(100vh-240px)] overflow-y-auto pr-2 custom-scrollbar">
                        <div>
                          <ul className="space-y-1.5 text-sm">
                            <TOCItem id="section-1" label="1. Interpretation" icon="🔍" scrollToSection={scrollToSection} activeSection={activeSection} />
                            <TOCItem id="section-2" label="2. Object and Purpose" icon="🎯" scrollToSection={scrollToSection} activeSection={activeSection} />
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-purple-300 mb-2">Part 1: The House Cup</h3>
                          <ul className="space-y-1.5 text-sm">
                            <TOCItem id="section-3" label="3. House Rules" icon="📝" scrollToSection={scrollToSection} activeSection={activeSection} />
                            <TOCItem id="section-4" label="4. Participants" icon="👥" scrollToSection={scrollToSection} activeSection={activeSection} />
                            <TOCItem id="section-5" label="5. House Events" icon="🎉" scrollToSection={scrollToSection} activeSection={activeSection} />
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-purple-300 mb-2">Part 2: House Points</h3>
                          <ul className="space-y-1.5 text-sm">
                            <TOCItem id="section-6" label="6. Award of House Points" icon="✨" scrollToSection={scrollToSection} activeSection={activeSection} />
                            <TOCItem id="section-7" label="7. Revocation of House Points" icon="⚠️" scrollToSection={scrollToSection} activeSection={activeSection} />
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-purple-300 mb-2">Part 3: Recommendations</h3>
                          <ul className="space-y-1.5 text-sm">
                            <TOCItem id="section-8" label="8. Event Selection" icon="🤝" scrollToSection={scrollToSection} activeSection={activeSection} />
                            <TOCItem id="section-9" label="9. Overthrowing Organisers" icon="💥" scrollToSection={scrollToSection} activeSection={activeSection} />
                            <TOCItem id="section-10" label="10. Constructive Feedback" icon="🧐" scrollToSection={scrollToSection} activeSection={activeSection} />
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-purple-300 mb-2">Part 4: Bonus Points</h3>
                          <ul className="space-y-1.5 text-sm">
                            <TOCItem id="section-11" label="11. Attendance and Pride" icon="🎖" scrollToSection={scrollToSection} activeSection={activeSection} />
                            <TOCItem id="section-12" label="12. Gambits" icon="🎲" scrollToSection={scrollToSection} activeSection={activeSection} />
                            <TOCItem id="section-12a" label="12a. Super Gambits" icon="💥" scrollToSection={scrollToSection} activeSection={activeSection} />
                            <TOCItem id="section-12b" label="12b. Armistices" icon="🤝" scrollToSection={scrollToSection} activeSection={activeSection} />
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-purple-300 mb-2">Part 5: Punishment</h3>
                          <ul className="space-y-1.5 text-sm">
                            <TOCItem id="section-13" label="13. House Crimes" icon="🚫" scrollToSection={scrollToSection} activeSection={activeSection} />
                            <TOCItem id="section-14" label="14. Cheating" icon="❌" scrollToSection={scrollToSection} activeSection={activeSection} />
                            <TOCItem id="section-15" label="15. Treason" icon="⚔️" scrollToSection={scrollToSection} activeSection={activeSection} />
                            <TOCItem id="section-16" label="16. Public Nudity" icon="🍑" scrollToSection={scrollToSection} activeSection={activeSection} />
                            <TOCItem id="section-17" label="17. Murder" icon="🔪" scrollToSection={scrollToSection} activeSection={activeSection} />
                            <TOCItem id="section-18" label="18. Losing the House Cup" icon="⚰️" scrollToSection={scrollToSection} activeSection={activeSection} />
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-purple-300 mb-2">Part 6: Roles</h3>
                          <ul className="space-y-1.5 text-sm">
                            <TOCItem id="section-19" label="19. House Roles" icon="🎩" scrollToSection={scrollToSection} activeSection={activeSection} />
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-1.5 text-sm">
                            <TOCItem id="schedule-1" label="Schedule 1: House Cup Register" icon="📜" scrollToSection={scrollToSection} activeSection={activeSection} />
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="lg:col-span-3 space-y-6 sm:space-y-10"
          >
            <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
              <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-1 rounded-xl shadow-lg">
                <div className="bg-[#1a1a1a]/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-indigo-900/30">
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
            <RuleCard id="section-1" title="1 Interpretation" text={section1} emoji="🔍" variants={itemVariants} />
            <RuleCard id="section-2" title="2 Object and Purpose" text={section2} emoji="🎯" variants={itemVariants} />
            <PartHeading partNumber={1} title="The House Cup" id="part-1" variants={itemVariants} />
            <RuleCard id="section-3" title="3 House Rules" text={section3} emoji="📝" variants={itemVariants} />
            <RuleCard id="section-4" title="4 Participants" text={section4} emoji="👥" variants={itemVariants} />
            <RuleCard id="section-5" title="5 House Events" text={section5} emoji="🎉" variants={itemVariants} />
            <PartHeading partNumber={2} title="House Points" id="part-2" variants={itemVariants} />
            <RuleCard id="section-6" title="6 Award of House Points" text={section6} emoji="✨" variants={itemVariants} />
            <RuleCard id="section-7" title="7 Revocation of House Points" text={section7} emoji="⚠️" variants={itemVariants} />
            <PartHeading partNumber={3} title="Recommendations" id="part-3" variants={itemVariants} />
            <RuleCard id="section-8" title="8 Event Selection and Decision" text={section8} emoji="🤝" variants={itemVariants} />
            <RuleCard id="section-9" title="9 Overthrowing the Event Organisers" text={section9} emoji="💥" variants={itemVariants} />
            <RuleCard id="section-10" title="10 Constructive Feedback" text={section10} emoji="🧐" variants={itemVariants} />
            <PartHeading partNumber={4} title="Bonus Points" id="part-4" variants={itemVariants} />
            <RuleCard id="section-11" title="11 Attendance and Pride" text={section11} emoji="🎖" variants={itemVariants} />
            <RuleCard id="section-12" title="12 Gambits" text={section12} emoji="🎲" variants={itemVariants} />
            <RuleCard id="section-12a" title="12a Super Gambits" text={section12a} emoji="💥" variants={itemVariants} />
            <RuleCard id="section-12b" title="12b Armistices" text={section12b} emoji="🤝" variants={itemVariants} />
            <PartHeading partNumber={5} title="Punishment" id="part-5" variants={itemVariants} />
            <RuleCard id="section-13" title="13 Establishment of House Crimes" text={section13} emoji="🚫" variants={itemVariants} />
            <RuleCard id="section-14" title="14 Cheating" text={section14} emoji="❌" variants={itemVariants} />
            <RuleCard id="section-15" title="15 Treason" text={section15} emoji="⚔️" variants={itemVariants} />
            <RuleCard id="section-16" title="16 Public Nudity" text={section16} emoji="🍑" variants={itemVariants} />
            <RuleCard id="section-17" title="17 Murder" text={section17} emoji="🔪" variants={itemVariants} />
            <RuleCard id="section-18" title="18 Losing the House Cup" text={section18} emoji="⚰️" variants={itemVariants} />
            <PartHeading partNumber={6} title="Roles" id="part-6" variants={itemVariants} />
            <RuleCard id="section-19" title="19 House Roles" text={section19} emoji="🎩" variants={itemVariants} />
            <ScheduleCard id="schedule-1" text={schedule1Text} variants={itemVariants} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function TOCItem({ id, label, icon, scrollToSection, activeSection }) {
  return (
    <li className="group">
      <button
        onClick={() => scrollToSection(id)}
        className={`flex items-center w-full px-3 py-2 rounded-lg text-left transition-all duration-300 group-hover:bg-purple-900/30 ${
          activeSection === id ? "bg-purple-900/40 text-white" : "text-gray-300"
        }`}
      >
        <span className="mr-2">{icon}</span>
        <span className="truncate">{label}</span>
      </button>
    </li>
  );
}

function PartHeading({ partNumber, title, id, variants }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div id={id} ref={ref} variants={variants} className="my-10">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl blur-xl transform -rotate-1"></div>
        <div className="relative bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] p-6 rounded-xl border border-indigo-900/30 shadow-2xl backdrop-blur-lg">
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

function RuleCard({ id, title, text, emoji = "👉", variants }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const highlightMap = [
    { term: "Basic Rules", replacement: "<strong class='text-purple-300'>Basic Rules</strong>" },
    { term: "Buffaloed", replacement: "<strong class='text-pink-300'>Buffaloed</strong>" },
    { term: "Cool Shit", replacement: "<em class='text-indigo-300'>Cool Shit</em>" },
    { term: "House Cup", replacement: "<strong class='text-purple-300'>House Cup</strong>" },
    { term: "Murder", replacement: "<em class='text-pink-300'>Murder</em>" },
    { term: "Cheating", replacement: "<strong class='text-red-400'>Cheating</strong>" },
    { term: "Treason", replacement: "<strong class='text-red-400'>Treason</strong>" },
    { term: "public hanging", replacement: "<em class='text-pink-300'>public hanging</em>" },
    { term: "Yardie", replacement: "<em class='text-green-300'>Yardie</em>" },
    { term: "Super Gambit", replacement: "<strong class='text-indigo-300'>Super Gambit</strong>" },
    { term: "Gambit", replacement: "<strong class='text-purple-300'>Gambit</strong>" },
    { term: "Armistice", replacement: "<strong class='text-blue-300'>Armistice</strong>" },
    { term: "House Points", replacement: "<strong class='text-yellow-300'>House Points</strong>" },
    { term: "How's That'ed", replacement: "<strong class='text-pink-300'>How's That'ed</strong>" }
  ];

  let enhancedText = text;
  highlightMap.forEach(({ term, replacement }) => {
    const regex = new RegExp(term, "g");
    enhancedText = enhancedText.replace(regex, replacement);
  });

  return (
    <motion.div id={id} ref={ref} variants={variants} className="scroll-mt-24 mb-6 sm:mb-8">
      <div className="bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] p-1 rounded-xl shadow-lg border border-purple-900/20 group hover:from-purple-900/20 hover:to-indigo-900/20 transition-all duration-500">
        <div className="bg-[#1a1a1a]/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl h-full">
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

function ScheduleCard({ id, text, variants }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div id={id} ref={ref} variants={variants} className="mt-10 scroll-mt-24">
      <div className="bg-gradient-to-br from-[#2c2c2c] to-[#1a1a1a] p-1 rounded-xl shadow-lg border border-purple-900/20 hover:from-purple-900/20 hover:to-indigo-900/20 transition-all duration-500">
        <div className="bg-[#1a1a1a]/80 backdrop-blur-sm p-6 rounded-xl">
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
            className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed text-gray-300 font-mono bg-[#1a1a1a] p-4 rounded-lg border border-gray-800"
          >
            {text}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const section1 = `
(1) In this Act, unless the context otherwise requires,— 

Basic Rules are the rules as outlined in section 3(a) and (b).
Buffaloed is being caught drinking with your right hand, when another Participant says "buffalo" to you.
Cool Shit is any shit that is cool, as decided by a Judge from the House Cup Courts Act 2025, or by 3 out of the 4 House Captains in their collective capacity.
Founders are the 12 initial participants, taking part in the opening ceremony of 21 March 2025.
Four Houses are the four groups given identity by the Founders on 21 March 2025.
Gambits are impromptu House Events that occur outside regular House Events. They can be any game/challenge of the Participants' choice.
House Captains are elected representatives, being one from each house, as selected on the 21 March 2025.
House Cup refers to the competition this Act prescribes.
House Events are games, challenges, matches or any other method of point derivation, as agreed upon by the Participants.
House Points are intangible units of scoring that can be cashed in at any point for jelly beans.
House Pokal is the physical cup that the winning House receives.
House Rules are the rules as defined in this Act.
How's That'ed is being caught opening a can or bottle without first saying "not out", when another Participant says "how's that" to you.
Participant is any natural person organised into a house by the personality quiz, and signed onto the House Cup Registration sheet in Schedule 1.
Point System is the system of point award and revocation as prescribed in Part 2.
Yardie is a yard glass full of beer. And doing a Yardie is drinking the entire thing in one go.
`;

const section2 = `
(1) The objective of the House Competition is to determine the strongest Erasmus students to breed
the next wave of Erasmus students by virtue of Darwinian Evolution.

(2) The Purpose of these House Rules are to establish and clarify the mechanisms of the House
Competition.

(3) This is not a cult; admission is not to be restricted for any reason.
`;

const section3 = `
(1) This Act hereby establishes the House Cup.
(2) These House Rules come into effect upon assent and signature of the four House Captains at the
foot of each page, and cease to take effect at midnight on the date of the Strawberry Moon.
(3) The Basic Rules are as follows—
(a) On 21 March 2025, the 12 Founders are to convene, each taking the 16Personalities Test
and forming the Four Houses.
(b) Upon the constitution of the Four Houses, the Founders are to determine the following for
each of their houses.
    (i) House Name
    (ii) House Colour and Trim
    (iii) House Animal
    (iv) House Sigil
    (v) House Anthem
    (vi) House Motto
    (vii) House Values
    (viii) House Captain
(c) The Four Houses will compete in weekly House Events, earning points for their house in
accordance with the Point System outlined in Part 2.
(d) Participants may be added to the House Cup by registration in the House Cup Register,
appended to this Act in Schedule 1.
(e) The winning house by the date of the Strawberry Moon will receive the House Pokal, and
will not be executed by public hanging.
(f) The losing houses will receive nothing, and will be executed by public hanging unless
they successfully perform a Yardie no later than one week after the date of the Strawberry
Moon.

(4) These rules may be subject to change if I fucked them up.
`;

const section4 = `
(1) Participants are to be periodically added to the House Cup,
(2) Participants are to take the 16Personalities Test to determine their house, and may not switch
from that House prior to the date of the Strawberry Moon.
(3) Participants shall support their Houses in House Events, with at least one Participant being
present at each House Event.
(4) Participants must be registered to the House Cup on the House Cup Register in Schedule 1.
`;

const section5 = `
(1) House Events—
    (a) Are to take place weekly, with no less than one House Event taking place per week.
    (b) Are to be decided by consensus of Participants, irrespective of Founders or House
    Captains.
    (c) May not take place on a Blood Moon.

(2) Failure to have at least one representative from your House at a House Event will result in lost
points in accordance with the Point System outlined in Part 2.
(3) These House Event rules do not limit the rules relating to Gambits outlined in section 12.
`;

const section6 = `
(1) The following, agglutinated to the rules pertaining to the Revocation of House Points in section 7,
are to be known as the Point System.

(2) House Points are awarded on the following rules:
    (a) Winning a House Event results in 100 points.
    (b) Second place in a House Event results in 75 points.
    (c) Third place in a House Event results in 50 points.
    (d) Last place in a House Event results in 25 points.

(3) Bonus Points may be awarded on consensus of all four House Captains for doing Cool Shit.
(4) Bonus points may be awarded to houses in accordance with situations outlined in Part 4.
`;

const section7 = `
(1) Points will be revoked from Houses in the following circumstances—
    (a) Failure to have one representative at a House Event will result in the loss of 50 points.
    (b) Establishment of any of the House Cup Crimes will result in a loss of points outlined in
    their respective sections.
    (c) Getting Buffaloed 3 times in one night will result in the loss of 10 points.
    (d) Getting How's That'ed 3 times in one night will result in the loss of 50 points.
`;

const section8 = `
(1) There is no prescribed mechanism of event selection, and;
    (a) Activity;
    (b) Date;
    (c) and Time; are to be decided by consensus.

(2) Events are to be advertised in the House Cup WhatsApp group.
(3) Any suggestions for future House Events are to be put into the WhatsApp group and/or noted
down for future reference.
`;

const section9 = `
(1) Overthrowing Event Organisers by means of—
    (a) Treason
    (b) Bomb Threats
    (c) Magical Wishes and/or Spells
is strictly prohibited, and establishes the actus reus for Treason under section 15.
`;

const section10 = `
(1) Attempting to give Constructive Feedback also establishes the actus reus for Treason under
section 15.

(2) Anyone found giving Constructive Feedback shall be executed on the evening of the Strawberry
Moon without exception.
`;

const section11 = `
(1) Bonus points will be awarded for attendance—
    (a) For each attending member at an event, the attending House will be awarded 1 point per
    person.
    (b) The points for attendance is limited in number to the number of people of the smallest
    house attending.
    (c) In order to get this point, the attending member must be dressed in their House colour or
    Trim, or have on hand any animal paraphernalia.

(2) At each indoor event, an attending Participant that shows exceptional House Pride through dress
or action will be awarded 5 points.
(3) At each outdoor event, the house that cheers the loudest will receive an additional 10 points.
(4) Contrary to the title of this section, no points will be awarded for being homosexual.
`;

const section12 = `
(1) Gambits carry the definition outlined in section 1.
(2) Gambits abide by the following rules—
    (a) Gambits may be initiated if there is at least one representative from each house, and all
    Participants agree that the following activity will be a Gambit.
    (b) Participants may engage in a game of their choosing, awarding points in the following
    way:
        (i) Winner gets 20 points.
        (ii) Second gets 14 points.
        (iii) Third gets 10 Points.
        (iv) Last gets 4 Points.
    (c) Participants may only participate in one Gambit between each week.

(3) Gambits have the following limitations—
    (a) A Gambit is void if the status of the game as a Gambit is not established prior to the game
    being played.
    (b) A Gambit is void if there is not one representative of each House taking part.
    (c) A Gambit is void if any of the Participants has already taken part in another Gambit that
    week.
    (d) The week is defined from Monday to Sunday, and therefore a Participant who competed
    on Sunday, may compete the next day on the following Monday.

(4) Failure to abide by the Gambit rules will establish the actus reus for Cheating as defined in
section 15.
`;

const section12a = `
(1) Super Gambits are hereby instated.
(2) The purpose of Super Gambits is to award higher player numbers in Gambit participation.
(3) Super Gambits are defined as having the same rules as Gambits but with the following alterations;
    (a) Super Gambits have a dynamic point totalling system, according to the minimum
    common number of participants from each house.
    (b) The point totalling system is hereby dictated by the following equation:
        (i) First place: (n x 20) points.
        (ii) Second Place: (n x 14) points.
        (iii) Third Place: (n x 10) points.
        (iv) Fourth Place: (n x 4) points.
(4) Super Gambits' point totalling system maxes out at 4 participants from each House; any increase
in number will not increase the total point value.
(5) Super Gambits must include active participation of all participants included in the dynamic point
totalling system count.
(6) Contrary to the rules on Gambits, Super Gambits may be performed twice a week per participant.
`;

const section12b = `
(1) House Captains may declare an Armistice for Gambits or Super Gambits.
(2) An Armistice is defined as a temporary truce between two houses in order to compete in a Gambit
or Super Gambit, whether this be to claim the higher point amounts, or simply take part.
(3) An Armistice cannot be declared for any reason other than competing in Gambits or Super Gambits.
(4) Armistices can be composed of 2 or 3 Houses, however not 1 or 4.
(5) Contracting Parties to an Armistice will divide the resultant points 50:50.
`;

const section13 = `
(1) It is hereby established that the following actions are considered House Crimes.
(2) The proven establishment of a House Crime's actus reus and mens rea, in the absence of defenses,
will attract punishment.
(3) Any attempted execution of any of the House Crimes will receive a punishment half that of the
full offence.
`;

const section14 = `
(1) Any person who intentionally cheats, or diminishes the integrity of any House Event, shall lose 30
points.
(2) The limitation period for cheating is the evening on which the event occurs at midnight.
    (a) A cheater who makes it to midnight undetected is granted a full defense to the offence of
    Cheating.
`;

const section15 = `
(1) Any person who intentionally betrays their House, or aids/abets another House contrary to the
interests of their house, will be deemed a Traitor and shall be removed from their House.
(2) Any person found to have stopped treason shall be celebrated with fireworks every year on 5
November.
(3) Treason has no limitation period.
`;

const section16 = `
(1) Public Nudity is highly discouraged.
(2) Any person who is documented naked in a public space will be awarded 30 points.
(3) "Naked" is defined as having no fabricated items on at all.

Amendment of 4 April 2025

(4) The crime of Public Nudity is hereby restricted as follows;
    (a) Each participant may claim the points for public nudity once per half-semester.
    (b) Public Nudity may not be performed in the same place twice; once points are awarded at a particular
    location, that place is disallowed.
    (c) Any house with more than 10 members publicly nude in the same place at the same time will receive 1000
    house points.
`;

const section17 = `
(1) Culpable homicide is murder in each of the following cases:
(a) if the offender means to cause the death of the person killed:
(b) if the offender means to cause to the person killed any bodily injury that is known to the
offender to be likely to cause death, and is reckless whether death ensues or not:
(c) if the offender means to cause death, or, being so reckless as aforesaid, means to cause such
bodily injury as aforesaid to one person, and by accident or mistake kills another person,
though he or she does not mean to hurt the person killed:
(d) if the offender for any unlawful object does an act that he or she knows to be likely to
cause death, and thereby kills any person, though he or she may have desired that his or
her object should be effected without hurting any one.

(2) There is no punishment for murder.
`;

const section18 = `
(1) The three losing houses are to be executed by public hanging unless they successfully perform a
Yardie no later than one week after the date of the Strawberry Moon.
(2) Successfully performing a Yardie is a full defense to the crime of Losing.
`;

const section19 = `
(1) The following roles are also to be selected for each house—
    (a) House Captain
        (i) Responsible for organizing their House for events.
        (ii) Elected by the initial Founders.
        (iii) Until the finalization of the House Cup Courts Act, the House Captains, in their collective presence,
             are the final decision makers on any rules in this Act.
    (b) Bursar
        (i) Responsible for accounting for House Points and verifying points of other Houses.
        (ii) All four House Bursars collaborate to account for points awarded and revoked during events.
        (iii) Elected by their House when a majority of members are present.
        (iv) Bursars collectively organize the allocation of jelly beans if a Participant converts points.
    (c) House Judge
        (i) Responsible for adjudicating rules and interpreting the House Cup Rules.
        (ii) Hears cases in the House Cup Court regarding penalties, House Crimes, or other infractions.
        (iii) Elected by democratic vote within each House, with a majority present.
        (iv) In case of a failure to reach consensus, all Houses party to the dispute will be docked 10 points.
        (v) Only Judges from the involved House may adjudicate disputes.
(2) After initial election, any role holder may abdicate, and a new role holder may be elected from the current pool.
(3) More Roles may be added in the future.
(4) Each Participant may not hold more than one role.
`;

const schedule1Text = `
The following natural persons are hereby Participants in the House Cup:

Name:           Signature:

House Captains:
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________

Participants:
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________
_______________________________________  _____________

Assent of the House Captains:         Date:
`;

export default HouseCupRulesPage;
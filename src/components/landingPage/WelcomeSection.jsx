import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { fadeInVariants, staggerContainerVariants, staggerItemVariants } from "../../constants/animations";

export default function WelcomeSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const keyPoints = [
    { text: "No, it's not a cult", section: "2(3)" },
    { text: <><em className="text-pink-300">Murder</em> is not punished</>, section: "17" },
    { text: <>If your House flunks, you'll have one last chance to do a <em className="text-pink-300">Yardie</em> (beer-chug) or face <em className="text-pink-300">public hanging</em></>, section: "18" },
    { text: <>Public Nudity can net you 30 points. Ten or more in the buff at once is worth 1000. We're not joking</>, section: "16" }
  ];
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInVariants}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-indigo-900 opacity-10 rounded-3xl blur-2xl transform -rotate-1"></div>
      <div className="relative bg-gradient-to-br from-black/80 to-purple-900/20 p-6 sm:p-10 rounded-3xl border border-purple-900/30 shadow-2xl backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
            Welcome to the Madness!
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 text-gray-200"
        >
          Each Erasmus warrior is sorted into one of four Houses. Every weekly event (and random 
          <em className="text-purple-300"> Gambit</em>) can skyrocket your points or plunge your House into comedic peril.
          Watch out for <strong className="text-pink-300">Constructive Feedback</strong> because that's <strong className="text-pink-300">Treason</strong>.
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl font-semibold mb-3 sm:mb-4 text-purple-200"
        >
          Key Points:
        </motion.h3>
        <motion.ul
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="space-y-3 sm:space-y-4 pl-2 sm:pl-4 mb-6"
        >
          {keyPoints.map((point, index) => (
            <motion.li key={index} variants={staggerItemVariants} className="flex items-start">
              <span className="inline-block bg-purple-800 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-purple-200" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <p className="text-sm sm:text-base text-gray-300">
                {point.text} <span className="text-gray-400">(section {point.section})</span>
              </p>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm sm:text-base leading-relaxed text-gray-300 p-4 bg-black/30 border border-purple-900/20 rounded-xl">
            Sound insane enough? Peek at the <Link to="/housecup-rules" className="font-bold text-purple-300 underline hover:text-pink-300 transition-colors">Full Rules</Link> to discover how getting "Buffaloed" can drain your points and "Constructive Feedback" can get you executed.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
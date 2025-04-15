import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function WelcomeSection({ data }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: .2 })
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: .2, delayChildren: .3 } }
  }
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: .6, ease: [.22, 1, .36, 1] } }
  }
  const highlightVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: c => ({
      opacity: 1,
      y: 0,
      transition: { delay: c * .1, duration: .5, ease: [.22, 1, .36, 1] }
    }),
    hover: {
      y: -5,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
      transition: { duration: .3 }
    }
  }

  return (
    <section id="welcome" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[35rem] h-[35rem] bg-brand-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[25rem] h-[25rem] bg-accent-500/5 rounded-full blur-[100px]" />
      </div>
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500 mb-2">
              {data.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-500/0 via-brand-500 to-brand-500/0 mx-auto" />
          </motion.div>
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto text-center text-lg text-gray-300 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: data.descriptionHtml }} />
          </motion.div>
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.highlights.map((highlight, i) => (
              <motion.div
                key={i}
                variants={highlightVariants}
                custom={i}
                whileHover="hover"
                className="glass-card p-6 overflow-hidden group transition-all duration-300 border-t-2 border-brand-500/30"
              >
                <div className="relative z-10">
                  <div className="text-lg md:text-xl mb-2" dangerouslySetInnerHTML={{ __html: highlight.text }} />
                  <div className="text-sm text-brand-400 mt-2 font-mono tracking-wider">Rule {highlight.ruleReference}</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-900/0 to-brand-800/0 group-hover:from-brand-900/10 group-hover:to-brand-800/10 transition-all duration-500" />
                <div className="absolute -bottom-2 -right-2 w-24 h-24 opacity-10 transform translate-x-8 translate-y-8">
                  <div className="w-full h-0.5 bg-white/10 transform rotate-45 origin-left" />
                  <div className="w-full h-0.5 bg-white/10 transform rotate-45 origin-left mt-4" />
                  <div className="w-full h-0.5 bg-white/10 transform rotate-45 origin-left mt-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto text-center text-gray-400 italic">
            <div dangerouslySetInnerHTML={{ __html: data.footerHtml }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
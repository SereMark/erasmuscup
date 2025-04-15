import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function FeaturesSection({ data }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: .15 })
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: .2 } }
  }
  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: .6, ease: [.22, 1, .36, 1] } }
  }
  const featureVariants = {
    hidden: i => ({ y: 50, opacity: 0, rotateY: i % 2 === 0 ? -5 : 5 }),
    visible: i => ({ y: 0, opacity: 1, rotateY: 0, transition: { delay: i * .15, duration: .7, ease: [.25, .1, .25, 1] } }),
    hover: { y: -10, scale: 1.02, transition: { duration: .3, ease: [.43, .13, .23, .96] } }
  }
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: c => ({ scale: 1, opacity: 1, transition: { delay: c * .15 + .3, duration: .5, type: "spring", stiffness: 200, damping: 10 } }),
    hover: { rotate: [0, -5, 5, -5, 0], transition: { duration: .5 } }
  }

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-full h-[300px] sm:h-[500px] bg-gradient-to-b from-dark-900/0 via-brand-900/5 to-dark-900/0" />
        <div className="absolute top-1/3 left-0 w-[15rem] sm:w-[25rem] h-[15rem] sm:h-[25rem] bg-brand-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[15rem] sm:w-[30rem] h-[15rem] sm:h-[30rem] bg-accent-500/5 rounded-full blur-[100px]" />
      </div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={titleVariants} className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-brand-900/30 rounded-full text-brand-300 text-xs sm:text-sm font-medium mb-3 sm:mb-4">FEATURES</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500 mb-4 sm:mb-6">
            {data.title}
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-brand-500/0 via-brand-500 to-brand-500/0 mx-auto" />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {data.featureList.map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={featureVariants}
              whileHover="hover"
              className="relative"
            >
              <div className="glass-card p-4 sm:p-6 h-full flex flex-col items-center text-center group">
                <motion.div
                  className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 rounded-full bg-brand-900/30 flex items-center justify-center relative"
                  variants={iconVariants}
                  custom={i}
                  whileHover="hover"
                >
                  {feature.iconPath.startsWith("http") ? (
                    <img
                      src={feature.iconPath}
                      alt={`${feature.title} icon`}
                      className="w-6 h-6 sm:w-8 sm:h-8 invert brightness-0"
                    />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                    >
                      <path d={feature.iconPath} />
                    </svg>
                  )}
                  <div className="absolute inset-0 rounded-full bg-brand-500/0 group-hover:bg-brand-500/10 transition-colors duration-300" />
                  <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)]" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      stroke={`url(#feature-gradient-${i})`}
                      strokeWidth=".5"
                      strokeDasharray="0 1"
                      fill="none"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <animate attributeName="stroke-dasharray" values="0 1; 1 0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <defs>
                      <linearGradient id={`feature-gradient-${i}`} x1="0" y1="0" x2="100" y2="100">
                        <stop stopColor="#9146ff" />
                        <stop offset="1" stopColor="#d4af37" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white group-hover:text-brand-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 flex-grow">{feature.description}</p>
                <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-900/10 to-accent-900/10 rounded-2xl" />
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-brand-500/20 to-accent-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
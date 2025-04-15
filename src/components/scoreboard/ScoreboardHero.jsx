import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FaTrophy } from "react-icons/fa"

export default function ScoreboardHero({ data, houses, scores }) {
  const { scrollYProgress } = useScroll({ offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const currentTotals = scores.find(s => s.type === "total")
  const standings = currentTotals
    ? houses
      .map(h => ({ ...h, totalPoints: currentTotals.points[h.key] || 0 }))
      .sort((a, b) => b.totalPoints - a.totalPoints)
    : []
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [.22, 1, .36, 1] } }
  }
  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.8, ease: [.22, 1, .36, 1] } }
  }
  const standingVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: c => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: 0.4 + c * 0.1, duration: 0.5, ease: [.43, .13, .23, .96] }
    }),
    hover: { y: -5, transition: { duration: 0.3 } }
  }

  return (
    <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
      >
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${data.backgroundImage})` }}
        >
          <div className={`absolute inset-0 bg-gradient-to-b ${data.gradient}`} />
        </div>
      </motion.div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] rounded-full bg-brand-500/10 blur-[100px] opacity-60" />
        <div className="absolute bottom-1/3 right-1/3 w-[30rem] h-[30rem] rounded-full bg-accent-400/10 blur-[100px] opacity-70 animation-delay-1000" />
      </div>
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <motion.div initial="hidden" animate="visible" className="space-y-6 w-full">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-200 text-shadow-md"
            variants={titleVariants}
          >
            {data.title}
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
            variants={subtitleVariants}
          >
            {data.subtitle}
          </motion.p>
          {standings.length > 0 && (
            <motion.div
              className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {standings.slice(0, 3).map((house, i) => (
                <motion.div
                  key={house.key}
                  custom={i}
                  variants={standingVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="relative pt-6 pl-6"
                >
                  <div
                    className={`absolute -top-2 -left-2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ring-4 ring-dark-900 ${
                      i === 0
                        ? "bg-gradient-to-br from-yellow-300 to-yellow-500 text-dark-900 shadow-lg shadow-yellow-500/20"
                        : i === 1
                          ? "bg-gradient-to-br from-gray-300 to-gray-400 text-dark-900 shadow-md shadow-gray-500/10"
                          : "bg-gradient-to-br from-amber-600 to-amber-700 text-dark-900 shadow-md shadow-amber-700/10"
                    } z-20`}
                  >
                    {i === 0 ? <FaTrophy className="text-lg" /> : <span className="font-bold text-lg">{i + 1}</span>}
                  </div>
                  <div
                    className={`glass-card py-3 sm:py-4 px-4 sm:px-6 flex items-center gap-3 sm:gap-6 ${
                      i === 0
                        ? "border-2 border-accent-400/70 shadow-lg shadow-accent-500/20"
                        : i === 1
                          ? "border-2 border-gray-500/30"
                          : "border-2 border-amber-700/30"
                    }`}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-dark-800 flex-shrink-0 border-2 border-white/10">
                      <img
                        src={house.logo}
                        alt={`${house.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white text-base sm:text-lg">{house.name}</div>
                      <div className={`text-house-${house.key} font-mono font-medium text-sm sm:text-base`}>
                        {house.totalPoints} pts
                      </div>
                    </div>
                    {i === 0 && (
                      <div className="absolute -inset-0.5 -z-10 bg-gradient-to-r from-accent-400/30 to-brand-500/30 blur-sm rounded-2xl animate-pulse-slow" />
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
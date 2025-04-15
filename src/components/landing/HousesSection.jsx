import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function HousesSection({ data }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: .2 })
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: .2, delayChildren: .3 } }
  }
  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: .6, ease: [.22, 1, .36, 1] } }
  }
  const houseCardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: c => ({
      y: 0,
      opacity: 1,
      transition: { delay: c * .15, duration: .8, ease: [.25, .1, .25, 1] }
    }),
    hover: { y: -10, transition: { duration: .3, ease: [.43, .13, .23, .96] } }
  }
  const borderVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: c => ({
      pathLength: 1,
      opacity: 1,
      transition: { delay: c * .15 + .5, duration: 1.2, ease: "easeInOut" }
    })
  }

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/70 to-dark-950 -z-10" />
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/textures/noise.png')] bg-repeat opacity-5" /> {/* TODO */}
        <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-brand-500/10 rounded-full blur-[100px]" /> 
        <div className="absolute bottom-1/4 right-1/3 w-[35rem] h-[35rem] bg-accent-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] bg-dark-700/10 rounded-full blur-[100px]" />
      </div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={titleVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500 mb-4">
            {data.title}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-300">{data.subtitle}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.houseList.map((house, i) => (
            <motion.div
              key={house.key}
              custom={i}
              variants={houseCardVariants}
              whileHover="hover"
              className="relative group perspective"
            >
              <div className="relative preserve-3d transition-transform duration-500 group-hover:rotate-y-3 group-hover:scale-102">
                <div className={`glass-card p-6 border-t-4 border-house-${house.key} bg-house-${house.key}/10 h-full min-h-[300px] flex flex-col`}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <motion.div
                        initial={{ opacity: 0, scale: .8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * .15 + .3, duration: .6, ease: [.43, .13, .23, .96] }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <img src={house.logo} alt={`${house.name} logo`} className="w-full h-full object-contain" />
                      </motion.div>
                      <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="48"
                          stroke={`url(#house-border-gradient-${house.key}-${i})`}
                          strokeWidth="1"
                          variants={borderVariants}
                          custom={i}
                        />
                        <defs>
                          <linearGradient id={`house-border-gradient-${house.key}-${i}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                            <stop className={`text-house-${house.key}`} stopColor="currentColor" />
                            <stop offset="1" className={`text-house-${house.key}`} stopColor="currentColor" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold text-house-${house.key}`}>{house.name}</h3>
                      {house.animal && <p className="text-sm text-gray-400">{house.animal}</p>}
                    </div>
                  </div>
                  <div className="space-y-3 flex-grow">
                    {house.motto && (
                      <div className="flex items-start">
                        <span className="text-gray-400 w-24 flex-shrink-0">Motto:</span>
                        <span className="text-white italic">{house.motto}</span>
                      </div>
                    )}
                    {house.caption && <div className="text-xs text-gray-500 ml-24">{house.caption}</div>}
                    {house.captain && (
                      <div className="flex items-center">
                        <span className="text-gray-400 w-24 flex-shrink-0">Captain:</span>
                        <span className="text-white">{house.captain}</span>
                      </div>
                    )}
                  </div>
                  <div className="h-1.5 w-full bg-dark-800 rounded-full mt-4 overflow-hidden">
                    <motion.div
                      className={`h-full w-0 gradient-${house.key}`}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: i * .15 + 1, duration: .8, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div className={`absolute inset-0 bg-house-${house.key} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
              </div>
              <div className={`absolute -inset-1 bg-house-${house.key} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl`} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function RulesHero({ data }) {
  const { scrollYProgress } = useScroll({ offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  }
  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <section className="relative w-full h-[40vh] sm:h-[50vh] min-h-[300px] overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-dark-950">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/90 via-dark-900/80 to-dark-950" />
          <div className="absolute inset-0 bg-[url('/assets/textures/grid.svg')] bg-repeat opacity-10" />
        </div>
      </motion.div>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[20rem] sm:w-[35rem] h-[20rem] sm:h-[35rem] rounded-full bg-brand-500/10 blur-[100px] opacity-60"
          animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.4, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-[15rem] sm:w-[30rem] h-[15rem] sm:h-[30rem] rounded-full bg-accent-400/10 blur-[100px] opacity-70"
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.5, 0.7] }}
          transition={{ duration: 10, delay: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <motion.div initial="hidden" animate="visible" className="space-y-4 sm:space-y-6 w-full">
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
        </motion.div>
      </div>
    </section>
  )
}
import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"

export default function HeroSection({ data }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [.22, 1, .36, 1] } }
  }
  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { delay: .2, duration: 0.8, ease: [.22, 1, .36, 1] } }
  }
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: c => ({
      opacity: 1,
      y: 0,
      transition: { delay: .4 + c * .1, duration: .5, ease: [.22, 1, .36, 1] }
    }),
    hover: {
      scale: 1.05,
      filter: "drop-shadow(0 0 10px rgba(145, 70, 255, 0.5))",
      transition: { duration: .2 }
    },
    tap: {
      scale: .98,
      filter: "drop-shadow(0 0 5px rgba(145, 70, 255, 0.3))",
      transition: { duration: .1 }
    }
  }

  return (
    <section ref={heroRef} className="relative w-full h-[90vh] sm:h-screen overflow-hidden">
      <motion.div style={{ opacity, y }} className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${data.backgroundImage})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-900/70 to-dark-950" />
        </div>
      </motion.div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[20rem] sm:w-[40rem] h-[20rem] sm:h-[40rem] rounded-full bg-brand-500/10 blur-[100px] animate-pulse-slow transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/3 right-1/3 w-[15rem] sm:w-[30rem] h-[15rem] sm:h-[30rem] rounded-full bg-accent-400/10 blur-[100px] animate-pulse-slow transform translate-x-1/2 translate-y-1/2 animation-delay-1000" />
      </div>
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <motion.div initial="hidden" animate="visible" style={{ scale }} className="space-y-4 sm:space-y-6 w-full">
          <motion.h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance mx-auto" variants={titleVariants}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-300 leading-tight text-shadow-md">{data.title}</span>
          </motion.h1>
          <motion.p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light" variants={subtitleVariants}>
            {data.subtitle}
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 justify-center items-center" variants={subtitleVariants}>
            {data.buttons.map((button, i) => (
              <motion.div key={i} variants={buttonVariants} custom={i} whileHover="hover" whileTap="tap">
                <Link
                  to={button.link}
                  className={`inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 w-full sm:w-auto ${
                    button.styleType === "primary"
                      ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40"
                      : "bg-dark-800/50 backdrop-blur-sm border border-brand-500/30 text-white hover:bg-dark-800/80 hover:border-brand-500/50"
                  }`}
                >
                  {button.text}<FaArrowRight className="ml-2 text-sm opacity-70" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
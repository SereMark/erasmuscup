import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FaCalendarAlt } from "react-icons/fa"

export default function EventsHero({ currentEvent, defaultHero }) {
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({ offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  // Use current event hero text or default
  const heroText = currentEvent?.heroTexts || defaultHero
  
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [.22, 1, .36, 1] 
      } 
    }
  }
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: 0.2, 
        duration: 0.8, 
        ease: [.22, 1, .36, 1] 
      } 
    }
  }
  
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        delay: 0.4, 
        duration: 0.6, 
        ease: [.43, .13, .23, .96] 
      } 
    },
    pulse: { 
      scale: [1, 1.05, 1], 
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        repeatType: "loop" 
      } 
    }
  }

  return (
    <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div 
        style={{ y, opacity }} 
        className="absolute inset-0 w-full h-full"
      >
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/assets/logos/house-cup-cover.png)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/90 via-dark-900/80 to-dark-950" />
        </div>
      </motion.div>
      
      {/* Decorative glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-screen h-screen rounded-full bg-brand-500/10 blur-[100px] opacity-60"
          animate={{ 
            scale: [1, 1.05, 1], 
            opacity: [0.6, 0.4, 0.6] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-screen h-screen rounded-full bg-accent-400/10 blur-[100px] opacity-70"
          animate={{ 
            scale: [1, 1.1, 1], 
            opacity: [0.7, 0.5, 0.7] 
          }}
          transition={{ 
            duration: 10, 
            delay: 2, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          className="space-y-6 w-full"
        >
          {/* Badge (if available) */}
          {heroText.badgeText && (
            <motion.div
              variants={badgeVariants}
              animate={["visible", "pulse"]}
              className="inline-flex mx-auto items-center px-5 py-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-medium shadow-lg shadow-brand-500/30 mb-4"
            >
              <span className="flex items-center">
                {currentEvent?.status === "active" ? (
                  <span className="mr-2 relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
                  </span>
                ) : (
                  <FaCalendarAlt className="mr-2 text-brand-300" />
                )}
                {heroText.badgeText}
              </span>
            </motion.div>
          )}
          
          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-200 text-shadow-md"
            variants={titleVariants}
          >
            {heroText.title}
          </motion.h1>
          
          {/* Message/Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
            variants={subtitleVariants}
          >
            {heroText.message}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
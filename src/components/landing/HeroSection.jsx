import React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"

export default function HeroSection({ data }) {
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  
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
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: 0.4 + i * 0.1, 
        duration: 0.5, 
        ease: [.22, 1, .36, 1] 
      }
    }),
    hover: {
      scale: 1.05,
      filter: "drop-shadow(0 0 10px rgba(145, 70, 255, 0.5))",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }

  return (
    <section className="relative w-full h-dynamic-screen overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div 
        style={{ opacity, y }} 
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${data.backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-900/70 to-dark-950" />
        </div>
      </motion.div>
      
      {/* Decorative glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-screen h-screen rounded-full bg-brand-500/10 blur-[100px] animate-pulse-slow transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/3 right-1/3 w-screen h-screen rounded-full bg-accent-400/10 blur-[100px] animate-pulse-slow transform translate-x-1/2 translate-y-1/2 animation-delay-1000" />
      </div>
      
      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          style={{ scale }} 
          className="space-y-6 w-full"
        >
          {/* Title */}
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance mx-auto" 
            variants={titleVariants}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-300 leading-tight text-shadow-md">
              {data.title}
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light" 
            variants={subtitleVariants}
          >
            {data.subtitle}
          </motion.p>
          
          {/* Action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-8 justify-center items-center" 
            variants={subtitleVariants}
          >
            {data.buttons.map((button, i) => (
              <motion.div 
                key={i} 
                variants={buttonVariants} 
                custom={i} 
                whileHover="hover" 
                whileTap="tap"
              >
                <Link
                  to={button.link}
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 w-full sm:w-auto ${
                    button.styleType === "primary"
                      ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40"
                      : "bg-dark-800/50 backdrop-blur-sm border border-brand-500/30 text-white hover:bg-dark-800/80 hover:border-brand-500/50"
                  }`}
                >
                  {button.text}
                  <FaArrowRight className="ml-2 text-sm opacity-70" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function FeaturesSection({ data }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 })
  
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.2 
      } 
    }
  }
  
  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.6, 
        ease: [.22, 1, .36, 1] 
      } 
    }
  }
  
  const featureVariants = {
    hidden: i => ({ 
      y: 50, 
      opacity: 0, 
      rotateY: i % 2 === 0 ? -5 : 5 
    }),
    visible: i => ({ 
      y: 0, 
      opacity: 1, 
      rotateY: 0, 
      transition: { 
        delay: i * 0.15, 
        duration: 0.7, 
        ease: [.25, .1, .25, 1] 
      } 
    }),
    hover: { 
      y: -10, 
      scale: 1.02, 
      transition: { 
        duration: 0.3, 
        ease: [.43, .13, .23, .96] 
      } 
    }
  }
  
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: i => ({ 
      scale: 1, 
      opacity: 1, 
      transition: { 
        delay: i * 0.15 + 0.3, 
        duration: 0.5, 
        type: "spring", 
        stiffness: 200, 
        damping: 10 
      } 
    }),
    hover: { 
      rotate: [0, -5, 5, -5, 0], 
      transition: { duration: 0.5 } 
    }
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-full h-[500px] bg-gradient-to-b from-dark-900/0 via-brand-900/5 to-dark-900/0" />
        <div className="absolute top-1/3 left-0 w-screen h-screen bg-brand-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-screen h-screen bg-accent-500/5 rounded-full blur-[100px]" />
      </div>
      
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <motion.div variants={titleVariants} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-900/30 rounded-full text-brand-300 text-sm font-medium mb-4">
            FEATURES
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500 mb-4">
            {data.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500/0 via-brand-500 to-brand-500/0 mx-auto" />
        </motion.div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {data.featureList.map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={featureVariants}
              whileHover="hover"
              className="relative"
            >
              <div className="glass-card p-6 h-full flex flex-col items-center text-center group">
                {/* Feature icon */}
                <motion.div
                  className="w-16 h-16 mb-6 rounded-full bg-brand-900/30 flex items-center justify-center relative"
                  variants={iconVariants}
                  custom={i}
                  whileHover="hover"
                >
                  {feature.iconPath.startsWith("http") ? (
                    <img
                      src={feature.iconPath}
                      alt={`${feature.title} icon`}
                      className="w-8 h-8 invert brightness-0"
                    />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-8 h-8 text-white"
                    >
                      <path d={feature.iconPath} />
                    </svg>
                  )}
                  
                  {/* Icon hover effect */}
                  <div className="absolute inset-0 rounded-full bg-brand-500/0 group-hover:bg-brand-500/10 transition-colors duration-300" />
                  
                  {/* Animated circle around icon */}
                  <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)]" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      stroke="url(#feature-gradient)"
                      strokeWidth=".5"
                      strokeDasharray="0 1"
                      fill="none"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <animate attributeName="stroke-dasharray" values="0 1; 1 0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <defs>
                      <linearGradient id="feature-gradient" x1="0" y1="0" x2="100" y2="100">
                        <stop stopColor="#9146ff" />
                        <stop offset="1" stopColor="#d4af37" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
                
                {/* Feature title */}
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-brand-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                {/* Feature description */}
                <p className="text-gray-400 flex-grow">
                  {feature.description}
                </p>
                
                {/* Hover glow effect */}
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
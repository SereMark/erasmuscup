import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function PrincipleSection({ data }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: .3 })
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: .2 } }
  }
  const textVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: .7, ease: [.22, 1, .36, 1] } }
  }
  const titleChars = data.title.split("")

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-dark-950/90 -z-10" />
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-[url('/assets/textures/grid.svg')] bg-repeat opacity-5" /> {/* TODO */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-[25rem] bg-brand-500/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-[25rem] bg-accent-500/5 blur-[100px] rounded-full" />
      </div>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-32 h-full opacity-20">
        <div className="w-full h-[1px] bg-gradient-to-r from-brand-500/0 via-brand-500/50 to-brand-500/0" />
        <div className="w-full h-[1px] bg-gradient-to-r from-accent-500/0 via-accent-500/50 to-accent-500/0 mt-8" />
        <div className="w-full h-[1px] bg-gradient-to-r from-brand-500/0 via-brand-500/50 to-brand-500/0 mt-8" />
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full opacity-20">
        <div className="w-full h-[1px] bg-gradient-to-l from-brand-500/0 via-brand-500/50 to-brand-500/0" />
        <div className="w-full h-[1px] bg-gradient-to-l from-accent-500/0 via-accent-500/50 to-accent-500/0 mt-8" />
        <div className="w-full h-[1px] bg-gradient-to-l from-brand-500/0 via-brand-500/50 to-brand-500/0 mt-8" />
      </div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="mb-12 text-center">
          <div className="overflow-hidden">
            <h2 className="inline-block text-3xl md:text-5xl font-bold">
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial={{ y: 50, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                  transition={{ delay: i * .03, duration: .5, ease: [.43, .13, .23, .96] }}
                  className={char === " " ? "inline-block mr-2" : "inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500"}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h2>
          </div>
        </div>
        <motion.div variants={textVariants} className="relative glass-card p-8 md:p-12 pb-16 overflow-hidden border border-brand-900/50">
          <div className="text-xl md:text-2xl text-center mb-8 leading-relaxed text-gray-200" dangerouslySetInnerHTML={{ __html: data.mainTextHtml }} />
          <div className="text-lg text-center text-gray-400" dangerouslySetInnerHTML={{ __html: data.secondaryTextHtml }} />
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 opacity-20 rotate-12">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="url(#principle-diamond-gradient-1)" strokeWidth="2" />
              <defs>
                <linearGradient id="principle-diamond-gradient-1" x1="5" y1="5" x2="95" y2="95" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9146ff" />
                  <stop offset="1" stopColor="#d4af37" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-24 h-24 opacity-20 -rotate-12">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="url(#principle-diamond-gradient-2)" strokeWidth="2" />
              <defs>
                <linearGradient id="principle-diamond-gradient-2" x1="5" y1="5" x2="95" y2="95" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9146ff" />
                  <stop offset="1" stopColor="#d4af37" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-accent-500/5 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, .5, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.div>
        <motion.div variants={textVariants} className="mt-12 mx-auto w-24 h-1 bg-gradient-to-r from-brand-500/0 via-brand-500 to-brand-500/0" />
      </motion.div>
    </section>
  )
}
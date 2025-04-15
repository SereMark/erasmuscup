import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaInstagram } from "react-icons/fa"

export default function InstagramSection({ data }) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: .15 })
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: .2 } }
  }
  const contentVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: .6, ease: [.22, 1, .36, 1] } }
  }
  const buttonVariants = {
    hidden: { scale: .9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { delay: .4, duration: .5, ease: [.43, .13, .23, .96] } },
    hover: { scale: 1.05, filter: "drop-shadow(0 0 10px rgba(145, 70, 255, 0.5))", transition: { duration: .3 } },
    tap: { scale: .95, transition: { duration: .1 } }
  }

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 to-dark-900 -z-10" />
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-[15rem] sm:h-[25rem] bg-gradient-to-b from-brand-500/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[15rem] sm:h-[25rem] bg-gradient-to-t from-accent-500/5 to-transparent" />
        <div className="absolute inset-0 bg-[url('/assets/textures/grid.svg')] bg-repeat opacity-5" />
      </div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div variants={contentVariants} className="text-center mb-8 sm:mb-12">
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-brand-900/30 rounded-full text-brand-300 text-xs sm:text-sm font-medium mb-3 sm:mb-4">CONNECT WITH US</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500 mb-4">
              {data.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">{data.description}</p>
          </motion.div>
          <motion.div variants={contentVariants} className="glass-card overflow-hidden relative border border-brand-900/50">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/20 via-accent-500/20 to-brand-500/20 rounded-2xl blur-xl opacity-50 -z-10" />
            <div className="w-full h-12 sm:h-16 bg-gradient-to-r from-brand-600 to-accent-600 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/assets/textures/noise.png')] bg-repeat opacity-10"></div>
              <div className="flex items-center space-x-2">
                <FaInstagram className="text-white text-lg sm:text-xl" />
                <h3 className="text-lg sm:text-xl font-bold text-white">House Cup 2025</h3>
                <FaInstagram className="text-white text-lg sm:text-xl" />
              </div>
            </div>
            <div className="p-5 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
              <div className="md:w-2/5 flex flex-col items-center">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ delay: 1, duration: 2, repeat: Infinity, repeatDelay: 5 }}
                  className="relative"
                >
                  <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden relative border-4 border-white/10 shadow-lg">
                    <img src={data.logoImage} alt="House Cup Logo" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/30 to-accent-500/30 mix-blend-overlay"></div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-brand-500 to-accent-500 p-2 sm:p-3 rounded-full shadow-glow-sm">
                    <FaInstagram className="text-white text-lg sm:text-2xl" />
                  </div>
                </motion.div>
                <div className="mt-4 sm:mt-6 flex gap-4 sm:gap-6 text-center">
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-white">{data.postCount}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Posts</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-white">{data.followerCount}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Followers</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-white">{data.followingCount}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Following</div>
                  </div>
                </div>
              </div>
              <div className="md:w-3/5 flex flex-col items-center md:items-start">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white">{data.username}</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 text-center md:text-left">
                  Official Instagram account for the House Cup 2025 competition. Follow us for event updates, behind-the-scenes content, and exclusive announcements!
                </p>
                <motion.a
                  href={data.profileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-medium rounded-full shadow-lg shadow-brand-500/20 w-full md:w-auto text-sm sm:text-base"
                >
                  <FaInstagram className="mr-2" />
                  Follow us on Instagram
                </motion.a>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-32 sm:w-48 h-32 sm:h-48 opacity-10 hidden sm:block">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="url(#instagram-diamond-gradient-1)" strokeWidth="1" />
                <defs>
                  <linearGradient id="instagram-diamond-gradient-1" x1="0" y1="0" x2="100" y2="100">
                    <stop offset="0%" stopColor="#9146ff" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute -bottom-12 -left-12 w-32 sm:w-48 h-32 sm:h-48 opacity-10 rotate-45 hidden sm:block">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="url(#instagram-diamond-gradient-2)" strokeWidth="1" />
                <defs>
                  <linearGradient id="instagram-diamond-gradient-2" x1="0" y1="0" x2="100" y2="100">
                    <stop offset="0%" stopColor="#9146ff" />
                    <stop offset="100%" stopColor="#d4af37" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
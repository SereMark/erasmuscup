import React, { memo, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

/**
 * Hero component for the Events page
 * Features dynamic background handling and smooth animations
 */
const EventsHero = ({ data }) => {
  const { title, subtitle, backgroundImage } = data;
  const [viewportHeight, setViewportHeight] = useState(0);
  const controls = useAnimation();

  // Handle viewport height for mobile devices
  useEffect(() => {
    const updateViewportHeight = () => {
      // Use visual viewport height for mobile devices to handle address bar properly
      setViewportHeight(window.visualViewport?.height || window.innerHeight);
    };
    
    // Set initial height
    updateViewportHeight();
    
    // Update on resize and orientation change
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);
    
    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
    };
  }, []);

  // Start animations when component mounts
  useEffect(() => {
    const startAnimations = async () => {
      await controls.start("visible");
    };
    
    startAnimations();
  }, [controls]);

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.7,
        staggerChildren: 0.15
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const floatAnimation = {
    hidden: { y: 0 },
    visible: {
      y: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  };

  // Particle animation for decorative elements
  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: i => ({
      opacity: 0.6,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8
      }
    })
  };

  // Generate particles with proper memoization to prevent re-renders
  const particles = React.useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      key: i,
      size: Math.floor(Math.random() * 4) + 2,
      color: `brand-${Math.floor(Math.random() * 3) + 4}00`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      delay: i * 0.1
    }));
  }, []);

  return (
    <section 
      className="relative overflow-hidden"
      style={{ minHeight: viewportHeight ? `${viewportHeight * 0.85}px` : '85vh' }}
      aria-label="Events page header"
    >
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        {backgroundImage ? (
          <>
            {/* Dark overlay for text contrast */}
            <div className="absolute inset-0 bg-dark-950/70 z-10"></div>
            
            {/* Background image with subtle zoom effect */}
            <motion.div 
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${backgroundImage})` }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 to-dark-950"></div>
        )}
        
        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-5"></div>
        
        {/* Decorative particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.key}
              custom={particle.key}
              variants={particleVariants}
              initial="hidden"
              animate="visible"
              className={`absolute w-${particle.size} h-${particle.size} rounded-full bg-${particle.color}/20`}
              style={{
                top: particle.y,
                left: particle.x,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>
        
        {/* Subtle accent lighting elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-brand-500/5 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        ></motion.div>
        <motion.div 
          className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-accent-500/5 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        ></motion.div>
      </div>

      {/* Content */}
      <motion.div 
        className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 h-full flex items-center py-24 md:py-28 lg:py-32"
        variants={contentVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Floating trophy icon */}
          <motion.div
            variants={elementVariants}
            className="mb-6 inline-block"
          >
            <motion.div 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-dark-800/80 backdrop-blur-sm border border-brand-500/30 flex items-center justify-center mx-auto shadow-xl"
              variants={floatAnimation}
            >
              <span className="text-2xl sm:text-3xl" aria-hidden="true">🏆</span>
            </motion.div>
          </motion.div>
          
          {/* Title with gradient text */}
          <motion.div variants={titleVariants}>
            <h1 className="mb-5 gradient-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              {title}
            </h1>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full mb-5"></div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={elementVariants}
            className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
          
          {/* Event Stats */}
          <motion.div
            variants={elementVariants}
            className="mt-10 flex flex-wrap justify-center gap-3 md:gap-4"
          >
            <motion.div 
              className="flex items-center px-5 py-2.5 rounded-full bg-dark-800/90 backdrop-blur-sm border border-dark-700/70 shadow-lg group"
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-900/50 mr-3 group-hover:bg-brand-800/80 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-brand-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-white group-hover:text-brand-300 transition-colors">100+ Points</div>
                <div className="text-xs text-dark-300">Available to win</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center px-5 py-2.5 rounded-full bg-dark-800/90 backdrop-blur-sm border border-dark-700/70 shadow-lg group"
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-900/50 mr-3 group-hover:bg-accent-800/80 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-accent-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-white group-hover:text-accent-300 transition-colors">Spring Season</div>
                <div className="text-xs text-dark-300">February-June 2025</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center px-5 py-2.5 rounded-full bg-dark-800/90 backdrop-blur-sm border border-dark-700/70 shadow-lg group"
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-success-900/50 mr-3 group-hover:bg-success-800/80 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-success-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-white group-hover:text-success-300 transition-colors">4 Houses</div>
                <div className="text-xs text-dark-300">Competing for glory</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Call-to-action */}
          <motion.div 
            variants={elementVariants}
            className="mt-12"
          >
            <motion.a 
              href="#events-list" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-600 text-white font-medium px-6 py-3 rounded-lg hover:from-brand-700 hover:to-accent-700 transition-all shadow-lg hover:shadow-brand-600/20 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-dark-900"
              onClick={(e) => {
                e.preventDefault();
                const eventsSection = document.querySelector('#events-list');
                if (eventsSection) {
                  eventsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              aria-label="Browse Events"
            >
              <span>Browse Events</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 animate-bounce-slow" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.a>
          </motion.div>
          
          {/* Extra decorative elements */}
          <div className="absolute -bottom-4 left-0 right-0 flex justify-center pointer-events-none">
            <motion.div
              className="w-1 h-16 bg-gradient-to-b from-accent-500/50 to-transparent rounded-full"
              animate={{ 
                scaleY: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut" 
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient fade for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-20" aria-hidden="true">
        <div className="w-full h-full bg-gradient-to-t from-dark-950 to-transparent"></div>
      </div>
    </section>
  );
};

export default memo(EventsHero);
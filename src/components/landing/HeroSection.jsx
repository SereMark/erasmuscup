import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const HeroSection = ({ data }) => {
  const { title, subtitle, backgroundImage, buttons } = data;
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    
    if (!hero || !image || !overlay) return;

    // Parallax effect
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollSpeed = 0.35;
      
      // Move background image at a controlled rate
      gsap.to(image, {
        y: scrollPosition * scrollSpeed,
        duration: 0.4,
        ease: 'power1.out',
      });
      
      // Ensure the overlay follows the image exactly
      gsap.set(overlay, {
        y: scrollPosition * scrollSpeed,
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Image */}
        <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <img
              src={backgroundImage}
              alt="House Cup Background"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>
        
        {/* Overlay */}
        <div 
          ref={overlayRef} 
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/95 via-dark-950/85 to-dark-950 backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32"
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Animated Title */}
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-4 md:mb-6 gradient-text text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight"
          >
            {title}
          </motion.h1>

          {/* Animated Subtitle */}
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-base md:text-lg lg:text-xl mb-8 md:mb-10 text-white/90 max-w-xl mx-auto"
          >
            {subtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {buttons.map((button, index) => (
              <Link
                key={index}
                to={button.link}
                className={
                  button.styleType === 'primary'
                    ? 'btn-primary w-full sm:w-auto'
                    : 'btn-secondary w-full sm:w-auto'
                }
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {button.text}
                </motion.span>
              </Link>
            ))}
          </motion.div>

          {/* Scroll indicator - Hidden on very small screens */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center hidden sm:flex"
          >
            <span className="text-dark-200 text-xs md:text-sm mb-2">Scroll Down</span>
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brand-400"
              >
                <path d="M12 5v14"></path>
                <path d="m19 12-7 7-7-7"></path>
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gradient-to-t from-dark-950 via-dark-950/90 to-transparent z-10"></div>
    </section>
  );
};

export default HeroSection;
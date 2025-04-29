import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PrincipleSection = ({ data }) => {
  const { title, mainTextHtml, secondaryTextHtml } = data;
  
  const sectionRef = useRef(null);
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden bg-dark-950"
    >
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0">
          {/* Decorative Pattern */}
          <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 grid-rows-3 border border-dark-800/20">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="border border-dark-800/10 flex items-center justify-center"
              >
                {i % 3 === 0 && (
                  <div className={`h-8 w-8 md:h-12 md:w-12 rounded-full opacity-20
                    ${i % 6 === 0 ? 'bg-brand-500' : 'bg-accent-500'}`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          style={{ y: textY }}
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12 text-center"
          >
            <h2 className="text-white mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl">{title}</h2>
            <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-brand-500 to-brand-400 mx-auto rounded-full"></div>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="glass-card p-6 md:p-8 lg:p-10 mb-8 relative z-10 border border-dark-800/50 shadow-xl"
          >
            {/* Decorative Quotation Mark */}
            <div className="absolute -top-4 md:-top-6 -left-2 md:-left-6 text-6xl md:text-8xl text-brand-500/20 font-serif hidden sm:block">
              "
            </div>
            
            {/* Main Text */}
            <div 
              className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white mb-6 md:mb-8"
              dangerouslySetInnerHTML={{ __html: mainTextHtml }}
            />
            
            {/* Secondary Text */}
            <div 
              className="text-base md:text-lg leading-relaxed text-dark-100"
              dangerouslySetInnerHTML={{ __html: secondaryTextHtml }}
            />
            
            {/* Closing Quotation Mark */}
            <div className="absolute -bottom-8 md:-bottom-12 -right-2 md:-right-6 text-6xl md:text-8xl text-brand-500/20 font-serif rotate-180 hidden sm:block">
              "
            </div>
          </motion.div>
          
          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center mt-12 md:mt-16"
          >
            <div className="relative">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-brand-400/30 flex items-center justify-center">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-500"></div>
              </div>
              <div className="absolute -top-1 -right-1 -bottom-1 -left-1 rounded-full border border-brand-400/30 animate-pulse"></div>
              <div className="absolute -top-3 -right-3 -bottom-3 -left-3 md:-top-4 md:-right-4 md:-bottom-4 md:-left-4 rounded-full border border-brand-400/10"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrincipleSection;
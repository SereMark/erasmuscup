import React from 'react';
import { motion } from 'framer-motion';
import { useStaggerAnimation } from '../../utils/animationUtils';

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      className="feature-item glass-card p-4 md:p-6 relative overflow-hidden group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Card content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-brand-500/20 flex items-center justify-center mb-3 md:mb-4 transition-colors duration-300 group-hover:bg-brand-500/30">
          <img 
            src={feature.iconPath} 
            alt={feature.title} 
            className="w-5 h-5 md:w-6 md:h-6 text-brand-400" 
          />
        </div>
        
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-white mb-2">{feature.title}</h3>
        
        {/* Description */}
        <p className="text-dark-200 group-hover:text-dark-100 transition-colors duration-300 text-sm md:text-base">
          {feature.description}
        </p>
      </div>
      
      {/* Background design elements */}
      <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-bl from-brand-500/10 to-transparent rounded-bl-full transform -translate-y-1/2 translate-x-1/2 transition-all duration-300 group-hover:scale-110 group-hover:from-brand-500/20"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-tr from-dark-800 to-transparent rounded-tr-full"></div>
    </motion.div>
  );
};

const FeaturesSection = ({ data }) => {
  const { title, featureList } = data;
  
  // Animation reference for staggered animation
  const featuresRef = useStaggerAnimation({
    childSelector: '.feature-item',
    animation: 'slideUp',
    stagger: 0.1,
  });
  
  return (
    <section className="bg-dark-950 py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section title */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="gradient-text mb-4 text-2xl md:text-3xl lg:text-4xl">{title}</h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-brand-400 to-accent-400 mx-auto rounded-full"></div>
        </motion.div>
        
        {/* Features grid */}
        <div
          ref={featuresRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
        >
          {featureList.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index} 
            />
          ))}
        </div>
        
        {/* Bottom divider wave - Hide on small screens, simplified on medium screens */}
        <div className="absolute bottom-0 left-0 w-full hidden md:block">
          <svg 
            viewBox="0 0 1440 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path 
              d="M0 0L48 8.875C96 17.75 192 35.5 288 44.375C384 53.25 480 53.25 576 46.6667C672 40.0833 768 26.8333 864 26.8333C960 26.8333 1056 40.0833 1152 44.375C1248 48.6667 1344 44.375 1392 42.2292L1440 40.0833V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z" 
              fill="#121214" 
              fillOpacity="0.3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
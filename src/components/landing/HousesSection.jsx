import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { getHouseTheme } from '../../utils/houseTheme';

const HouseCard = memo(({ house, index }) => {
  // Get house theme using the global utility
  const houseTheme = getHouseTheme(house.key);
  
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={`relative rounded-xl overflow-hidden bg-dark-800 transition-all duration-300 group-hover:shadow-lg group-hover:${houseTheme.glow} group-hover:-translate-y-2 h-full flex flex-col`}>
        {/* Accent top bar */}
        <div className={`h-1.5 w-full ${houseTheme.bg}`} aria-hidden="true"></div>
        
        {/* House Logo */}
        <div className="relative pt-6 md:pt-8 px-4 md:px-6 flex justify-center">
          <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full ${houseTheme.border} border bg-dark-900/80 p-3 md:p-4 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110`}>
            <img
              src={house.logo}
              alt={`${house.name} Logo`}
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          </div>
        </div>
        
        {/* House Info */}
        <div className="p-4 md:p-6 flex-grow">
          <h3 className={`text-xl md:text-2xl font-bold mb-2 text-center ${houseTheme.text}`}>{house.name}</h3>
          
          <div className="flex flex-col items-center mb-3 md:mb-4 space-y-1">
            <span className="text-dark-100 text-xs md:text-sm font-medium">{house.animal}</span>
            <span className="text-dark-300 text-xs md:text-sm">Captain: {house.captain}</span>
          </div>
          
          <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-dark-700">
            <p className="italic text-gray-300 text-xs md:text-sm text-center">"{house.motto}"</p>
            {house.caption && (
              <p className="text-dark-300 text-xs mt-2 text-center">{house.caption}</p>
            )}
          </div>
        </div>
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 dot-pattern pointer-events-none" aria-hidden="true"></div>
      </div>
    </motion.div>
  );
});

// Set display name for the memoized component
HouseCard.displayName = 'HouseCard';

const HousesSection = ({ data }) => {
  const { title, subtitle, houseList } = data;
  
  return (
    <section className="bg-dark-950 py-16 md:py-24 relative" id="houses">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-dark-900/50 to-transparent opacity-60" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl">{title}</h2>
          <p className="text-dark-200 text-sm md:text-base">{subtitle}</p>
          
          {/* Decorative underline */}
          <div className="h-1 w-16 md:w-24 bg-brand-500 mx-auto mt-4 md:mt-6 rounded-full opacity-70"></div>
        </motion.div>
        
        {/* Houses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {houseList.map((house, index) => (
            <HouseCard key={house.key} house={house} index={index} />
          ))}
        </div>
        
        {/* CTA Button */}
        <motion.div 
          className="mt-12 md:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.a 
            href="/events" 
            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg shadow-lg hover:shadow-xl hover:shadow-brand-500/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Join the next event!
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 md:h-5 md:w-5 ml-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </motion.a>
          <p className="mt-3 md:mt-4 text-dark-300 text-xs md:text-sm">Find out which House you belong to and join the competition!</p>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(HousesSection);
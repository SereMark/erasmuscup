import React from 'react';
import { motion } from 'framer-motion';
import { getHouseTheme } from '../../utils/houseTheme';

const HouseCard = ({ house, index }) => {
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
        <div className={`h-1.5 w-full ${houseTheme.bg}`}></div>
        
        {/* House Logo */}
        <div className="relative pt-8 px-6 flex justify-center">
          <div className={`w-24 h-24 rounded-full ${houseTheme.border} border bg-dark-900/80 p-4 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110`}>
            <img
              src={house.logo}
              alt={`${house.name} Logo`}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        
        {/* House Info */}
        <div className="p-6 flex-grow">
          <h3 className={`text-2xl font-bold mb-2 text-center ${houseTheme.text}`}>{house.name}</h3>
          
          <div className="flex flex-col items-center mb-4 space-y-1">
            <span className="text-dark-100 text-sm font-medium">{house.animal}</span>
            <span className="text-dark-300 text-sm">Captain: {house.captain}</span>
          </div>
          
          <div className="mt-4 pt-4 border-t border-dark-700">
            <p className="italic text-gray-300 text-sm text-center">"{house.motto}"</p>
            {house.caption && (
              <p className="text-dark-300 text-xs mt-2 text-center">{house.caption}</p>
            )}
          </div>
        </div>
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5 dot-pattern pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

const HousesSection = ({ data }) => {
  const { title, subtitle, houseList } = data;
  
  return (
    <section className="bg-dark-950 py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-dark-900/50 to-transparent opacity-60"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white mb-4">{title}</h2>
          <p className="text-dark-200">{subtitle}</p>
          
          {/* Decorative underline */}
          <div className="h-1 w-24 bg-brand-500 mx-auto mt-6 rounded-full opacity-70"></div>
        </motion.div>
        
        {/* Houses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {houseList.map((house, index) => (
            <HouseCard key={house.key} house={house} index={index} />
          ))}
        </div>
        
        {/* CTA Button */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.a 
            href="/events" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg shadow-lg hover:shadow-xl hover:shadow-brand-500/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Join the next event!
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </motion.a>
          <p className="mt-4 text-dark-300 text-sm">Find out which House you belong to and join the competition!</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HousesSection;
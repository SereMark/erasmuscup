import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useAnimation as useAnimationHook } from "../../../hooks/useAnimation";
import { HouseInfoItem } from "./HouseInfoItem";

/**
 * Component displaying a house card with info and styling
 */
export function HouseCard({ house, inView: parentInView }) {
  const { ref, hasBeenInView } = useAnimationHook();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={hasBeenInView || parentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: house.delay }}
      className="group h-full relative"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${house.gradient} opacity-20 rounded-2xl blur-xl transform group-hover:scale-105 transition-all duration-700 -rotate-2`}></div>
      
      {/* Card content */}
      <div className="relative h-full bg-black/70 rounded-2xl p-5 sm:p-8 border border-white/10 backdrop-blur-md overflow-hidden transform transition-all duration-500 group-hover:translate-y-[-8px] group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
        {/* Top-right decorative element */}
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br opacity-20 rounded-bl-full"></div>
        
        {/* Header with title and logo */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-br drop-shadow-lg">
              <span className={`bg-gradient-to-r ${house.gradient}`} style={{ WebkitBackgroundClip: 'text' }}>
                {house.name}
              </span>
            </h3>
            <div className={`h-1 w-12 sm:w-16 bg-gradient-to-r ${house.gradient} rounded-full mb-3 sm:mb-4`}></div>
          </div>
          
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${house.gradient} opacity-30 rounded-full blur-md transform group-hover:scale-110 transition-all duration-500`}></div>
            <motion.img
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              src={house.logo}
              alt={`${house.name} Logo`}
              className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
              loading="lazy"
            />
          </div>
        </div>
        
        {/* House info list */}
        <div className="relative z-10 mt-4 sm:mt-6">
          <ul className="space-y-2 sm:space-y-2.5">
            <HouseInfoItem icon="colors" label="Colors" value={house.colors} />
            <HouseInfoItem icon="animal" label="Animal" value={house.animal} />
            <HouseInfoItem 
              icon="motto" 
              label="Motto" 
              value={`"${house.motto}"`}
              caption={house.caption} 
            />
            <HouseInfoItem icon="captain" label="Captain" value={house.captain} />
          </ul>
        </div>
        
        {/* Bottom-right decorative element */}
        <div className={`absolute bottom-0 right-0 h-32 sm:h-40 w-32 sm:w-40 bg-gradient-to-tl ${house.gradient} opacity-10 rounded-tl-full transform translate-y-1/4 translate-x-1/4 group-hover:scale-125 transition-all duration-700`}></div>
      </div>
    </motion.div>
  );
}
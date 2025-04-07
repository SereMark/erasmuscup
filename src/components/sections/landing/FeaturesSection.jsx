import React from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../../../hooks/useAnimation";
import { fadeInVariants } from "../../../constants/animations";
import { FEATURES } from "../../../constants/featuresData";
import { GradientCard } from "../../common/ui/GradientCard";
import { SectionTitle } from "../../common/ui/SectionTitle";

export default function FeaturesSection() {
  const { ref, hasBeenInView } = useAnimation({ threshold: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={hasBeenInView ? "visible" : "hidden"}
      variants={fadeInVariants}
      className="relative h-full"
    >
      <GradientCard 
        gradient="from-purple-800 to-pink-800" 
        rotation="rotate-2"
        className="p-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <SectionTitle 
            title="Key Features"
            gradient="from-pink-300 to-purple-300"
          />
        </motion.div>
        
        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col p-3 rounded-2xl bg-black/30 backdrop-blur-sm border border-purple-900/20 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_5px_15px_rgba(147,51,234,0.1)] group"
            >
              {/* Icon centered above text */}
              <div className="mx-auto mb-2 p-2 rounded-xl bg-gradient-to-br from-pink-600/20 to-purple-700/20 border border-pink-700/20 text-pink-400 group-hover:text-pink-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                </svg>
              </div>
              
              {/* Text content centered */}
              <div className="text-center">
                <h3 className="text-sm font-semibold mb-1 text-gray-100 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </GradientCard>
    </motion.div>
  );
}
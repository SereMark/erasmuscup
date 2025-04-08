import React from "react";
import { motion } from "framer-motion";
import { GradientCard } from "../../common/ui/GradientCard";
import { useAnimation } from "../../../hooks/useAnimation";

/**
 * Reusable EventCard component for displaying House Cup events
 * 
 * @param {Object} props
 * @param {string} props.type - Event type (e.g., "SPECIAL GAMBIT", "MAIN EVENT")
 * @param {string} props.typeColor - CSS class for the type background color
 * @param {string} props.typeTextColor - CSS class for the type text color
 * @param {string} props.date - Event date display
 * @param {string} props.title - Event title
 * @param {string} props.gradient - CSS classes for gradient
 * @param {string} props.gradientText - CSS classes for gradient text
 * @param {string} props.rotation - CSS transform class for card rotation
 * @param {ReactNode} props.icon - Icon component
 * @param {string} props.iconBgColor - CSS class for icon background
 * @param {ReactNode} props.children - Card content
 * @param {number} props.delay - Animation delay in seconds
 */
export default function EventCard({
  type,
  typeColor,
  typeTextColor,
  date,
  title,
  gradient,
  gradientText,
  rotation,
  icon,
  iconBgColor,
  children,
  delay = 0
}) {
  const { ref, hasBeenInView } = useAnimation({ threshold: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      <GradientCard 
        gradient={gradient} 
        rotation={rotation}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center mb-3">
              {type && (
                <div className={`${typeColor} ${typeTextColor} px-3 py-1 rounded-full text-sm font-medium mr-3`}>
                  {type}
                </div>
              )}
              {date && <span className="text-gray-400 text-sm">{date}</span>}
            </div>
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${gradientText}`}>
              {title}
            </h2>
            <div className={`h-1 w-16 sm:w-20 bg-gradient-to-r ${gradient} rounded-full mb-3`}></div>
          </div>
          <div className={`${iconBgColor} p-2 rounded-xl border border-opacity-20`}>
            {icon}
          </div>
        </div>
        
        {children}
      </GradientCard>
    </motion.div>
  );
}
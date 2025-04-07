import React from "react";
import { motion } from "framer-motion";
import { useAnimation } from "../../../hooks/useAnimation";

export function AnimatedSection({ 
  children,
  className = "",
  delay = 0,
  distance = 30,
  ...props
}) {
  const { ref, hasBeenInView } = useAnimation();
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration: 0.6, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
import React from "react";
import { motion } from "framer-motion";

export function SectionTitle({ 
  title,
  subtitle,
  gradient = "from-purple-300 to-pink-300",
  align = "left",
  delay = 0
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`mb-4 sm:mb-6 ${alignClass}`}
    >
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl">
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-16 sm:w-20 bg-gradient-to-r ${gradient} rounded-full mb-3 sm:mb-4 ${align === "center" ? "mx-auto" : ""}`}></div>
    </motion.div>
  );
}
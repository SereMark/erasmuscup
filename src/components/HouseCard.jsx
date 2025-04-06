import React from "react";
import { motion } from "framer-motion";

export default function HouseCard({ title, gradient, logo, items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2, type: "spring", stiffness: 300 }
      }}
      className={`rounded-xl overflow-hidden flex flex-col h-full group ${gradient} relative`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-sm transition-all duration-300 group-hover:backdrop-blur-md" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[length:20px_20px] bg-grid-pattern mix-blend-overlay transition-opacity duration-500" />
      <div className="absolute -inset-1 bg-gradient-to-r from-white/5 to-white/10 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 -z-10" />
      <div className="relative z-10 p-5 sm:p-7 flex flex-col h-full">
        <div className="flex justify-between items-start mb-5">
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-300 drop-shadow-lg mb-1">
              {title}
            </h3>
            <div className="h-1 w-16 bg-white/20 rounded-full"></div>
          </motion.div>
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img
              src={logo}
              alt={`${title} Logo`}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-xl"
            />
          </motion.div>
        </div>
        <div className="mt-auto space-y-3 text-sm sm:text-base">
          {items.map(({ label, value }, index) => (
            <motion.div 
              key={label}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + (index * 0.05) }}
              className="bg-black/25 backdrop-blur-md rounded-lg p-2.5 group-hover:bg-black/40 transition-colors duration-300"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-medium">{label}</span>
                <span className="text-white font-bold">{value}</span>
              </div>
              {!isNaN(parseFloat(value)) && (
                <div className="mt-1.5 h-1.5 w-full bg-gray-700/50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(parseFloat(value) / 10 * 100, 100)}%` }}
                    transition={{ delay: 0.2 + (index * 0.1), duration: 0.7, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-white/60 to-white/80 rounded-full"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-5 py-2.5 px-4 bg-white/10 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/20 transition-colors duration-300 text-center"
        >
          House Details
        </motion.button>
      </div>
    </motion.div>
  );
}
import React from "react"
import { motion } from "framer-motion"

export default function EmptyState({ message, resetFilters }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 sm:p-12 text-center"
      >
        <div className="flex flex-col items-center">
          {/* Empty state image */}
          <img
            src={message.image}
            alt="No events"
            className="w-20 h-20 sm:w-24 sm:h-24 mb-6 opacity-50 invert"
          />
          
          {/* Empty state title */}
          <h3 className="text-xl font-semibold text-white mb-2">
            {message.title}
          </h3>
          
          {/* Empty state message */}
          <p className="text-gray-400 max-w-md mx-auto">
            {message.subtitle}
          </p>
          
          {/* Reset filters button (if applicable) */}
          {resetFilters && (
            <motion.button
              onClick={resetFilters}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-2 bg-gradient-to-r from-brand-700 to-brand-600 hover:from-brand-600 hover:to-brand-500 text-white rounded-full text-sm font-medium transition-colors duration-300"
            >
              Reset Filters
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
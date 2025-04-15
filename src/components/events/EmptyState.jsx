import React from "react"
import { motion } from "framer-motion"

export default function EmptyState({ message, resetFilters }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-12 text-center"
      >
        <div className="flex flex-col items-center">
          <img
            src={message.image}
            alt="No events"
            className="w-24 h-24 mb-6 opacity-50 invert"
          />
          <h3 className="text-xl font-semibold text-white mb-2">{message.title}</h3>
          <p className="text-gray-400 max-w-md mx-auto">{message.subtitle}</p>
        </div>
      </motion.div>
    </div>
  )
}
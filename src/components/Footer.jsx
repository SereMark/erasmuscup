import React from "react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[#1a1a1a]/80 backdrop-blur-md text-center text-sm sm:text-base py-6 mt-10 shadow-inner"
    >
      <div className="mx-auto max-w-3xl space-y-2 text-gray-300">
        <div className="opacity-70">
          Erasmus House Cup 2025 © All absurd rules apply
        </div>
      </div>
    </motion.footer>
  )
}
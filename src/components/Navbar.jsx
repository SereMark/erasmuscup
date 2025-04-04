import React, { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed w-full z-50 bg-[#1a1a1a]/80 backdrop-blur-md shadow-md"
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo + Title link */}
        <Link
          to="/"
          className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
          onClick={() => setOpen(false)}
        >
          <img
            src="assets/logos/house-cup-logo.png"
            alt="House Cup Logo"
            className="h-10 w-auto hidden sm:block"
          />
          <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-gray-100">
            House Cup
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-200 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10 text-lg">
          <Link
            to="/"
            className="hover:text-brand-gradient-end transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/leaderboard"
            className="hover:text-brand-gradient-end transition-colors duration-300"
          >
            Leaderboard
          </Link>
        </div>
      </div>
      
      {/* Mobile Dropdown */}
      {open && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden flex flex-col space-y-2 px-6 pb-4 bg-[#1a1a1a]/90 text-gray-100"
        >
          <Link
            to="/"
            className="hover:text-brand-gradient-end transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/leaderboard"
            className="hover:text-brand-gradient-end transition-colors duration-300"
            onClick={() => setOpen(false)}
          >
            Leaderboard
          </Link>
        </motion.div>
      )}
    </motion.nav>
  )
}
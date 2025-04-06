import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { title: "Home", path: "/", icon: "🏠" },
    { title: "Leaderboard", path: "/leaderboard", icon: "🏆" },
    { title: "Rules", path: "/housecup-rules", icon: "📜" },
    { title: "Events", path: "/events", icon: "🎉" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-[#121212]/90 backdrop-blur-md shadow-lg"
          : "py-4 bg-[#121212]/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
        <Link
          to="/"
          className="group flex items-center space-x-3 transition-opacity"
          onClick={() => setOpen(false)}
        >
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-purple-600 rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity" />
            <img
              src="/assets/logos/house-cup-logo.png"
              alt="House Cup Logo"
              className="h-9 w-auto relative z-10"
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg xs:text-xl sm:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300">
              House Cup
            </span>
            <span className="text-xs text-gray-400 -mt-1 hidden sm:block">
              Erasmus Edition 2025
            </span>
          </div>
        </Link>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-gray-200 focus:outline-none p-2 bg-[#2a2a2a]/50 rounded-lg hover:bg-[#2a2a2a]/80 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </motion.button>
        <div className="hidden md:flex items-center space-x-1">
          <div className="bg-[#2a2a2a]/30 backdrop-blur-sm rounded-xl p-1 flex items-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div key={link.path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                      isActive
                        ? "text-white bg-gradient-to-r from-purple-600/80 to-indigo-600/80 font-medium"
                        : "text-gray-300 hover:text-white hover:bg-[#2a2a2a]/80"
                    }`}
                  >
                    <span className="text-sm">{link.icon}</span>
                    <span>{link.title}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-indigo-600/80 rounded-lg -z-10"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1 bg-[#1a1a1a]/95 backdrop-blur-md border-t border-gray-800">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-purple-900/40 to-indigo-900/40 text-white font-medium"
                        : "text-gray-300 hover:bg-[#2a2a2a]/50 hover:text-white"
                    }`}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.title}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
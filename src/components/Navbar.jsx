import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SCROLL_THRESHOLD } from "../constants/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  // Reset mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Manage mobile menu interactions and body scroll lock
  useEffect(() => {
    if (!open) return;
    
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-2 bg-black/90 backdrop-blur-md shadow-lg"
            : "py-4 bg-black/60 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
          <BrandLogo setOpen={setOpen} />
          <MobileMenuButton open={open} setOpen={setOpen} />
          <DesktopNavigation location={location} />
        </div>
        
        <MobileNavigation open={open} setOpen={setOpen} location={location} />
      </motion.nav>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className={`h-16 sm:h-20 transition-all duration-300 ${scrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'}`} />
    </>
  );
}

function BrandLogo({ setOpen }) {
  return (
    <Link
      to="/"
      className="group flex items-center space-x-3 transition-opacity"
      onClick={() => setOpen(false)}
      aria-label="House Cup Home"
    >
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-purple-600 rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity" />
        <img
          src="/assets/logos/house-cup-logo.png"
          alt="House Cup Logo"
          className="h-9 w-auto relative z-10"
          loading="eager"
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
  );
}

function MobileMenuButton({ open, setOpen }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className="md:hidden text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 p-2 bg-black/50 rounded-lg hover:bg-purple-900/30 transition-colors"
      onClick={() => setOpen(!open)}
      aria-label="Toggle navigation menu"
      aria-expanded={open}
    >
      <motion.div
        animate={open ? "open" : "closed"}
        variants={{
          open: { rotate: 180 },
          closed: { rotate: 0 }
        }}
        transition={{ duration: 0.3 }}
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
      </motion.div>
    </motion.button>
  );
}

function DesktopNavigation({ location }) {
  return (
    <div className="hidden md:flex items-center space-x-1">
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-1 flex items-center">
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <motion.div key={link.path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={link.path}
                className={`relative px-4 py-2 rounded-lg flex items-center space-x-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-purple-600/80 to-indigo-600/80 font-medium"
                    : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="text-sm">{link.icon}</span>
                <span>{link.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-indigo-600/80 rounded-lg -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function MobileNavigation({ open, setOpen, location }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm md:hidden z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-full left-0 right-0 z-40 max-h-[80vh] overflow-y-auto shadow-xl"
          >
            <div className="px-4 py-4 space-y-2 bg-black/95 backdrop-blur-md border-t border-purple-900/50 rounded-b-2xl">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-gradient-to-r from-purple-900/40 to-indigo-900/40 text-white font-medium border-l-4 border-purple-500"
                          : "text-gray-300 hover:bg-purple-900/20 hover:text-white"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span>{link.title}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { NAV_LINKS, SCROLL_THRESHOLD } from "../../../constants/navigation";

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
        style={{ borderBottom: scrolled ? '1px solid rgba(88, 28, 135, 0.2)' : '1px solid rgba(0, 0, 0, 0)' }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-2 bg-black/90 backdrop-blur-md shadow-lg"
            : "py-4 bg-transparent backdrop-blur-sm"
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
        <div className="absolute inset-0 bg-brand-600 rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity" />
        <img
          src="/assets/logos/house-cup-logo.png"
          alt="House Cup Logo"
          className="h-9 w-auto relative z-10"
          loading="eager"
        />
      </motion.div>
      <div className="flex flex-col">
        <span className="font-extrabold text-lg xs:text-xl sm:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-300">
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
      className="md:hidden text-gray-200 focus:outline-none p-2 rounded-lg hover:bg-brand-900/30 transition-colors"
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
        {open ? <FaTimes size={24} /> : <FaBars size={24} />}
      </motion.div>
    </motion.button>
  );
}

function DesktopNavigation({ location }) {
  return (
    <div className="hidden md:flex items-center space-x-1">
      <div className="glass-effect rounded-xl p-1 flex items-center">
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <motion.div key={link.path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={link.path}
                className={`relative px-4 py-2 rounded-lg flex items-center space-x-2 transition-all focus:outline-none ${
                  isActive
                    ? "text-white font-medium"
                    : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="text-sm">{link.icon}</span>
                <span>{link.title}</span>
                
                {/* Active indicator - persistent across route changes */}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill" 
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-purple-500/80 rounded-lg -z-10"
                    initial={false}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 30,
                      duration: 0.3
                    }}
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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed top-0 right-0 bottom-0 w-4/5 max-w-sm z-50 bg-black/90 shadow-xl border-l border-brand-900/50"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <BrandLogo setOpen={setOpen} />
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full bg-brand-900/30 text-gray-200"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              
              <div className="space-y-2 flex-grow">
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
                        className={`flex items-center space-x-3 p-4 rounded-lg transition-colors ${
                          isActive
                            ? "bg-gradient-to-r from-brand-900/40 to-brand-800/40 text-white font-medium border-l-4 border-brand-500"
                            : "text-white hover:bg-brand-900/50 hover:text-white bg-brand-900/30"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setOpen(false)}
                      >
                        <span className="text-lg">{link.icon}</span>
                        <span className="text-lg">{link.title}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="pt-6 mt-auto border-t border-brand-900/30 bg-black/30 p-4 rounded-lg">
                <p className="text-sm text-white mb-4">Follow us on social media:</p>
                <div className="flex space-x-4">
                  <SocialButton icon="instagram" href="https://www.instagram.com/house_cup_erasmus/" />
                  <SocialButton icon="facebook" href="#" />
                  <SocialButton icon="email" href="mailto:housecup2025@example.com" />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SocialButton({ icon, href }) {
  const icons = {
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    email: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-900/50 text-gray-200 hover:bg-brand-700 hover:text-white transition-colors"
    >
      {icons[icon]}
    </a>
  );
}
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaGithub, FaInstagram } from "react-icons/fa";
import { NAV_LINKS, SCROLL_THRESHOLD } from "../../../constants/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const navItemsRef = useRef(new Map());

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
          <DesktopNavigation 
            location={location} 
            navItemsRef={navItemsRef} 
          />
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

function DesktopNavigation({ location, navItemsRef }) {
  const navContainerRef = useRef(null);
  const [indicatorStyles, setIndicatorStyles] = useState({
    width: 0,
    height: 0,
    x: 0,
    opacity: 0
  });
  
  // Update indicator position when active link changes or on resize
  useEffect(() => {
    const updateIndicator = () => {
      const activeNavItem = navItemsRef.current.get(location.pathname);
      const navContainer = navContainerRef.current;
      
      if (activeNavItem && navContainer) {
        const itemRect = activeNavItem.getBoundingClientRect();
        const containerRect = navContainer.getBoundingClientRect();
        
        // Calculate position relative to container
        setIndicatorStyles({
          width: itemRect.width,
          height: itemRect.height,
          x: itemRect.left - containerRect.left,
          opacity: 1
        });
      } else {
        // If no active link, hide the indicator
        setIndicatorStyles(prev => ({
          ...prev,
          opacity: 0
        }));
      }
    };
    
    // Initial position
    updateIndicator();
    
    // Update position on window resize
    window.addEventListener('resize', updateIndicator);
    
    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [location.pathname, navItemsRef]);

  return (
    <div className="hidden md:flex items-center space-x-1">
      <div 
        ref={navContainerRef}
        className="glass-effect rounded-xl p-1 flex items-center relative overflow-hidden"
      >
        {/* Background indicator pill */}
        <motion.div
          className="absolute bg-gradient-to-r from-purple-600/80 to-purple-500/80 rounded-lg"
          initial={false}
          animate={{
            width: indicatorStyles.width,
            height: indicatorStyles.height,
            x: indicatorStyles.x,
            opacity: indicatorStyles.opacity
          }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: "easeOut"
          }}
        />
        
        {/* Nav links */}
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <motion.div 
              key={link.path} 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.path}
                className={`relative px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors focus:outline-none ${
                  isActive
                    ? "text-white font-medium"
                    : "text-gray-300 hover:text-white hover:bg-purple-900/20"
                }`}
                aria-current={isActive ? "page" : undefined}
                ref={node => {
                  if (node) {
                    navItemsRef.current.set(link.path, node);
                  }
                }}
              >
                <span className="text-sm">{link.icon}</span>
                <span>{link.title}</span>
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
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:hidden fixed inset-x-0 top-[calc(100%-1px)] z-40 overflow-hidden"
        >
          <div className="mx-4 my-2 overflow-hidden rounded-2xl shadow-[0_10px_50px_rgba(88,28,135,0.3)]">
            <div className="relative bg-black/90 backdrop-blur-lg border border-purple-800/30">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600/80 via-brand-500/60 to-purple-600/80"></div>
              <div className="p-5 space-y-3">
                <h3 className="text-sm font-medium text-gray-300 mb-3 border-b border-purple-800/30 pb-2">NAVIGATION</h3>
                
                {NAV_LINKS.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div 
                      key={link.path} 
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setOpen(false)}
                        className={`relative block px-4 py-3.5 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-purple-700/90 to-purple-600/90 text-white font-semibold shadow-[0_4px_12px_rgba(88,28,135,0.5)]"
                            : "text-gray-200 hover:text-white hover:bg-purple-800/30"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <div className="flex items-center">
                          <span className="text-lg mr-3">{link.icon}</span>
                          <span className="font-medium">{link.title}</span>
                          
                          {isActive && (
                            <motion.span
                              layoutId="active-mobile-indicator"
                              className="ml-auto h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Social section */}
              <div className="px-5 py-6 bg-gradient-to-b from-black/40 to-purple-950/40 border-t border-purple-800/20">
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <h3 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-300 mb-4">CONNECT WITH US</h3>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <SocialButton icon="instagram" href="https://www.instagram.com/house_cup_erasmus/" />
                      <SocialButton icon="github" href="https://github.com/SereMark/erasmuscup" />
                    </div>
                    
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium px-4 py-2 rounded-lg bg-purple-700/60 text-white hover:bg-purple-600/70 transition-colors flex items-center shadow-[0_2px_10px_rgba(88,28,135,0.3)]"
                    >
                      <span>Close</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SocialButton({ icon, href }) {
  const icons = {
    instagram: <FaInstagram className="w-5 h-5" />,
    github: <FaGithub className="w-5 h-5" />
  };

  return (
    <motion.a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-brand-700 to-brand-900 text-gray-200 hover:text-white transition-colors shadow-[0_4px_12px_rgba(88,28,135,0.3)]"
    >
      <div className="relative">
        {icons[icon]}
      </div>
    </motion.a>
  );
}
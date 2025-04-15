import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaGithub, FaInstagram } from "react-icons/fa";

const NAV_LINKS = [
  { title: "Home", path: "/", icon: "🏠" },
  { title: "Scoreboard", path: "/scoreboard", icon: "🏆" },
  { title: "Events", path: "/events", icon: "🎉" },
  { title: "Rules", path: "/rules", icon: "📜" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const navItemsRef = useRef(new Map());

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
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
      <motion.header
        ref={navRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-2 bg-dark-950/90 backdrop-blur-md shadow-md"
            : "py-4 bg-dark-950/20 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <NavBrand setOpen={setOpen} />
          <NavToggle open={open} setOpen={setOpen} />
          <DesktopNav location={location} navItemsRef={navItemsRef} />
        </div>
      </motion.header>
      <div
        className={`transition-all duration-300 ${
          scrolled ? "h-14 sm:h-16" : "h-16 sm:h-20"
        }`}
      />
      
      <MobileNav open={open} setOpen={setOpen} location={location} />
    </>
  );
}

function NavBrand({ setOpen }) {
  return (
    <Link
      to="/"
      className="group flex items-center space-x-3"
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
        <span className="font-bold text-lg xs:text-xl sm:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-300">
          House Cup
        </span>
        <span className="text-xs text-gray-400 -mt-1 hidden sm:block">
          Erasmus Edition 2025
        </span>
      </div>
    </Link>
  );
}

function NavToggle({ open, setOpen }) {
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
        variants={{ open: { rotate: 180 }, closed: { rotate: 0 } }}
        transition={{ duration: 0.3 }}
      >
        {open ? <FaTimes size={24} /> : <FaBars size={24} />}
      </motion.div>
    </motion.button>
  );
}

function DesktopNav({ location, navItemsRef }) {
  const navContainerRef = useRef(null);
  const [indicatorStyles, setIndicatorStyles] = useState({
    width: 0,
    height: 0,
    x: 0,
    opacity: 0,
  });

  useEffect(() => {
    const updateIndicator = () => {
      const activeNavItem = navItemsRef.current.get(location.pathname);
      const navContainer = navContainerRef.current;
      if (activeNavItem && navContainer) {
        const itemRect = activeNavItem.getBoundingClientRect();
        const containerRect = navContainer.getBoundingClientRect();
        setIndicatorStyles({
          width: itemRect.width,
          height: itemRect.height,
          x: itemRect.left - containerRect.left,
          opacity: 1,
        });
      } else {
        setIndicatorStyles((prev) => ({ ...prev, opacity: 0 }));
      }
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [location.pathname]);

  return (
    <div className="hidden md:flex items-center space-x-4">
      <div
        ref={navContainerRef}
        className="bg-dark-800/40 backdrop-blur-sm rounded-xl p-1 flex items-center relative overflow-hidden border border-white/5"
      >
        <motion.div
          className="absolute bg-gradient-to-r from-brand-600/80 to-brand-500/80 rounded-lg"
          initial={false}
          animate={{
            width: indicatorStyles.width,
            height: indicatorStyles.height,
            x: indicatorStyles.x,
            opacity: indicatorStyles.opacity,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <motion.div key={link.path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={link.path}
                className={`relative px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors focus:outline-none ${
                  isActive
                    ? "text-white font-medium"
                    : "text-gray-300 hover:text-white hover:bg-brand-900/20"
                }`}
                aria-current={isActive ? "page" : undefined}
                ref={(node) => {
                  if (node) navItemsRef.current.set(link.path, node);
                }}
              >
                <span className="text-sm">{link.icon}</span>
                <span className="font-medium">{link.title}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
      <div className="flex space-x-2">
        <SocialButton
          icon={<FaInstagram />}
          href="https://www.instagram.com/house_cup_erasmus/"
          label="Instagram"
        />
        <SocialButton
          icon={<FaGithub />}
          href="https://github.com/SereMark/erasmuscup"
          label="GitHub"
        />
      </div>
    </div>
  );
}

function SocialButton({ icon, href, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-dark-800/50 border border-white/5 text-gray-300 hover:text-white hover:bg-brand-900/50 transition-all duration-300"
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
}

function MobileNav({ open, setOpen, location }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-dark-900/95 backdrop-blur-md z-50 md:hidden border-l border-brand-900/50 overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b border-brand-900/30">
              <h2 className="text-xl font-bold text-white">Navigation</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full bg-dark-800/80 text-gray-400 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                {NAV_LINKS.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.li
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setOpen(false)}
                        className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-brand-700/90 to-brand-600/90 text-white font-semibold shadow-lg shadow-brand-900/50"
                            : "text-gray-300 hover:bg-dark-800/50 hover:text-white"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className="text-xl">{link.icon}</span>
                        <span className="font-medium">{link.title}</span>
                        {isActive && (
                          <motion.span
                            layoutId="active-indicator"
                            className="ml-auto h-2 w-2 rounded-full bg-white shadow-glow-sm"
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="mt-8 border-t border-brand-900/30 pt-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                  Connect with us
                </h3>
                <div className="flex space-x-4">
                  <SocialButton
                    icon={<FaInstagram size={18} />}
                    href="https://www.instagram.com/house_cup_erasmus/"
                    label="Instagram"
                  />
                  <SocialButton
                    icon={<FaGithub size={18} />}
                    href="https://github.com/SereMark/erasmuscup"
                    label="GitHub"
                  />
                </div>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
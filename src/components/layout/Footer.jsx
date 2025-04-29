import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Footer links
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Scoreboard', path: '/scoreboard' },
    { name: 'Rules', path: '/rules' },
    { name: 'Events', path: '/events' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <footer className="bg-dark-950 border-t border-dark-800 py-6">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-wrap items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Logo and brief description */}
          <motion.div variants={itemVariants} className="flex items-center space-x-4 mb-4 lg:mb-0">
            <Link to="/" className="flex-shrink-0">
              <img 
                src="/assets/logos/house-cup-logo.png" 
                alt="Erasmus House Cup Logo" 
                className="h-10 w-auto" 
              />
            </Link>
            <div>
              <h3 className="text-white text-sm font-bold">Erasmus House Cup</h3>
              <p className="text-dark-400 text-xs max-w-xs">
                The official digital hub of the Erasmus House Cup 2025.
              </p>
            </div>
          </motion.div>

          {/* Quick Links and Social */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
            {/* Navigation Links */}
            <ul className="flex flex-wrap gap-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-dark-300 hover:text-brand-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Instagram only */}
            <a 
              href="https://www.instagram.com/house_cup_erasmus/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-dark-300 hover:text-accent-400 transition-colors"
              aria-label="Instagram"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div 
          className="border-t border-dark-800 mt-4 pt-4 flex flex-wrap justify-between items-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <p className="text-dark-400 text-xs">
            &copy; {currentYear} House Cup Parliament. Not associated with Anyone frfr.
          </p>
          
          {/* Disclaimer */}
          <p className="text-dark-500 text-xs mt-2 sm:mt-0">
            This is not a cult. We promise. See section 2(3) of the House Cup Rules 2025.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
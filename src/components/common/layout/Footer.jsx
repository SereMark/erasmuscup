import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaInstagram, FaEnvelope, FaGithub } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="glass-effect mt-20 py-12 border-t border-brand-900/50"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <FooterBranding />
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-4">
            <QuickLinks />
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-4">
            <SocialLinks />
          </motion.div>
        </div>
        
        <motion.div variants={itemVariants}>
          <Copyright currentYear={currentYear} />
        </motion.div>
      </div>
    </motion.footer>
  );
}

function FooterBranding() {
  return (
    <div className="flex flex-col items-center md:items-start">
      <Link to="/" className="group flex items-center space-x-3 mb-4 transition-all">
        <div className="relative w-10 h-10 overflow-hidden rounded-full">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="absolute inset-0 bg-gradient-to-br from-brand-400 to-brand-700 opacity-80 rounded-full"
          />
          <img 
            src="/assets/logos/house-cup-logo.png" 
            alt="House Cup Logo" 
            className="relative z-10 w-full h-full object-contain p-1"
            loading="lazy"
          />
        </div>
        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-300">
          House Cup
        </span>
      </Link>
      <p className="text-gray-400 text-center md:text-left">
        Bringing together students through competition, celebration, and possibly public nudity.
      </p>
    </div>
  );
}

function QuickLinks() {
  const links = [
    { name: "Current Standings", path: "/leaderboard" },
    { name: "Rules & Guidelines", path: "/housecup-rules" },
    { name: "Upcoming Events", path: "/events" }
  ];

  return (
    <div className="flex flex-col items-center md:items-start">
      <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-300">Quick Links</h3>
      <ul className="space-y-2 text-center md:text-left">
        {links.map(link => (
          <li key={link.path}>
            <Link 
              to={link.path} 
              className="text-gray-400 hover:text-brand-300 transition-colors inline-flex items-center group"
            >
              <span className="mr-2 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all">→</span>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLinks() {
  const socialIcons = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/house_cup_erasmus/",
      icon: <FaInstagram size={20} />,
      hoverColor: "hover:text-pink-400"
    },
    {
      name: "GitHub",
      href: "https://github.com/SereMark/erasmuscup",
      icon: <FaGithub size={20} />,
      hoverColor: "hover:text-gray-300"
    }
  ];

  return (
    <div className="flex flex-col items-center md:items-start">
      <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-300">Connect With Us</h3>
      <div className="flex space-x-5">
        {socialIcons.map((social) => (
          <a 
            key={social.name}
            href={social.href} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`text-gray-400 ${social.hoverColor} transition-all duration-300 transform hover:scale-110`}
            aria-label={social.name}
          >
            {social.icon}
            <span className="sr-only">{social.name}</span>
          </a>
        ))}
      </div>
      <p className="mt-4 text-gray-400 text-sm">
        Follow us for behind-the-scenes action and upcoming events!
      </p>
    </div>
  );
}

function Copyright({ currentYear }) {
  return (
    <div className="mt-12 pt-6 border-t border-brand-900/30 text-center text-sm">
      <p className="text-gray-500">
        &copy; {currentYear} Erasmus House Cup. All absurd rules apply.
      </p>
      <p className="mt-2 text-gray-600 text-xs">
        By participating, you agree to follow the "House Cup Rules 2025" and accept that public humiliation may be a potential consequence.
      </p>
    </div>
  );
}
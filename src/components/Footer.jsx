import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-black/80 backdrop-blur-md text-gray-300 py-8 mt-10 shadow-inner"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FooterBranding />
          <QuickLinks />
          <SocialLinks />
        </div>
        
        <Copyright currentYear={currentYear} />
      </div>
    </motion.footer>
  );
}

function FooterBranding() {
  return (
    <div className="flex flex-col items-center md:items-start">
      <Link to="/" className="flex items-center space-x-2 mb-3">
        <img 
          src="/assets/logos/house-cup-logo.png" 
          alt="House Cup Logo" 
          className="h-8 w-auto"
          loading="lazy"
        />
        <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300">
          House Cup
        </span>
      </Link>
      <p className="text-sm text-gray-400 text-center md:text-left">
        Bringing together students through competition, celebration, and possibly public nudity.
      </p>
    </div>
  );
}

function QuickLinks() {
  return (
    <div className="flex flex-col items-center md:items-start">
      <h3 className="text-white font-semibold mb-3">Quick Links</h3>
      <ul className="space-y-2 text-center md:text-left">
        <li>
          <Link to="/leaderboard" className="text-sm hover:text-purple-300 transition-colors">
            Current Standings
          </Link>
        </li>
        <li>
          <Link to="/housecup-rules" className="text-sm hover:text-purple-300 transition-colors">
            Rules & Guidelines
          </Link>
        </li>
      </ul>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex flex-col items-center md:items-start">
      <h3 className="text-white font-semibold mb-3">Connect With Us</h3>
      <div className="flex space-x-4">
        <SocialLink href="https://www.instagram.com/house_cup_erasmus/" label="Instagram">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </SocialLink>
        
        <SocialLink href="#" label="Facebook">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </SocialLink>
        
        <SocialLink href="mailto:housecup2025@example.com" label="Email">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </SocialLink>
      </div>
    </div>
  );
}

function Copyright({ currentYear }) {
  return (
    <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm">
      <p className="text-gray-500">
        &copy; {currentYear} Erasmus House Cup. All absurd rules apply.
      </p>
      <p className="mt-2 text-gray-600 text-xs">
        By participating, you agree to follow the "House Cup Rules 2025" and accept that public humiliation may be a potential consequence.
      </p>
    </div>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-purple-300 transition-colors"
      aria-label={label}
    >
      {children}
    </a>
  );
}
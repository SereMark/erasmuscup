import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaInstagram, FaGithub, FaHeart } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="relative mt-20 pt-16 pb-12 border-t border-brand-900/50 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[500px] bg-gradient-radial from-brand-900/10 via-dark-950/5 to-transparent opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-10">
          <motion.div variants={itemVariants} className="space-y-6">
            <Link to="/" className="group flex items-center space-x-3 mb-4">
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
            <p className="text-gray-400 max-w-md">
              Bringing together students through competition, celebration, and
              possibly public nudity. A definitely-not-a-cult experience for
              Erasmus students.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-300">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Current Standings", path: "/scoreboard" },
                { name: "Rules & Guidelines", path: "/rules" },
                { name: "Upcoming Events", path: "/events" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-brand-300 transition-colors inline-flex items-center group"
                  >
                    <span className="mr-2 text-brand-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                      →
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-300">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              {[
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/house_cup_erasmus/",
                  icon: <FaInstagram size={20} />,
                  hoverColor: "hover:text-pink-400",
                },
                {
                  name: "GitHub",
                  href: "https://github.com/SereMark/erasmuscup",
                  icon: <FaGithub size={20} />,
                  hoverColor: "hover:text-gray-300",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.hoverColor} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 p-2 rounded-full bg-dark-800/50 border border-white/5`}
                  aria-label={social.name}
                >
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              Follow us for behind-the-scenes action and upcoming events!
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="pt-8 mt-8 border-t border-brand-900/30 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500"
        >
          <p>© {currentYear} Erasmus House Cup. All absurd rules apply.</p>
          <p className="mt-4 sm:mt-0 flex items-center">
            By participating, you consent to possible public humiliation{" "}
            <FaHeart
              className="text-brand-500 ml-1 inline animate-pulse-slow"
              size={10}
            />
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
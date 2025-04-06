import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function InstagramSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });
  
  const avatarGradients = [
    "bg-gradient-to-br from-pink-400 to-purple-300",
    "bg-gradient-to-br from-pink-500 to-purple-400",
    "bg-gradient-to-br from-pink-600 to-purple-500"
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16"
    >
      <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-1 rounded-2xl shadow-[0_20px_50px_rgba(131,56,236,0.5)]">
        <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
            <div className="space-y-6 max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
                  Follow Our Wild Journey
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4"></div>
                <p className="text-base md:text-lg leading-relaxed text-gray-300">
                  Feast on behind-the-scenes stunts, impromptu "Buffaloed" fails, and the occasional "public nudity" competition.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center space-x-1"
              >
                <div className="flex -space-x-2">
                  {avatarGradients.map((gradient, index) => (
                    <div key={index} className={`w-8 h-8 rounded-full border-2 border-purple-600 ${gradient}`}></div>
                  ))}
                </div>
                <span className="ml-4 text-gray-400 text-sm">34+ followers</span>
              </motion.div>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                href="https://www.instagram.com/house_cup_erasmus/"
                className="group inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-full text-white font-medium shadow-lg hover:shadow-[0_5px_20px_rgba(219,39,119,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@house_cup_erasmus</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -5 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 30, rotate: -5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative mx-auto md:mx-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-transparent rounded-3xl blur-xl opacity-40 transform rotate-3"></div>
              <div className="relative bg-transparent p-2 rounded-3xl transform hover:rotate-3 transition-transform duration-500">
                <img
                  src="/assets/logos/house-cup-logo.png"
                  alt="Instagram Preview"
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain rounded-2xl"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
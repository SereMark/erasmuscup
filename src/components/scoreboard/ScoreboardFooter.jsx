import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import { FaInfoCircle } from "react-icons/fa"

export default function ScoreboardFooter({ data }) {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: false, amount: 0.5 })
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [.22, 1, .36, 1]
      }
    }
  }

  return (
    <motion.div
      ref={footerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-10"
    >
      <div className="glass-card-dark p-6 rounded-2xl border border-brand-900/50">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-md">
            <FaInfoCircle size={24} />
          </div>
          <div>
            <div
              className="text-gray-300 text-center md:text-left"
              dangerouslySetInnerHTML={{ __html: data.messageHtml }}
            />
            <div className="mt-4 flex justify-center md:justify-start">
              <Link
                to="/rules"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-700 to-brand-600 hover:from-brand-600 hover:to-brand-500 text-white rounded-full text-sm font-medium transition-colors duration-300 shadow-md shadow-brand-900/40"
              >
                View House Cup Rules
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
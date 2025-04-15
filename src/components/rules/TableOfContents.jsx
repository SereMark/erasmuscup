import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaSearch, FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa"

export default function TableOfContents({
  tableOfContents,
  activeSection,
  showTableOfContents,
  setShowTableOfContents,
  searchTerm,
  setSearchTerm
}) {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleSearchChange = e => setSearchTerm(e.target.value)
  const clearSearch = () => setSearchTerm("")

  const handleSectionClick = (sectionId, e) => {
    e.preventDefault()
    window.location.hash = sectionId
    if (isSmallScreen) setShowTableOfContents(false)
  }

  if (isSmallScreen) {
    return (
      <AnimatePresence>
        {showTableOfContents && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-dark-950/90 backdrop-blur-sm z-40"
              onClick={() => setShowTableOfContents(false)}
            />
            <motion.div
              variants={{
                hidden: { opacity: 0, x: "-100%" },
                visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                exit: { opacity: 0, x: "-100%", transition: { duration: 0.2 } }
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 bottom-0 w-5/6 max-w-xs bg-dark-900 border-r border-brand-900/30 shadow-xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-brand-300">Table of Contents</h3>
                <button
                  onClick={() => setShowTableOfContents(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-800 hover:bg-dark-700 transition-colors text-gray-300"
                  aria-label="Close table of contents"
                >
                  <FaTimes size={16} />
                </button>
              </div>
              <div className="p-4 border-b border-white/10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSearch(!showSearch);
                  }}
                  className="w-full flex items-center justify-between py-2 px-3 rounded-md bg-dark-800/50 text-gray-300"
                >
                  <div className="flex items-center">
                    <FaSearch className="mr-2 text-gray-400" size={14} />
                    {searchTerm ? (
                      <span className="truncate max-w-[160px] text-sm">{searchTerm}</span>
                    ) : (
                      <span className="text-sm text-gray-400">Search rules...</span>
                    )}
                  </div>
                  <FaChevronDown 
                    className={`transition-transform ${showSearch ? 'rotate-180' : ''}`} 
                    size={14}
                  />
                </button>
                <AnimatePresence>
                  {showSearch && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-2"
                    >
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Type to search..."
                          value={searchTerm}
                          onChange={handleSearchChange}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full px-4 py-2 pl-10 rounded-md bg-dark-800/80 border border-white/10 text-white text-sm placeholder-gray-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors focus:outline-none"
                          autoFocus
                        />
                        <FaSearch className="absolute left-3 top-2.5 text-gray-400" size={14} />
                        {searchTerm && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              clearSearch();
                            }}
                            className="absolute right-3 top-2 text-gray-400 hover:text-gray-200"
                            aria-label="Clear search"
                          >
                            <FaTimes size={16} />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
                {tableOfContents.map((sec, i) => (
                  <div key={i} className="mb-5">
                    {sec.title && (
                      <h4 className="font-semibold text-brand-300 mb-2 pb-1 border-b border-brand-900/30 text-sm">
                        {sec.title}
                      </h4>
                    )}
                    <ul className="space-y-2">
                      {sec.items.map(it => (
                        <li key={it.id}>
                          <a
                            href={`#${it.id}`}
                            onClick={e => handleSectionClick(it.id, e)}
                            className={`flex w-full text-left items-center py-2 px-3 rounded-lg transition-colors text-sm ${
                              activeSection === it.id
                                ? "bg-brand-900/30 text-brand-300"
                                : "hover:bg-dark-800/50 text-gray-300 hover:text-white"
                            }`}
                          >
                            <span className="mr-2 text-base">{it.icon}</span>
                            <span>{it.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={() => setShowTableOfContents(false)}
                  className="w-full py-2.5 rounded-lg bg-brand-800 text-white font-medium hover:bg-brand-700 transition-colors text-sm"
                >
                  Close Menu
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }

  return (
    <div className="lg:w-1/4 sticky top-24 self-start glass-card border border-brand-900/30 overflow-hidden z-10 h-auto max-h-[85vh] flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search rules..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 pl-10 rounded-md bg-dark-800/50 border border-white/10 text-white placeholder-gray-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors text-sm focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" size={14} />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-2 text-gray-400 hover:text-gray-200"
              aria-label="Clear search"
            >
              <FaTimes size={16} />
            </button>
          )}
        </div>
      </div>
      <div className="overflow-y-auto p-4 no-scrollbar flex-1">
        {tableOfContents.map((sec, i) => (
          <div key={i} className="mb-5">
            {sec.title && (
              <h4 className="font-semibold text-brand-300 mb-2 pb-1 border-b border-brand-900/30 text-sm">
                {sec.title}
              </h4>
            )}
            <ul className="space-y-1.5">
              {sec.items.map(it => (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    onClick={e => handleSectionClick(it.id, e)}
                    className={`flex w-full text-left items-center py-1.5 px-2 rounded transition-colors ${
                      activeSection === it.id
                        ? "bg-brand-900/30 text-brand-300"
                        : "hover:bg-dark-800/50 text-gray-300 hover:text-white"
                    }`}
                  >
                    <span className="mr-2 flex-shrink-0">{it.icon}</span>
                    <span className="text-sm">{it.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
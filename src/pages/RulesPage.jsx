import React, { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import rulesData from "../data/rulesData.json"
import RulesHero from "../components/rules/RulesHero"
import TableOfContents from "../components/rules/TableOfContents"
import RulesContent from "../components/rules/RulesContent"
import { FaList } from "react-icons/fa"

export default function RulesPage() {
  // Initialize state
  const [activeSection, setActiveSection] = useState(null)
  const [showTableOfContents, setShowTableOfContents] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const sectionRefs = useRef({})

  // Set page title
  useEffect(() => {
    document.title = "House Cup 2025 | Rules"
  }, [])

  // Initialize section refs and handle URL hash
  useEffect(() => {
    // Create refs for all sections
    const initRefs = {}
    ;[...rulesData.sections, rulesData.schedule].forEach(s => {
      initRefs[s.id] = React.createRef()
    })
    sectionRefs.current = initRefs
    
    // Handle URL hash navigation
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1)
      setActiveSection(sectionId)
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) {
          const yOffset = -100
          const y = el.getBoundingClientRect().top + window.scrollY + yOffset
          window.scrollTo({ top: y, behavior: "smooth" })
        }
      }, 300)
    }
  }, [])

  // Track active section during scrolling
  const handleScroll = () => {
    const scrollPos = window.scrollY + 150
    for (const section of [...rulesData.sections, rulesData.schedule]) {
      const el = document.getElementById(section.id)
      if (!el) continue
      const { offsetTop, offsetHeight } = el
      if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
        if (activeSection !== section.id) {
          setActiveSection(section.id)
        }
        break
      }
    }
  }

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  // Filter sections based on search term
  const filteredSections = searchTerm
    ? [...rulesData.sections, rulesData.schedule].filter(
        s =>
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [...rulesData.sections, rulesData.schedule]

  // Handle table of contents visibility based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowTableOfContents(true);
      } else {
        setShowTableOfContents(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="min-h-dynamic-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      {/* Hero Section */}
      <RulesHero data={rulesData.pageHeader} />
      
      {/* Mobile TOC Toggle Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 lg:hidden">
        <motion.button
          variants={{ 
            hidden: { opacity: 0, y: -20 }, 
            visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } 
          }}
          initial="hidden"
          animate="visible"
          onClick={() => setShowTableOfContents(!showTableOfContents)}
          className="w-full flex items-center justify-between p-4 rounded-xl glass-card border border-brand-900/30"
          aria-expanded={showTableOfContents}
          aria-controls="table-of-contents"
        >
          <div className="flex items-center">
            <FaList className="mr-2 text-brand-300" />
            <span className="text-base font-semibold text-white">
              {searchTerm ? "Search Results" : "Table of Contents"}
            </span>
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-900/50 text-white">
            {showTableOfContents ? "×" : "☰"}
          </div>
        </motion.button>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12 relative">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Table of Contents */}
          <TableOfContents
            tableOfContents={rulesData.tableOfContents}
            activeSection={activeSection}
            showTableOfContents={showTableOfContents}
            setShowTableOfContents={setShowTableOfContents}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          {/* Rules Content */}
          <RulesContent
            sections={filteredSections}
            documentHeader={rulesData.documentHeader}
            termHighlighting={rulesData.termHighlighting}
            sectionRefs={sectionRefs}
          />
        </div>
        
        {/* No Results Message */}
        {searchTerm && filteredSections.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-6 glass-card border border-brand-900/30 text-center"
          >
            <p className="text-gray-400">No rules found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-brand-800 hover:bg-brand-700 text-white rounded-lg text-sm transition-colors"
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </div>
    </main>
  )
}
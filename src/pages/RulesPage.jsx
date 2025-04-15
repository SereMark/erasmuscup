import React, { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import rulesData from "../data/rulesData.json"
import RulesHero from "../components/rules/RulesHero"
import TableOfContents from "../components/rules/TableOfContents"
import RulesContent from "../components/rules/RulesContent"

export default function RulesPage() {
  useEffect(() => {
    document.title = "House Cup 2025 | Rules"
  }, [])

  const [activeSection, setActiveSection] = useState(null)
  const [showTableOfContents, setShowTableOfContents] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const sectionRefs = useRef({})

  useEffect(() => {
    const initRefs = {}
    ;[...rulesData.sections, rulesData.schedule].forEach(s => {
      initRefs[s.id] = React.createRef()
    })
    sectionRefs.current = initRefs
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  const filteredSections = searchTerm
    ? [...rulesData.sections, rulesData.schedule].filter(
        s =>
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [...rulesData.sections, rulesData.schedule]

  return (
    <div className="min-h-screen">
      <RulesHero data={rulesData.pageHeader} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12 relative">
        <motion.button
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}
          initial="hidden"
          animate="visible"
          onClick={() => setShowTableOfContents(!showTableOfContents)}
          className="lg:hidden w-full flex items-center justify-between p-4 mb-4 rounded-xl glass-card border border-brand-900/30"
        >
          <div className="flex items-center">
            <span className="text-lg font-semibold text-brand-300">Table of Contents</span>
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-900/50">
            {showTableOfContents ? "▲" : "▼"}
          </div>
        </motion.button>
        <div className="flex flex-col lg:flex-row gap-8">
          <TableOfContents
            tableOfContents={rulesData.tableOfContents}
            activeSection={activeSection}
            showTableOfContents={showTableOfContents}
            setShowTableOfContents={setShowTableOfContents}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <RulesContent
            sections={filteredSections}
            documentHeader={rulesData.documentHeader}
            termHighlighting={rulesData.termHighlighting}
            sectionRefs={sectionRefs}
          />
        </div>
      </div>
    </div>
  )
}
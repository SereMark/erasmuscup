import React from "react"
import { motion } from "framer-motion"
import { FaInfoCircle } from "react-icons/fa"

export default function RulesContent({
  sections,
  documentHeader,
  termHighlighting,
  sectionRefs
}) {
  // Apply term highlighting to text
  const highlightTerms = text => {
    if (!text) return ""
    
    // Replace newlines with HTML breaks
    let t = text
    t = t.replace(/\n\n/g, "<br><br>").replace(/\n/g, "<br>")
    
    // Apply highlighting for each term
    termHighlighting.forEach(term => {
      const escaped = term.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const re = new RegExp(`(${escaped})`, "gi")
      
      // Determine CSS class based on term type and level
      let c = ""
      if (term.level === "strong") {
        if (term.type === "brand") c = "font-bold text-brand-400"
        else if (term.type === "accent") c = "font-bold text-accent-400"
        else if (term.type === "danger") c = "font-bold text-rose-500"
        else if (term.type === "info") c = "font-bold text-blue-400"
        else if (term.type === "success") c = "font-bold text-emerald-400"
      } else if (term.level === "emphasis") {
        if (term.type === "brand") c = "italic text-brand-400"
        else if (term.type === "accent") c = "italic text-accent-400"
        else if (term.type === "danger") c = "italic text-rose-500"
        else if (term.type === "info") c = "italic text-blue-400"
        else if (term.type === "success") c = "italic text-emerald-400"
      }
      
      // Replace with highlighted span
      t = t.replace(re, `<span class="${c}">$1</span>`)
    })
    
    return t
  }

  // Animation variants
  const documentHeaderVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
    })
  }

  return (
    <div className="w-full lg:w-3/4">
      {/* Document header */}
      <motion.div
        variants={documentHeaderVariants}
        initial="hidden"
        animate="visible"
        className="glass-card p-6 mb-8 border border-brand-900/30"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="mr-3 text-2xl">{documentHeader.icon}</span>
            {documentHeader.title}
          </h2>
        </div>
        
        {/* Document info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {documentHeader.info.map((item, i) => (
            <div
              key={i}
              className="flex flex-col p-3 bg-dark-800/30 rounded-lg border border-brand-900/20"
            >
              <span className="text-sm text-gray-400">{item.label}</span>
              <span className="text-base text-white font-medium">{item.value}</span>
            </div>
          ))}
        </div>
        
        {/* Info note */}
        <div className="p-4 bg-brand-900/20 rounded-lg border border-brand-800/30 text-gray-300 text-sm">
          <FaInfoCircle className="inline-block mr-2 text-brand-400" />
          <span dangerouslySetInnerHTML={{ __html: documentHeader.note }} />
        </div>
      </motion.div>
      
      {/* Content sections */}
      <div className="space-y-8">
        {sections.map((sec, i) => (
          <motion.div
            key={sec.id}
            id={sec.id}
            ref={sectionRefs.current[sec.id]}
            custom={i}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="glass-card p-6 border border-brand-900/30"
          >
            {/* Section header */}
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">{sec.emoji}</span>
              <h3 className="text-xl font-bold text-white break-words">{sec.title}</h3>
            </div>
            
            {/* Section content */}
            <div
              className="text-gray-300 leading-relaxed prose prose-invert max-w-none text-base"
              dangerouslySetInnerHTML={{
                __html: highlightTerms(sec.text)
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
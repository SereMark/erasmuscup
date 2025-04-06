import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TOCItem from "./TOCItem";
import { TOC_STRUCTURE } from "../../constants/rulesData";

/**
 * Table of contents navigation component for the Rules page
 */
function TableOfContents({ showTOC, isDesktop, activeSection, scrollToSection }) {
  return (
    <AnimatePresence>
      {(showTOC || isDesktop) && (
        <motion.div
          key="toc"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-1 overflow-hidden"
          id="table-of-contents"
        >
          <div className={`${!showTOC && "hidden"} lg:block lg:sticky lg:top-8`}>
            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-1 rounded-xl shadow-lg">
              <div className="bg-black/90 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-indigo-900/30">
                <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                  Table of Contents
                </h2>
                <div className="space-y-4 max-h-[calc(100vh-240px)] overflow-y-auto pr-2 scrollbar-hide">
                  {TOC_STRUCTURE.map((section, index) => (
                    <div key={index}>
                      {section.title && (
                        <h3 className="text-sm font-semibold text-purple-300 mb-2">
                          {section.title}
                        </h3>
                      )}
                      <ul className="space-y-1.5 text-sm">
                        {section.items.map((item) => (
                          <TOCItem
                            key={item.id}
                            id={item.id}
                            label={item.label}
                            icon={item.icon}
                            scrollToSection={scrollToSection}
                            activeSection={activeSection}
                          />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TableOfContents;
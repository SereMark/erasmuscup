import React from "react";

/**
 * Individual table of contents item
 */
function TOCItem({ id, label, icon, scrollToSection, activeSection }) {
  return (
    <li className="group">
      <button
        onClick={() => scrollToSection(id)}
        className={`flex items-center w-full px-3 py-2 rounded-lg text-left transition-all duration-300 group-hover:bg-purple-900/30 ${
          activeSection === id ? "bg-purple-900/40 text-white" : "text-gray-300"
        }`}
      >
        <span className="mr-2">{icon}</span>
        <span className="truncate">{label}</span>
      </button>
    </li>
  );
}

export default TOCItem;
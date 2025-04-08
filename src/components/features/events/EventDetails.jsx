import React from "react";

/**
 * Event details container component
 * 
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {ReactNode} props.children - Event detail items
 */
export default function EventDetails({ title, children }) {
  return (
    <div className="bg-black/30 border border-purple-900/20 rounded-xl p-4 mb-4">
      <h3 className="text-purple-300 font-semibold mb-2">{title}</h3>
      <ul className="list-none space-y-2 pl-0">
        {children}
      </ul>
    </div>
  );
}
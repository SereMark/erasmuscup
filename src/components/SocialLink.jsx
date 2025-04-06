import React from "react";

export default function SocialLink({ href, label, children }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-purple-300 transition-colors"
      aria-label={label}
    >
      {children}
    </a>
  );
}
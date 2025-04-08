import React from "react";

/**
 * Event note component for displaying important information
 * 
 * @param {Object} props
 * @param {string} props.title - Note title
 * @param {string} props.bgColor - Background color class
 * @param {string} props.borderColor - Border color class
 * @param {string} props.textColor - Text color class for title
 * @param {ReactNode} props.children - Note content
 */
export default function EventNote({ title, bgColor, borderColor, textColor, children }) {
  return (
    <div className={`${bgColor} border ${borderColor} rounded-xl p-4`}>
      <h3 className={`${textColor} font-semibold mb-3 flex items-center`}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
          aria-hidden="true"
        >
          <path 
            fillRule="evenodd" 
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
            clipRule="evenodd" 
          />
        </svg>
        {title}
      </h3>
      {children}
    </div>
  );
}
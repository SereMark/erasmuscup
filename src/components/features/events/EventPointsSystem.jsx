import React from "react";

/**
 * Event points system component for displaying point allocation rules
 * 
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.bgColor - Background color class
 * @param {string} props.borderColor - Border color class
 * @param {string} props.textColor - Text color class for title
 * @param {Array} props.points - Array of point items with type, label, and value
 */
export default function EventPointsSystem({ title, bgColor, borderColor, textColor, points }) {
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
      <ul className="list-none space-y-2 pl-0 text-sm">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 ${point.type === 'positive' ? 'text-indigo-400' : 'text-red-400'} mr-2 flex-shrink-0 mt-0.5`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d={point.type === 'positive' 
                  ? "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  : "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                } 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-white">
              {point.label}: <strong className={point.type === 'positive' ? 'text-indigo-300' : 'text-red-300'}>
                {point.value}
              </strong>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
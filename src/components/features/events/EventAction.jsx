import React from "react";

/**
 * Event action button component
 * 
 * @param {Object} props
 * @param {string} props.label - Button text
 * @param {string} props.color - Button gradient color classes
 * @param {string} props.shadowColor - Shadow color class for hover effect
 * @param {string} props.href - Optional link URL
 * @param {Function} props.onClick - Optional click handler
 */
export default function EventAction({ label, color, shadowColor, href, onClick }) {
  const ButtonTag = href ? "a" : "button";
  const buttonProps = href ? { href } : { onClick };
  
  return (
    <div className="mt-6 flex justify-end">
      <ButtonTag
        {...buttonProps}
        className={`bg-gradient-to-r ${color} text-white font-medium px-5 py-2 rounded-full shadow-lg hover:${shadowColor} hover:translate-y-[-2px] transition-all duration-300 flex items-center group`}
      >
        <span>{label}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
          viewBox="0 0 20 20" 
          fill="currentColor"
          aria-hidden="true"
        >
          <path 
            fillRule="evenodd" 
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </ButtonTag>
    </div>
  );
}
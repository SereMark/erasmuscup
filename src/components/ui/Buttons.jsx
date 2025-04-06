import React from "react";
import { Link } from "react-router-dom";

/**
 * Primary button component with white gradient background
 */
export function PrimaryButton({ to, children, onClick }) {
  const ButtonTag = to ? Link : "button";
  const buttonProps = to ? { to } : { onClick };

  return (
    <ButtonTag
      {...buttonProps}
      className="group w-full sm:w-auto bg-gradient-to-r from-white to-gray-200 text-black font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-transform duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
    >
      <span>{children}</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </ButtonTag>
  );
}

/**
 * Secondary button component with transparent border
 */
export function SecondaryButton({ to, children, onClick }) {
  const ButtonTag = to ? Link : "button";
  const buttonProps = to ? { to } : { onClick };

  return (
    <ButtonTag
      {...buttonProps}
      className="group w-full sm:w-auto bg-transparent border-2 border-white text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center hover:bg-white hover:text-black"
    >
      <span>{children}</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </ButtonTag>
  );
}
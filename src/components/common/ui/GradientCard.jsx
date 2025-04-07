import React from "react";

export function GradientCard({ 
  children, 
  gradient = "from-purple-800 to-indigo-900",
  blur = "blur-2xl",
  rotation = "rotate-2",
  className = "",
  containerClassName = "",
  opacity = "opacity-10",
  ...props 
}) {
  return (
    <div className={`relative ${containerClassName}`} {...props}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} ${opacity} rounded-3xl ${blur} transform ${rotation}`}></div>
      <div className={`relative bg-gradient-to-br from-black/80 to-purple-900/20 p-6 sm:p-8 rounded-3xl border border-purple-900/30 shadow-2xl backdrop-blur-lg h-full ${className}`}>
        {children}
      </div>
    </div>
  );
}
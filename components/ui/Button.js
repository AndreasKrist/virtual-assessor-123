'use client';

import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) {
  // Simple button styles with explicit classes
  let buttonClass = "px-4 py-2 rounded-md font-medium ";
  
  // Add variant-specific classes
  if (variant === 'primary') {
    buttonClass += "bg-blue-600 hover:bg-blue-700 text-white ";
    if (disabled) buttonClass += "opacity-50 cursor-not-allowed ";
  } else if (variant === 'secondary') {
    buttonClass += "bg-gray-200 hover:bg-gray-300 text-gray-800 ";
    if (disabled) buttonClass += "opacity-50 cursor-not-allowed ";
  } else if (variant === 'outline') {
    buttonClass += "border border-blue-600 text-blue-600 hover:bg-blue-50 ";
    if (disabled) buttonClass += "opacity-50 cursor-not-allowed ";
  }
  
  // Add any additional classes
  buttonClass += className;
  
  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
'use client';

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>© {currentYear} IT Career Assessment. All rights reserved.</p>
        <p className="mt-2">Created for educational purposes.</p>
      </div>
    </footer>
  );
}
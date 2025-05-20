'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary-600">
          IT Career Assessment
        </Link>
        <div className="flex items-center space-x-4">
          <a 
            href="/assessment" 
            className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
          >
            Start Assessment
          </a>
        </div>
      </div>
    </header>
  );
}
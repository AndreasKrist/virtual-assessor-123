'use client';

import React from 'react';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            IT Career Assessment
          </Link>
          <Link href="/assessment" className="text-sm text-blue-600 hover:text-blue-800">
            Start Assessment
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} IT Career Assessment. All rights reserved.
          <p className="mt-1">Created for educational purposes.</p>
        </div>
      </footer>
    </div>
  );
}
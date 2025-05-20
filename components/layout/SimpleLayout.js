'use client';

import React from 'react';
import Link from 'next/link';
import '../../styles/simple.css';

export default function SimpleLayout({ children }) {
  return (
    <div className="site-wrapper">
      <header className="site-header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="site-title">
              IT Career Assessment
            </Link>
            <Link href="/assessment" className="nav-link">
              Start Assessment
            </Link>
          </div>
        </div>
      </header>
      
      <main className="site-main">
        <div className="container">
          {children}
        </div>
      </main>
      
      <footer className="site-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} IT Career Assessment. All rights reserved.</p>
          <p>Created for educational purposes.</p>
        </div>
      </footer>
    </div>
  );
}
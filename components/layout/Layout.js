import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const [mounted, setMounted] = useState(false);

  // After mounting, we can show the child components
  // This prevents hydration issues with theme
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {mounted && children}
      </main>
      <Footer />
    </div>
  );
}
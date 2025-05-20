import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeToggle from '../ui/ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  
  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => setIsMenuOpen(false);
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);
  
  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-10 ${isScrolled ? 'shadow-sm' : ''} modern-header border-b border-gray-200 dark:border-gray-800 transition-shadow duration-200 relative`}>
      <div className="container-narrow flex justify-between items-center h-16">
        <Link href="/" className="font-serif font-bold text-xl md:text-2xl text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 transition">
          LiloPikir
        </Link>
        
        <div className="flex items-center gap-1 md:gap-2">
          <nav className="hidden md:flex items-center">
            <NavLink href="/" exact>Articles</NavLink>
            <NavLink href="/partisan">Partisan</NavLink>
            <NavLink href="/experimental">Experimental</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/donate">Donate</NavLink>
          </nav>
          
          <div className="flex items-center ml-4 md:ml-6">
            <ThemeToggle />
          </div>
          
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">Open menu</span>
            {isMenuOpen ? (
              // X icon
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Menu icon
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
          <div className="container-narrow py-2">
            <nav className="flex flex-col space-y-1">
              <MobileNavLink href="/" exact>Articles</MobileNavLink>
              <MobileNavLink href="/partisan">Partisan</MobileNavLink>
              <MobileNavLink href="/experimental">Experimental</MobileNavLink>
              <MobileNavLink href="/about">About</MobileNavLink>
              <MobileNavLink href="/donate">Donate</MobileNavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children, exact = false }) {
  const router = useRouter();
  const isActive = exact 
    ? router.pathname === href 
    : router.pathname === href || router.pathname.startsWith(`${href}/`);
  
  return (
    <Link 
      href={href}
      className={`px-3 py-2 text-sm font-medium rounded-md transition ${
        isActive 
          ? 'text-red-600 dark:text-red-400' 
          : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, exact = false }) {
  const router = useRouter();
  const isActive = exact 
    ? router.pathname === href 
    : router.pathname === href || router.pathname.startsWith(`${href}/`);
  
  return (
    <Link 
      href={href}
      className={`px-3 py-3 text-base font-medium block rounded-md transition ${
        isActive 
          ? 'text-red-600 dark:text-red-400 bg-gray-100 dark:bg-gray-800' 
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-400'
      }`}
    >
      {children}
    </Link>
  );
}
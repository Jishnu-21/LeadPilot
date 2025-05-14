'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-200 bg-white ${scrolled ? 'shadow-sm' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
        {/* Logo (small, top-left) */}
        <div className="flex items-center">
          <Link href="/">
            <Image 
              src="/leadpilot-logo.svg" 
              alt="LeadPilot Logo" 
              width={120} 
              height={120} 
              priority 
              className="text-black" 
            />
          </Link>
        </div>
        
        {/* Navigation buttons (top-right) */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link 
            href="/pricing" 
            className="text-sm text-gray-700 hover:text-[#0070f3] px-3 py-2 transition-colors"
          >
            Pricing
          </Link>
          
          <Link 
            href="/dashboard" 
            className="text-sm text-gray-700 hover:text-[#0070f3] px-3 py-2 transition-colors"
          >
            Dashboard
          </Link>
          
          <Link 
            href="/login" 
            className="text-sm bg-[#0070f3] text-white px-4 py-2 rounded hover:bg-[#0060d3] transition-colors ml-2"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
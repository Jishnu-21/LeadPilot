'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if we've scrolled more than 50px
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine scroll direction to show/hide header
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setVisible(false);
      } else {
        // Scrolling up - show header
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Update colors to match the new color scheme
  const buttonColors = scrolled 
    ? 'bg-[#0063B2] text-white hover:bg-[#004173]' 
    : 'bg-white text-[#004173] hover:bg-white/90';

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
      } ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Mobile menu button - only visible on small screens */}
        <div className="md:w-32 flex items-center">
          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden text-gray-600 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X size={24} className={scrolled ? 'text-[#004173]' : 'text-white'} />
            ) : (
              <Menu size={24} className={scrolled ? 'text-[#004173]' : 'text-white'} />
            )}
          </button>
        </div>
        
        {/* Centered logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image 
              src="/leadpilot-logo.svg" 
              alt="LeadPilot Logo" 
              width={140} 
              height={35} 
              priority 
              className={scrolled ? '' : 'invert'} // Invert logo color when transparent
            />
          </Link>
        </div>
        
        {/* Get Started button on right - hidden on mobile */}
        <div className="md:w-32 flex justify-end">
          <Link 
            href="/signup" 
            className={`hidden md:inline-block px-6 py-2 rounded-full font-medium transition-colors ${buttonColors} shadow-sm whitespace-nowrap`}
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Mobile menu - slides down when open */}
      <div 
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-64' : 'max-h-0'}`}
      >
        <nav className="px-6 py-4 flex flex-col space-y-4">
          <Link 
            href="/features" 
            className="text-[#004173] hover:text-[#0063B2] py-2 transition-colors" 
            onClick={closeMobileMenu}
          >
            Features
          </Link>
          <Link 
            href="/pricing" 
            className="text-[#004173] hover:text-[#0063B2] py-2 transition-colors" 
            onClick={closeMobileMenu}
          >
            Pricing
          </Link>
          <Link 
            href="/about" 
            className="text-[#004173] hover:text-[#0063B2] py-2 transition-colors" 
            onClick={closeMobileMenu}
          >
            About
          </Link>
          <Link 
            href="/signup" 
            className={`px-6 py-2 rounded-full font-medium transition-colors bg-[#0063B2] text-white hover:bg-[#004173] shadow-sm text-center`}
            onClick={closeMobileMenu}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
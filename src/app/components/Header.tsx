'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for header
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
  
  // Reference for the menu button
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check if the click is on the menu button or its children
      const isMenuButtonClick = menuButtonRef.current && 
        (menuButtonRef.current === target || menuButtonRef.current.contains(target));
      
      // Only close the menu if the click is outside both the menu and the button
      if (menuRef.current && 
          !menuRef.current.contains(target) && 
          !isMenuButtonClick) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Toggle mobile menu with improved handling
  const toggleMobileMenu = () => {
    // Use a function to ensure we're working with the latest state
    setMobileMenuOpen(prevState => !prevState);
  };

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      height: 0,
      transition: {
        y: { stiffness: 1000 },
        opacity: { duration: 0.2 },
        height: { duration: 0.2 }
      }
    },
    open: {
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        y: { stiffness: 1000, velocity: -100 },
        opacity: { duration: 0.4 },
        height: { duration: 0.3 },
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 }
  };

  // Hamburger button animation variants
  const topLineVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 6 }
  };
  
  const middleLineVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  };
  
  const bottomLineVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -6 }
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-200 bg-white ${scrolled ? 'shadow-sm' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-20">
        {/* Logo (larger, top-left) */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/leadpilot-logo.svg" 
              alt="LeadPilot Logo" 
              width={140} 
              height={40} 
              priority 
              className="text-black" 
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            href="/dashboard" 
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Dashboard
          </Link>
          
          <Link 
            href="/pricing" 
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Pricing
          </Link>
          
          <Link 
            href="/login" 
            className="text-sm font-medium border border-[#0070f3] text-[#0070f3] hover:bg-[#0070f3] hover:text-white px-4 py-1.5 rounded transition-colors"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            ref={menuButtonRef}
            onClick={toggleMobileMenu}
            className="relative z-50 flex flex-col justify-center items-center w-10 h-10 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="relative w-6 h-5">
              <motion.div
                className="w-6 h-0.5 bg-gray-800 absolute top-0"
                variants={topLineVariants}
                animate={mobileMenuOpen ? 'open' : 'closed'}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-gray-800 absolute top-2"
                variants={middleLineVariants}
                animate={mobileMenuOpen ? 'open' : 'closed'}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-gray-800 absolute top-4"
                variants={bottomLineVariants}
                animate={mobileMenuOpen ? 'open' : 'closed'}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div ref={menuRef}>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden bg-white shadow-lg z-40 absolute left-0 right-0 top-[80px]"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <motion.div 
                className="flex flex-col px-6 py-4 space-y-4 border-t"
                variants={mobileMenuVariants}
              >
                <motion.div variants={itemVariants}>
                  <Link 
                    href="/dashboard" 
                    className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link 
                    href="/pricing" 
                    className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link 
                    href="/login" 
                    className="block py-2 text-base font-medium text-[#0070f3] hover:text-[#0060d3] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
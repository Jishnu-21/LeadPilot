"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BannerProps {
  onStartDemo: () => void;
}

export default function Banner({ onStartDemo }: BannerProps) {
  const [currentStep, setCurrentStep] = useState(0); // Start with welcome screen (step 0)
  const [dropdownOpen, setDropdownOpen] = useState<{[key: string]: boolean}>({
    profession: false,
    targetAudience: false,
    offering: false
  });
  
  const professionRef = useRef<HTMLDivElement>(null);
  const targetAudienceRef = useRef<HTMLDivElement>(null);
  const offeringRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    profession: '',
    targetAudience: '',
    offering: '',
    region: '',
    message: '',
    platform: 'LinkedIn'
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  // Position calculation for dropdowns
  const [dropdownPositions, setDropdownPositions] = useState({
    profession: { top: 0, left: 0, width: 0 },
    targetAudience: { top: 0, left: 0, width: 0 },
    offering: { top: 0, left: 0, width: 0 }
  });
  
  useEffect(() => {
    // Update position when a dropdown is opened
    if (dropdownOpen.profession && professionRef.current) {
      const rect = professionRef.current.getBoundingClientRect();
      setDropdownPositions(prev => ({
        ...prev,
        profession: {
          top: rect.bottom + window.scrollY,
          left: rect.left,
          width: professionRef.current?.offsetWidth || 0
        }
      }));
    }
    
    if (dropdownOpen.targetAudience && targetAudienceRef.current) {
      const rect = targetAudienceRef.current.getBoundingClientRect();
      setDropdownPositions(prev => ({
        ...prev,
        targetAudience: {
          top: rect.bottom + window.scrollY,
          left: rect.left,
          width: targetAudienceRef.current?.offsetWidth || 0
        }
      }));
    }
    
    if (dropdownOpen.offering && offeringRef.current) {
      const rect = offeringRef.current.getBoundingClientRect();
      setDropdownPositions(prev => ({
        ...prev,
        offering: {
          top: rect.bottom + window.scrollY,
          left: rect.left,
          width: offeringRef.current?.offsetWidth || 0
        }
      }));
    }
  }, [dropdownOpen.profession, dropdownOpen.targetAudience, dropdownOpen.offering]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (professionRef.current && !professionRef.current.contains(event.target as Node)) {
        setDropdownOpen(prev => ({...prev, profession: false}));
      }
      if (targetAudienceRef.current && !targetAudienceRef.current.contains(event.target as Node)) {
        setDropdownOpen(prev => ({...prev, targetAudience: false}));
      }
      if (offeringRef.current && !offeringRef.current.contains(event.target as Node)) {
        setDropdownOpen(prev => ({...prev, offering: false}));
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleDropdown = (field: string) => {
    setDropdownOpen(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSelectOption = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setDropdownOpen(prev => ({...prev, [field]: false}));
  };
  
  const startDemo = () => {
    // Call the prop function directly instead of dispatching an event
    onStartDemo();
  };
  
  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    // Here you would typically process the data and generate leads
  };

  // Suggestions for autocomplete fields
  const professionSuggestions = [
    "Marketing Manager", 
    "Sales Executive", 
    "Software Engineer", 
    "Business Consultant", 
    "Entrepreneur",
    "Product Manager",
    "Digital Marketing Specialist",
    "Data Analyst",
    "UX/UI Designer",
    "Finance Director"
  ];
  
  const targetAudienceSuggestions = [
    "Small Business Owners", 
    "Corporate Executives", 
    "Tech Startups", 
    "E-commerce Brands", 
    "Healthcare Professionals",
    "Educational Institutions",
    "Marketing Agencies",
    "Real Estate Investors",
    "SaaS Companies",
    "Manufacturing Companies"
  ];
  
  const offeringSuggestions = [
    "Consulting Services", 
    "SaaS Platform", 
    "Marketing Solutions", 
    "Custom Development", 
    "Training Programs",
    "Digital Transformation",
    "Data Analytics",
    "Automation Solutions",
    "Managed IT Services",
    "Project Management"
  ];
  
  return (
    <div className="py-16 min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white">
      {/* Clean white background with subtle pattern */}
      <div className="absolute inset-0 bg-white z-0"></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-5" 
        style={{
          backgroundImage: `linear-gradient(var(--electric-blue) 1px, transparent 1px), linear-gradient(90deg, var(--electric-blue) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}>
      </div>
      
      {/* Subtle accent elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#0070f3]/5 rounded-full blur-[100px] z-0 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#0070f3]/5 rounded-full blur-[100px] z-0 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      {/* Subtle divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0070f3]/20 to-transparent"></div>
      
      <motion.div 
        className="max-w-4xl w-full mx-auto px-4 sm:px-6 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Welcome Section (Centered) */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.div 
            className="inline-block px-4 py-1 bg-[#0070f3]/10 text-[#0070f3] rounded-full text-sm mb-4 font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Try for free now →
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black tracking-tight leading-none mb-6">
            Introducing the <span className="text-[#0070f3]">LeadPilot</span>
              </h1>
          
          <p className="text-lg md:text-xl text-black max-w-2xl mx-auto mb-10">
            LeadPilot helps you discover real companies and send personalized GPT outreach – instantly.
          </p>
          
          <motion.button
            onClick={startDemo}
            className="inline-flex cursor-pointer items-center bg-[#0070f3] text-white px-8 py-3 rounded-md hover:bg-[#0060d3] transition-all duration-300 font-medium text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Demo
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white pt-16 pb-8 md:py-0">
      {/* Background with blue wave pattern */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/images/wave-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          opacity: 0.7
        }}
      ></div>
      
      {/* More noticeable drop shadow at the very end */}
      <div className="absolute -bottom-12 left-0 right-0 h-24 bg-gradient-to-t from-white/20 to-transparent z-0"></div>
      
      <motion.div 
        className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Welcome Section (Centered) */}
        <motion.div 
          className="text-center mx-auto"
          variants={itemVariants}
        >
          <h1 className="font-medium leading-none mb-6 font-inter">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-2 text-black tracking-wider">Introducing</span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-[#4299e1] to-[#667eea] bg-clip-text text-transparent font-semibold">the LeadPilot<span className="text-purple-500">.</span></span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-6 sm:mb-10 font-inter">
            LeadPilot helps you discover real companies and send personalized GPT outreach – instantly.
          </p>
                    
          <div className="flex justify-center">
            <motion.button
              onClick={startDemo}
              className="inline-flex cursor-pointer items-center bg-[#0070f3] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md hover:bg-[#0060d3] transition-all duration-300 font-medium text-base sm:text-lg shadow-lg font-inter uppercase"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              START DEMO
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
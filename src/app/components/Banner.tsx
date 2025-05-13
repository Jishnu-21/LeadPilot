"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Lead Pilot Color Scheme
// Electric Blue: #0070f3
// White: #ffffff
// Navy: #0a1930
// Slate: #64748b

export default function Banner() {
  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log('Submitted:', inputValue);
      // Here you would typically send the input to your AI processing
      // For now we'll just clear the input
      setInputValue('');
    }
  };
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
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };
  
  const decorativeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: [0, 0.3, 0.5],
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };
  
  return (
    <motion.div 
      className="relative overflow-hidden bg-[#0a1930] min-h-screen flex flex-col justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-full opacity-20"
        variants={decorativeVariants}
      >
        <div className="w-full h-full bg-[#0070f3] rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-20"
        variants={decorativeVariants}
        transition={{ delay: 0.3 }}
      >
        <div className="w-full h-full bg-[#64748b] rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4"></div>
      </motion.div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          className="flex flex-col items-center w-full" 
          variants={itemVariants}
        >
          <motion.div 
            className="mb-6 w-full"
            variants={itemVariants}
          >
            <div className="relative w-full max-w-3xl mx-auto mb-4 text-center">
              <div className="inline-block px-4 py-1 mb-4 rounded-full bg-[#0070f3]/20 backdrop-blur-sm border border-[#0070f3]/30">
                <span className="text-sm font-medium text-white">AI-Powered Lead Generation <span className="ml-1 text-[#0070f3]">→</span></span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                <span className="text-[#0070f3]">Lead</span>Pilot
              </h1>
            </div>
            <motion.h2 
              className="text-base md:text-lg text-center font-medium text-[#64748b] mt-1 mb-4"
              variants={itemVariants}
            >
              Supercharge your outreach with AI-powered lead generation
            </motion.h2>
          </motion.div>
          
          <motion.p 
            className="text-[#64748b] text-sm md:text-base mb-4 max-w-2xl leading-relaxed text-center mx-auto"
            variants={itemVariants}
          >
            Find the perfect leads and connect with them using 
            <span className="text-white font-medium"> personalized AI-generated outreach</span>.
          </motion.p>
          
          <motion.div 
            className="flex justify-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/signup" 
                className="bg-white text-[#0a1930] px-8 py-2.5 rounded-full hover:bg-white/90 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg text-sm"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Small logo/badge in the corner */}
      <motion.div 
        className="absolute bottom-6 right-6 hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-[#0070f3]/20 to-[#64748b]/10 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/10">
          <Image 
            src="/leadpilot-logo.svg" 
            alt="LeadPilot Logo" 
            width={36} 
            height={36} 
            className="invert"
          />
        </div>
      </motion.div>
      
      {/* Chat prompt-like element */}
      <motion.div 
        className="mt-8 w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl mx-4 overflow-hidden border border-white/20">
          <div className="flex items-center p-3 border-b border-white/10">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <div className="flex-1 text-center">
            </div>
          </div>
          <div className="p-3 bg-white/5">
            <form onSubmit={handleSubmit} className="flex items-center">
              <div className="flex-1 relative group">
                <input 
                  type="text" 
                  placeholder="Try Demo" 
                  className="w-full p-2.5 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-1 focus:ring-[#0070f3] text-white text-sm placeholder-white/50 transition-all duration-200 group-hover:bg-white/15"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                {inputValue && (
                  <button 
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/70"
                    onClick={() => setInputValue('')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
              <button 
                type="submit" 
                className={`ml-2 p-2.5 rounded-full flex items-center justify-center transition-all duration-200 ${inputValue.trim() ? 'bg-white text-[#0a1930] hover:bg-white/90 shadow-md' : 'bg-white/30 text-white/50 cursor-not-allowed'}`}
                disabled={!inputValue.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
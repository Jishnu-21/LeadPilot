"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Electric Blue: #0063B2
// Navy: #004173
// Slate: #6E8898
// Light Slate: #A3B8CC
// White: #FFFFFF

export default function Banner() {
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
      className="relative overflow-hidden bg-gradient-to-br from-[#0063B2] via-[#004173] to-[#002A4A] py-24 md:py-32"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background decorative elements */}
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-full opacity-50"
        variants={decorativeVariants}
      >
        <div className="w-full h-full bg-[#0063B2] rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-30"
        variants={decorativeVariants}
        transition={{ delay: 0.3 }}
      >
        <div className="w-full h-full bg-[#6E8898] rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4"></div>
      </motion.div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          className="flex flex-col items-start max-w-3xl" 
          variants={itemVariants}
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
            variants={itemVariants}
          >
            <div className="flex flex-wrap items-baseline">
              <span className="text-white mr-3">ELEVATE</span>
              <span className="text-[#A3B8CC]">YOUR BRAND</span>
            </div>
            <div className="flex flex-wrap items-baseline mt-1">
              <span className="text-[#A3B8CC] mr-3">TRANSFORM</span>
              <span className="text-white">YOUR</span>
            </div>
            <div className="mt-1">
              <span className="bg-gradient-to-r from-white to-[#A3B8CC] text-transparent bg-clip-text">EXPERIENCE</span>
            </div>
          </motion.h1>
          
          <motion.p 
            className="text-[#A3B8CC] text-lg md:text-xl mb-8 max-w-2xl leading-relaxed"
            variants={itemVariants}
          >
            Cutting-edge AI-Powered Lead Generation for businesses 
            <br className="hidden md:block" /> 
            that want to <span className="text-white font-medium">stand out</span>.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/signup" 
                className="bg-gradient-to-r from-white to-[#A3B8CC] text-[#004173] px-8 py-3 rounded-full hover:from-[#A3B8CC] hover:to-white transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg"
              >
                Start Now
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/demo" 
                className="border-2 border-[#A3B8CC] text-[#A3B8CC] px-8 py-3 rounded-full hover:bg-[#A3B8CC] hover:text-[#004173] transition-all duration-300 font-medium flex items-center justify-center gap-2"
              >
               Try Demo
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Small logo/badge in the corner */}
      <motion.div 
        className="absolute bottom-8 right-8 hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-[#6E8898]/30 to-[#A3B8CC]/20 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/10">
          <Image 
            src="/leadpilot-logo.svg" 
            alt="LeadPilot Logo" 
            width={40} 
            height={40} 
            className="invert"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
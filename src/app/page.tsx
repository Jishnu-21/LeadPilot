"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import Header from "./components/Header";
import Banner from "./components/Banner";
import Features from "./components/Features";
import Footer from "./components/Footer";
import ChatForm from "./components/ChatForm";

export default function Home() {
  const [showChatForm, setShowChatForm] = useState(false);
  const chatFormRef = useRef<HTMLDivElement>(null);
  
  const startDemo = () => {
    setShowChatForm(true);
    
    // Give time for the DOM to update
    setTimeout(() => {
      // Scroll to the chat form with smooth scrolling and offset for header
      if (chatFormRef.current) {
        const headerOffset = 80; // Account for fixed header height
        const elementPosition = chatFormRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 200);
  };
  
  const closeChatForm = () => {
    setShowChatForm(false);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Banner onStartDemo={startDemo} />
      
      {/* Chat Form Section with ref and scroll target */}
      <div id="chat-section" ref={chatFormRef} className="mt-8 pt-4 scroll-mt-20">
        <AnimatePresence>
          {showChatForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ChatForm onClose={closeChatForm} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence mode="sync">
        <motion.div
          key="features"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: 1, 
            y: showChatForm ? 0 : -20,
            transition: { duration: 0.5, delay: showChatForm ? 0.3 : 0 }
          }}
          exit={{ opacity: 0 }}
        >
          <Features />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

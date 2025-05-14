"use client";

import { useState, useRef } from "react";
import Image from "next/image";
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
      // Scroll to the chat form with smooth scrolling
      if (chatFormRef.current) {
        chatFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };
  
  const closeChatForm = () => {
    setShowChatForm(false);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Banner onStartDemo={startDemo} />
      
      {/* Chat Form Section with ref */}
      <div ref={chatFormRef}>
        {showChatForm && <ChatForm onClose={closeChatForm} />}
      </div>
      
      <Features />
      <Footer />
    </div>
  );
}

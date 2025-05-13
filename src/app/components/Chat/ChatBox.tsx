"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { motion, AnimatePresence } from 'framer-motion';

// Define message type
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m LeadPilot AI. How can I help you with lead generation today?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle input change and auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() === '' || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response - in a real app, this would be an API call
      const responseContent = generateMockResponse(inputValue.trim());
      
      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock response generator - replace with actual API call in production
  const generateMockResponse = (prompt: string): string => {
    const lowercasePrompt = prompt.toLowerCase();
    
    if (lowercasePrompt.includes('lead') || lowercasePrompt.includes('generation')) {
      return "LeadPilot helps you generate high-quality leads through our AI-powered platform. We can help you identify potential clients, create personalized outreach messages, and track your campaign performance.";
    } else if (lowercasePrompt.includes('price') || lowercasePrompt.includes('cost') || lowercasePrompt.includes('pricing')) {
      return "Our pricing starts at $49/month for the Starter plan, which includes up to 100 leads per month. We also offer Professional ($99/month) and Enterprise (custom pricing) plans for larger needs.";
    } else if (lowercasePrompt.includes('hello') || lowercasePrompt.includes('hi')) {
      return "Hello there! How can I help you with your lead generation needs today?";
    } else {
      return "Thanks for your message. Our AI-powered lead generation platform can help you find and connect with potential clients through multiple channels. Would you like to know more about specific features or how to get started?";
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-xl overflow-hidden border border-[#A3B8CC]/20 h-[600px] max-h-[80vh] w-full max-w-2xl mx-auto">
      {/* Chat header */}
      <div className="bg-gradient-to-r from-[#0063B2] to-[#004173] p-4 text-white flex items-center">
        <Bot size={24} className="mr-2" />
        <h2 className="font-medium">LeadPilot AI Assistant</h2>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <AnimatePresence initial={false}>
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
        
        {/* Loading indicator */}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center p-4 rounded-lg bg-white my-2 max-w-[80%]"
          >
            <div className="mr-2 flex items-center justify-center w-8 h-8 bg-[#0063B2]/10 rounded-full">
              <Bot size={16} className="text-[#0063B2]" />
            </div>
            <Loader2 className="animate-spin text-[#0063B2]" size={16} />
          </motion.div>
        )}
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
        <div className="relative flex items-end">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 resize-none border border-gray-300 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#0063B2] focus:border-transparent max-h-[200px] min-h-[56px]"
            rows={1}
          />
          <button
            type="submit"
            disabled={isLoading || inputValue.trim() === ''}
            className={`absolute right-3 bottom-3 rounded-md p-1 ${
              isLoading || inputValue.trim() === '' 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-[#0063B2] hover:bg-[#0063B2]/10'
            } transition-colors`}
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for a new line
        </p>
      </form>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatFormProps {
  onClose: () => void;
}

export default function ChatForm({ onClose }: ChatFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const questions = [
    "What do you do professionally?",
    "Who is your target audience?",
    "What do you offer them?",
    "What region are you targeting (local or international)?",
    "What should your outreach message say?",
    "Which platform do you want to use for outreach?"
  ];
  
  const suggestions = {
    0: ["SaaS founder", "Marketing agency", "E-commerce business", "Consultant"],
    1: ["Small businesses", "Enterprise companies", "Startups", "Local shops"],
    2: ["Marketing services", "Software solution", "Consulting", "Products"],
    3: ["Local only", "National", "International", "Global"],
    4: ["Brief introduction", "Value proposition", "Case study", "Special offer"],
    5: ["Email", "LinkedIn", "Instagram", "Contact form"]
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = inputValue;
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setInputValue('');
    } else {
      setIsComplete(true);
      console.log("All questions answered:", newAnswers);
    }
  };

  const handleFinalSubmit = () => {
    console.log("Final submission with answers:", answers);
    alert("Thank you for your responses! Your personalized leads are being generated.");
    onClose();
  };

  useEffect(() => {
    if (inputRef.current && !isComplete) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [currentQuestionIndex, isComplete]);
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currentQuestionIndex, answers]);
  
  // Track if this is the first focus after component mount
  const isFirstFocus = useRef(true);

  useEffect(() => {
    const handleFocus = () => {
      // Only scroll to bottom if it's not the first focus (triggered by initial demo start)
      if (window.innerWidth < 768 && !isFirstFocus.current) {
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
        }, 300);
      }
      // After first focus, set the flag to false for subsequent focuses
      if (isFirstFocus.current) {
        isFirstFocus.current = false;
      }
    };
    
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
      return () => {
        inputElement.removeEventListener('focus', handleFocus);
      };
    }
  }, []);

  return (
    <div 
      id="chat-form-section" 
      className="w-full mt-8 sm:mt-16 mb-4 sm:mb-8 bg-white pt-0 pb-2 px-2 sm:px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#0070f3] to-[#5f3dc4] p-3 sm:p-4 rounded-t-xl relative">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-white text-base sm:text-lg">LeadPilot Assistant</h2>
              <button 
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors focus:outline-none"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {isComplete ? (
            <div className="space-y-6 p-4">
              <div className="text-center">
                <h3 className="font-bold text-xl text-gray-900">Ready to Generate Your Leads</h3>
                <p className="text-gray-600 mt-1">We'll use your responses to create personalized outreach campaigns.</p>
                <ul className="space-y-2 mt-4">
                  {questions.map((question, idx) => (
                    <li key={idx} className="flex">
                      <span className="font-medium text-gray-700 mr-2">{idx + 1}.</span>
                      <div>
                        <p className="text-sm text-gray-600">{question}</p>
                        <p className="font-medium text-gray-900">{answers[idx]}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center">
                <button
                  onClick={handleFinalSubmit}
                  className="bg-[#0070f3] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0060d3] transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <>
              <div 
                ref={chatContainerRef}
                className="p-3 sm:p-4 overflow-y-auto max-h-[300px] sm:max-h-[400px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              >
                <AnimatePresence>
                  {Array.from({ length: currentQuestionIndex + 1 }).map((_, idx) => (
                    <motion.div 
                      key={idx} 
                      className="space-y-4 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                    >
                      <motion.div 
                        className="flex items-start space-x-3 overflow-hidden"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 + 0.1 }}
                      >
                        <div className="w-8 h-8 bg-[#0070f3] rounded-md flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-800 max-w-[80%]">
                          <p>{questions[idx]}</p>
                        </div>
                      </motion.div>
                      
                      {idx === currentQuestionIndex && (
                        <motion.div 
                          className="flex flex-wrap gap-2 mt-2 ml-11"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          {suggestions[idx as keyof typeof suggestions].map((suggestion, suggestionIdx) => (
                            <motion.button
                              key={suggestionIdx}
                              type="button"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-4 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors whitespace-nowrap"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: 0.3 + (suggestionIdx * 0.05) }}
                            >
                              {suggestion}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                      
                      {idx < currentQuestionIndex && answers[idx] && (
                        <motion.div 
                          className="flex items-start justify-end space-x-3 overflow-hidden"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 + 0.2 }}
                        >
                          <div className="bg-blue-100 rounded-full px-4 py-2 text-blue-800">
                            <p>{answers[idx]}</p>
                          </div>
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="sticky bottom-0 bg-white border-t border-gray-100 pt-2 pb-2 px-3 sm:px-4">
                <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-3">
                  <div className="flex-grow">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Type your answer..."
                      className="w-full p-3 sm:p-4 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#0070f3] focus:border-transparent text-black shadow-lg text-sm sm:text-base"
                      autoComplete="off"
                      autoCapitalize="sentences"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-[#0070f3] to-[#2563eb] text-white px-5 sm:px-8 py-3 sm:py-4 rounded-full hover:from-[#0060d3] hover:to-[#1e40af] transition-colors shadow-lg text-sm sm:text-base whitespace-nowrap"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
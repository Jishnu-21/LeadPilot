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
  
  const questions = [
    "What do you do professionally?",
    "Who is your target audience?",
    "What do you offer them?",
    "What region are you targeting (local or international)?",
    "What should your outreach message say?",
    "Which platform do you want to use for outreach?"
  ];
  
  const suggestions = {
    0: ["Marketing Manager", "Sales Executive", "Software Engineer", "Business Consultant", "Entrepreneur"],
    1: ["Small Business Owners", "Corporate Executives", "Tech Startups", "E-commerce Brands", "Healthcare Professionals"],
    2: ["Consulting Services", "SaaS Platform", "Marketing Solutions", "Custom Development", "Training Programs"],
    3: ["United States", "Global", "Europe", "Asia Pacific", "Local (San Francisco)"],
    4: ["I'd like to introduce my services that can help increase your revenue...", "Our platform has helped similar companies achieve..."],
    5: ["LinkedIn", "Email", "Twitter", "Instagram", "Facebook"]
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    // Focus the input field after setting the value
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Save the current answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = inputValue;
    setAnswers(newAnswers);
    
    // Move to the next question if available
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setInputValue(''); // Clear input for the next question
    } else {
      // All questions answered
      setIsComplete(true);
      console.log("All questions answered:", newAnswers);
    }
  };

  const handleFinalSubmit = () => {
    // Process all answers
    console.log("Final submission with answers:", answers);
    // Here you would typically send the data to your backend
    alert("Thank you for your responses! Your personalized leads are being generated.");
    // Close the form after submission
    onClose();
  };

  // Focus input when current question changes
  useEffect(() => {
    if (inputRef.current && !isComplete) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100); // Small delay to ensure DOM is ready
    }
  }, [currentQuestionIndex, isComplete]);

  return (
    <div 
      id="chat-form-section" 
      className="w-full bg-white py-8 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-[#0070f3] p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-medium text-white text-lg">LeadPilot Assistant</h2>
                <p className="text-xs text-white/80">Answer a few questions to generate your personalized outreach</p>
              </div>
              <button 
                onClick={onClose}
                className="text-white/80 hover:text-white"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Question and Answer Area */}
          <div className="p-6 space-y-8">
            {/* Previous Questions and Answers - Displayed as pairs in sequence */}
            {Array.from({ length: currentQuestionIndex }).map((_, index) => (
              <div key={`qa-${index}`} className="space-y-4">
                {/* Question */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#0070f3] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 text-gray-800 max-w-[80%]">
                    <p className="font-medium">{questions[index]}</p>
                  </div>
                </div>
                
                {/* Answer */}
                <div className="flex items-start justify-end space-x-4 pl-14">
                  <div className="bg-[#0070f3] rounded-lg p-4 text-white max-w-[80%] font-medium">
                    <p>{answers[index]}</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Current Question or Final Screen */}
            {isComplete ? (
              <div className="space-y-6 py-4">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Thank you for your responses!</h3>
                  <p className="text-gray-600 mb-6">We've collected all the information needed to generate leads and create personalized outreach messages.</p>
                  
                  <button
                    onClick={handleFinalSubmit}
                    className="bg-[#0070f3] text-white px-6 py-3 rounded-md hover:bg-[#0060d3] transition-colors font-medium"
                  >
                    Generate My Leads
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#0070f3] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 text-gray-800 max-w-[80%]">
                    <p className="font-medium">{questions[currentQuestionIndex]}</p>
                  </div>
                </div>
                
                {/* Input Area with Suggestions */}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-3 pl-14">
                  {/* Suggestions */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {suggestions[currentQuestionIndex as keyof typeof suggestions]?.map((suggestion, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 text-sm bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 border border-gray-300 hover:border-gray-400 transition-colors whitespace-nowrap shadow-sm hover:shadow"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Type your response..."
                      className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0070f3] focus:border-transparent text-black font-medium"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-[#0070f3] text-white p-3 rounded-r-lg hover:bg-[#0060d3] transition-colors"
                      disabled={!inputValue.trim()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          
          {/* Progress bar footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>
                {isComplete ? 
                  "All questions completed!" : 
                  `Question ${currentQuestionIndex + 1} of ${questions.length}`
                }
              </span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#0070f3] h-2 rounded-full" 
                  style={{ width: `${isComplete ? 100 : ((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
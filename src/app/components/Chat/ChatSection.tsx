"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, ArrowRight, Building2, Mail, Copy, Check, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';



interface Target {
  name: string;
  position: string;
  company: string;
  email: string;
  linkedin?: string;
}

interface ScrapingResult {
  targets: Target[];
  emailTemplate: string;
}

export default function ChatSection() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<ScrapingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Scroll to result when it changes
  useEffect(() => {
    if (hasSubmitted && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [result, hasSubmitted]);

  // Handle input change and auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (prompt.trim() === '' || isLoading) return;
    
    setIsLoading(true);
    setHasSubmitted(true);
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response - in a real app, this would be an API call to your scraping service
      const responseContent = generateMockResponse(prompt.trim());
      
      // Set the result
      setResult(responseContent);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Set error message
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Copy email to clipboard
  const copyToClipboard = (text: string, email: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(email);
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };
  
  // Generate personalized email for a specific target
  const generatePersonalizedEmail = (template: string, target: Target): string => {
    return template
      .replace(/{{name}}/g, target.name)
      .replace(/{{company}}/g, target.company)
      .replace(/{{position}}/g, target.position);
  };
  
  // Export targets as CSV
  const exportAsCSV = () => {
    if (!result) return;
    
    const headers = ['Name', 'Position', 'Company', 'Email', 'LinkedIn'];
    const csvRows = [
      headers.join(','),
      ...result.targets.map(target => {
        return [
          `"${target.name}"`,
          `"${target.position}"`,
          `"${target.company}"`,
          `"${target.email}"`,
          `"${target.linkedin || ''}"`,
        ].join(',');
      })
    ];
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'lead_targets.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Mock response generator - replace with actual API call in production
  const generateMockResponse = (prompt: string): ScrapingResult => {
    // This is a mock function that would be replaced with actual API calls to your scraping service
    // In a real implementation, this would connect to your backend to perform the scraping
    
    // Generate some mock targets based on the prompt
    const mockTargets: Target[] = [
      {
        name: "Sarah Johnson",
        position: "Marketing Director",
        company: "TechCorp Solutions",
        email: "sarah.johnson@techcorp.com",
        linkedin: "linkedin.com/in/sarahjohnson"
      },
      {
        name: "Michael Chen",
        position: "VP of Operations",
        company: "Global Innovations Inc.",
        email: "m.chen@globalinnovations.com",
        linkedin: "linkedin.com/in/michaelchen"
      },
      {
        name: "Jessica Williams",
        position: "Chief Marketing Officer",
        company: "Nexus Enterprises",
        email: "j.williams@nexusent.com"
      },
      {
        name: "Robert Davis",
        position: "Business Development Manager",
        company: "Pinnacle Group",
        email: "r.davis@pinnaclegroup.com",
        linkedin: "linkedin.com/in/robertdavis"
      },
      {
        name: "Emma Thompson",
        position: "Director of Sales",
        company: "Horizon Industries",
        email: "e.thompson@horizonindustries.com"
      }
    ];
    
    // Generate a personalized email template based on the prompt
    const emailTemplate = `Subject: Enhancing Your ${prompt.includes('marketing') ? 'Marketing' : 'Business'} Strategy with LeadPilot

Dear {{name}},

I hope this email finds you well. I noticed your impressive work at {{company}} as the {{position}}.

I wanted to reach out because our AI-powered lead generation platform, LeadPilot, has been helping companies similar to {{company}} achieve significant growth in their outreach efforts.

Would you be open to a brief conversation about how we might be able to support your team's goals?

Looking forward to your response,
[Your Name]
LeadPilot`;
    
    return {
      targets: mockTargets,
      emailTemplate: emailTemplate
    };
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  // Reset form to ask another question
  const handleReset = () => {
    setPrompt('');
    setResult(null);
    setHasSubmitted(false);
    
    // Focus input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0063B2]/5 to-[#0063B2]/10 py-20 px-4">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl font-bold text-[#004173] mb-4">Find Your Perfect Leads</h2>
          <p className="text-[#6E8898] max-w-2xl mx-auto">
            Describe your target audience and we'll find relevant corporate contacts for your outreach campaigns.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col bg-white rounded-xl shadow-xl overflow-hidden border border-[#A3B8CC]/20 w-full max-w-3xl mx-auto"
          variants={itemVariants}
        >
          {/* Chat header */}
          <div className="bg-gradient-to-r from-[#0063B2] to-[#004173] p-4 text-white flex items-center justify-between">
            <div className="flex items-center">
              <Building2 size={22} className="mr-2" />
              <h3 className="font-medium">Lead Generation Tool</h3>
            </div>
            {hasSubmitted && result && (
              <button 
                onClick={exportAsCSV}
                className="flex items-center text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
              >
                <Download size={16} className="mr-1" />
                Export CSV
              </button>
            )}
          </div>
          
          {!hasSubmitted ? (
            /* Prompt input area when no submission yet */
            <div className="p-8 flex flex-col items-center justify-center">
              <form onSubmit={handleSubmit} className="w-full max-w-2xl">
                <div className="relative">
                  <label className="block text-[#004173] font-medium mb-2">Describe your target audience</label>
                  <textarea
                    ref={inputRef}
                    value={prompt}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Example: Marketing directors at tech companies in San Francisco with 50-200 employees who need help with lead generation"
                    className="w-full resize-none border border-gray-300 rounded-lg py-4 px-5 pr-14 focus:outline-none focus:ring-2 focus:ring-[#0063B2] focus:border-transparent min-h-[120px] text-[#004173]"
                    rows={3}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || prompt.trim() === ''}
                    className={`absolute right-4 bottom-4 rounded-full p-2 ${
                      isLoading || prompt.trim() === '' 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-[#0063B2] text-white hover:bg-[#004173]'
                    } transition-colors`}
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Be specific about industry, role, company size, location, and pain points
                </p>
              </form>
            </div>
          ) : (
            /* Result area after submission */
            <div className="p-6 flex flex-col">
              <div className="mb-6 bg-[#0063B2]/5 p-4 rounded-lg border border-[#0063B2]/10">
                <h4 className="font-medium text-[#004173] mb-1">Your target audience:</h4>
                <p className="text-[#6E8898]">{prompt}</p>
              </div>
              
              <div ref={resultRef}>
                {isLoading ? (
                  /* Loading indicator */
                  <div className="flex items-center p-6 bg-white rounded-lg border border-gray-200">
                    <div className="mr-3 flex items-center justify-center w-8 h-8 bg-[#0063B2]/10 rounded-full">
                      <Building2 size={16} className="text-[#0063B2]" />
                    </div>
                    <Loader2 className="animate-spin text-[#0063B2] mr-2" size={16} />
                    <span className="text-[#6E8898]">Finding relevant contacts...</span>
                  </div>
                ) : result ? (
                  /* Result content */
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Targets section */}
                    <div>
                      <h4 className="font-medium text-[#004173] mb-3 flex items-center">
                        <Building2 size={18} className="mr-2" />
                        Found {result.targets.length} relevant contacts
                      </h4>
                      
                      <div className="grid gap-4">
                        {result.targets.map((target, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                              <h5 className="font-medium text-[#004173]">{target.name}</h5>
                              <p className="text-[#6E8898] text-sm">{target.position} at {target.company}</p>
                              <div className="flex items-center mt-1">
                                <Mail size={14} className="text-[#0063B2] mr-1" />
                                <span className="text-sm text-[#6E8898]">{target.email}</span>
                              </div>
                            </div>
                            <div className="mt-3 md:mt-0 flex items-center space-x-2">
                              {target.linkedin && (
                                <a 
                                  href={`https://${target.linkedin}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs px-3 py-1 bg-[#0063B2]/10 text-[#0063B2] rounded-full hover:bg-[#0063B2]/20 transition-colors"
                                >
                                  LinkedIn
                                </a>
                              )}
                              <button 
                                onClick={() => copyToClipboard(generatePersonalizedEmail(result.emailTemplate, target), target.email)}
                                className="text-xs px-3 py-1 bg-[#0063B2] text-white rounded-full hover:bg-[#004173] transition-colors flex items-center"
                              >
                                {copiedEmail === target.email ? (
                                  <>
                                    <Check size={14} className="mr-1" />
                                    Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy size={14} className="mr-1" />
                                    Copy Email
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Email template section */}
                    <div className="mt-8">
                      <h4 className="font-medium text-[#004173] mb-3 flex items-center">
                        <Mail size={18} className="mr-2" />
                        AI-Generated Email Template
                      </h4>
                      <div className="bg-white p-5 rounded-lg border border-gray-200">
                        <pre className="whitespace-pre-wrap text-[#004173] font-sans">{result.emailTemplate}</pre>
                      </div>
                      <p className="text-xs text-[#6E8898] mt-2">
                        Click "Copy Email" on any contact to get a personalized version of this template.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                    Sorry, we encountered an error finding contacts. Please try again with a more specific description.
                  </div>
                )}
              </div>
              
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-[#0063B2] text-white rounded-full hover:bg-[#004173] transition-colors"
                >
                  Find new contacts
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

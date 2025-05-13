"use client";

import Image from 'next/image';
import { Search, MessageSquare, Mail, BarChart3, Zap, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
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

  const cardHoverVariants = {
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 67, 115, 0.1), 0 10px 10px -5px rgba(0, 67, 115, 0.04)",
      transition: { duration: 0.3 }
    }
  };
  // Electric Blue: #0063B2
  // Navy: #004173
  // Slate: #6E8898
  // Light Slate: #A3B8CC
  // White: #FFFFFF

  const features = [
    {
      icon: <Search size={24} color="#0063B2" />,
      title: "Find Real Leads",
      description: "Discover companies matching your target criteria based on profession, industry, and region."
    },
    {
      icon: <MessageSquare size={24} color="#0063B2" />,
      title: "Generate AI Text",
      description: "Create personalized messages tailored to each lead with our advanced AI technology."
    },
    {
      icon: <Mail size={24} color="#0063B2" />,
      title: "Multi-Channel Outreach",
      description: "Reach out via email, LinkedIn, Instagram, or contact forms - all from one platform."
    },
    {
      icon: <BarChart3 size={24} color="#0063B2" />,
      title: "Track Everything",
      description: "Monitor your outreach performance with detailed analytics and response tracking."
    },
    {
      icon: <Zap size={24} color="#0063B2" />,
      title: "Automated Workflows",
      description: "Set up automated sequences to nurture leads through your sales pipeline."
    },
    {
      icon: <Users size={24} color="#0063B2" />,
      title: "Team Collaboration",
      description: "Work together with your team members to manage leads and campaigns efficiently."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-[#A3B8CC]/10">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl font-bold text-[#004173] mb-4">How LeadPilot Works</h2>
          <p className="text-lg text-[#6E8898] max-w-2xl mx-auto">
            Our AI-powered platform helps you find and connect with potential clients through multiple channels
          </p>
        </motion.div>
        
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants}>
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-start"
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 67, 115, 0.1), 0 10px 10px -5px rgba(0, 67, 115, 0.04)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 rounded-full bg-[#0063B2]/10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#004173] mb-3">{feature.title}</h3>
              <p className="text-[#6E8898]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-20 bg-gradient-to-r from-[#0063B2] to-[#004173] rounded-xl overflow-hidden shadow-xl"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row">
            <motion.div 
              className="md:w-1/2 p-10 md:p-12 flex flex-col justify-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-4">Ready to transform your lead generation?</h3>
              <p className="text-white text-lg mb-8 opacity-90">
                Start finding quality leads and reaching out with personalized messages today.
              </p>
              <div>
                <motion.a 
                  href="#" 
                  className="inline-block bg-white text-[#004173] font-bold py-3 px-8 rounded-full hover:bg-[#A3B8CC] transition-all shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Now
                </motion.a>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 bg-[#004173]/30 p-10 flex items-center justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-4 max-w-xs">
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-white font-bold text-2xl mb-1">500+</h4>
                  <p className="text-white text-sm opacity-80">Companies Found</p>
                </motion.div>
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-white font-bold text-2xl mb-1">98%</h4>
                  <p className="text-white text-sm opacity-80">Delivery Rate</p>
                </motion.div>
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-white font-bold text-2xl mb-1">24/7</h4>
                  <p className="text-white text-sm opacity-80">AI Support</p>
                </motion.div>
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-white font-bold text-2xl mb-1">3.5x</h4>
                  <p className="text-white text-sm opacity-80">ROI Increase</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
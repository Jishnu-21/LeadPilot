"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#004173]/5 to-[#004173]/10 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Company Info */}
          <motion.div className="col-span-1 md:col-span-1" variants={itemVariants}>
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/leadpilot-logo.svg" 
                alt="LeadPilot Logo" 
                width={120} 
                height={40} 
                className="filter brightness-0 opacity-90"
              />
            </Link>
            <p className="text-[#6E8898] mb-6 text-sm">
              AI-powered lead generation platform helping businesses connect with potential clients.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="text-[#6E8898] hover:text-[#0063B2] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-[#6E8898] hover:text-[#0063B2] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-[#6E8898] hover:text-[#0063B2] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a 
                href="mailto:info@leadpilot.ai" 
                className="text-[#6E8898] hover:text-[#0063B2] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="col-span-1" variants={itemVariants}>
            <h3 className="text-[#004173] font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-[#6E8898] hover:text-[#0063B2] transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#6E8898] hover:text-[#0063B2] transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-[#6E8898] hover:text-[#0063B2] transition-colors text-sm">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#6E8898] hover:text-[#0063B2] transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div className="col-span-1" variants={itemVariants}>
            <h3 className="text-[#004173] font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/imprint" className="text-[#6E8898] hover:text-[#0063B2] transition-colors text-sm">
                  Imprint
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#6E8898] hover:text-[#0063B2] transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#6E8898] hover:text-[#0063B2] transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-[#6E8898] hover:text-[#0063B2] transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div className="col-span-1" variants={itemVariants}>
            <h3 className="text-[#004173] font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-[#6E8898] text-sm">
                LeadPilot Inc.
              </li>
              <li className="text-[#6E8898] text-sm">
                123 AI Avenue
              </li>
              <li className="text-[#6E8898] text-sm">
                San Francisco, CA 94103
              </li>
              <li className="text-[#6E8898] text-sm">
                <a href="mailto:info@leadpilot.ai" className="hover:text-[#0063B2] transition-colors">
                  info@leadpilot.ai
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-[#6E8898]/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-[#6E8898] text-sm mb-4 md:mb-0">
            © {currentYear} LeadPilot. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/imprint" className="text-[#6E8898] hover:text-[#0063B2] transition-colors text-sm font-medium">
              Imprint
            </Link>
            <Link href="/privacy" className="text-[#6E8898] hover:text-[#0063B2] transition-colors text-sm font-medium">
              Privacy Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

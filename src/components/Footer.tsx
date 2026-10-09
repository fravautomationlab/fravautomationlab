import React from 'react';
import { motion } from 'motion/react';
import { Twitter, Linkedin, Github, Terminal } from 'lucide-react';
import type Lenis from 'lenis';
import { PageId } from '../types';

interface FooterProps {
  onNavigate?: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const pageLinks: { label: string; id: PageId }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Website Development', id: 'web-dev' },
    { label: 'AI Automation', id: 'ai-automation' },
    { label: 'Contact', id: 'contact' },
  ];

  const handlePageClick = (pageId: PageId) => {
    if (onNavigate) {
      onNavigate(pageId);
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      aria-label="Site Footer"
      className="bg-black text-white pt-24 pb-12 px-6 sm:px-12 md:px-16 lg:px-24 w-full select-none"
    >
      <div className="w-full">
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-neutral-800">
          {/* Column 1: Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-6 font-sans">
              Contact & Inquiries
            </h3>
            <div className="space-y-3 text-base text-neutral-200">
              <p>
                <a
                  href="mailto:hi@arthurjones.dev"
                  className="hover:text-white transition-colors focus-visible:underline"
                >
                  hi@arthurjones.dev
                </a>
              </p>
              <p>
                <a
                  href="tel:+16504395756"
                  className="hover:text-white transition-colors focus-visible:underline"
                >
                  +1 (650) 439-5756
                </a>
              </p>
            </div>
            <p className="mt-4 text-xs text-neutral-500">
              Available for full-stack web builds, AI automation contracts, and advisory.
            </p>
          </div>

          {/* Column 2: Navigation Pages */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-6 font-sans">
              Directory
            </h3>
            <ul className="space-y-3 text-base text-neutral-300">
              {pageLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => handlePageClick(link.id)}
                    className="hover:text-white transition-colors focus-visible:underline cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Engineering Standards */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-6 font-sans">
              Standards
            </h3>
            <ul className="space-y-3 text-base text-neutral-300">
              <li className="text-neutral-400 text-sm">Next.js 15 App Router & Server Actions</li>
              <li className="text-neutral-400 text-sm">TypeScript Strict Mode & Zod Schemas</li>
              <li className="text-neutral-400 text-sm">Autonomous Multi-Agent Orchestration</li>
              <li className="text-neutral-400 text-sm">WCAG AA Accessible & Sub-Second Latency</li>
            </ul>
          </div>

          {/* Column 4: Social / Developer Profiles */}
          <div className="flex flex-col sm:items-end">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-6 font-sans">
              Code & Network
            </h3>
            <div className="flex items-center gap-5 text-neutral-300 text-lg">
              <motion.a
                whileHover={{ scale: 1.15, color: '#FFFFFF' }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, color: '#FFFFFF' }}
                whileTap={{ scale: 0.95 }}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X Profile"
                className="transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, color: '#FFFFFF' }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Massive Giant Typography "ARTHUR JONES" matching video */}
        <div className="py-16 sm:py-24 text-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-['Syne',sans-serif] font-black uppercase text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[15rem] leading-none tracking-tighter w-full hover:tracking-normal transition-all duration-700 cursor-default"
          >
            ARTHUR JONES
          </motion.div>
        </div>

        {/* Bottom Attribution */}
        <div className="flex items-center justify-between text-xs text-neutral-500 pt-6 border-t border-neutral-900 font-sans">
          <p>© {new Date().getFullYear()} Arthur Jones · Full-Stack & AI Systems</p>
          <p>Built with Next.js & Motion</p>
        </div>
      </div>
    </footer>
  );
};

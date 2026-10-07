import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Sun, Moon } from 'lucide-react';
import type Lenis from 'lenis';
import { FravPageId } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface FravNavProps {
  currentPage: FravPageId;
  onNavigate: (page: FravPageId) => void;
  onStartClick: () => void;
}

export const FravNav: React.FC<FravNavProps> = ({ currentPage, onNavigate, onStartClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: FravPageId }[] = [
    { label: 'WEB DEVELOPMENT', page: 'web-development' },
    { label: 'AUTOMATION', page: 'automation' },
    { label: 'ABOUT US', page: 'about-us' },
  ];

  const handleSelect = (page: FravPageId) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, page: FravPageId) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    handleSelect(page);
  };

  const isLinkActive = (page: FravPageId) => {
    if (currentPage === page) return true;
    if ((page === 'web' || page === 'web-development') && (currentPage === 'web' || currentPage === 'web-development')) return true;
    if ((page === 'about' || page === 'about-us') && (currentPage === 'about' || currentPage === 'about-us')) return true;
    if (page === 'automation' && currentPage === 'automation') return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 w-full ${
          theme === 'light'
            ? isScrolled
              ? 'bg-white/95 backdrop-blur-md py-4 sm:py-5 border-b border-neutral-900/10 shadow-sm'
              : 'bg-white/90 backdrop-blur-md py-7 sm:py-9 border-b border-neutral-900/10 shadow-sm'
            : isScrolled
              ? 'bg-[#0A0A0A]/90 backdrop-blur-md py-4 sm:py-5 border-b border-white/5'
              : 'bg-transparent py-7 sm:py-9'
        }`}
      >
        <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 flex items-center justify-between">
          {/* Brand: FRAV */}
          <a
            href="/"
            onClick={(event) => handleLinkClick(event, 'home')}
            className="text-xl sm:text-2xl font-black tracking-tighter text-white font-['Syne',sans-serif] uppercase hover:opacity-80 transition-opacity cursor-pointer text-left"
          >
            FRAV
          </a>

          {/* Center/Right: WEB DEVELOPMENT / AUTOMATION / ABOUT US */}
          <nav
            aria-label="Studio Navigation"
            className="hidden lg:flex items-center gap-8 text-xs font-sans tracking-widest text-neutral-400 uppercase"
          >
            {navLinks.map((link, idx) => {
              const isActive = isLinkActive(link.page);
              return (
                <React.Fragment key={link.page}>
                  <a
                    href={link.page === 'web-development' ? '/web' : link.page === 'automation' ? '/automation' : '/about'}
                    onClick={(event) => handleLinkClick(event, link.page)}
                    className={`relative py-1 transition-colors cursor-pointer ${
                      isActive ? 'text-white font-bold' : 'hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="frav-nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#FF4F38]"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </a>
                  {idx < navLinks.length - 1 && <span className="text-neutral-700">/</span>}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Action: THEME TOGGLE + CALL US + CONTACT US */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center text-white active:scale-95"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-white" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-neutral-900" />
              )}
            </button>

            <a
              href="tel:+41442114890"
              className="text-xs font-sans tracking-wider text-white uppercase px-3.5 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5"
              aria-label="Call studio"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF4F38]" />
              <span>CALL US</span>
            </a>
            <button
              type="button"
              onClick={onStartClick}
              className="text-xs font-sans tracking-widest text-white uppercase px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all cursor-pointer active:scale-95"
            >
              CONTACT US
            </button>
          </div>

          {/* Mobile actions: theme toggle + quick call + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-white border border-white/20 rounded-full hover:border-white flex items-center justify-center cursor-pointer"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-white" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-neutral-900" />
              )}
            </button>
            <a
              href="tel:+41442114890"
              className="p-2 text-white border border-white/20 rounded-full hover:border-white flex items-center justify-center"
              aria-label="Call studio"
            >
              <Phone className="w-4 h-4 text-[#FF4F38]" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 text-white cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col justify-between p-8 pt-28 lg:hidden"
          >
            <div className="flex flex-col gap-6 text-xl sm:text-2xl font-bold font-['Syne',sans-serif] text-white">
              <a
                href="/"
                onClick={(event) => handleLinkClick(event, 'home')}
                className={`text-left transition-colors ${currentPage === 'home' ? 'text-[#FF4F38]' : 'hover:text-neutral-400'}`}
              >
                HOME
              </a>
              <a
                href="/web"
                onClick={(event) => handleLinkClick(event, 'web-development')}
                className={`text-left transition-colors ${isLinkActive('web-development') ? 'text-[#FF4F38]' : 'hover:text-neutral-400'}`}
              >
                WEB DEVELOPMENT
              </a>
              <a
                href="/automation"
                onClick={(event) => handleLinkClick(event, 'automation')}
                className={`text-left transition-colors ${isLinkActive('automation') ? 'text-[#FF4F38]' : 'hover:text-neutral-400'}`}
              >
                AUTOMATION
              </a>
              <a
                href="/about"
                onClick={(event) => handleLinkClick(event, 'about-us')}
                className={`text-left transition-colors ${isLinkActive('about-us') ? 'text-[#FF4F38]' : 'hover:text-neutral-400'}`}
              >
                ABOUT US
              </a>
              <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onStartClick();
                  }}
                  className="text-left text-[#FF4F38] text-xl font-bold flex items-center justify-between"
                >
                  <span>CONTACT US</span>
                  <span>→</span>
                </button>
                <a
                  href="tel:+41442114890"
                  className="text-left text-white text-base font-bold flex items-center gap-2.5 py-1"
                >
                  <Phone className="w-4 h-4 text-[#FF4F38]" />
                  <span>CALL US: +41 44 211 48 90</span>
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-sans text-neutral-400 uppercase tracking-widest pt-4 border-t border-white/10">
              <span>FRAV LAB · 2026</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-2 text-white hover:text-[#FF4F38] transition-colors cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-[#FF4F38]" /> : <Moon className="w-4 h-4 text-[#FF4F38]" />}
                <span>{theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

import React, { useState } from 'react';
import { Phone, MapPin, ArrowUp, ArrowUpRight, Copy, Check, Sun, Moon } from 'lucide-react';
import { FravPageId } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface FravFooterProps {
  onNavigate: (page: FravPageId) => void;
  onContactClick: () => void;
}

export const FravFooter: React.FC<FravFooterProps> = ({ onNavigate, onContactClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [legalModal, setLegalModal] = useState<{ title: string; content: string } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText('studio@fravlab.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const directoryLinks: { label: string; page: FravPageId; num: string }[] = [
    { num: '01', label: 'HOME', page: 'home' },
    { num: '02', label: 'WEB DEVELOPMENT', page: 'web-development' },
    { num: '03', label: 'AUTOMATION & AGENTS', page: 'automation' },
    { num: '04', label: 'ABOUT US & DOCTRINE', page: 'about-us' },
  ];

  return (
    <>
      <footer
        aria-label="FRAV Laboratory Footer"
        className="w-full bg-[#050505] text-white pt-16 sm:pt-20 pb-12 border-t border-white/10 relative overflow-hidden select-none"
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF4F38]/[0.02] blur-[150px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="w-full px-6 sm:px-12 md:px-16 lg:px-24 relative z-10">
          
          {/* Top Metadata Ticker */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 sm:pb-12 border-b border-white/10 text-xs font-sans tracking-widest text-neutral-400 uppercase gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#FF4F38]" />
              <span className="text-white font-bold tracking-[0.2em]">FRAV AUTOMATION LAB</span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-400">DIGITAL ATELIER</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-neutral-400">
              <span>ZURICH (HQ) · URANIASTRASSE 9</span>
              <span className="text-neutral-600">·</span>
              <span>COMMISSIONS OPEN</span>
            </div>
          </div>

          {/* Architectural Master Grid: 3 Clean, Balanced Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-14 py-14 sm:py-20 border-b border-white/10">
            
            {/* Col 1: Studio Identity & Jurisdiction (5 columns) */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="text-3xl sm:text-4xl font-black font-['Syne',sans-serif] tracking-tight uppercase text-white hover:text-[#FF4F38] transition-colors text-left cursor-pointer inline-block"
                >
                  FRAV
                </button>
                <div className="text-xs font-sans text-neutral-400 tracking-wider uppercase font-semibold">
                  ARCHITECTURE & AUTONOMOUS REASONING
                </div>
                <p className="text-sm font-sans text-neutral-400 font-light leading-relaxed max-w-sm">
                  Pioneering high-impact web flagships, reactive systems, and autonomous agent workflows. Engineered in Switzerland for discerning enterprises worldwide.
                </p>
              </div>

              <div className="text-xs font-sans text-neutral-400 flex items-center gap-2 pt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>SWISS COMMERCIAL LAW NDA PROTECTION · ZERO TELEMETRY</span>
              </div>
            </div>

            {/* Col 2: Navigation Directory (3 columns) */}
            <div className="md:col-span-3 space-y-6">
              <div className="text-xs font-sans text-[#FF4F38] tracking-[0.2em] uppercase font-bold pb-2 border-b border-white/10">
                01 / DIRECTORY
              </div>
              <ul className="space-y-3.5 text-xs font-sans uppercase tracking-wider text-neutral-400">
                {directoryLinks.map((link) => (
                  <li key={link.page}>
                    <button
                      type="button"
                      onClick={() => onNavigate(link.page)}
                      className="hover:text-white transition-colors flex items-center justify-between w-full group cursor-pointer text-left py-1"
                    >
                      <span className="group-hover:translate-x-1.5 transition-transform duration-200">
                        {link.label}
                      </span>
                      <span className="text-neutral-600 group-hover:text-[#FF4F38] text-[10px] transition-colors">
                        {link.num}
                      </span>
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={onContactClick}
                    className="text-[#FF4F38] hover:text-white transition-colors flex items-center gap-2 group cursor-pointer font-bold py-1"
                  >
                    <span className="text-white group-hover:translate-x-1 transition-transform">↳</span>
                    <span>CONTACT US</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Direct Channels & Coordinates (4 columns) */}
            <div className="md:col-span-4 space-y-6">
              <div className="text-xs font-sans text-[#FF4F38] tracking-[0.2em] uppercase font-bold pb-2 border-b border-white/10">
                02 / DIRECT COMMUNICATIONS
              </div>

              {/* Email with copy button */}
              <div className="p-4 bg-neutral-900/60 border border-white/10 hover:border-white/20 transition-all rounded-xl">
                <span className="text-[10px] font-sans text-neutral-400 uppercase tracking-widest block mb-1">
                  EMAIL INQUIRIES
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href="mailto:studio@fravlab.com"
                    className="text-white hover:text-[#FF4F38] text-sm font-sans font-bold transition-colors truncate"
                  >
                    studio@fravlab.com
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
                    aria-label="Copy studio email address"
                    title="Copy studio email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone Line */}
              <div className="p-4 bg-neutral-900/60 border border-white/10 hover:border-white/20 transition-all rounded-xl">
                <span className="text-[10px] font-sans text-neutral-400 uppercase tracking-widest block mb-1">
                  DIRECT SIGNAL / TELEPHONE
                </span>
                <a
                  href="tel:+41442114890"
                  className="text-white hover:text-[#FF4F38] text-sm font-sans font-bold transition-colors flex items-center justify-between group"
                >
                  <span>+41 44 211 48 90</span>
                  <Phone className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#FF4F38] transition-colors" />
                </a>
              </div>

              {/* Zurich Physical Coordinates */}
              <div className="pt-2 text-xs font-sans text-neutral-400 space-y-1">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#FF4F38] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">ZURICH HEADQUARTERS</span>
                    <span className="text-neutral-400 text-[11px] block">Uraniastrasse 9, 8001 Zürich, Switzerland</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monumental Architectural Brand Graphic */}
          <div className="py-12 sm:py-16 relative flex items-center justify-center overflow-hidden pointer-events-none select-none border-b border-white/10">
            <span className="font-['Syne',sans-serif] font-black uppercase text-center tracking-tighter leading-none text-white/[0.04] text-[18vw] sm:text-[22vw]">
              FRAV
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-xs sm:text-sm font-sans text-neutral-300 tracking-[0.3em] uppercase block font-semibold mb-1">
                  ARCHITECTURAL DIGITAL CRAFT
                </span>
                <span className="text-[11px] font-sans text-neutral-400 tracking-widest uppercase">
                  SWISS ENGINEERING · AUTONOMOUS REASONING
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Precision Legal & Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 text-xs font-sans text-neutral-400">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <span>© {new Date().getFullYear()} FRAV AUTOMATION LAB. ALL RIGHTS RESERVED.</span>
              <span className="hidden md:inline text-neutral-600">·</span>
              <span className="hidden md:inline text-neutral-400">TYPESCRIPT & TAILWIND ARCHITECTURE</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:gap-x-6">
              <button
                type="button"
                onClick={() =>
                  setLegalModal({
                    title: 'DATA PRIVACY & ZERO TELEMETRY',
                    content:
                      'All source code, workflow configurations, database schemas, and proprietary credentials engineered by FRAV are strictly confidential. We maintain zero telemetry tracking of user workflows and sign mutual Swiss non-disclosure agreements before commencing architecture sprints.',
                  })
                }
                className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider text-[11px]"
              >
                PRIVACY
              </button>
              <span className="text-neutral-600">/</span>
              <button
                type="button"
                onClick={() =>
                  setLegalModal({
                    title: 'TERMS OF ENGAGEMENT & IP ASSIGNMENT',
                    content:
                      'All production codebases, design systems, and cloud pipelines delivered by FRAV become 100% the intellectual property of the commissioning client upon invoice completion. No proprietary vendor lock-in or hidden licensing fees.',
                  })
                }
                className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider text-[11px]"
              >
                TERMS
              </button>
              <span className="text-neutral-600">/</span>
              <button
                type="button"
                onClick={() =>
                  setLegalModal({
                    title: 'SWISS NDA & COMMERCIAL LAW',
                    content:
                      'FRAV operates under Swiss jurisdiction in the Canton of Zurich. All engagements benefit from Switzerland’s world-renowned confidentiality and intellectual property protections.',
                  })
                }
                className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider text-[11px]"
              >
                SECURITY
              </button>
              <span className="text-neutral-600">/</span>
              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider text-[11px] flex items-center gap-1.5"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-[#FF4F38]" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-[#FF4F38]" />
                )}
                <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
              </button>
              <span className="text-neutral-600">/</span>
              {/* Back to Top */}
              <button
                type="button"
                onClick={scrollToTop}
                className="hover:text-white text-neutral-300 transition-colors flex items-center gap-1.5 uppercase font-bold cursor-pointer group"
                aria-label="Scroll back to top of page"
              >
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#FF4F38] group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* High-End Legal Modal Dialog */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="w-full max-w-lg bg-[#0E0E0E] border border-white/20 p-8 sm:p-10 rounded-2xl text-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs font-sans text-[#FF4F38] uppercase tracking-widest font-bold">
                FRAV STUDIO STANDARD
              </span>
              <span className="text-xs font-sans text-neutral-400">LEGAL COMPLIANCE</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white mb-4">
              {legalModal.title}
            </h3>

            <p className="text-sm font-sans leading-relaxed text-neutral-300 mb-8 font-light">
              {legalModal.content}
            </p>

            <button
              type="button"
              onClick={() => setLegalModal(null)}
              className="w-full py-4 rounded-full bg-white text-black font-['Syne',sans-serif] font-black text-xs uppercase tracking-widest hover:bg-[#FF4F38] hover:text-white transition-all cursor-pointer shadow-lg"
            >
              UNDERSTOOD & CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FravAboutProps {
  onExplore: () => void;
}

export const FravAbout: React.FC<FravAboutProps> = ({ onExplore }) => (
  <section
    id="about"
    aria-labelledby="frav-about-heading"
    className="w-full h-[100vh] bg-[#0A0A0A] text-white px-6 sm:px-12 md:px-16 lg:px-24 py-8 sm:py-12 border-t border-white/10 flex flex-col justify-between"
  >
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
      <span className="text-xs font-sans text-neutral-400 tracking-widest uppercase">
        00 / About the studio
      </span>
    </div>

    <div className="grid flex-1 grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
      <h2
        id="frav-about-heading"
        className="frav-about-title lg:col-span-7 text-4xl sm:text-6xl lg:text-7xl font-black font-['Syne',sans-serif] uppercase tracking-tighter leading-[0.95]"
      >
        Thoughtful design.
        <span className="block text-neutral-400">Intelligent systems.</span>
      </h2>

      <div className="lg:col-span-5 flex flex-col items-start gap-6">
        <p className="max-w-xl text-base sm:text-lg leading-relaxed text-neutral-300">
          FRAV Automation is a technology studio focused on premium website development and
          practical AI automation. We create considered digital experiences and reliable systems
          that help businesses operate smarter, scale with confidence, and stay ahead in a rapidly
          changing digital landscape.
        </p>
        <button
          type="button"
          onClick={onExplore}
          className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-white hover:text-[#FF4F38] transition-colors"
        >
          <span>ABOUT THE STUDIO</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </section>
);

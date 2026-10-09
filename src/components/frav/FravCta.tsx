import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Phone } from 'lucide-react';

interface FravCtaProps {
  onContactClick: () => void;
}

export const FravCta: React.FC<FravCtaProps> = ({ onContactClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const fravEase = [0.22, 1, 0.36, 1] as const;

  // Slow the motion down toward the end
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], ['25%', '0%']);

  return (
    <section
      id="cta"
      ref={containerRef}
      aria-label="Section 05 CTA"
      className="light-image-overlay relative min-h-[90vh] sm:min-h-screen w-full flex flex-col justify-between py-24 sm:py-32 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden bg-[#0A0A0A] text-white select-none border-t border-white/10"
    >
      {/* Oversized Visual Behind Typography */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0 overflow-hidden origin-center pointer-events-none"
      >
        <img
          src="./images/frav_hero_1791239384109.jpg"
          alt="FRAV Automation monolith visual"
          width={1376}
          height={768}
          className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-125"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]"
          aria-hidden="true"
        />
      </motion.div>

      {/* Top Section Index */}
      <div className="relative z-10 w-full flex items-baseline justify-between border-b border-white/10 pb-6">
        <div className="flex items-baseline gap-4">
          <span className="text-xs font-sans text-neutral-400">05 /</span>
          <span className="text-xs font-sans tracking-widest text-neutral-400 uppercase">
            COMMISSION & SCOPE
          </span>
        </div>
      </div>

      {/* Center Large Typography: CONTACT US */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 my-auto py-12 flex flex-col items-center justify-center text-center"
      >
        <h2 className="frav-cta-title font-['Syne',sans-serif] font-black uppercase tracking-tighter text-5xl sm:text-[8rem] md:text-[11rem] lg:text-[14rem] leading-[0.8] text-white">
          CONTACT US
        </h2>

        {/* Buttons: CONTACT US + CALL US */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={onContactClick}
            className="group px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-white text-black font-['Syne',sans-serif] font-black text-sm sm:text-base tracking-widest uppercase hover:bg-[#FF4F38] hover:text-white transition-all duration-300 cursor-pointer shadow-2xl active:scale-95 flex items-center gap-3"
          >
            <span>CONTACT US</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>

          <a
            href="tel:+16504395756"
            className="group px-8 sm:px-10 py-4 sm:py-5 rounded-full border border-white/20 hover:border-white hover:bg-white/10 text-white font-['Syne',sans-serif] font-black text-sm sm:text-base tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-2xl flex items-center gap-3"
            aria-label="Call studio"
          >
            <Phone className="w-5 h-5 text-[#FF4F38]" />
            <span>CALL US</span>
          </a>
        </div>
      </motion.div>

      {/* Bottom Composition Line */}
      <div className="relative z-10 w-full flex items-center justify-between text-xs font-sans text-neutral-500 pt-6 border-t border-white/10">
        <span>FRAV AUTOMATION</span>
        <span>GLOBAL COMMISSIONS</span>
      </div>
    </section>
  );
};

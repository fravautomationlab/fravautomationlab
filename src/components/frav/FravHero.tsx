import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Phone } from 'lucide-react';
import type Lenis from 'lenis';

interface FravHeroProps {
  onStartClick: () => void;
}

export const FravHero: React.FC<FravHeroProps> = ({ onStartClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const fravEase = [0.22, 1, 0.36, 1] as const;

  // On scroll: image scales, typography shifts, layers move at different speeds
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const subY = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);

  const scrollDown = () => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    const el = document.getElementById('web');
    if (el) {
      if (lenis) lenis.scrollTo(el, { duration: 1.4 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      aria-label="FRAV Automation Hero"
      className="light-image-overlay relative min-h-screen w-full flex flex-col justify-between pt-28 pb-10 sm:pb-16 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden bg-[#0A0A0A] text-white select-none"
    >
      {/* Background Image Container: expands on load & scales on scroll */}
      <motion.div
        className="absolute inset-0 z-0 origin-center overflow-hidden"
        style={{ scale: imageScale }}
      >
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: fravEase }}
          src="./images/frav_hero_1791239384109.jpg"
          alt="Abstract digital network representing FRAV Automation"
          width={1376}
          height={768}
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-110"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Subtle cinematic vignette */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A] pointer-events-none"
          aria-hidden="true"
        />
      </motion.div>

      {/* Top spacer */}
      <div className="relative z-10 w-full" />

      {/* Centerpiece: Primary Visual Element — FRAV AUTOMATION */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 w-full text-center flex flex-col items-center justify-center my-auto py-8"
      >
        <motion.h1
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: fravEase }}
          className="frav-hero-title w-full text-balance font-['Syne',sans-serif] font-black uppercase text-center tracking-tighter leading-[0.82] text-[clamp(1.35rem,7.2vw,8.5rem)] text-white"
        >
          FRAV AUTOMATION
        </motion.h1>

        {/* Supporting line under the primary heading */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.45, ease: fravEase }}
          style={{ y: subY }}
          className="mt-4 sm:mt-6 max-w-full text-balance text-xs sm:text-sm md:text-base font-sans tracking-[0.2em] sm:tracking-[0.3em] uppercase text-neutral-300"
        >
          Business Digitalization &amp; Automation
        </motion.p>
        <h2 className="frav-hero-subheading mt-3 sm:mt-4 max-w-full text-balance text-[clamp(0.9rem,2.2vw,1.5rem)] font-sans font-semibold tracking-[0.12em] sm:tracking-[0.2em] uppercase text-white/90">
          Website Design &amp; Website Development
        </h2>
      </motion.div>

      {/* Bottom Bar: Single CTA START + Down indicator */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: fravEase }}
        className="relative z-10 w-full flex flex-wrap items-center justify-between gap-x-2 gap-y-2 pt-4 border-t border-white/10"
      >
        {/* Actions: CONTACT US + CALL US */}
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            type="button"
            onClick={onStartClick}
            className="text-[11px] sm:text-sm font-sans tracking-[0.12em] sm:tracking-[0.25em] text-white uppercase px-3 sm:px-6 py-2.5 rounded-full border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all cursor-pointer active:scale-95 flex items-center gap-2"
          >
            <span>CONTACT US</span>
            <span>→</span>
          </button>

          <a
            href="tel:+41442114890"
            className="text-[11px] sm:text-sm font-sans tracking-wider text-white uppercase px-2.5 sm:px-4 py-2.5 rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-all cursor-pointer flex items-center gap-2"
            aria-label="Call studio"
          >
            <Phone className="w-3.5 h-3.5 text-[#FF4F38]" />
            <span>CALL US</span>
          </a>
        </div>

        {/* Studio Marker */}
        <div className="text-[11px] font-sans tracking-widest text-neutral-400 uppercase hidden sm:block">
          AUTOMATION LAB · 2026
        </div>

        {/* Scroll down trigger */}
        <button
          type="button"
          onClick={scrollDown}
          className="ml-auto shrink-0 p-1 sm:p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll to Section 01 Website Development"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
};

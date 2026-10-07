import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface FravWebProps {
  onExplore?: () => void;
}

export const FravWeb: React.FC<FravWebProps> = ({ onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const fravEase = [0.22, 1, 0.36, 1] as const;

  // Scroll choreography: image scale -> crop -> expand -> transition
  const imageScale = useTransform(scrollYProgress, [0, 0.45, 0.85], [0.85, 1, 1.15]);
  const imageClip = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7],
    ['inset(12% 16% 12% 16% round 24px)', 'inset(4% 6% 4% 6% round 16px)', 'inset(0% 0% 0% 0% round 0px)']
  );

  // Progressive word reveals: DESIGN -> BUILD -> HOST -> CARE
  const word1Opacity = useTransform(scrollYProgress, [0.1, 0.25], [0.15, 1]);
  const word2Opacity = useTransform(scrollYProgress, [0.3, 0.45], [0.15, 1]);
  const word3Opacity = useTransform(scrollYProgress, [0.5, 0.65], [0.15, 1]);
  const word4Opacity = useTransform(scrollYProgress, [0.7, 0.85], [0.15, 1]);

  return (
    <section
      id="web"
      ref={containerRef}
      aria-label="Section 01 WEB"
      className="relative w-full h-[240vh] bg-[#0A0A0A] text-white"
    >
      {/* Sticky Full-Viewport Composition */}
      <div className="light-image-overlay sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-12 md:p-16 lg:p-24">
        {/* Top Header: Section Index + Large Typography: WEB */}
        <div className="relative z-20 flex items-baseline justify-between w-full border-b border-white/10 pb-6">
          <div className="flex items-baseline gap-4">
            <span className="text-xs font-sans text-neutral-400">01 /</span>
            <h2 className="text-5xl sm:text-7xl lg:text-9xl font-black font-['Syne',sans-serif] tracking-tighter leading-none">
              WEB
            </h2>
          </div>
          <span className="text-xs font-sans text-neutral-400 tracking-widest uppercase hidden sm:block">
            FULL-VIEWPORT COMPOSITION
          </span>
        </div>

        {/* Central Scaled / Cropped / Expanding Image Canvas */}
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none">
          <motion.div
            style={{
              clipPath: imageClip,
              scale: imageScale,
            }}
            className="w-full h-full relative overflow-hidden"
          >
            <img
              src="./images/frav_web_canvas_1791239394889.jpg"
              alt="FRAV Web Canvas"
              width={1376}
              height={768}
              className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {/* Cinematic overlay scrim */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/60"
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* The 4 Words Revealed on Scroll: DESIGN / BUILD / HOST / CARE */}
        <div className="relative z-20 w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-4 py-8">
          <motion.div style={{ opacity: word1Opacity }} className="transition-opacity">
            <span className="block text-[10px] font-sans text-neutral-500 mb-1">01</span>
            <span className="text-[clamp(1.75rem,5vw,2rem)] sm:text-[clamp(2rem,4.5vw,3rem)] lg:text-[clamp(3rem,5vw,4.5rem)] xl:text-7xl font-bold font-['Syne',sans-serif] tracking-tight">
              DESIGN
            </span>
          </motion.div>

          <motion.div style={{ opacity: word2Opacity }} className="transition-opacity">
            <span className="block text-[10px] font-sans text-neutral-500 mb-1">02</span>
            <span className="text-[clamp(1.75rem,5vw,2rem)] sm:text-[clamp(2rem,4.5vw,3rem)] lg:text-[clamp(3rem,5vw,4.5rem)] xl:text-7xl font-bold font-['Syne',sans-serif] tracking-tight">
              BUILD
            </span>
          </motion.div>

          <motion.div style={{ opacity: word3Opacity }} className="transition-opacity">
            <span className="block text-[10px] font-sans text-neutral-500 mb-1">03</span>
            <span className="text-[clamp(1.75rem,5vw,2rem)] sm:text-[clamp(2rem,4.5vw,3rem)] lg:text-[clamp(3rem,5vw,4.5rem)] xl:text-7xl font-bold font-['Syne',sans-serif] tracking-tight">
              HOST
            </span>
          </motion.div>

          <motion.div style={{ opacity: word4Opacity }} className="transition-opacity flex flex-col items-start sm:items-end">
            <span className="block text-[10px] font-sans text-neutral-500 mb-1">04</span>
            <span className="text-[clamp(1.75rem,5vw,2rem)] sm:text-[clamp(2rem,4.5vw,3rem)] lg:text-[clamp(3rem,5vw,4.5rem)] xl:text-7xl font-bold font-['Syne',sans-serif] tracking-tight text-[#FF4F38] mb-2">
              CARE
            </span>
            {onExplore && (
              <button
                type="button"
                onClick={onExplore}
                className="text-xs font-sans tracking-widest text-neutral-400 hover:text-white uppercase transition-colors flex items-center gap-1 cursor-pointer pt-2"
              >
                <span>WEB DEVELOPMENT</span>
                <span>→</span>
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

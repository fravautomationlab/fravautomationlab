import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react';

interface ProcessStepProps {
  index: string;
  title: string;
  description: string;
  highlight: MotionValue<number>;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ index, title, description, highlight }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrollRevealed, setIsScrollRevealed] = useState(highlight.get() > 0.5);
  const isRevealed = isHovered || isScrollRevealed;

  useMotionValueEvent(highlight, 'change', (value) => {
    setIsScrollRevealed(value > 0.5);
  });

  return (
    <motion.div
      style={{ opacity: highlight }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex items-baseline gap-6 sm:gap-10 transition-all duration-300"
    >
      <span className="text-lg sm:text-2xl lg:text-3xl font-sans text-neutral-500 font-bold">
        {index}
      </span>
      <div>
        <h3 className="frav-process-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-['Syne',sans-serif] tracking-tighter uppercase text-white hover:text-[#FF4F38] transition-colors cursor-default">
          {title}
        </h3>
        <div
          className={`overflow-hidden transition-[max-height] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
            isRevealed ? 'max-h-12 delay-100' : 'max-h-0 delay-0'
          }`}
        >
          <motion.p
            style={{
              opacity: isRevealed ? 1 : 0,
              y: isRevealed ? 0 : 8,
            }}
            className={`text-sm sm:text-base font-sans font-light text-neutral-400 leading-relaxed transition-[opacity,transform] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
              isRevealed ? 'delay-100' : 'delay-0'
            }`}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export const FravProcess: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const steps = [
    { index: '01', title: 'DISCOVER', description: 'Clarify goals, users, and the right scope.' },
    { index: '02', title: 'DESIGN', description: 'Shape a clear visual and technical direction.' },
    { index: '03', title: 'BUILD', description: 'Turn the plan into production-ready work.' },
    { index: '04', title: 'LAUNCH', description: 'Test, refine, and ship with confidence.' },
    { index: '05', title: 'AUTOMATE', description: 'Connect workflows and reduce repetitive work.' },
  ];

  // Each stage becomes dominant sequentially as visitor scrolls
  const step1Highlight = useTransform(scrollYProgress, [0, 0.2, 0.28], [1, 1, 0.25]);
  const step2Highlight = useTransform(scrollYProgress, [0.2, 0.38, 0.48], [0.25, 1, 0.25]);
  const step3Highlight = useTransform(scrollYProgress, [0.4, 0.58, 0.68], [0.25, 1, 0.25]);
  const step4Highlight = useTransform(scrollYProgress, [0.6, 0.78, 0.88], [0.25, 1, 0.25]);
  const step5Highlight = useTransform(scrollYProgress, [0.8, 0.95], [0.25, 1]);

  const highlights = [step1Highlight, step2Highlight, step3Highlight, step4Highlight, step5Highlight];

  return (
    <section
      id="process"
      ref={containerRef}
      aria-label="Section 04 PROCESS"
      className="relative w-full h-[220vh] bg-[#0A0A0A] text-white"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-12 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="flex items-baseline justify-between w-full border-b border-white/10 pb-6">
          <div className="flex items-baseline gap-4">
            <span className="text-xs font-sans text-neutral-400">04 /</span>
            <h2 className="frav-process-heading text-5xl sm:text-7xl lg:text-9xl font-black font-['Syne',sans-serif] tracking-tighter leading-none">
              PROCESS
            </h2>
          </div>
          <span className="text-xs font-sans text-neutral-400 tracking-widest uppercase hidden sm:block">
            01 → 05 SEQUENTIAL DOMINANCE
          </span>
        </div>

        {/* The 5 Steps Stack: One becomes dominant while others move away */}
        <div className="my-auto py-8 space-y-4 sm:space-y-6 max-w-5xl">
          {steps.map((step, idx) => (
            <ProcessStep
              key={step.index}
              {...step}
              highlight={highlights[idx]}
            />
          ))}
        </div>

        {/* Bottom Marker */}
        <div className="flex items-center justify-between text-xs font-sans text-neutral-500 pt-6 border-t border-white/10">
          <span>FRAV AUTOMATION EXECUTION CADENCE</span>
          <span>SCROLL PROGRESSION ↓</span>
        </div>
      </div>
    </section>
  );
};

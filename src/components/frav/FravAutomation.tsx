import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface FravAutomationProps {
  onExplore?: () => void;
}

export const FravAutomation: React.FC<FravAutomationProps> = ({ onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Kinetic pulse translations along the pipeline
  const node1Y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const node2Y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const node3Y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.6], ['0%', '100%']);

  return (
    <section
      id="automation"
      ref={containerRef}
      aria-label="Section 03 AUTOMATION"
      className="relative w-full bg-[#0A0A0A] text-white py-24 sm:py-36 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden border-t border-white/5"
    >
      {/* Section Header */}
      <div className="flex items-baseline justify-between w-full border-b border-white/10 pb-6 mb-16 sm:mb-24">
        <div className="flex items-baseline gap-4">
          <span className="text-xs font-sans text-neutral-400">03 /</span>
          <h2 className="frav-automation-title text-5xl sm:text-7xl lg:text-9xl font-black font-['Syne',sans-serif] tracking-tighter leading-none">
            AUTOMATION
          </h2>
        </div>
        <span className="text-xs font-sans text-neutral-400 tracking-widest uppercase hidden sm:block">
          INPUT → PROCESS → RESULT
        </span>
      </div>

      {/* Abstract Kinetic Workflow Composition: INPUT -> PROCESS -> RESULT */}
      <div className="relative w-full min-h-[550px] sm:min-h-[650px] rounded-3xl border border-white/10 bg-neutral-950 p-8 sm:p-16 flex flex-col justify-between overflow-hidden">
        {/* Ambient background grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Top telemetry marker */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-sans tracking-widest text-neutral-500 uppercase">
          <span>KINETIC FLOW SYNTHESIS</span>
          <span>AUTONOMOUS ENGINE</span>
        </div>

        {/* Central Moving Vector Graphic: INPUT -> PROCESS -> RESULT */}
        <div className="relative z-10 my-auto py-12 w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 items-center">
          {/* Node 1: INPUT */}
          <motion.div
            style={{ y: node1Y }}
            className="flex flex-col items-start p-8 rounded-2xl border border-white/15 bg-neutral-900/60 backdrop-blur-md group hover:border-white/40 transition-colors"
          >
            <div className="flex items-center justify-between w-full mb-6">
              <span className="text-xs font-sans text-neutral-500">PHASE 01</span>
              <span className="w-2 h-2 rounded-full bg-neutral-400 group-hover:bg-white transition-colors" />
            </div>
            <h3 className="text-4xl sm:text-6xl font-black font-['Syne',sans-serif] tracking-tight uppercase text-white mb-2">
              INPUT
            </h3>
            <span className="text-xs font-sans tracking-widest text-neutral-400 uppercase">
              DATA · TRIGGER · EVENT
            </span>
          </motion.div>

          {/* Node 2: PROCESS (with connecting line indicator) */}
          <motion.div
            style={{ y: node2Y }}
            className="flex flex-col items-start p-8 rounded-2xl border border-white/20 bg-neutral-900/80 backdrop-blur-md group hover:border-[#FF4F38] transition-colors relative"
          >
            <div className="flex items-center justify-between w-full mb-6">
              <span className="text-xs font-sans text-[#FF4F38]">PHASE 02</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4F38] animate-pulse" />
            </div>
            <h3 className="text-4xl sm:text-6xl font-black font-['Syne',sans-serif] tracking-tight uppercase text-white mb-2">
              PROCESS
            </h3>
            <span className="text-xs font-sans tracking-widest text-neutral-400 uppercase">
              AGENTIC · REASONING · ORCHESTRATION
            </span>
          </motion.div>

          {/* Node 3: RESULT */}
          <motion.div
            style={{ y: node3Y }}
            className="flex flex-col items-start p-8 rounded-2xl border border-white/15 bg-neutral-900/60 backdrop-blur-md group hover:border-white/40 transition-colors"
          >
            <div className="flex items-center justify-between w-full mb-6">
              <span className="text-xs font-sans text-neutral-500">PHASE 03</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <h3 className="text-4xl sm:text-6xl font-black font-['Syne',sans-serif] tracking-tight uppercase text-white mb-2">
              RESULT
            </h3>
            <span className="text-xs font-sans tracking-widest text-neutral-400 uppercase">
              ACTION · SYNCHRONIZATION · OUTCOME
            </span>
          </motion.div>
        </div>

        {/* Bottom Status line */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans text-neutral-500 pt-6 border-t border-white/10">
          <span>PRECISION DETERMINISM · INPUT → PROCESS → RESULT</span>
          {onExplore && (
            <button
              type="button"
              onClick={onExplore}
              className="text-neutral-400 hover:text-white uppercase transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>AUTOMATION PIPELINES</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

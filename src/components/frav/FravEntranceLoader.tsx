import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FravLogoMark } from './FravLogoMark';

interface FravEntranceLoaderProps {
  onComplete: () => void;
}

export const FravEntranceLoader: React.FC<FravEntranceLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState('INITIALIZING CORE ARCHITECTURE');
  const [isExiting, setIsExiting] = useState(false);
  const exitTriggered = useRef(false);

  // Fast-forward exit function if user clicks or presses key
  const triggerExit = () => {
    if (exitTriggered.current) return;
    exitTriggered.current = true;
    setProgress(100);
    setPhaseText('SYSTEM ONLINE');
    setTimeout(() => {
      setIsExiting(true);
    }, 150);
  };

  useEffect(() => {
    // Keyboard dismiss on Escape, Space, or Enter
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        triggerExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // High-precision smooth progress counter with realistic ease
    const startTime = performance.now();
    const duration = 1500; // 1.5 seconds total loading duration

    let frameId: number;

    const tick = (now: number) => {
      if (exitTriggered.current) return;

      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);

      // Nonlinear mechanical curve (fast initial jump, brief settle, snappy finish)
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const currentVal = Math.min(100, Math.floor(eased * 100));

      setProgress(currentVal);

      if (currentVal < 32) {
        setPhaseText('CALIBRATING SYSTEM CORES · CH-8001');
      } else if (currentVal < 68) {
        setPhaseText('SYNCHRONIZING DIGITAL ATELIER & APPLIED AI');
      } else if (currentVal < 98) {
        setPhaseText('OPTIMIZING BESPOKE ARCHITECTURE');
      } else {
        setPhaseText('SYSTEM ONLINE');
      }

      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsExiting(true);
        }, 220);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // When exit animation completes, notify parent
  const handleExitComplete = () => {
    onComplete();
  };

  const columns = [0, 1, 2, 3];
  const fravExpoEase = [0.85, 0, 0.15, 1] as const;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isExiting ? (
        <div
          role="dialog"
          aria-label="Loading entrance"
          onClick={triggerExit}
          className="fixed inset-0 z-[100] flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none cursor-pointer overflow-hidden bg-[#050505] text-white"
        >
          {/* Subtle architectural grid pattern */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
            aria-hidden="true"
          />

          {/* Ambient center flare */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#FF4F38]/[0.05] blur-[150px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Top Bar: Coordinates & Brand Monogram */}
          <div className="relative z-10 w-full flex items-center justify-between text-xs font-sans uppercase tracking-widest text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#FF4F38] animate-pulse" />
              <FravLogoMark className="h-4 w-8 text-white" />
            </div>
            <div className="hidden sm:flex items-center text-neutral-500 text-[11px]">
              <span>ZURICH · 47.3769° N, 8.5417° E</span>
            </div>
          </div>

          {/* Centerpiece: Large Wordmark, Counter & Kinetic Status */}
          <div className="relative z-10 w-full max-w-full mx-auto flex flex-col items-center justify-center my-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: fravExpoEase }}
              className="flex flex-col items-center"
            >
              <div className="font-['Syne',sans-serif] text-[clamp(3rem,12vw,12rem)] font-black uppercase leading-[0.76] tracking-[-0.08em] text-white">
                FRAV
              </div>
              <div className="mt-1 text-[clamp(0.7rem,1.9vw,1.35rem)] font-sans font-medium uppercase tracking-[0.52em] text-neutral-300">
                AUTOMATION
              </div>
            </motion.div>

            {/* Kinetic Progress Metric Lockup */}
            <div className="flex flex-col items-center gap-4 w-full max-w-md">
              <div className="flex items-baseline justify-between w-full text-xs font-sans tracking-widest uppercase">
                <span className="text-[#FF4F38] font-bold text-sm tabular-nums">
                  {progress.toString().padStart(2, '0')}%
                </span>
                <span className="text-neutral-400 text-[11px] truncate max-w-[260px]">
                  {phaseText}
                </span>
              </div>

              {/* Laser-sharp Progress Bar */}
              <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-white"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
                {/* Accent glow head on the bar */}
                <motion.div
                  className="absolute top-0 bottom-0 w-3 bg-[#FF4F38] shadow-[0_0_12px_#FF4F38]"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Bar: Capabilities & Skip Notice */}
          <div className="relative z-10 w-full flex items-center justify-between text-xs font-sans uppercase tracking-widest text-neutral-500">
            <div className="text-[11px] text-neutral-400 hidden sm:block">
              SWISS PRECISION DIGITAL FLAGSHIPS & AUTONOMOUS SYSTEMS
            </div>
            <div className="flex items-center gap-2 text-[11px] text-neutral-400 hover:text-white transition-colors ml-auto sm:ml-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span>TAP ANYWHERE OR PRESS ESC TO ENTER</span>
            </div>
          </div>
        </div>
      ) : (
        /* The Grand Reveal: 4 Vertical Architectural Shutter Slats Lifting in Stagger */
        <div
          className="fixed inset-0 z-[100] pointer-events-none flex"
          aria-hidden="true"
        >
          {columns.map((colIndex) => (
            <motion.div
              key={colIndex}
              initial={{ y: 0 }}
              animate={{ y: '-100%' }}
              transition={{
                duration: 0.95,
                delay: colIndex * 0.07,
                ease: fravExpoEase,
              }}
              className="flex-1 h-full bg-[#050505] border-r border-white/5 relative"
            >
              {/* Subtle accent light sweep along the trailing edge */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF4F38] shadow-[0_0_15px_#FF4F38]" />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

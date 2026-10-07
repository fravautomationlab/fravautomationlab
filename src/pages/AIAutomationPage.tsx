import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowRight, ArrowDown, Play, CheckCircle2, RefreshCw, Phone } from 'lucide-react';
import { FravPageId } from '../types';
import { MagneticButton } from '../components/motion/MagneticButton';
import { SplitReveal } from '../components/motion/SplitReveal';
import { TiltCanvas } from '../components/motion/TiltCanvas';

interface AutomationPageProps {
  onNavigate: (page: FravPageId) => void;
  onStartClick: () => void;
}

interface SystemItem {
  index: string;
  pattern: string;
  title: string;
  meta: string;
  image: string;
  summary: string;
}

interface AutomationStackCardProps {
  item: SystemItem;
  index: number;
  total: number;
  isMobile: boolean;
}

const AutomationStackCard: React.FC<AutomationStackCardProps> = ({ item, index, total, isMobile }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  const isLast = index === total - 1;
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, isLast || isMobile ? 1 : 0.93]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, isLast || isMobile ? 1 : 0.75, isLast || isMobile ? 1 : 0.45]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        position: 'sticky',
        top: `${88 + index * 28}px`,
        zIndex: index + 10,
        scale: cardScale,
        opacity: cardOpacity,
      }}
      className="relative w-full group cursor-pointer bg-[#0D0D0D] rounded-3xl p-6 sm:p-10 border border-white/20 hover:border-white/40 transition-colors shadow-[0_-30px_70px_rgba(0,0,0,0.98)] mb-24 sm:mb-36 last:mb-6"
    >
      {/* Scene Meta Line */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 mb-6 border-b border-white/10 text-xs font-sans tracking-widest gap-2">
        <div className="flex items-baseline gap-4">
          <span className="text-white font-bold">{item.index}</span>
          <span className="text-neutral-500">/</span>
          <span className="text-[#FF4F38] uppercase font-bold">{item.pattern}</span>
        </div>
        <div className="text-neutral-500 uppercase text-[11px]">
          {item.meta}
        </div>
      </div>

      {/* Viewport Visual Container */}
      <div className="relative w-full h-[45vh] sm:h-[58vh] lg:h-[68vh] rounded-2xl overflow-hidden bg-neutral-900 border border-white/15">
        <img
          src={item.image}
          alt={item.title}
          width={1376}
          height={768}
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-110 group-hover:scale-102 group-hover:brightness-90 transition-all duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

        <div className="light-image-overlay absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12 z-20 max-w-3xl pointer-events-none">
          <h3 className="frav-automation-system-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white mb-3 group-hover:text-[#FF4F38] transition-colors">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-xl">
            {item.summary}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const AIAutomationPage: React.FC<AutomationPageProps> = ({ onNavigate, onStartClick }) => {
  const [hoveredCapability, setHoveredCapability] = useState<number | null>(null);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const fravEase = [0.22, 1, 0.36, 1] as const;

  // Hero motion
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.2]);
  const heroTextY = useTransform(heroProgress, [0, 1], ['0%', '35%']);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  // Dynamic flow progression in hero on scroll
  const flow1 = useTransform(heroProgress, [0.05, 0.2], [0.3, 1]);
  const flow2 = useTransform(heroProgress, [0.2, 0.35], [0.3, 1]);
  const flow3 = useTransform(heroProgress, [0.35, 0.5], [0.3, 1]);
  const flow4 = useTransform(heroProgress, [0.5, 0.65], [0.3, 1]);
  const flow5 = useTransform(heroProgress, [0.65, 0.8], [0.3, 1]);

  const flowOpacities = [flow1, flow2, flow3, flow4, flow5];
  const heroFlowStages = ['INPUT', 'AGENT', 'DECISION', 'ACTION', 'OUTPUT'];

  // Capabilities index
  const capabilities = [
    {
      num: '01',
      title: 'AI AGENTS',
      meta: 'AUTONOMOUS REASONING · TOOL EXECUTION · MULTI-STEP LOGIC',
      schema: 'EVENT → LLM PARSE → AGENTIC LOOP → RESOLUTION',
    },
    {
      num: '02',
      title: 'WORKFLOW AUTOMATION',
      meta: 'DAG PIPELINES · ERROR RECOVERY · REPEATABLE PROTOCOLS',
      schema: 'WEBHOOK → STATE MACHINE → PARALLEL DISPATCH',
    },
    {
      num: '03',
      title: 'AI INTEGRATION',
      meta: 'CUSTOM API BRIDGES · VECTOR EMBEDDINGS · RAG PIPELINES',
      schema: 'SOURCE DATA → CHUNK & VECTORIZE → RETRIEVAL CONTEXT',
    },
    {
      num: '04',
      title: 'BUSINESS PROCESS AUTOMATION',
      meta: 'FINANCIAL RECONCILIATION · CRM SYNC · ERP ORCHESTRATION',
      schema: 'INVOICE INGEST → DETERMINISTIC VALIDATION → ERP WRITE',
    },
    {
      num: '05',
      title: 'CUSTOM AI SYSTEMS',
      meta: 'PROPRIETARY DOMAIN LOGIC · RESILIENT ARCHITECTURES',
      schema: 'SCHEMA PROTOCOL → ZERO-SHOT CLASSIFICATION → PERSIST',
    },
    {
      num: '06',
      title: 'INTERNAL TOOLS',
      meta: 'OPERATOR CONSOLES · MONITORING TELEMETRY · AUDIT TRAILS',
      schema: 'STREAM LISTENER → SYNTHETIC HEARTBEAT → INCIDENT PAGING',
    },
  ];

  // Interactive System 6 stages
  const interactiveStages = [
    { label: 'TRIGGER', desc: 'Incoming webhook / delta event' },
    { label: 'AGENT', desc: 'Context retrieval & intent parse' },
    { label: 'TOOLS', desc: 'PostgreSQL, API & ERP queries' },
    { label: 'DECISION', desc: 'Deterministic policy evaluation' },
    { label: 'ACTION', desc: 'Idempotent payload dispatch' },
    { label: 'RESULT', desc: 'State commit & telemetry audit' },
  ];

  const handleRunSystem = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStage(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < interactiveStages.length) {
        setActiveStage(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 550);
  };

  // What an agent does stages
  const agentSteps = [
    { word: 'RECEIVE', desc: 'Heterogeneous input parsing across webhooks, sockets, or documents.' },
    { word: 'UNDERSTAND', desc: 'Multimodal tokenization, vector search, and schema extraction.' },
    { word: 'DECIDE', desc: 'Rule-based constraint check combined with agentic tool calls.' },
    { word: 'ACT', desc: 'Transactional execution against downstream databases, APIs, or ERPs.' },
    { word: 'REPORT', desc: 'Full-trace audit emission, latency telemetry, and verification logs.' },
  ];

  // Selected systems
  const selectedSystems = [
    {
      index: 'SYSTEM 01',
      pattern: 'TRIGGER → AGENT → ACTION',
      title: 'FINANCIAL RECONCILIATION & ERP LEDGER',
      meta: 'AUTONOMOUS SUPPLIER INVOICE DISPATCH · ZERO MANUAL TOUCHES',
      image: './images/frav_automation_flow_1791239414845.jpg',
      summary: 'Raw vendor documents tokenized via multimodal OCR, validated against ERP purchase orders, and committed directly into SAP ledgers with 100% tax ID matching.',
    },
    {
      index: 'SYSTEM 02',
      pattern: 'DATA → AI → OUTPUT',
      title: 'CROSS-PLATFORM EVENT SYNCHRONIZATION',
      meta: 'CHANGE DATA CAPTURE · REAL-TIME VECTOR EMBEDDINGS · DISTRIBUTED LOCKS',
      image: './images/frav_automation_core_1791240760315.jpg',
      summary: 'PostgreSQL WAL mutations captured in real time, mapped through dynamic JSON schemas, and concurrently synced across vector indexes, CRMs, and cold warehouses.',
    },
    {
      index: 'SYSTEM 03',
      pattern: 'REQUEST → DECISION → WORKFLOW',
      title: 'AUTONOMOUS INCIDENT TRIAGE & REMEDIATION',
      meta: 'HIGH-VELOCITY TELEMETRY STREAM · ANOMALY VECTOR ROUTING',
      image: './images/ai_automation_hero_1791238819833.jpg',
      summary: 'High-volume production monitoring stream parsed for memory and latency anomalies, automatically triggering rolling container restarts and engineer paging.',
    },
  ];

  return (
    <div className="w-full bg-[#0A0A0A] text-white selection:bg-white selection:text-black">
      {/* 1. AUTOMATION — HERO */}
      <section
        ref={heroRef}
        aria-label="AI Automation Hero"
        className="light-image-overlay relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 sm:pb-16 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden bg-[#0A0A0A] select-none"
      >
        {/* Full-bleed abstract visual background */}
        <motion.div
          style={{ scale: isMobile ? 1 : heroScale }}
          className="absolute inset-0 z-0 origin-center overflow-hidden pointer-events-none"
        >
          <img
            src="./images/frav_automation_core_1791240760315.jpg"
            alt="FRAV Automation Abstract System"
            width={1376}
            height={768}
            className="w-full h-full object-cover object-center filter brightness-[0.5] contrast-125"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]" />
        </motion.div>

        {/* Small Supporting Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: fravEase }}
          className="relative z-10 w-full flex items-center justify-between border-b border-white/10 pb-6"
        >
          <div className="text-xs font-sans tracking-[0.25em] text-neutral-400 uppercase">
            AGENTS / WORKFLOWS / SYSTEMS
          </div>
          <div className="text-xs font-sans text-neutral-500 uppercase tracking-widest hidden md:block">
            SPECIALTY 02 · AI AUTOMATION
          </div>
        </motion.div>

        {/* Large Typography: AI AUTOMATION */}
        <motion.div
          style={{ y: isMobile ? 0 : heroTextY, opacity: isMobile ? 1 : heroTextOpacity }}
          className="relative z-10 my-auto py-12 flex flex-col items-start w-full overflow-hidden"
        >
          <SplitReveal
            as="h1"
            animateOnMount
            className="frav-automation-hero-title font-['Syne',sans-serif] font-black uppercase tracking-tighter leading-[0.85] text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] text-white"
          >
            AI
          </SplitReveal>

          <SplitReveal
            as="div"
            delay={0.2}
            animateOnMount
            className="frav-automation-hero-subtitle font-['Syne',sans-serif] font-black uppercase tracking-tighter leading-[0.85] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-neutral-300 break-words"
          >
            AUTOMATION
          </SplitReveal>
        </motion.div>

        {/* HERO MOTION: Abstract System Flow that activates on scroll */}
        <div className="relative z-10 w-full pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* Flow Line Diagram */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm font-sans tracking-widest uppercase">
              {heroFlowStages.map((stage, idx) => (
                <React.Fragment key={stage}>
                  <motion.span
                    style={{ opacity: isMobile ? 1 : flowOpacities[idx] }}
                    className="font-bold text-white transition-opacity"
                  >
                    {stage}
                  </motion.span>
                  {idx < heroFlowStages.length - 1 && (
                    <span className="text-neutral-600">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <MagneticButton
                onClick={onStartClick}
                className="text-white uppercase tracking-widest px-6 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all text-xs font-sans"
              >
                <span>CONTACT US</span>
                <span>→</span>
              </MagneticButton>

              <a
                href="tel:+41442114890"
                className="text-white uppercase tracking-wider px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-all text-xs font-sans flex items-center gap-1.5"
                aria-label="Call studio"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF4F38]" />
                <span>CALL US</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AUTOMATION — INTRODUCTION */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-16 sm:py-28 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-6xl">
          <SplitReveal
            as="h2"
            className="font-['Syne',sans-serif] font-black uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-white mb-8"
          >
            MAKE THE WORKFLOW WORK.
          </SplitReveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: fravEase }}
            className="text-lg sm:text-2xl text-neutral-400 font-light max-w-2xl leading-relaxed"
          >
            AI agents and automated systems built around real business processes.
          </motion.p>
        </div>
      </section>

      {/* 3. AUTOMATION — CAPABILITIES (Interactive Typographic Index) */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-24 sm:py-36 bg-[#0A0A0A] border-t border-white/10">
        <div className="flex items-baseline justify-between border-b border-white/10 pb-6 mb-12 sm:mb-16">
          <span className="text-xs font-sans text-neutral-400 tracking-widest uppercase">
            01 / CAPABILITIES
          </span>
          <span className="text-xs font-sans text-neutral-500 tracking-widest uppercase hidden sm:block">
            INTERACTIVE SYSTEM INDEX
          </span>
        </div>

        {/* Index Rows */}
        <div className="space-y-0 divide-y divide-white/10">
          {capabilities.map((item, idx) => {
            const isHovered = hoveredCapability === idx;
            const hasHover = hoveredCapability !== null;
            return (
              <div
                key={item.num}
                onMouseEnter={() => setHoveredCapability(idx)}
                onMouseLeave={() => setHoveredCapability(null)}
                className={`group py-8 sm:py-12 transition-all duration-500 cursor-pointer relative ${
                  hasHover && !isHovered ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-6 sm:gap-12">
                    <span
                      className={`text-sm sm:text-lg font-sans transition-transform duration-500 ${
                        isHovered ? 'text-[#FF4F38] translate-x-2' : 'text-neutral-500'
                      }`}
                    >
                      {item.num} —
                    </span>

                    <h3
                      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-['Syne',sans-serif] uppercase tracking-tight transition-transform duration-500 ${
                        isHovered ? 'text-white translate-x-4' : 'text-neutral-200'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex flex-col lg:items-end gap-1.5 text-xs font-sans text-neutral-400 pl-12 lg:pl-0">
                    <span className="tracking-widest uppercase text-neutral-300">
                      {item.meta}
                    </span>
                    <span className="text-[#FF4F38] opacity-80">
                      {item.schema}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. AUTOMATION — INTERACTIVE SYSTEM (Signature Visual Section) */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-24 sm:py-36 bg-[#0A0A0A] border-t border-white/10">
        <div className="flex items-baseline justify-between border-b border-white/10 pb-6 mb-12 sm:mb-16">
          <span className="text-xs font-sans text-[#FF4F38] tracking-widest uppercase font-bold">
            02 / SIGNATURE SYSTEM
          </span>
          <span className="text-xs font-sans text-neutral-500 tracking-widest uppercase hidden sm:block">
            PROCESS IN MOTION
          </span>
        </div>

        <TiltCanvas maxTilt={isMobile ? 0 : 4}>
          <div className="rounded-3xl border border-white/15 bg-neutral-950 p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            {/* Ambient system grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-white/10 gap-6 mb-10">
              <div>
                <span className="text-xs font-sans text-neutral-500 uppercase tracking-widest block mb-1">
                  AUTONOMOUS STATE MACHINE
                </span>
                <h3 className="text-3xl sm:text-4xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white">
                  END-TO-END EXECUTION LOOP
                </h3>
              </div>

              <MagneticButton
                onClick={handleRunSystem}
                disabled={isSimulating}
                className="px-6 py-3 rounded-full bg-white text-black font-['Syne',sans-serif] font-black text-xs uppercase tracking-widest hover:bg-[#FF4F38] hover:text-white transition-all shadow-xl disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin mr-2" />
                    <span>EXECUTING STAGES...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current mr-2" />
                    <span>ACTIVATE SYSTEM</span>
                  </>
                )}
              </MagneticButton>
            </div>

            {/* Stages Flow: Horizontal on Desktop, Vertical on Mobile */}
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-6 gap-4'} items-center mb-8`}>
              {interactiveStages.map((stage, idx) => {
                const isActive = activeStage === idx && isSimulating;
                const isPassed = activeStage > idx;
                return (
                  <div
                    key={stage.label}
                    className={`p-5 rounded-2xl border transition-all duration-300 relative ${
                      isActive
                        ? 'border-[#FF4F38] bg-neutral-900 shadow-[0_0_25px_rgba(255,79,56,0.2)]'
                        : isPassed
                        ? 'border-white/20 bg-neutral-900/60'
                        : 'border-white/10 bg-neutral-950 text-neutral-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3 text-[10px] font-sans">
                      <span>0{idx + 1}</span>
                      {isActive ? (
                        <span className="w-2 h-2 rounded-full bg-[#FF4F38] animate-ping" />
                      ) : isPassed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                      )}
                    </div>

                    <h4 className="text-base sm:text-lg font-black font-['Syne',sans-serif] uppercase tracking-tight text-white mb-1">
                      {stage.label}
                    </h4>

                    <p className="text-[11px] font-sans text-neutral-400 leading-tight">
                      {stage.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-sans text-neutral-500 pt-6 border-t border-white/10 gap-2">
              <span>TRIGGER → AGENT → TOOLS → DECISION → ACTION → RESULT</span>
              <span className="text-emerald-400">DETERMINISTIC LATENCY &lt; 200MS</span>
            </div>
          </div>
        </TiltCanvas>
      </section>

      {/* 5. AUTOMATION — WHAT AN AGENT DOES (RECEIVE ↓ UNDERSTAND ↓ DECIDE ↓ ACT ↓ REPORT) */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-24 sm:py-36 bg-[#0A0A0A] border-t border-white/10">
        <div className="flex items-baseline justify-between border-b border-white/10 pb-6 mb-16 sm:mb-24">
          <span className="text-xs font-sans text-neutral-400 tracking-widest uppercase">
            03 / ARCHITECTURE
          </span>
          <span className="text-xs font-sans text-neutral-500 tracking-widest uppercase hidden sm:block">
            WHAT AN AGENT DOES
          </span>
        </div>

        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          {agentSteps.map((step, idx) => (
            <motion.div
              key={step.word}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: fravEase }}
              className="flex flex-col items-start"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 sm:gap-x-10 gap-y-1 mb-2">
                <span className="text-xs sm:text-sm font-sans text-neutral-500 font-bold">
                  0{idx + 1}
                </span>
                <span className="text-[clamp(1.25rem,7vw,4.5rem)] sm:text-5xl md:text-[clamp(3.5rem,7vw,6rem)] lg:text-7xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white hover:text-[#FF4F38] transition-colors">
                  {step.word}
                </span>
              </div>
              <p className="text-sm sm:text-base font-sans text-neutral-400 pl-12 sm:pl-16 max-w-xl leading-relaxed">
                {step.desc}
              </p>
              {idx < agentSteps.length - 1 && (
                <div className="pl-12 sm:pl-16 pt-6 text-neutral-700 text-lg">
                  ↓
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. AUTOMATION — SELECTED SYSTEMS */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-24 sm:py-36 bg-[#0A0A0A] border-t border-white/10">
        <div className="flex items-baseline justify-between border-b border-white/10 pb-6 mb-16 sm:mb-24">
          <span className="text-xs font-sans text-neutral-400 tracking-widest uppercase">
            04 / SELECTED SYSTEMS
          </span>
          <span className="text-xs font-sans text-neutral-500 tracking-widest uppercase hidden sm:block">
            PRODUCTION WORKFLOWS
          </span>
        </div>

        {/* Overlapping Stacking Cards Motion */}
        <div className="relative pb-16 sm:pb-28">
          {selectedSystems.map((item, idx) => (
            <AutomationStackCard
              key={item.index}
              item={item}
              index={idx}
              total={selectedSystems.length}
              isMobile={isMobile}
            />
          ))}
        </div>
      </section>

      {/* 7. AUTOMATION — COMMISSION CTA */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-20 sm:py-28 bg-[#080808] border-t border-white/10 relative overflow-hidden">
        <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-sans text-[#FF4F38] uppercase tracking-[0.25em] block font-bold">
              05 / ENGAGEMENT ARCHITECTURE
            </span>
            <h2 className="frav-automation-cta-title text-3xl sm:text-5xl lg:text-6xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white leading-[1.05] [text-wrap:balance]">
              READY TO DEPLOY AUTONOMOUS AGENTS?
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-sans font-light leading-relaxed max-w-xl">
              We architect autonomous reasoning agents, DAG data workflows, and zero-touch system orchestrations engineered for enterprise scale.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <MagneticButton
              onClick={onStartClick}
              className="px-8 py-4.5 rounded-full bg-white text-black font-['Syne',sans-serif] font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-[#FF4F38] hover:text-white transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>CONTACT US</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>

            <a
              href="tel:+41442114890"
              className="px-7 py-4.5 rounded-full border border-white/20 hover:border-white hover:bg-white/10 text-white font-['Syne',sans-serif] font-bold text-xs sm:text-sm uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2.5"
              aria-label="Call studio"
            >
              <Phone className="w-4 h-4 text-[#FF4F38]" />
              <span>CALL: +41 44 211 48 90</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

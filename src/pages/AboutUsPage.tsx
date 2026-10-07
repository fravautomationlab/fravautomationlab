import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowDown, CheckCircle2, Send, Mail, MapPin, Phone, Clock, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { FravPageId } from '../types';
import { MagneticButton } from '../components/motion/MagneticButton';
import { SplitReveal } from '../components/motion/SplitReveal';
import { HorizontalMarquee } from '../components/motion/HorizontalMarquee';
import { TiltCanvas } from '../components/motion/TiltCanvas';

interface AboutUsPageProps {
  onNavigate: (page: FravPageId) => void;
  onStartClick: () => void;
}

interface PrincipleItem {
  num: string;
  title: string;
  tagline: string;
  desc: string;
}

interface PrincipleStackCardProps {
  principle: PrincipleItem;
  index: number;
  total: number;
  isMobile: boolean;
}

const PrincipleStackCard: React.FC<PrincipleStackCardProps> = ({ principle, index, total, isMobile }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  const isLast = index === total - 1;
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, isLast || isMobile ? 1 : 0.94]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, isLast || isMobile ? 1 : 0.75, isLast || isMobile ? 1 : 0.45]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        position: 'sticky',
        top: `${88 + index * 26}px`,
        zIndex: index + 10,
        scale: cardScale,
        opacity: cardOpacity,
      }}
      className="w-full rounded-3xl bg-[#0D0D0D] border border-white/20 p-8 sm:p-12 md:p-16 flex flex-col justify-between shadow-[0_-25px_60px_rgba(0,0,0,0.95)] hover:border-white/40 transition-colors mb-20 sm:mb-28 last:mb-4 min-h-[360px] sm:min-h-[420px] group"
    >
      <div>
        <div className="flex items-baseline justify-between pb-6 border-b border-white/10 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-sm sm:text-base font-sans text-[#FF4F38] font-bold">
              PRINCIPLE // {principle.num}
            </span>
            <span className="text-neutral-600">/</span>
            <span className="text-xs font-sans text-neutral-400 uppercase tracking-widest">
              STUDIO DOCTRINE
            </span>
          </div>
          <span className="text-xs font-sans text-neutral-400 uppercase tracking-widest hidden sm:inline">
            {principle.tagline}
          </span>
        </div>

        <h3 className="text-3xl sm:text-5xl md:text-6xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white mb-6 group-hover:text-[#FF4F38] transition-colors">
          {principle.title}
        </h3>

        <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-4xl">
          {principle.desc}
        </p>
      </div>

      <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between text-xs font-sans text-neutral-500">
        <span className="uppercase tracking-widest">{principle.tagline}</span>
        <span className="text-neutral-400 font-bold tracking-wider">FRAV STANDARD · NON-NEGOTIABLE</span>
      </div>
    </motion.div>
  );
};

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate, onStartClick }) => {
  const [disciplineFocus, setDisciplineFocus] = useState<'WEB' | 'AUTOMATION' | 'BOTH'>('BOTH');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    timeline: 'Q2 / Q3 2026',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  // Hero parallax
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.25]);
  const heroTextY = useTransform(heroProgress, [0, 1], ['0%', '42%']);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const studioPrinciples = [
    {
      num: '01',
      title: 'QUIET CONFIDENCE',
      tagline: 'SUBSTANCE OVER NOISE',
      desc: 'We do not shout. We reject bloated marketing jargon, SaaS tropes, and corporate theater. The craft of the layout, the clarity of the typography, and the precision of the code speak with complete authority.',
    },
    {
      num: '02',
      title: 'ART DIRECTION > COPY',
      tagline: 'VISCERAL COMMUNICATION',
      desc: 'People feel digital design before they read it. We prioritize spatial editorial composition, kinetic rhythm, and large typography over endless paragraphs of marketing copy. The work tells the story.',
    },
    {
      num: '03',
      title: 'EXTREME RESTRAINT',
      tagline: 'INTENTIONAL EMPTINESS',
      desc: 'Simplicity is the highest form of engineering sophistication. We eliminate visual clutter, gradient blobs, and gratuitous 3D rooms in favor of intentional whitespace and decisive accents.',
    },
    {
      num: '04',
      title: 'DIRECT ARCHITECT PARTNERSHIP',
      tagline: 'ZERO MIDDLEMEN',
      desc: 'No account managers or junior pass-throughs. You collaborate directly with the senior software engineers and art directors who design, write, test, and ship your production codebase.',
    },
  ];

  const faqs = [
    {
      q: 'HOW DOES FRAV ENGAGE WITH CLIENTS?',
      a: 'We work either on fixed-scope production sprints (typically 3–6 weeks for digital flagships or autonomous pipelines) or quarterly architectural retainers for continuous engineering evolution.',
    },
    {
      q: 'WHO OWNS THE INTELLECTUAL PROPERTY & CODE?',
      a: 'You own 100% of the repository, design assets, and deployment orchestration from day one. We deliver clean, strictly-typed TypeScript without proprietary vendor lock-in or recurring software licensing fees.',
    },
    {
      q: 'DO YOU PROVIDE POST-LAUNCH MAINTENANCE?',
      a: 'Yes. Every production delivery includes our Care protocol with real-time uptime telemetry, dependency updates, and dedicated SLA response times.',
    },
    {
      q: 'WHERE IS THE STUDIO LOCATED?',
      a: 'Our core engineering and creative leads are based between Zurich and London, collaborating with discerning clients worldwide across Europe, North America, and Asia-Pacific.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.email.includes('@')) {
      setError('Please provide your name and a valid email address.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#0A0A0A] text-white selection:bg-white selection:text-black">
      {/* 1. MONUMENTAL HERO SECTION */}
      <section
        ref={heroRef}
        aria-label="About FRAV Hero"
        className="light-image-overlay relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 sm:pb-16 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden bg-[#0A0A0A] select-none"
      >
        {/* Full-Bleed Parallax Studio Space Background */}
        <motion.div
          style={{ scale: isMobile ? 1 : heroScale }}
          className="absolute inset-0 z-0 origin-center overflow-hidden pointer-events-none"
        >
          <img
            src="./images/frav_studio_space_1791240745620.jpg"
            alt="FRAV Studio Space Architecture"
            width={1376}
            height={768}
            className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-110"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]" />
        </motion.div>

        {/* Top Meta Line with page-load reveal */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: fravEase }}
          className="relative z-10 w-full flex items-center justify-between border-b border-white/10 pb-6"
        >
          <div className="flex items-center gap-3 text-xs font-sans text-neutral-400">
            <span className="text-[#FF4F38] font-bold">03 /</span>
            <span>STUDIO & CONTACT</span>
            <span className="text-neutral-600">/</span>
            <span className="text-white">FRAV AUTOMATION LAB</span>
          </div>
          <span className="text-xs font-sans text-neutral-500 uppercase tracking-widest hidden md:block">
            EST. 2024 · ZURICH / LONDON
          </span>
        </motion.div>

        {/* Monumental Center Typography with Text Reveal */}
        <motion.div
          style={{ y: isMobile ? 0 : heroTextY, opacity: isMobile ? 1 : heroTextOpacity }}
          className="relative z-10 my-auto py-12 text-center flex flex-col items-center justify-center w-full overflow-hidden"
        >
          <SplitReveal
            as="h1"
            className="font-['Syne',sans-serif] font-black uppercase tracking-tighter leading-[0.85] text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] text-white justify-center"
          >
            FRAV
          </SplitReveal>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: fravEase }}
            className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-lg font-sans tracking-[0.3em] sm:tracking-[0.45em] uppercase text-neutral-300"
          >
            ARCHITECTURE + AUTONOMY · DIGITAL STUDIO
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Action & Scroll Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: fravEase }}
          className="relative z-10 w-full flex items-center justify-between pt-6 border-t border-white/10"
        >
          <div className="flex items-center gap-3">
            <MagneticButton
              onClick={scrollToContact}
              className="text-xs sm:text-sm font-sans tracking-[0.25em] text-white uppercase px-6 py-2.5 rounded-full border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all"
            >
              <span>CONTACT US</span>
              <span>↓</span>
            </MagneticButton>

            <a
              href="tel:+41442114890"
              className="text-xs sm:text-sm font-sans tracking-wider text-white uppercase px-4 py-2.5 rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-all flex items-center gap-2"
              aria-label="Call studio"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF4F38]" />
              <span>CALL US</span>
            </a>
          </div>

          <span className="text-xs font-sans text-neutral-500 uppercase tracking-widest hidden sm:block">
            INQUIRIES ROUTED TO SENIOR PARTNERS
          </span>

          <button
            type="button"
            onClick={scrollToContact}
            className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll to Studio Manifesto"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </motion.div>
      </section>

      {/* HORIZONTAL MOVING MARQUEE TICKER (Continuous 2D motion) */}
      <div className="py-6 border-y border-white/10 bg-[#0A0A0A]">
        <HorizontalMarquee
          items={[
            'FRAV AUTOMATION LAB',
            '100% CODE OWNERSHIP',
            'ZERO TEMPLATE COLLAGES',
            'DIRECT ARCHITECT PARTNERSHIP',
            'ZURICH HQ · LONDON · GLOBAL REMOTE',
            'QUIET CONFIDENCE & EXTREME RESTRAINT',
          ]}
          speed={32}
        />
      </div>

      {/* 2. STUDIO MANIFESTO (EDITORIAL HIGH-END TYPOGRAPHY) */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-24 sm:py-36 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-6xl">
          <div className="flex items-center gap-3 text-xs font-sans text-[#FF4F38] uppercase tracking-widest mb-8 font-bold">
            <span>01 /</span>
            <span>THE CONVICTION</span>
          </div>

          <SplitReveal
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-['Syne',sans-serif] tracking-tight uppercase leading-[0.95] text-white mb-12"
          >
            WE REJECT NOISE. WE BUILD DIGITAL MONUMENTS.
          </SplitReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pt-8 border-t border-white/10">
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: fravEase }}
              className="md:col-span-6"
            >
              <p className="text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed">
                Frav was founded on a singular conviction: modern digital organizations should never be forced to choose between visceral aesthetic craft and operational velocity.
              </p>
            </motion.div>
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: fravEase }}
              className="md:col-span-6"
            >
              <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
                By uniting bespoke website development with autonomous engineering, we deliver platforms that command absolute presence on the surface while running autonomously behind the scenes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. THE DUAL DISCIPLINES (INTERACTIVE SCENES with 2.5D tilt) */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-24 sm:py-36 bg-[#0A0A0A] border-t border-white/5">
        <div className="flex items-baseline justify-between border-b border-white/10 pb-6 mb-16 sm:mb-24">
          <div className="flex items-baseline gap-4">
            <span className="text-xs font-sans text-neutral-400">02 /</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-['Syne',sans-serif] tracking-tight uppercase">
              DISCIPLINES
            </h2>
          </div>
          <span className="text-xs font-sans text-neutral-400 tracking-widest uppercase hidden sm:block">
            TWO CAPABILITIES · ONE HARMONIOUS STUDIO
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Discipline 1: WEB */}
          <TiltCanvas maxTilt={isMobile ? 0 : 3.5}>
            <div
              onClick={() => onNavigate('web-development')}
              className="group relative rounded-3xl overflow-hidden bg-neutral-950 border border-white/10 p-8 sm:p-14 flex flex-col justify-between cursor-pointer hover:border-white/30 transition-all duration-500 min-h-[500px] shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
                  <span className="text-xs font-sans text-[#FF4F38] font-bold">DISCIPLINE 01</span>
                  <span className="text-[11px] font-sans text-neutral-500 uppercase tracking-widest">
                    THE VISIBLE SURFACE
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white mb-6">
                  WEBSITE DEVELOPMENT
                </h3>
                <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed mb-8">
                  Fast, responsive websites built with clean code. Specialized in HTML, CSS, JavaScript, Tailwind CSS, and TypeScript for real-world production.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-sans text-neutral-400 group-hover:text-white transition-colors">
                <span>EXPLORE WEBSITE DEVELOPMENT</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </TiltCanvas>

          {/* Discipline 2: AUTOMATION */}
          <TiltCanvas maxTilt={isMobile ? 0 : 3.5}>
            <div
              onClick={() => onNavigate('automation')}
              className="group relative rounded-3xl overflow-hidden bg-neutral-950 border border-white/10 p-8 sm:p-14 flex flex-col justify-between cursor-pointer hover:border-[#FF4F38]/50 transition-all duration-500 min-h-[500px] shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
                  <span className="text-xs font-sans text-[#FF4F38] font-bold">DISCIPLINE 02</span>
                  <span className="text-[11px] font-sans text-neutral-500 uppercase tracking-widest">
                    THE SILENT ENGINE
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white mb-6">
                  AUTOMATION WORK
                </h3>
                <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed mb-8">
                  Autonomous workflow pipelines that eliminate operational friction. Multi-source event ingestion, neural classification, and real-time execution that run quietly 24/7 with zero human latency.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-sans text-neutral-400 group-hover:text-[#FF4F38] transition-colors">
                <span>EXPLORE AUTOMATION DISCIPLINE</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </TiltCanvas>
        </div>
      </section>

      {/* 4. STUDIO PRINCIPLES (EDITORIAL LIST) */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-24 sm:py-36 bg-[#0A0A0A] border-t border-white/5">
        <div className="flex items-baseline justify-between border-b border-white/10 pb-6 mb-16 sm:mb-24">
          <div className="flex items-baseline gap-4">
            <span className="text-xs font-sans text-neutral-400">03 /</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-['Syne',sans-serif] tracking-tight uppercase">
              PRINCIPLES
            </h2>
          </div>
          <span className="text-xs font-sans text-neutral-400 tracking-widest uppercase hidden sm:block">
            HOW WE THINK, DECIDE & SHIP
          </span>
        </div>

        {/* Overlapping Stacking Cards Motion */}
        <div className="relative pb-16 sm:pb-28">
          {studioPrinciples.map((p, idx) => (
            <PrincipleStackCard
              key={p.num}
              principle={p}
              index={idx}
              total={studioPrinciples.length}
              isMobile={isMobile}
            />
          ))}
        </div>
      </section>

      {/* 5. FULL INTEGRATED CONTACT ARCHITECTURE with Tilt & Magnetic Controls */}
      <section
        id="contact"
        aria-label="Direct Studio Contact"
        className="px-6 sm:px-12 md:px-16 lg:px-24 py-24 sm:py-36 bg-[#0A0A0A] border-t border-white/10"
      >
        <TiltCanvas maxTilt={isMobile ? 0 : 2.5}>
          <div className="p-8 sm:p-16 lg:p-20 rounded-3xl bg-neutral-950 border border-white/15 shadow-2xl">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 border-b border-white/10 mb-12 sm:mb-16 gap-6">
              <div>
                <span className="text-xs font-sans text-[#FF4F38] uppercase tracking-widest block mb-2 font-bold">
                  DIRECT INQUIRY & COMMISSIONS
                </span>
                <SplitReveal
                  as="h2"
                  className="text-4xl sm:text-6xl md:text-7xl font-black font-['Syne',sans-serif] uppercase tracking-tighter text-white"
                >
                  CONTACT
                </SplitReveal>
              </div>
              <div className="text-xs font-sans text-neutral-400 max-w-sm">
                <span>COMMISSION INQUIRIES ROUTED DIRECTLY TO STUDIO PARTNERS. EXPECT A RESPONSE WITHIN 24 BUSINESS HOURS.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
              {/* Left Column: Direct Coordinates */}
              <div className="lg:col-span-5 space-y-10">
                <div>
                  <h3 className="text-xs font-sans text-neutral-500 uppercase tracking-widest mb-6">
                    STUDIO COORDINATES
                  </h3>
                  <div className="space-y-6 text-sm font-sans">
                    <div className="flex items-start gap-4">
                      <Mail className="w-4 h-4 text-[#FF4F38] mt-1 shrink-0" />
                      <div>
                        <span className="text-xs text-neutral-500 block uppercase">DIRECT INQUIRIES</span>
                        <a
                          href="mailto:studio@fravlab.com"
                          className="text-white hover:text-[#FF4F38] transition-colors text-base font-bold"
                        >
                          studio@fravlab.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="w-4 h-4 text-[#FF4F38] mt-1 shrink-0" />
                      <div>
                        <span className="text-xs text-neutral-500 block uppercase">SIGNAL / TELEPHONE</span>
                        <a
                          href="tel:+41442114890"
                          className="text-white hover:text-[#FF4F38] transition-colors text-base font-bold flex items-center gap-3 group mt-0.5"
                          aria-label="Call +41 44 211 48 90"
                        >
                          <span>+41 44 211 48 90</span>
                          <span className="text-xs px-3 py-1 rounded-full bg-white/10 group-hover:bg-[#FF4F38] group-hover:text-white transition-colors flex items-center gap-1.5 font-bold">
                            <Phone className="w-3 h-3 text-[#FF4F38] group-hover:text-white" />
                            <span>CALL NOW</span>
                          </span>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="w-4 h-4 text-[#FF4F38] mt-1 shrink-0" />
                      <div>
                        <span className="text-xs text-neutral-500 block uppercase">HUBS</span>
                        <span className="text-neutral-300 block">ZURICH (HQ) · LONDON · GLOBAL REMOTE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Confidentiality SLA */}
                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 text-xs font-sans text-neutral-400 leading-relaxed space-y-2">
                  <span className="text-white font-bold block">CONFIDENTIALITY GUARANTEE</span>
                  <p>
                    All project briefs, API keys, and workflow architectures are covered by mutual non-disclosure and protected under Swiss commercial law.
                  </p>
                </div>
              </div>

              {/* Right Column: High-End Inquiry Form */}
              <div className="lg:col-span-7">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="min-h-[360px] p-8 sm:p-12 rounded-2xl bg-neutral-900/80 border border-white/10 flex flex-col justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FF4F38]/10 text-[#FF4F38] flex items-center justify-center mb-8">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-sans text-[#FF4F38] uppercase tracking-[0.2em] font-bold mb-3">
                      INQUIRY
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black font-['Syne',sans-serif] tracking-tight text-white mb-4">
                      Thank you, {formData.name}.
                    </h3>
                    <p className="text-sm font-sans text-neutral-400 max-w-md mb-8 leading-relaxed">
                      This form isn&apos;t connected yet. Email your brief to{' '}
                      <a
                        href="mailto:studio@fravlab.com"
                        className="text-white underline decoration-white/30 underline-offset-4 hover:text-[#FF4F38] transition-colors"
                      >
                        studio@fravlab.com
                      </a>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', company: '', timeline: 'Q2 / Q3 2026', message: '' });
                      }}
                      className="self-start px-5 py-3 rounded-full border border-white/20 text-xs font-sans uppercase tracking-wider text-neutral-300 hover:text-white hover:border-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4F38]"
                    >
                      BACK TO FORM
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Discipline Focus Selector */}
                    <div>
                      <label className="text-xs font-sans text-neutral-400 uppercase tracking-widest block mb-3">
                        PRIMARY DISCIPLINE OF INTEREST
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['WEB', 'AUTOMATION', 'BOTH'] as const).map((item) => (
                          <MagneticButton
                            key={item}
                            type="button"
                            onClick={() => setDisciplineFocus(item)}
                            className={`py-3 px-1 sm:px-2 rounded-xl text-[9px] sm:text-xs font-sans uppercase tracking-normal sm:tracking-wider transition-all w-full ${
                              disciplineFocus === item
                                ? 'bg-white text-black font-bold shadow-lg'
                                : 'bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {item === 'BOTH' ? 'WEBSITE DEVELOPMENT + AUTO' : item === 'WEB' ? 'WEBSITE DEVELOPMENT' : item}
                          </MagneticButton>
                        ))}
                      </div>
                    </div>

                    {/* Name & Email inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-sans text-neutral-400 uppercase tracking-widest block mb-2">
                          YOUR NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Marcus Vance"
                          className="w-full px-4 py-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-neutral-600 font-sans text-sm focus:outline-hidden focus:border-[#FF4F38] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-sans text-neutral-400 uppercase tracking-widest block mb-2">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="m.vance@company.com"
                          className="w-full px-4 py-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-neutral-600 font-sans text-sm focus:outline-hidden focus:border-[#FF4F38] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Organization / Brand */}
                    <div>
                      <label className="text-xs font-sans text-neutral-400 uppercase tracking-widest block mb-2">
                        ORGANIZATION / BRAND
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Studio / Enterprise"
                        className="w-full px-4 py-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-neutral-600 font-sans text-sm focus:outline-hidden focus:border-[#FF4F38] transition-colors"
                      />
                    </div>

                    {/* Brief Message */}
                    <div>
                      <label className="text-xs font-sans text-neutral-400 uppercase tracking-widest block mb-2">
                        PROJECT BRIEF / SPECIFICATIONS
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Outline your objectives, target performance requirements, or operational bottlenecks..."
                        className="w-full px-4 py-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white placeholder-neutral-600 font-sans text-sm focus:outline-hidden focus:border-[#FF4F38] transition-colors resize-none"
                      />
                    </div>

                    {error && (
                      <div className="text-xs font-sans text-red-400">
                        {error}
                      </div>
                    )}

                    {/* Action Buttons: Submit + Direct Call */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <MagneticButton
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-4.5 rounded-full bg-white text-black font-['Syne',sans-serif] font-black text-xs uppercase tracking-widest hover:bg-[#FF4F38] hover:text-white transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <span>TRANSMITTING BRIEF...</span>
                        ) : (
                          <>
                            <span>TRANSMIT BRIEF TO FRAV</span>
                            <Send className="w-3.5 h-3.5 ml-1" />
                          </>
                        )}
                      </MagneticButton>

                      <a
                        href="tel:+41442114890"
                        className="px-6 py-4 rounded-full border border-white/20 hover:border-white hover:bg-white/10 text-white font-['Syne',sans-serif] font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shrink-0"
                        aria-label="Call studio directly"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#FF4F38]" />
                        <span>CALL US</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </TiltCanvas>
      </section>

      {/* 6. STUDIO PROTOCOL & FAQ */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 pb-24 sm:pb-36 bg-[#0A0A0A]">
        <div className="flex items-baseline justify-between border-b border-white/10 pb-6 mb-12">
          <div className="flex items-baseline gap-4">
            <span className="text-xs font-sans text-neutral-400">PROTOCOL /</span>
            <h2 className="text-2xl sm:text-4xl font-black font-['Syne',sans-serif] tracking-tight uppercase">
              ENGAGEMENT FAQ
            </h2>
          </div>
          <span className="text-xs font-sans text-neutral-500 uppercase tracking-widest hidden sm:block">
            TERMS & OPERATIONS
          </span>
        </div>

        <div className="space-y-4 max-w-4xl">
          {faqs.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div
                key={i}
                className="border border-white/10 rounded-2xl overflow-hidden bg-neutral-950 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold font-['Syne',sans-serif] uppercase tracking-tight text-white">
                    {faq.q}
                  </span>
                  <span className="text-lg font-sans text-neutral-400">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: fravEase }}
                      className="px-6 pb-6 text-sm font-light text-neutral-400 leading-relaxed font-sans"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

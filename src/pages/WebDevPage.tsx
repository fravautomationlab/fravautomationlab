import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ArrowRight, CheckCircle2, Star, Quote, Code2, Terminal, ShieldCheck, Phone } from 'lucide-react';
import { FravPageId } from '../types';
import { MagneticButton } from '../components/motion/MagneticButton';
import { SplitReveal } from '../components/motion/SplitReveal';
import { TiltCanvas } from '../components/motion/TiltCanvas';
import { useTheme } from '../context/ThemeContext';

interface WebDevPageProps {
  onNavigate: (page: FravPageId) => void;
  onStartClick: () => void;
}

interface WebProjectSceneItemProps {
  project: {
    num: string;
    meta: string;
    title: string;
    year: string;
    description: string;
    techStack: string[];
    metrics: string;
    image: string;
    website?: string;
  };
  index: number;
  total: number;
}

const WebProjectSceneItem: React.FC<WebProjectSceneItemProps> = ({ project, index, total }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end start'],
  });

  const isLast = index === total - 1;
  // Overlapping stack motion: as next card covers this one, scale down and dim
  const cardScale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.93]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, isLast ? 1 : 0.75, isLast ? 1 : 0.45]);

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  return (
    <motion.div
      ref={sceneRef}
      style={{
        position: 'sticky',
        top: `${88 + index * 28}px`,
        zIndex: index + 10,
        scale: cardScale,
        opacity: cardOpacity,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouseOffset({ x: 0, y: 0 })}
      className="relative w-full group bg-[#0D0D0D] rounded-3xl p-4 sm:p-8 md:p-10 border border-white/20 hover:border-white/40 transition-colors duration-500 shadow-[0_-30px_70px_rgba(0,0,0,0.98)] mb-24 sm:mb-36 last:mb-6"
    >
      {/* Viewport Scene Visual Container with scroll-linked scaling & cursor parallax */}
      <div className="relative w-full h-[40vh] sm:h-[46vh] lg:h-[54vh] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
        <motion.div
          style={{
            scale: imageScale,
            y: imageY,
            transform: `translate(${mouseOffset.x * 16}px, ${mouseOffset.y * 16}px)`,
          }}
          className="w-full h-full relative overflow-hidden transition-transform duration-500 ease-out origin-center"
        >
          <img
            src={project.image}
            alt={project.title}
            width={1376}
            height={768}
            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      <div className="pt-6 sm:pt-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 text-[11px] font-sans tracking-widest uppercase text-neutral-400">
              <span className="text-[#FF4F38] font-bold">{project.num}</span>
              <span className="text-neutral-600">/</span>
              <span>{project.meta}</span>
              <span className="text-neutral-600">·</span>
              <span>{project.year}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white mb-2 group-hover:text-[#FF4F38] transition-colors">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-2xl leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-white/5 text-[10px] sm:text-[11px] font-sans text-neutral-400 uppercase tracking-wider border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.website ? (
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-xs font-sans font-bold uppercase tracking-widest text-white transition-colors hover:border-[#FF4F38] hover:text-[#FF4F38] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF4F38]"
            >
              VIEW WEBSITE
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : (
            <button
              type="button"
              disabled
              aria-label={`${project.title} website link pending`}
              title="Website link pending"
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs font-sans font-bold uppercase tracking-widest text-neutral-500 opacity-60 cursor-not-allowed"
            >
              VIEW WEBSITE
              <ArrowUpRight className="h-4 w-4" />
            </button>
          )}
        </div>
        <p className="mt-4 text-[11px] font-sans text-neutral-500 uppercase tracking-wider">
          {project.metrics}
        </p>
      </div>
    </motion.div>
  );
};

export const WebDevPage: React.FC<WebDevPageProps> = ({ onNavigate, onStartClick }) => {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const [hoveredCapability, setHoveredCapability] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [activeProcessStage, setActiveProcessStage] = useState(0);

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

  // Hero scroll choreography
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.18]);
  const heroTextY = useTransform(heroProgress, [0, 1], ['0%', '30%']);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.85], [1, 0.1]);

  // Core Website Developer Capabilities: HTML, CSS, JavaScript, Tailwind CSS, TypeScript
  const capabilities = [
    {
      num: '01',
      title: 'HTML & SEMANTIC MARKUP',
      sub: 'ACCESSIBLE DOM · CLEAN HIERARCHY · SEO OPTIMIZATION',
      image: './images/frav_web_canvas_1791239394889.jpg',
    },
    {
      num: '02',
      title: 'CSS & MODERN STYLING',
      sub: 'RESPONSIVE FLEXBOX · CSS GRID · CLEAN LAYOUT MODELS',
      image: './images/web_dev_hero_1791238807505.jpg',
    },
    {
      num: '03',
      title: 'TAILWIND CSS',
      sub: 'UTILITY-FIRST ARCHITECTURE · BESPOKE THEMES · ZERO BLOAT',
      image: './images/frav_work_editorial_1791239405268.jpg',
    },
    {
      num: '04',
      title: 'JAVASCRIPT',
      sub: 'INTERACTIVE DOM · API DATA FETCHING · ASYNC LOGIC',
      image: './images/frav_hero_1791239384109.jpg',
    },
    {
      num: '05',
      title: 'TYPESCRIPT',
      sub: 'STRICT TYPE-SAFETY · MODULAR COMPONENTS · MAINTAINABLE CODE',
      image: './images/frav_studio_space_1791240745620.jpg',
    },
    {
      num: '06',
      title: 'RESPONSIVE WEB BUILDS',
      sub: 'CROSS-BROWSER TESTED · MOBILE-FIRST · PRODUCTION DEPLOYED',
      image: './images/frav_automation_core_1791240760315.jpg',
    },
  ];

  // Project scenes
  const projects = [
    {
      num: '01',
      meta: 'WEBSITE DEVELOPMENT / TYPESCRIPT / TAILWIND',
      title: 'VESPER ARCHITECTURE',
      year: '2025',
      description: 'A responsive digital home for an architecture practice.',
      techStack: ['HTML5', 'Tailwind CSS', 'TypeScript', 'React'],
      metrics: 'Clean DOM · Fast Render',
      image: './images/frav_web_canvas_1791239394889.jpg',
      website: undefined,
    },
    {
      num: '02',
      meta: 'WEBSITE DEVELOPMENT / JAVASCRIPT / CSS',
      title: 'ATELIER KROMA',
      year: '2025',
      description: 'An editorial portfolio with considered motion and layout.',
      techStack: ['JavaScript', 'CSS Grid', 'Tailwind CSS'],
      metrics: 'Mobile Responsive · Zero Layout Shift',
      image: './images/frav_work_editorial_1791239405268.jpg',
      website: undefined,
    },
    {
      num: '03',
      meta: 'WEBSITE DEVELOPMENT / FULL STACK / APIS',
      title: 'MONOLITH PROTOCOL',
      year: '2026',
      description: 'A production application built around connected data.',
      techStack: ['TypeScript', 'Tailwind CSS', 'REST APIs'],
      metrics: 'Type-Safe · Edge Deployed',
      image: './images/web_dev_hero_1791238807505.jpg',
      website: undefined,
    },
    {
      num: '04',
      meta: 'DIGITAL STUDIO / EDITORIAL',
      title: 'NORTHLINE STUDIO',
      year: '2026',
      description: 'A refined portfolio for an independent architecture practice.',
      techStack: ['React', 'Tailwind CSS', 'Responsive Design'],
      metrics: 'Editorial Portfolio · Mobile First',
      image: './images/frav_studio_space_1791240745620.jpg',
      website: undefined,
    },
    {
      num: '05',
      meta: 'COMMERCE / DIGITAL EXPERIENCE',
      title: 'KINFIELD GOODS',
      year: '2026',
      description: 'A considered storefront built for a modern homeware label.',
      techStack: ['TypeScript', 'Commerce', 'Accessible UI'],
      metrics: 'Commerce Experience · Performance Focused',
      image: './images/frav_hero_1791239384109.jpg',
      website: undefined,
    },
  ];

  // Client Reviews & Endorsements
  const reviews = [
    {
      id: 'sarah-jenkins',
      name: 'Sarah Jenkins',
      role: 'VP of Engineering',
      company: 'Studio Verity',
      quote:
        'Exceptional website developer. Clean semantic HTML, meticulous Tailwind CSS styling, and strict TypeScript architecture. Delivered ahead of schedule with zero tech debt.',
      avatar: './images/service_portrait_1791230795589.jpg',
      initials: 'SJ',
      tag: 'HTML · CSS · TYPESCRIPT',
      stars: 5,
    },
    {
      id: 'shane-vance',
      name: 'Shane Vance',
      role: 'Head of Product',
      company: 'Apex Cloud',
      quote:
        'Working with him was effortless. He writes immaculate JavaScript and Tailwind code. Every responsive breakpoint looks and functions flawlessly across mobile and desktop devices.',
      avatar: './images/review_shane_1791232155290.jpg',
      initials: 'SV',
      tag: 'TAILWIND CSS · JAVASCRIPT',
      stars: 5,
    },
    {
      id: 'aubrey-chen',
      name: 'Aubrey Chen',
      role: 'Lead Technical Architect',
      company: 'Nordic FinTech',
      quote:
        'A dedicated website developer with a deep grasp of core web fundamentals. His attention to semantic markup, fast load times, and clean components is top-tier.',
      avatar: './images/review_aubrey_1791232177259.jpg',
      initials: 'AC',
      tag: 'HTML · JAVASCRIPT · TAILWIND',
      stars: 5,
    },
    {
      id: 'lisa-hoffman',
      name: 'Lisa Hoffman',
      role: 'Chief Technology Officer',
      company: 'Lumiere Digital',
      quote:
        'High-standard website development. Strict TypeScript contracts, clean CSS layout models, and rock-solid code maintainability. An indispensable development partner.',
      avatar: './images/review_lisa_1791232186843.jpg',
      initials: 'LH',
      tag: 'TYPESCRIPT · WEBSITE DEVELOPMENT',
      stars: 5,
    },
  ];

  // Process 4 stages with rich architectural details
  const processSteps = [
    {
      step: '01',
      title: 'SCOPE',
      subtitle: 'REQUIREMENTS & PAGE ARCHITECTURE',
      deliverables: ['Content Structure', 'Semantic Hierarchy', 'Responsive Layout Plan', 'Tech Stack Alignment'],
      duration: 'STAGE 01',
    },
    {
      step: '02',
      title: 'MARKUP',
      subtitle: 'SEMANTIC HTML & TAILWIND STYLING',
      deliverables: ['Clean HTML5 Elements', 'Custom Tailwind Utilities', 'Mobile-First Breakpoints', 'Accessible Structure'],
      duration: 'STAGE 02',
    },
    {
      step: '03',
      title: 'BUILD',
      subtitle: 'JAVASCRIPT & TYPESCRIPT IMPLEMENTATION',
      deliverables: ['Strict TypeScript Models', 'Interactive Logic', 'API Integration', 'Zero Console Errors'],
      duration: 'STAGE 03',
    },
    {
      step: '04',
      title: 'DEPLOY',
      subtitle: 'CROSS-BROWSER AUDIT & LAUNCH',
      deliverables: ['Lighthouse Optimization', 'Cross-Browser Verification', 'Clean Git Repository', 'Care & Maintenance Handover'],
      duration: 'STAGE 04',
    },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="w-full bg-[#0A0A0A] text-white selection:bg-white selection:text-black"
    >
      {/* 1. WEB — HERO */}
      <section
        ref={heroRef}
        aria-label="Website Development Hero"
        className="light-image-overlay relative min-h-[90vh] sm:min-h-screen w-full flex flex-col justify-between pt-28 pb-10 sm:pb-14 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden bg-[#0A0A0A] select-none"
      >
        {/* Full-screen website/interface visual with scroll expansion */}
        <motion.div
          style={{ scale: isMobile ? 1 : heroScale }}
          className="absolute inset-0 z-0 origin-center overflow-hidden pointer-events-none"
        >
          <img
            src="./images/web_dev_hero_1791238807505.jpg"
            alt="Developer workspace with code on a monitor"
            width={1376}
            height={768}
            className="w-full h-full object-cover object-center filter brightness-[0.6] contrast-110"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/75 via-[#0A0A0A]/40 to-[#0A0A0A]" />
        </motion.div>

        {/* Small Supporting Label */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: fravEase }}
          className="relative z-10 w-full flex items-center justify-between border-b border-white/10 pb-5"
        >
          <div className="light-image-label text-xs font-sans tracking-[0.25em] text-[#FF4F38] uppercase font-bold flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FF4F38] animate-pulse" />
            <span>HTML / CSS / JAVASCRIPT / TAILWIND / TYPESCRIPT</span>
          </div>
          <div className="light-image-label text-xs font-sans text-neutral-400 uppercase tracking-widest hidden md:block">
            SPECIALTY 01 · WEBSITE DEVELOPMENT
          </div>
        </motion.div>

        {/* Large Typography: WEBSITE DEVELOPMENT */}
        <motion.div
          style={{ y: isMobile ? 0 : heroTextY, opacity: isMobile ? 1 : heroTextOpacity }}
          className="relative z-10 my-auto py-8 sm:py-12 flex flex-col items-start w-full overflow-hidden"
        >
          <SplitReveal
            as="h1"
            animateOnMount
            className="frav-web-hero-title font-['Syne',sans-serif] font-black uppercase tracking-tighter leading-[0.85] text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] text-white"
          >
            WEBSITE
          </SplitReveal>

          <SplitReveal
            as="div"
            delay={0.15}
            animateOnMount
            className="frav-web-hero-subtitle font-['Syne',sans-serif] font-black uppercase tracking-tighter leading-[0.85] text-[clamp(2rem,10vw,3rem)] sm:text-5xl md:text-[clamp(3.5rem,9vw,6rem)] lg:text-7xl xl:text-8xl text-neutral-300 break-words"
          >
            DEVELOPMENT
          </SplitReveal>
        </motion.div>

        {/* Bottom Metadata & CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: fravEase }}
          className="relative z-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-white/10 text-xs font-sans text-neutral-400"
        >
          <div className="tracking-widest uppercase flex items-center gap-4">
            <span className="text-white font-bold">FRAV AUTOMATION</span>
            <span className="text-neutral-600">/</span>
            <span>WEBSITE DEVELOPER</span>
          </div>

          <div className="flex items-center gap-4">
            <MagneticButton
              onClick={onStartClick}
              className="text-white uppercase tracking-widest px-6 py-2.5 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all cursor-pointer font-bold text-xs"
            >
              <span>CONTACT US</span>
              <span>→</span>
            </MagneticButton>

            <a
              href="tel:+16504395756"
              className="text-white uppercase tracking-wider px-4 py-2.5 rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-all cursor-pointer text-xs font-sans flex items-center gap-1.5"
              aria-label="Call studio"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF4F38]" />
              <span>CALL US</span>
            </a>

          </div>
        </motion.div>
      </section>

      {/* 2. WEB — OPENING STATEMENT */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-16 sm:py-28 bg-[#0A0A0A] border-t border-white/10">
        <div className="max-w-6xl">
          <span className="text-xs font-sans text-[#FF4F38] tracking-[0.25em] uppercase block mb-4 font-bold">
            01 / ETHOS
          </span>
          <SplitReveal
            as="h2"
            className="font-['Syne',sans-serif] font-black uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-white mb-6"
          >
            WE BUILD WEBSITES WITH CLEAN CODE.
          </SplitReveal>
          <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
            We design and build premium websites that make your business look established, credible, and ready to grow. From local businesses starting from zero to brands ready for a stronger digital presence, every site is built around clear strategy, thoughtful design, fast performance, and a seamless experience across every screen, combining thoughtful design with solid technical fundamentals. Built with HTML, CSS, JavaScript, Tailwind CSS, and TypeScript, every site is fast, responsive, scalable, and crafted for real-world production.
          </p>
          <p className="frav-web-ethos-tagline mt-8 max-w-5xl font-['Syne',sans-serif] font-bold tracking-tight leading-[1.05] text-white">
            Designed to stand out. Built to perform. Made for your business.
          </p>
        </div>
      </section>

      {/* 3. WEB — CAPABILITIES (Interactive Typographic Index) */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-16 sm:py-24 bg-[#0A0A0A] border-t border-white/10 relative">
        <div className="flex items-baseline justify-between border-b border-white/10 pb-5 mb-8 sm:mb-12">
          <span className="text-xs font-sans text-[#FF4F38] tracking-widest uppercase font-bold">
            02 / SKILLS STACK
          </span>
          <span className="text-xs font-sans text-neutral-400 tracking-widest uppercase hidden sm:block">
            HTML · CSS · JAVASCRIPT · TAILWIND · TYPESCRIPT
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
                className={`group py-14 sm:py-20 md:py-24 min-h-[145px] sm:min-h-[185px] md:min-h-[220px] flex flex-col justify-center transition-all duration-300 cursor-pointer relative ${
                  hasHover && !isHovered ? 'opacity-35' : 'opacity-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-4 sm:gap-10">
                    <span
                      className={`text-sm sm:text-base font-sans transition-transform duration-300 ${
                        isHovered ? 'text-[#FF4F38] translate-x-2' : 'text-neutral-500'
                      }`}
                    >
                      {item.num} —
                    </span>

                    <h3
                      className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black font-['Syne',sans-serif] uppercase tracking-tight transition-transform duration-300 ${
                        isHovered ? 'text-white translate-x-3' : 'text-neutral-200'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6 text-[11px] sm:text-xs font-sans text-neutral-400 pl-8 sm:pl-0">
                    <span className="tracking-widest uppercase hidden md:inline">
                      {item.sub}
                    </span>
                    <ArrowUpRight
                      className={`w-5 h-5 transition-all duration-300 ${
                        isHovered
                          ? 'text-[#FF4F38] opacity-100 translate-x-1 -translate-y-1'
                          : 'text-neutral-600'
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating preview image following cursor on desktop */}
        {!isMobile && hoveredCapability !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              left: mousePos.x + 28,
              top: mousePos.y - 110,
              pointerEvents: 'none',
              zIndex: 50,
            }}
            className="w-80 h-48 rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-neutral-900"
          >
            <img
              src={capabilities[hoveredCapability].image}
              alt={capabilities[hoveredCapability].title}
              width={1376}
              height={768}
              className="w-full h-full object-cover filter brightness-[0.88] contrast-105"
            />
            <div             className="light-image-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-sans text-white tracking-widest uppercase font-bold">
                {capabilities[hoveredCapability].sub}
              </span>
            </div>
          </motion.div>
        )}
      </section>

      {/* 4. WEB — PROJECT SHOWCASE (Real web projects built with HTML, CSS, Tailwind, TypeScript) */}
      <section id="selected-work" className="px-6 sm:px-12 md:px-16 lg:px-24 py-16 sm:py-24 bg-[#0A0A0A] border-t border-white/10">
        <div className="flex items-baseline justify-between border-b border-white/10 pb-5 mb-12 sm:mb-16">
          <span className="text-xs font-sans text-[#FF4F38] tracking-widest uppercase font-bold">
            03 / SELECTED WEB BUILDS
          </span>
          <span className="text-xs font-sans text-neutral-400 tracking-widest uppercase hidden sm:block">
            RESPONSIVE & PRODUCTION WEBSITES
          </span>
        </div>

        <div className="relative pb-8">
          {projects.map((project, idx) => (
            <WebProjectSceneItem
              key={project.num}
              project={project}
              index={idx}
              total={projects.length}
            />
          ))}
        </div>
      </section>

      {/* 5. WEB — CLIENT REVIEWS (Replaced frontend interaction lab with Reviews section) */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-16 sm:py-24 bg-[#0A0A0A] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header Line */}
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-white/10 pb-5 mb-10 sm:mb-14">
            <div>
              <span className="text-xs font-sans text-[#FF4F38] uppercase tracking-[0.25em] block mb-1 font-bold">
                04 / REVIEWS & ENDORSEMENTS
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white">
                WHAT CLIENTS SAY
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs font-sans text-neutral-400">
              <div className="flex items-center text-[#FF4F38]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-white font-bold">5.0 RATING</span>
              <span>·</span>
              <span className="uppercase text-neutral-500">VERIFIED CLIENTS</span>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-neutral-950/80 rounded-3xl border border-white/15 p-8 sm:p-10 flex flex-col justify-between hover:border-white/30 transition-all duration-300 group"
              >
                <div>
                  {/* Top Quote Icon & Stars */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                    <Quote className="w-6 h-6 text-[#FF4F38] opacity-75" />
                    <div className="flex items-center gap-1 text-[#FF4F38]">
                      {[...Array(review.stars)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-8">
                    "{review.quote}"
                  </p>
                </div>

                {/* Author Info & Tag */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      width={review.id === 'sarah-jenkins' ? 1200 : 1024}
                      height={review.id === 'sarah-jenkins' ? 896 : 1024}
                      className="w-12 h-12 rounded-full object-cover border border-white/20 filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                    />
                    <div>
                      <h3 className="text-sm sm:text-base font-bold font-['Syne',sans-serif] uppercase tracking-tight text-white">
                        {review.name}
                      </h3>
                      <p className="text-xs font-sans text-neutral-500 uppercase tracking-wider">
                        {review.role} · {review.company}
                      </p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-block text-[10px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-400">
                    {review.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WEBSITE DEVELOPMENT — PROCESS (4-Stage Delivery Pipeline) */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-20 sm:py-32 bg-[#0A0A0A] border-t border-white/10">
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b border-white/10 pb-6 mb-12 sm:mb-16">
            <span className="text-xs font-sans text-[#FF4F38] tracking-[0.25em] uppercase font-bold">
              05 / DELIVERY PROCESS
            </span>
            <span className="text-xs font-sans text-neutral-400 tracking-widest uppercase hidden sm:block">
              HTML, CSS, TAILWIND & TYPESCRIPT ROADMAP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 w-full">
            {processSteps.map((step, idx) => {
              const isActive = activeProcessStage === idx;
              return (
                <div
                  key={step.step}
                  onClick={() => setActiveProcessStage(idx)}
                  className={`p-8 sm:p-10 lg:p-8 rounded-3xl border transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] group ${
                    isLightTheme
                      ? 'bg-white border-black/10 hover:border-black/20 hover:bg-white'
                      : isActive
                        ? 'bg-neutral-900 border-white/40 shadow-2xl scale-[1.01]'
                        : 'bg-neutral-950/70 border-white/10 hover:border-white/30 hover:bg-neutral-900/50 hover:-translate-y-1'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-sans mb-8 sm:mb-10">
                      <span className={`text-sm font-bold tracking-widest ${isActive ? 'text-[#FF4F38]' : isLightTheme ? 'text-neutral-600' : 'text-neutral-400 group-hover:text-white transition-colors'}`}>
                        {step.step}
                      </span>
                      <span className={`text-xs font-sans uppercase tracking-widest ${isLightTheme ? 'text-neutral-600' : 'text-neutral-400'}`}>
                        {step.duration}
                      </span>
                    </div>

                    <h3 className={`frav-web-process-title text-3xl sm:text-4xl lg:text-4xl font-black font-['Syne',sans-serif] uppercase tracking-tight mb-3 group-hover:text-[#FF4F38] transition-colors ${isLightTheme ? 'text-neutral-900' : 'text-white'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs sm:text-sm font-sans uppercase tracking-wider mb-8 sm:mb-12 leading-relaxed ${isLightTheme ? 'text-neutral-600' : 'text-neutral-400'}`}>
                      {step.subtitle}
                    </p>
                  </div>

                  <div className={`pt-6 sm:pt-8 border-t space-y-3.5 ${isLightTheme ? 'border-black/10' : 'border-white/10'}`}>
                    <span className={`text-[11px] font-sans uppercase tracking-widest block font-semibold mb-2 ${isLightTheme ? 'text-neutral-600' : 'text-neutral-500'}`}>
                      KEY DELIVERABLES:
                    </span>
                    {step.deliverables.map((item) => (
                      <div key={item} className={`flex items-center gap-3 text-xs sm:text-sm font-sans py-0.5 ${isLightTheme ? 'text-neutral-700' : 'text-neutral-300'}`}>
                        <CheckCircle2 className="w-4 h-4 text-[#FF4F38] shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. WEB — FINAL COMMISSION CTA */}
      <section className="px-6 sm:px-12 md:px-16 lg:px-24 py-20 sm:py-28 bg-[#080808] border-t border-white/10 relative overflow-hidden">
        <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-sans text-[#FF4F38] uppercase tracking-[0.25em] block font-bold">
              06 / ENGAGEMENT ARCHITECTURE
            </span>
            <h2 className="frav-web-cta-title text-3xl sm:text-5xl lg:text-6xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white leading-[1.05] [text-wrap:balance]">
              COMMISSION A DIGITAL FLAGSHIP.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-sans font-light leading-relaxed max-w-xl">
              Web applications built with TypeScript, Tailwind CSS, clean architecture, and instant load speeds. Engineered for conversion and authority.
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
              href="tel:+16504395756"
              className="px-7 py-4.5 rounded-full border border-white/20 hover:border-white hover:bg-white/10 text-white font-['Syne',sans-serif] font-bold text-xs sm:text-sm uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2.5"
              aria-label="Call studio"
            >
              <Phone className="w-4 h-4 text-[#FF4F38]" />
              <span>CALL: +1 (650) 439-5756</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

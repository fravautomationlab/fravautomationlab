import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { FravPageId } from '../../types';

interface ProjectScene {
  index: string;
  discipline: string;
  title: string;
  image: string;
}

interface FravWorkProps {
  onNavigate?: (page: FravPageId) => void;
}

export const FravWork: React.FC<FravWorkProps> = ({ onNavigate }) => {
  const [activeScene, setActiveScene] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects: ProjectScene[] = [
    {
      index: '01',
      discipline: 'WEB',
      title: 'VESPER ARCHITECTURE',
      image: './images/frav_web_canvas_1791239394889.jpg',
    },
    {
      index: '02',
      discipline: 'WEB',
      title: 'ATELIER KROMA',
      image: './images/frav_work_editorial_1791239405268.jpg',
    },
    {
      index: '03',
      discipline: 'AUTOMATION',
      title: 'NEXUS AUTONOMOUS DISPATCH',
      image: './images/frav_automation_flow_1791239414845.jpg',
    },
  ];

  return (
    <section
      id="work"
      ref={containerRef}
      aria-label="Section 02 WORK"
      className="relative w-full bg-[#0A0A0A] text-white py-24 sm:py-36 px-6 sm:px-12 md:px-16 lg:px-24"
    >
      {/* Section Header */}
      <div className="flex items-baseline justify-between w-full border-b border-white/10 pb-6 mb-16 sm:mb-24">
        <div className="flex items-baseline gap-4">
          <span className="text-xs font-sans text-neutral-400">02 /</span>
          <h2 className="text-5xl sm:text-7xl lg:text-9xl font-black font-['Syne',sans-serif] tracking-tighter leading-none">
            WORK
          </h2>
        </div>
        <span className="text-xs font-sans text-neutral-400 tracking-widest uppercase hidden sm:block">
          SCENES / NOT CARDS
        </span>
      </div>

      {/* Sequential Full-Bleed Scenes */}
      <div className="space-y-32 sm:space-y-48">
        {projects.map((project, idx) => (
          <WorkSceneItem
            key={project.index}
            project={project}
            index={idx}
            onClick={() => {
              if (onNavigate) {
                onNavigate(project.discipline === 'WEB' ? 'web-development' : 'automation');
              }
            }}
          />
        ))}
      </div>
    </section>
  );
};

interface WorkSceneItemProps {
  project: ProjectScene;
  index: number;
  onClick?: () => void;
}

const WorkSceneItem: React.FC<WorkSceneItemProps> = ({ project, index, onClick }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  return (
    <div
      ref={sceneRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouseOffset({ x: 0, y: 0 })}
      className="relative w-full group cursor-pointer"
    >
      {/* Top Scene Label: e.g. 01 / WEB */}
      <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-white/10 text-xs font-sans tracking-widest text-neutral-400">
        <span className="text-white font-bold">
          {project.index} / {project.discipline === 'WEB' ? 'WEBSITE DEVELOPMENT' : project.discipline}
        </span>
        <span className="group-hover:text-white transition-colors flex items-center gap-1">
          VIEW SCENE <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </div>

      {/* Visual Canvas Container with mask reveal & cursor tilt */}
      <div className="relative w-full h-[65vh] sm:h-[80vh] lg:h-[90vh] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
        <motion.div
          style={{
            scale: imageScale,
            y: imageY,
            transform: `translate(${mouseOffset.x * 15}px, ${mouseOffset.y * 15}px)`,
          }}
          className="w-full h-full relative overflow-hidden transition-transform duration-500 ease-out origin-center"
        >
          <img
            src={project.image}
            alt={project.title}
            width={1376}
            height={768}
            className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-105 group-hover:brightness-90 transition-all duration-700"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient vignette */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"
            aria-hidden="true"
          />
        </motion.div>

        {/* Minimal Project Title Overlay */}
        <div className="light-image-overlay absolute bottom-8 left-8 sm:bottom-12 sm:left-12 z-20 pointer-events-none">
          <h3 className="text-3xl sm:text-5xl lg:text-7xl font-black font-['Syne',sans-serif] tracking-tight uppercase text-white">
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

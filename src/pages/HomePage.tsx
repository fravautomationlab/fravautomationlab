import React from 'react';
import { FravHero } from '../components/frav/FravHero';
import { FravAbout } from '../components/frav/FravAbout';
import { FravWeb } from '../components/frav/FravWeb';
import { FravWork } from '../components/frav/FravWork';
import { FravAutomation } from '../components/frav/FravAutomation';
import { FravProcess } from '../components/frav/FravProcess';
import { FravCta } from '../components/frav/FravCta';
import { FravPageId } from '../types';

interface HomePageProps {
  onNavigate: (page: FravPageId) => void;
  onStartClick: () => void;
  onContactClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onStartClick,
  onContactClick,
}) => {
  return (
    <main className="flex-1 flex flex-col bg-[#0A0A0A] text-white">
      {/* HERO: FRAV AUTOMATION · WEBSITE DEVELOPMENT + AUTOMATION · START */}
      <FravHero onStartClick={onStartClick} />

      {/* ABOUT THE STUDIO */}
      <FravAbout onExplore={() => onNavigate('about-us')} />

      {/* SECTION 01: WEB (Image scale -> crop -> expand -> transition · DESIGN / BUILD / HOST / CARE) */}
      <FravWeb onExplore={() => onNavigate('web-development')} />

      {/* SECTION 02: WORK (Scenes, not cards · 01 / WEB, 02 / WEB, 03 / AUTOMATION) */}
      <FravWork onNavigate={onNavigate} />

      {/* SECTION 03: AUTOMATION (INPUT → PROCESS → RESULT · Abstract kinetic vector flow) */}
      <FravAutomation onExplore={() => onNavigate('automation')} />

      {/* SECTION 04: PROCESS (01 DISCOVER, 02 DESIGN, 03 BUILD, 04 LAUNCH, 05 AUTOMATE) */}
      <FravProcess />

      {/* SECTION 05: CTA (START · CONTACT · Oversized visual) */}
      <FravCta onContactClick={onContactClick} />
    </main>
  );
};

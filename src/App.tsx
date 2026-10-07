/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring } from 'motion/react';
import { FravNav } from './components/frav/FravNav';
import { FravFooter } from './components/frav/FravFooter';
import { FravContactModal } from './components/frav/FravContactModal';
import { FravEntranceLoader } from './components/frav/FravEntranceLoader';
import { HomePage } from './pages/HomePage';
import { WebDevPage } from './pages/WebDevPage';
import { AIAutomationPage } from './pages/AIAutomationPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { FravPageId } from './types';

type CanonicalPageId = 'home' | 'web-development' | 'automation' | 'about-us';

const pageSeo: Record<CanonicalPageId, { path: string; title: string; description: string }> = {
  home: {
    path: '/',
    title: 'FRAV Automation | Web Design & AI Automation for U.S. Businesses',
    description:
      'FRAV Automation builds premium websites and practical AI automation for businesses across the United States. Remote-first web design, development, AI agents, and workflow systems.',
  },
  'web-development': {
    path: '/web',
    title: 'Web Design & Development for U.S. Businesses | FRAV Automation',
    description:
      'Custom website design and development for U.S. businesses. FRAV Automation creates premium, responsive websites and digital experiences, from strategy through launch.',
  },
  automation: {
    path: '/automation',
    title: 'AI Automation for U.S. Businesses | FRAV Automation',
    description:
      'FRAV Automation builds AI agents, workflow automation, and business integrations for U.S. teams—custom systems designed around real processes.',
  },
  'about-us': {
    path: '/about',
    title: 'About FRAV Automation | U.S. Web + AI Partner',
    description:
      'FRAV Automation is a remote-first technology studio partnering with U.S. businesses on premium websites and practical AI automation, from digital experiences to workflow systems.',
  },
};

const getPageFromLocation = (): CanonicalPageId => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const pathPage: Record<string, CanonicalPageId> = {
    '/': 'home',
    '/web': 'web-development',
    '/web-development': 'web-development',
    '/web-dev': 'web-development',
    '/automation': 'automation',
    '/ai-automation': 'automation',
    '/about': 'about-us',
    '/about-us': 'about-us',
    '/contact': 'about-us',
  };

  if (path !== '/') return pathPage[path] ?? 'home';
  return normalizePage(window.location.hash.replace(/^#\/?/, ''));
};

const normalizePage = (page: string): CanonicalPageId => {
  if (page === 'web' || page === 'web-development' || page === 'web-dev') return 'web-development';
  if (page === 'automation' || page === 'ai-automation') return 'automation';
  if (page === 'about' || page === 'about-us' || page === 'contact') return 'about-us';
  return 'home';
};

const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<CanonicalPageId>(getPageFromLocation);

  const [contactOpen, setContactOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Pause smooth scroll during entrance sequence
  useEffect(() => {
    if (!hasEntered) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [hasEntered]);

  // Lenis smooth momentum scrolling with studio-directed cubic easing
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Keep direct paths and legacy hash URLs in sync with browser navigation.
  useEffect(() => {
    const syncPage = () => setCurrentPage(getPageFromLocation());

    window.addEventListener('popstate', syncPage);
    window.addEventListener('hashchange', syncPage);
    return () => {
      window.removeEventListener('popstate', syncPage);
      window.removeEventListener('hashchange', syncPage);
    };
  }, []);

  useEffect(() => {
    const seo = pageSeo[currentPage];
    const configuredSiteUrl = __FRAV_SITE_URL__ || window.location.origin;
    const siteUrl = configuredSiteUrl.replace(/\/+$/, '');
    const canonicalUrl = `${siteUrl}${seo.path}`;
    const socialImage = `${siteUrl}/images/ai_automation_hero_1791238819833.jpg`;

    document.title = seo.title;
    setMeta('name', 'description', seo.description);
    setMeta('name', 'robots', 'index, follow');
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', socialImage);
    setMeta('property', 'og:site_name', 'FRAV Automation');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:image', socialImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let structuredData = document.head.querySelector<HTMLScriptElement>('#frav-organization-schema');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'frav-organization-schema';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'FRAV Automation',
      url: siteUrl,
      logo: `${siteUrl}/frav-mark.svg`,
      description: pageSeo.home.description,
      email: 'studio@fravlab.com',
      areaServed: {
        '@type': 'Country',
        name: 'United States',
      },
    });
  }, [currentPage]);

  const navigateToPage = (page: FravPageId, targetElementId?: string) => {
    const canonicalPage = normalizePage(page);
    setCurrentPage(canonicalPage);
    window.history.pushState({}, '', pageSeo[canonicalPage].path);

    if (lenisRef.current) {
      if (targetElementId) {
        setTimeout(() => {
          const el = document.getElementById(targetElementId);
          if (el && lenisRef.current) {
            lenisRef.current.scrollTo(el, { duration: 1.2 });
          }
        }, 100);
      } else {
        lenisRef.current.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
      }
    } else {
      if (targetElementId) {
        setTimeout(() => {
          const el = document.getElementById(targetElementId);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  };

  return (
    <>
      {/* Cinematic Studio Entrance Loader on Initial Page Load */}
      {!hasEntered && (
        <FravEntranceLoader onComplete={() => setHasEntered(true)} />
      )}

      <div className="min-h-screen bg-[#0A0A0A] text-white font-sans flex flex-col selection:bg-white selection:text-black relative antialiased">
        {/* Top subtle scroll progress line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1.5px] bg-white origin-left z-50 pointer-events-none opacity-80"
        style={{ scaleX }}
      />

      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-white text-black text-xs font-sans uppercase font-bold rounded-sm shadow-xl"
      >
        Skip to content
      </a>

      {/* Navigation: FRAV AUTOMATION · WEBSITE DEVELOPMENT / AUTOMATION / ABOUT US · START */}
      <FravNav
        currentPage={currentPage}
        onNavigate={(page) => navigateToPage(page)}
        onStartClick={() => setContactOpen(true)}
      />

      {/* Active Page View */}
      <main id="main-content" className="flex-1 flex flex-col">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={(page) => navigateToPage(page)}
            onStartClick={() => setContactOpen(true)}
            onContactClick={() => navigateToPage('about-us', 'contact')}
          />
        )}

        {currentPage === 'web-development' && (
          <WebDevPage
            onNavigate={(page) => navigateToPage(page)}
            onStartClick={() => setContactOpen(true)}
          />
        )}

        {currentPage === 'automation' && (
          <AIAutomationPage
            onNavigate={(page) => navigateToPage(page)}
            onStartClick={() => setContactOpen(true)}
          />
        )}

        {currentPage === 'about-us' && (
          <AboutUsPage
            onNavigate={(page) => navigateToPage(page)}
            onStartClick={() => setContactOpen(true)}
          />
        )}
      </main>

      {/* Footer: FRAV AUTOMATION · WEBSITE DEVELOPMENT, AUTOMATION, ABOUT US, CONTACT · PRIVACY / TERMS */}
      <FravFooter
        onNavigate={(page) => navigateToPage(page)}
        onContactClick={() => navigateToPage('about-us', 'contact')}
      />

      {/* Interactive Quick Brief Modal */}
      <FravContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  </>
);
}

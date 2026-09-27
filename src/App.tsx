import { useState, useEffect, lazy, Suspense } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useAntiDevTools } from './hooks/useAntiDevTools';
import { useDocumentMetadata } from './hooks/useDocumentMetadata';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AchievementRibbon } from './components/AchievementRibbon';
import { SelectedProjects } from './components/SelectedProjects';
import { InteractiveSkills } from './components/InteractiveSkills';
import { AboutSection } from './components/AboutSection';
import { TrustpilotBanner } from './components/TrustpilotBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const AllProjectsPage = lazy(() =>
  import('./components/AllProjectsPage').then((m) => ({ default: m.AllProjectsPage }))
);

export function App() {
  useScrollReveal();
  useSmoothScroll();
  useAntiDevTools();

  useDocumentMetadata({
    title: 'Suman — Frontend Web Developer | React, Next.js & UI Design',
    description: 'Suman is an award-winning Frontend Web Developer specializing in React 19, Next.js, TypeScript, Tailwind CSS, and modern responsive UI design. Proven 99 Lighthouse performance.',
    canonical: 'https://sumanverse.com/',
    keywords: 'Suman, Suman Verse, Frontend Developer, React Developer, Next.js, TypeScript, Tailwind CSS, UI UX Designer, Portfolio, Web Developer India, Hire Frontend Developer',
  });

  const [isAllProjects, setIsAllProjects] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#/projects' || window.location.hash.startsWith('#/projects');
    }
    return false;
  });

  useEffect(() => {
    const handleHash = () => {
      const match = window.location.hash === '#/projects' || window.location.hash.startsWith('#/projects');
      setIsAllProjects(match);
      if (match) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  if (isAllProjects) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black" />}>
        <AllProjectsPage
          onBack={() => {
            window.location.hash = '#projects';
          }}
        />
      </Suspense>
    );
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-[#0F172A] dark:text-[#F8FAFC] overflow-x-hidden transition-colors duration-300">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#002FA7] focus:text-white focus:rounded-xl focus:shadow-xl focus:outline-none font-mono text-xs"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <AchievementRibbon />
        <SelectedProjects />
        <InteractiveSkills />
        <AboutSection />
        <TrustpilotBanner />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useAntiDevTools } from './hooks/useAntiDevTools';
import { useDocumentMetadata } from './hooks/useDocumentMetadata';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AchievementRibbon } from './components/AchievementRibbon';
import { SelectedProjects } from './components/SelectedProjects';
import { InteractiveSkills } from './components/InteractiveSkills';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AllProjectsPage } from './components/AllProjectsPage';

export function App() {
  useScrollReveal();
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
      <AllProjectsPage
        onBack={() => {
          window.location.hash = '#projects';
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-[#0F172A] dark:text-[#F8FAFC] overflow-x-hidden transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <AchievementRibbon />
        <SelectedProjects />
        <InteractiveSkills />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;

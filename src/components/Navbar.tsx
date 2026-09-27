import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const total = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(total > 0 ? (scrolled / total) * 100 : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
};

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as 'light' | 'dark';
      if (saved) return saved;
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    const sections = ['hero', 'projects', 'skills', 'about'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Work', id: 'projects' },
    { label: 'Stack', id: 'skills' },
    { label: 'About', id: 'about' },
  ];

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <ScrollProgress />

      <header className="hidden md:block fixed top-4 left-0 right-0 z-50 pointer-events-none px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex w-44" />

          <nav className="pointer-events-auto flex items-center gap-1 p-1 rounded-full bg-white/80 dark:bg-[#1E293B]/80 backdrop-blur-md border border-[#0F2C59]/15 dark:border-white/10 shadow-lg shadow-[#0F2C59]/5 transition-all duration-300">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                    active
                      ? 'bg-[#0F2C59] dark:bg-[#2563EB] text-white shadow-sm font-bold'
                      : 'text-[#0F172A]/70 dark:text-[#F8FAFC]/70 hover:text-[#0F2C59] dark:hover:text-white hover:bg-[#0F2C59]/5 dark:hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="pointer-events-auto flex items-center gap-3">
            <ThemeToggle
              isDark={theme === 'dark'}
              onToggle={toggleTheme}
              className="drop-shadow-sm hover:scale-105 transition-transform"
            />

            <a
              href="#contact"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0F2C59] dark:bg-[#2563EB] text-white text-xs font-bold shadow-lg shadow-[#0F2C59]/15 hover:bg-[#2563EB] dark:hover:bg-[#3B82F6] hover:scale-105 transition-all duration-300"
            >
              <span>Get in Touch</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </a>
          </div>
        </div>
      </header>

      <header className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-[#0F2C59]/08 dark:border-white/08">
        <a href="#" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Suman Verse Logo"
            width="28"
            height="28"
            className="w-7 h-7 object-contain drop-shadow-sm"
          />
          <span className="text-sm font-bold font-serif text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
            Suman Verse
          </span>
        </a>

        <div className="flex items-center gap-3">
          <ThemeToggle
            isDark={theme === 'dark'}
            onToggle={toggleTheme}
            className="drop-shadow-sm scale-90"
          />

          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0F2C59] dark:bg-[#2563EB] text-white transition-all duration-300 active:scale-95"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-[57px] left-0 right-0 bg-white dark:bg-black border-b border-[#0F2C59]/08 dark:border-white/08 shadow-2xl transition-all duration-300 ${
            mobileOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-2xl text-sm font-semibold tracking-wide transition-all duration-200 ${
                    active
                      ? 'bg-[#0F2C59] dark:bg-[#2563EB] text-white'
                      : 'text-[#0F172A]/80 dark:text-[#F8FAFC]/80 hover:bg-[#0F2C59]/05 dark:hover:bg-white/05'
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {item.label}
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </span>
                </button>
              );
            })}

            <div className="pt-3 border-t border-[#0F2C59]/08 dark:border-white/08 mt-2">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-[#0F2C59] dark:bg-[#2563EB] text-white text-sm font-bold shadow-lg transition-all duration-300 active:scale-95"
              >
                <span>Get in Touch</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

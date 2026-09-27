import { Fragment, useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const MARQUEE_ITEMS = [
  'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js',
  'Tailwind CSS', 'Framer Motion', 'GSAP', 'Vite', 'Responsive UI',
  'Web Performance', 'WCAG AA', 'Lighthouse 99',
];

export const Footer = () => {
  const [time, setTime] = useState('');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const tick = () => setTime(
      new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
    );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="relative border-t border-[#0F2C59]/08 dark:border-white/10 overflow-hidden">
      <div className="py-4 border-b border-[#0F2C59]/06 dark:border-white/10 bg-white dark:bg-black overflow-hidden">
        <div className="flex">
          <div className="marquee-track flex items-center gap-0 shrink-0">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <Fragment key={i}>
                <span className="text-[11px] font-mono font-medium uppercase tracking-widest text-[#0F2C59]/40 dark:text-white/40 whitespace-nowrap px-6">{item}</span>
                <span className="text-[#0F2C59]/15 dark:text-white/15 select-none">·</span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Suman Verse Logo"
            width="36"
            height="36"
            className="w-9 h-9 object-contain drop-shadow-sm"
          />
          <div>
            <p className="text-sm font-semibold font-serif text-[#0F172A] dark:text-[#F8FAFC]">Suman Verse — Frontend Developer</p>
            <p className="text-[10px] font-mono text-[#475569] dark:text-[#94A3B8]">© {new Date().getFullYear()} · All rights reserved</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1E293B] border border-[#0F2C59]/15 dark:border-white/15 text-[11px] font-mono text-[#334155] dark:text-[#E2E8F0] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          Available for Hire · {time || '12:00:00 AM'}
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`flex items-center gap-2 text-xs font-semibold text-[#334155] dark:text-[#E2E8F0] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-all duration-300 group ${showTop ? 'opacity-100' : 'opacity-40'}`}
        >
          Back to top
          <div className="w-8 h-8 rounded-xl bg-white dark:bg-[#1E293B] border border-[#0F2C59]/15 dark:border-white/15 group-hover:bg-[#2563EB] group-hover:border-[#2563EB] group-hover:text-white flex items-center justify-center transition-all duration-300">
            <ArrowUp className="w-4 h-4" />
          </div>
        </button>
      </div>
    </footer>
  );
};

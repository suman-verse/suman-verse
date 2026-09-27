import { useState } from 'react';
import { Cpu, Terminal, Zap, Flame, ChevronRight } from 'lucide-react';

const categories = [
  {
    id: 'frontend',
    name: 'Frontend Core Languages',
    icon: Terminal,
    color: '#2563EB',
    skills: [
      { name: 'HTML5 & Semantic Markup', level: 'Advanced', note: 'SEO structure · semantic accessibility · clean DOM hierarchy' },
      { name: 'CSS3 & Modern Styling', level: 'Expert', note: 'Flexbox · CSS Grid · Custom Properties · Responsive Media Queries' },
      { name: 'JavaScript (ES6+)', level: 'Expert', note: 'Async/Await · DOM manipulation · Event loop · Modern Web APIs' },
      { name: 'TypeScript', level: 'Proficient', note: 'Type safety · strict props interfaces · reusable generics' },
      { name: 'React & Next.js', level: 'Pro', note: 'Hooks · State Management · Reusable Components · SPA routing' },
    ],
  },
  {
    id: 'motion',
    name: 'UI Frameworks & Styling',
    icon: Zap,
    color: '#7C3AED',
    skills: [
      { name: 'Tailwind CSS', level: 'Expert', note: 'Utility-first design · dark mode · custom theme configuration' },
      { name: 'Framer Motion & GSAP', level: 'Proficient', note: 'Interactive transitions · scroll-triggered micro-animations' },
      { name: 'Component UI Libraries', level: 'Proficient', note: 'shadcn/ui · Radix UI · Lucide Icons · Headless UI' },
      { name: 'Responsive Web Design', level: 'Expert', note: 'Mobile-first layouts · fluid typography · cross-device testing' },
      { name: 'Canvas & SVG Graphics', level: 'Intermediate', note: 'Interactive HTML5 Canvas · vector animation · custom SVG icons' },
    ],
  },
  {
    id: 'perf',
    name: 'Frontend Tooling & Quality',
    icon: Cpu,
    color: '#059669',
    skills: [
      { name: 'Vite & Modern Bundlers', level: 'Pro', note: 'Fast HMR · bundle optimization · modern asset loading' },
      { name: 'Core Web Vitals & Perf', level: 'Score: 99', note: 'Fast LCP · zero layout shift · optimized image & font assets' },
      { name: 'Accessibility (WCAG)', level: 'Proficient', note: 'Keyboard navigation · ARIA labels · contrast compliance' },
      { name: 'Git & Version Control', level: 'Proficient', note: 'Git workflow · branching strategies · GitHub pull requests' },
      { name: 'Frontend Testing', level: 'Intermediate', note: 'Vitest · React Testing Library · component unit testing' },
    ],
  },
];

export const InteractiveSkills = () => {
  const [activeId, setActiveId] = useState('frontend');
  const [hovered, setHovered] = useState<string | null>(null);

  const current = categories.find((c) => c.id === activeId) || categories[0];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#EFF6FF]/30 dark:via-[#1E293B]/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        <div className="mb-16">
          <p className="section-label">Technology Ecosystem</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-monument text-[clamp(1.8rem,4vw,3.2rem)] text-[#0F172A] dark:text-[#F8FAFC] tracking-tight uppercase">
              MASTERY, NOT <span className="grad-blue">PROGRESS BARS</span>
            </h2>
            <p className="text-sm text-[#0F172A]/60 dark:text-[#F8FAFC]/60 font-light max-w-sm leading-relaxed md:text-right">
              A verified matrix of capabilities, years of production use, and specific expertise — no vague percentages.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const active = activeId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveId(cat.id)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer group ${active
                    ? 'bg-[#0F2C59] dark:bg-[#2563EB] border-[#0F2C59] dark:border-[#2563EB] shadow-xl text-white translate-x-1'
                    : 'bg-white/80 dark:bg-[#1E293B]/80 border-[#0F2C59]/10 dark:border-white/10 text-[#0F172A] dark:text-white hover:bg-white dark:hover:bg-[#1E293B] hover:border-[#2563EB]/40 hover:translate-x-0.5 shadow-xs'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${active ? 'bg-[#2563EB] dark:bg-[#0F172A] text-white' : 'bg-[#0F2C59]/08 dark:bg-white/10 text-[#2563EB] dark:text-[#60A5FA]'
                      }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-tight">{cat.name}</p>
                      <p className={`text-[10px] font-mono mt-0.5 ${active ? 'text-white/60' : 'text-[#0F172A]/45 dark:text-white/45'}`}>
                        {cat.skills.length} capabilities
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform duration-300 ${active ? 'rotate-0 text-white' : '-rotate-90 opacity-40 group-hover:opacity-100'
                      }`} />
                  </div>
                </button>
              );
            })}

            <div className="p-5 rounded-2xl bg-[#EFF6FF] dark:bg-[#1E293B] border border-[#2563EB]/15 dark:border-white/10 text-xs text-[#0F2C59]/80 dark:text-[#F8FAFC]/80 shadow-xs mt-4">
              <Flame className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA] mb-2" />
              <p className="font-semibold text-[#0F2C59] dark:text-white mb-1">Continuous Mastery</p>
              <p className="font-light leading-relaxed text-[#0F2C59]/70 dark:text-[#F8FAFC]/70">
                Daily engagement with cutting-edge RFC proposals, beta features, and production benchmarking.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 min-h-[380px]">
            {current.skills.map((skill) => (
              <div
                key={`${current.id}-${skill.name}`}
                className="bg-white/90 dark:bg-[#1E293B]/90 border border-[#0F2C59]/10 dark:border-white/10 rounded-2xl p-6 flex flex-col justify-between gap-4 group transition-all duration-300 hover:border-[#2563EB]/30 hover:shadow-lg hover:-translate-y-1 shadow-xs"
                onMouseEnter={() => setHovered(skill.name)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#2563EB]/08 dark:bg-[#2563EB]/20 border border-[#2563EB]/20 text-[#2563EB] dark:text-[#60A5FA] font-mono text-[10px] font-semibold uppercase tracking-wider mb-2.5">
                      {skill.level}
                    </span>
                    <h3 className="font-monument text-base text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors leading-tight">
                      {skill.name}
                    </h3>
                  </div>
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 transition-colors duration-300 ${hovered === skill.name ? 'bg-[#2563EB]' : 'bg-[#0F2C59]/20 dark:bg-white/20'
                    }`} />
                </div>

                <p className="text-xs font-mono text-[#0F172A]/65 dark:text-[#F8FAFC]/65 leading-relaxed">
                  {skill.note}
                </p>

                <div className="h-px w-full bg-gradient-to-r from-[#2563EB]/30 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

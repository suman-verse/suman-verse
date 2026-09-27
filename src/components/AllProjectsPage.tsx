import { useState, useRef, useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Search, X, Sparkles, ChevronDown, CheckCircle, Code, ShieldCheck, ExternalLink, ArrowUp } from 'lucide-react';
import { projects, FILTERS, type ProjectData } from '@/data/projects';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ImageSkeleton } from '@/components/ui/Skeleton';
import { useDocumentMetadata } from '@/hooks/useDocumentMetadata';

function InlineCaseStudy({ project, onClose }: { project: ProjectData; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'impact'>('overview');
  const [selectedImg, setSelectedImg] = useState(project.image);
  const [imgLoaded, setImgLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedImg(project.image);
    setImgLoaded(false);
    setActiveTab('overview');
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [project]);

  const photos = project.galleryImages || [project.image];
  const hasDemo = Boolean(project.demoUrl && project.demoUrl !== '#');
  const hasGithub = Boolean(project.githubUrl && project.githubUrl !== '#');

  return (
    <div
      ref={ref}
      className="col-span-1 md:col-span-2 rounded-3xl bg-white dark:bg-[#1E293B] border border-[#2563EB]/20 dark:border-[#2563EB]/30 shadow-2xl overflow-hidden"
    >
      <div className="flex items-center justify-between p-5 md:px-8 bg-[#F8FAFC] dark:bg-black border-b border-[#0F2C59]/10 dark:border-white/10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 rounded-full bg-[#0F2C59]/10 dark:bg-white/10 text-[#0F2C59] dark:text-[#60A5FA] font-mono text-xs font-semibold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs font-mono text-[#0F172A]/50 dark:text-[#F8FAFC]/50">{project.year} · {project.client}</span>
          </div>
          <h3 className="font-monument text-lg md:text-2xl text-[#0F172A] dark:text-[#F8FAFC] leading-tight">
            {project.title}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white dark:bg-[#1E293B] border border-[#0F2C59]/15 dark:border-white/15 text-[#0F172A] dark:text-white hover:bg-[#0F2C59] hover:text-white transition-colors shrink-0 ml-4 cursor-pointer"
          aria-label="Close case study"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-5 md:p-8 space-y-6">
        <div className="relative w-full h-56 md:h-80 rounded-2xl overflow-hidden bg-[#0F172A] border border-[#0F2C59]/10 dark:border-white/10 flex items-center justify-center">
          {!imgLoaded && <ImageSkeleton />}
          <img
            src={selectedImg}
            alt={project.title}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-contain transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent flex items-end p-5 pointer-events-none">
            <p className="text-white text-xs md:text-sm font-light italic">"{project.subtitle}"</p>
          </div>
        </div>

        {photos.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {photos.map((img, idx) => (
              <button
                key={idx}
                onClick={() => { setSelectedImg(img); setImgLoaded(false); }}
                className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 cursor-pointer bg-slate-900 ${
                  selectedImg === img
                    ? 'border-[#2563EB] ring-2 ring-[#2563EB]/30 scale-105'
                    : 'border-[#0F2C59]/10 dark:border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover object-top" />
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-6 border-b border-[#0F2C59]/10 dark:border-white/10">
          {(['overview', 'architecture', 'impact'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize text-sm font-medium border-b-2 transition-all cursor-pointer ${
                activeTab === tab
                  ? 'border-[#2563EB] text-[#2563EB] dark:text-[#60A5FA] font-semibold'
                  : 'border-transparent text-[#0F172A]/60 dark:text-[#F8FAFC]/60 hover:text-[#0F172A] dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-5">
            <p className="text-[#0F172A]/80 dark:text-[#F8FAFC]/80 leading-relaxed text-sm md:text-base">
              {project.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full bg-[#0F2C59]/05 dark:bg-white/10 border border-[#0F2C59]/10 dark:border-white/10 text-[#0F172A] dark:text-white font-mono text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.architecture.map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-black border border-[#0F2C59]/10 dark:border-white/10 flex items-start gap-3">
                <Code className="w-5 h-5 text-[#2563EB] dark:text-[#60A5FA] shrink-0 mt-0.5" />
                <span className="text-xs font-mono text-[#0F172A]/80 dark:text-[#F8FAFC]/80 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-[#0F2C59] dark:bg-[#2563EB] text-white space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#60A5FA] dark:text-white" />
                <span className="font-semibold">Key Result</span>
              </div>
              <p className="text-sm font-light leading-relaxed opacity-90">{project.outcome}</p>
            </div>
            <ul className="space-y-2">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#0F172A]/80 dark:text-[#F8FAFC]/80">
                  <ShieldCheck className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA] shrink-0 mt-0.5" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#0F2C59]/08 dark:border-white/10">
          <div className="flex gap-3">
            {hasDemo && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB] text-white font-semibold text-xs tracking-wider hover:bg-[#0F2C59] transition-colors shadow-md">
                {project.demoUrl?.includes('releases') ? 'Download v1' : 'Live Demo'} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {hasGithub && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0F2C59]/15 dark:border-white/15 text-[#0F172A] dark:text-white font-semibold text-xs hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors">
                Source Code
              </a>
            )}
          </div>
          <button onClick={onClose}
            className="text-xs text-[#0F172A]/50 dark:text-[#F8FAFC]/50 hover:text-[#0F172A] dark:hover:text-white font-mono underline transition-colors cursor-pointer">
            Close ↑
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, isActive, onOpen }: { project: ProjectData; isActive: boolean; onOpen: () => void }) {
  const isMobile = project.tags.includes('Android') || project.tags.includes('Kotlin') || project.id === 'sv_music' || project.category === 'Mobile';
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className={`card group rounded-3xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 h-full ${isActive ? 'ring-2 ring-[#2563EB] ring-offset-2 dark:ring-offset-black' : ''}`}
      onClick={onOpen}
    >
      <div className="relative w-full h-60 sm:h-72 shrink-0 overflow-hidden bg-[#0F172A]">
        {!imgLoaded && <ImageSkeleton />}
        {isMobile ? (
          <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-4 bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#020617] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-35 scale-125 pointer-events-none"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="relative h-full aspect-[9/19.5] rounded-2xl sm:rounded-2.5xl border-2 border-white/20 shadow-2xl overflow-hidden bg-black ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-105">
              <img
                src={project.image}
                alt={project.title}
                onLoad={() => setImgLoaded(true)}
                className={`w-full h-full object-cover object-top transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-medium text-white/90 border border-white/10 shadow-sm">
              Mobile App
            </span>
          </div>
        ) : (
          <div className="relative w-full h-full bg-[#0F2C59]/05 dark:bg-[#1E293B] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        )}

        <span className="absolute top-3.5 left-3.5 badge bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md border-[#0F2C59]/12 text-[#0F2C59] dark:text-[#60A5FA] shadow-xs">
          {project.category}
        </span>
        {isActive && (
          <div className="absolute inset-0 bg-[#2563EB]/15 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-[#2563EB] text-white text-xs font-mono font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <ChevronDown className="w-3.5 h-3.5" /> Expanded below
            </div>
          </div>
        )}
      </div>

      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-sm">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#0F2C59]/50 dark:text-[#F8FAFC]/50 mb-1">{project.year} · {project.client}</p>
              <h3 className="font-monument text-base sm:text-lg text-[#0F172A] dark:text-[#F8FAFC] leading-snug line-clamp-2">
                {project.title}
              </h3>
            </div>
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${isActive ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-sm' : 'border-[#0F2C59]/10 dark:border-white/10 text-[#0F172A]/40 dark:text-[#F8FAFC]/40'}`}>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#0F172A]/70 dark:text-[#F8FAFC]/70 font-light leading-relaxed line-clamp-2">
            {project.subtitle}
          </p>
        </div>

        <div className="space-y-4 pt-2 mt-auto">
          <div className="flex flex-wrap gap-1.5 min-h-[28px]">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-[10px] font-mono border border-[#0F2C59]/10 dark:border-white/10 rounded-lg text-[#0F172A]/65 dark:text-[#F8FAFC]/75 bg-[#0F2C59]/03 dark:bg-white/05">
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-3.5 border-t border-[#0F2C59]/08 dark:border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-[#2563EB] dark:text-[#60A5FA]">
              {isActive ? 'Close Case Study ↑' : 'Full Case Study →'}
            </span>
            {project.demoUrl && project.demoUrl !== '#' && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 dark:bg-[#2563EB]/20 text-[#2563EB] dark:text-[#60A5FA] text-[11px] font-mono font-semibold hover:bg-[#2563EB] hover:text-white transition-colors"
              >
                <span>{project.demoUrl.includes('releases') ? 'Download v1' : 'Visit Live'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AllProjectsPage({ onBack }: { onBack?: () => void }) {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const toggleTheme = () => {
    const root = document.documentElement;
    const body = document.body;
    if (isDark) {
      root.classList.remove('dark');
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter = filter === 'All' ? true : project.category === filter;
      if (!matchesFilter) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchSubtitle = project.subtitle.toLowerCase().includes(q);
      const matchClient = project.client.toLowerCase().includes(q);
      const matchTags = project.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchSummary = project.summary.toLowerCase().includes(q);

      return matchTitle || matchSubtitle || matchClient || matchTags || matchSummary;
    });
  }, [filter, searchQuery]);

  const openProject = projects.find((p) => p.id === openId) || null;

  useDocumentMetadata({
    title: openProject
      ? `${openProject.title} — Case Study | Suman Portfolio`
      : filter !== 'All'
      ? `${filter} Projects | Suman — Frontend Web Developer`
      : 'All Projects Archive | Suman — Frontend Web Developer',
    description: openProject
      ? `${openProject.title}: ${openProject.summary.slice(0, 150)}...`
      : 'Complete archive of production web applications, UI engineering case studies, and open-source tools built by Suman.',
    canonical: 'https://sumanverse.com/#/projects',
  });

  const handleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleClose = () => setOpenId(null);

  const rows: ProjectData[][] = [];
  for (let i = 0; i < filteredProjects.length; i += 2) {
    rows.push(filteredProjects.slice(i, i + 2));
  }

  const handleBackToHome = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.hash = '#projects';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-300">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-[#0F2C59]/08 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-18 flex items-center justify-between">
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#0F2C59]/12 dark:border-white/15 text-xs font-mono font-semibold text-[#0F172A] dark:text-white hover:bg-[#0F2C59] hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Portfolio</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#0F172A]/60 dark:text-[#F8FAFC]/60">
              Project Archive ({projects.length})
            </span>
          </div>

          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-3xl mb-12">
          <p className="section-label mb-2">COMPLETE DIRECTORY</p>
          <h1 className="font-monument text-[clamp(2rem,5vw,3.8rem)] text-[#0F172A] dark:text-[#F8FAFC] leading-[1.05] tracking-tight uppercase mb-4">
            ALL <span className="grad-blue">PROJECTS</span>
          </h1>
          <p className="text-sm md:text-base text-[#0F172A]/70 dark:text-[#F8FAFC]/70 font-light leading-relaxed">
            A comprehensive archive of production web applications, client solutions, high-conversion webstore templates, and interactive UI engineering case studies.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#0F172A]/40 dark:text-[#F8FAFC]/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, technology, client..."
                className="w-full pl-11 pr-10 py-2.5 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#0F2C59]/12 dark:border-white/10 text-base sm:text-sm text-[#0F172A] dark:text-white placeholder-[#0F172A]/40 dark:placeholder-[#F8FAFC]/40 focus:outline-hidden focus:ring-2 focus:ring-[#2563EB] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#0F172A]/40 dark:text-[#F8FAFC]/40 hover:text-[#0F172A] dark:hover:text-white cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs font-mono text-[#0F172A]/50 dark:text-[#F8FAFC]/50 self-center md:self-auto">
              Showing <span className="text-[#2563EB] dark:text-[#60A5FA] font-bold">{filteredProjects.length}</span> of {projects.length} projects
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#0F2C59]/10 dark:border-white/10 shadow-xs">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setOpenId(null); }}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 cursor-pointer ${
                    filter === f
                      ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/25'
                      : 'text-[#0F172A]/65 dark:text-[#F8FAFC]/65 hover:text-[#0F172A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="rounded-3xl border border-[#0F2C59]/10 dark:border-white/10 bg-white dark:bg-[#1E293B] p-12 md:p-20 text-center max-w-xl mx-auto shadow-xs flex flex-col items-center gap-4 my-12">
            <div className="w-14 h-14 rounded-2xl bg-[#0F2C59]/05 dark:bg-white/10 flex items-center justify-center text-[#2563EB] dark:text-[#60A5FA]">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-monument text-lg md:text-2xl text-[#0F172A] dark:text-[#F8FAFC]">
              {filter === 'My Products' ? 'Products Coming Soon' : 'No Matching Projects'}
            </h3>
            <p className="text-sm text-[#0F172A]/60 dark:text-[#F8FAFC]/60 font-light leading-relaxed max-w-md">
              {filter === 'My Products'
                ? 'Currently engineering self-built micro-products, developer tools, and templates for release. Check back soon!'
                : `No projects matched "${searchQuery}". Try searching for another keyword or clearing filters.`}
            </p>
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setFilter('All'); }}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#0F2C59] dark:bg-[#2563EB] text-white font-mono text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Reset Search & Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {rows.map((row, rowIdx) => (
              <div key={rowIdx}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {row.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isActive={openId === project.id}
                      onOpen={() => handleOpen(project.id)}
                    />
                  ))}
                  {row.length === 1 && <div />}
                </div>

                {row.some((p) => p.id === openId) && openProject && (
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2">
                    <InlineCaseStudy
                      key={openProject.id}
                      project={openProject}
                      onClose={handleClose}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0F2C59] via-[#1E3A8A] to-[#2563EB] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 font-mono text-[11px] uppercase tracking-wider">
              Have a project in mind?
            </span>
            <h3 className="font-monument text-xl sm:text-2xl leading-tight">
              LET'S BUILD SOMETHING EXCEPTIONAL
            </h3>
            <p className="text-white/80 text-xs sm:text-sm font-light max-w-lg">
              Available for freelance development, modern web app engineering, and full-time frontend roles.
            </p>
          </div>
          <a
            href="/#contact"
            onClick={() => { window.location.hash = 'contact'; }}
            className="shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#0F2C59] font-mono text-xs font-bold hover:bg-[#F8FAFC] hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Contact Suman to discuss a project"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4 text-[#2563EB]" />
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-[#0F2C59]/08 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#2563EB] dark:text-[#60A5FA] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0F2C59]/10 dark:border-white/10 text-xs font-mono text-[#0F172A]/60 dark:text-[#F8FAFC]/60 hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </main>
    </div>
  );
}
export default AllProjectsPage;

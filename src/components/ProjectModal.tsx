import { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, CheckCircle, Code, ShieldCheck, Image as ImageIcon } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  image: string;
  tags: string[];
  summary: string;
  outcome: string;
  challenges: string[];
  architecture: string[];
  demoUrl?: string;
  githubUrl?: string;
  year: string;
  client: string;
  galleryImages?: string[];
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'photos' | 'architecture' | 'impact'>('overview');
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      setActiveTab('overview');
      setSelectedImg(null);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const currentImage = selectedImg || project.image;
  const hasDemo = Boolean(project.demoUrl && project.demoUrl !== '#');
  const hasGithub = Boolean(project.githubUrl && project.githubUrl !== '#');
  const photos = project.galleryImages || [project.image];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#0F172A]/80 backdrop-blur-md animate__animated animate__fadeIn animate__faster"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[85vh] bg-white dark:bg-[#1E293B] rounded-3xl overflow-hidden shadow-2xl border border-[#0F2C59]/10 dark:border-white/10 flex flex-col animate__animated animate__zoomIn animate__faster"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 md:p-6 md:px-8 border-b border-[#0F2C59]/10 dark:border-white/10 bg-[#F8FAFC] dark:bg-black shrink-0">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#0F2C59]/10 dark:bg-white/10 text-[#0F2C59] dark:text-[#60A5FA] font-mono text-xs font-semibold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-xs font-mono text-[#0F172A]/50 dark:text-[#F8FAFC]/50">{project.year} • {project.client}</span>
            </div>
            <h2 className="font-serif-editorial text-xl md:text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-1">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white dark:bg-[#1E293B] border border-[#0F2C59]/15 dark:border-white/15 text-[#0F172A] dark:text-white hover:bg-[#0F2C59] hover:text-white transition-colors shrink-0 ml-3"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div ref={scrollContainerRef} className="overflow-y-auto p-5 md:p-8 space-y-6 flex-1">
          <div className="space-y-3">
            <div className="relative w-full h-56 md:h-96 rounded-2xl overflow-hidden shadow-md border border-[#0F2C59]/10 dark:border-white/10 bg-[#0F172A]">
              <img
                src={currentImage}
                alt={project.title}
                className="w-full h-full object-contain md:object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent flex items-end p-4 md:p-6 pointer-events-none">
                <p className="text-white text-xs md:text-base font-light italic drop-shadow-md">
                  "{project.subtitle}"
                </p>
              </div>
            </div>

            {photos.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
                {photos.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(imgUrl)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 ${
                      currentImage === imgUrl
                        ? 'border-[#2563EB] ring-2 ring-[#2563EB]/30 scale-105'
                        : 'border-[#0F2C59]/10 dark:border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono">
                      #{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex border-b border-[#0F2C59]/10 dark:border-white/10 gap-6 text-sm font-medium">
            {(['overview', ...(photos.length > 1 ? ['photos'] : []), 'architecture', 'impact'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-3 capitalize transition-all border-b-2 flex items-center gap-1.5 ${
                  activeTab === tab
                    ? 'border-[#2563EB] text-[#2563EB] dark:text-[#60A5FA] font-semibold'
                    : 'border-transparent text-[#0F172A]/60 dark:text-[#F8FAFC]/60 hover:text-[#0F172A] dark:hover:text-white'
                }`}
              >
                {tab === 'photos' && <ImageIcon className="w-4 h-4" />}
                {tab === 'photos' ? `All Photos (${photos.length})` : tab}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6 animate__animated animate__fadeIn animate__faster">
              <div>
                <h3 className="text-sm uppercase tracking-wider font-mono text-[#0F2C59]/60 dark:text-white/60 font-semibold mb-2">
                  Executive Summary
                </h3>
                <p className="text-[#0F172A]/80 dark:text-[#F8FAFC]/80 leading-relaxed text-sm md:text-base">
                  {project.summary}
                </p>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wider font-mono text-[#0F2C59]/60 dark:text-white/60 font-semibold mb-3">
                  Technical Stack & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-full bg-[#0F2C59]/5 dark:bg-white/10 border border-[#0F2C59]/10 dark:border-white/10 text-[#0F172A] dark:text-white font-mono text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-6 animate__animated animate__fadeIn animate__faster">
              <h3 className="text-sm uppercase tracking-wider font-mono text-[#0F2C59]/60 dark:text-white/60 font-semibold">
                Complete Template Gallery ({photos.length} High-Res Screenshots)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {photos.map((photo, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImg(photo)}
                    className="group cursor-pointer rounded-2xl overflow-hidden border border-[#0F2C59]/15 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 bg-[#0F172A]"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={photo}
                        alt={`Template View ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-full bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-white text-xs font-semibold shadow-lg">
                          Click to View Full
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-[#F8FAFC] dark:bg-black border-t border-[#0F2C59]/10 dark:border-white/10 flex items-center justify-between text-xs font-mono text-[#0F172A]/70 dark:text-[#F8FAFC]/70">
                      <span>Screenshot #{i + 1}</span>
                      <span className="text-[#2563EB] dark:text-[#60A5FA] font-semibold">Desun Hospital UI</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6 animate__animated animate__fadeIn animate__faster">
              <h3 className="text-sm uppercase tracking-wider font-mono text-[#0F2C59]/60 dark:text-white/60 font-semibold">
                Engineering & Architectural Solutions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.architecture.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-black border border-[#0F2C59]/10 dark:border-white/10 flex items-start gap-3"
                  >
                    <Code className="w-5 h-5 text-[#2563EB] dark:text-[#60A5FA] shrink-0 mt-0.5" />
                    <span className="text-xs font-mono text-[#0F172A]/80 dark:text-[#F8FAFC]/80 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="space-y-6 animate__animated animate__fadeIn animate__faster">
              <div>
                <h3 className="text-sm uppercase tracking-wider font-mono text-[#0F2C59]/60 dark:text-white/60 font-semibold mb-2">
                  Business Outcome & Quantifiable ROI
                </h3>
                <div className="p-5 rounded-2xl bg-[#0F2C59] dark:bg-[#2563EB] text-white space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#3B82F6] dark:text-white" />
                    <span className="font-semibold text-lg font-serif-editorial tracking-wide">Key Result</span>
                  </div>
                  <p className="text-sm font-light leading-relaxed opacity-90">{project.outcome}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-wider font-mono text-[#0F2C59]/60 dark:text-white/60 font-semibold mb-3">
                  Core Challenges Resolved
                </h3>
                <ul className="space-y-2">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#0F172A]/80 dark:text-[#F8FAFC]/80">
                      <ShieldCheck className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA] shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 md:px-8 border-t border-[#0F2C59]/10 dark:border-white/10 bg-[#F8FAFC] dark:bg-black flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4">
            {hasDemo && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] text-white font-semibold text-xs tracking-wider hover:bg-[#0F2C59] transition-colors shadow-md"
              >
                <span>Live Demonstration</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {hasGithub && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#1E293B] border border-[#0F2C59]/15 dark:border-white/15 text-[#0F172A] dark:text-white font-semibold text-xs tracking-wider hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Source Repository</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs text-[#0F172A]/60 dark:text-[#F8FAFC]/60 hover:text-[#0F172A] dark:hover:text-white font-mono underline"
          >
            Close Detail View
          </button>
        </div>
      </div>
    </div>
  );
};

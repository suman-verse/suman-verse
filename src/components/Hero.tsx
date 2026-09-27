import { useEffect, useState, useRef } from 'react';
import { ArrowDownRight, Award, ShieldCheck, X, Copy, Check } from 'lucide-react';
import { BuyMeACoffeeIcon } from './ui/BuyMeACoffeeIcon';

const WORDS = ['art and code.', 'design and data.', 'beauty and speed.', 'emotion and logic.'];

const TypewriterWord = () => {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const word = WORDS[wordIndex];
    const delay = isDeleting ? 45 : 85;
    const pause = isDeleting ? 0 : 2200;

    if (!isDeleting && displayed === word) {
      timeoutRef.current = window.setTimeout(() => setIsDeleting(true), pause);
      return;
    }
    if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setDisplayed(isDeleting ? displayed.slice(0, -1) : word.slice(0, displayed.length + 1));
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, isDeleting, wordIndex]);

  return (
    <span className="inline-grid grid-cols-1 grid-rows-1 align-baseline font-serif italic text-[#002FA7] dark:text-[#60A5FA] ml-2 font-medium">
      <span className="col-start-1 row-start-1 invisible select-none pointer-events-none" aria-hidden="true">
        emotion and logic.
        <span className="inline-block w-1 h-[0.85em] ml-1" />
      </span>
      <span className="col-start-1 row-start-1 whitespace-nowrap">
        {displayed}
        <span className="inline-block w-0.5 h-[0.85em] bg-[#002FA7] dark:bg-[#60A5FA] ml-1 animate-pulse align-middle" />
      </span>
    </span>
  );
};

export const Hero = () => {
  const [showCoffeeModal, setShowCoffeeModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowCoffeeModal(false);
    };
    if (showCoffeeModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showCoffeeModal]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('sumanverse@naviaxis');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-44 lg:pb-32 bg-[#F5F5F3] dark:bg-black transition-colors duration-300"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden">
        <img
          src="/hero-bg.png"
          alt="Hero Background"
          className="w-full h-full object-cover object-center opacity-90 dark:opacity-30 dark:brightness-[0.45] dark:contrast-125 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F3] dark:from-black via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-10 lg:px-12">
        <div className="max-w-5xl" itemScope itemType="https://schema.org/Person">
          <div className="reveal" data-delay="0">
            <h1 className="font-serif text-[clamp(2.1rem,8vw,7rem)] leading-[1.08] tracking-[-0.03em] text-[#1A1A1A] dark:text-[#EAEAEA] font-normal" itemProp="name">
              Suman Verse.
              <br />
              <span itemProp="jobTitle">Frontend Developer</span>.
            </h1>
          </div>

          <div className="reveal" data-delay="80">
            <p className="speakable-intro mt-8 max-w-[68ch] font-sans text-base sm:text-lg md:text-xl leading-[1.65] text-[#6B6B68] dark:text-[#9A9A97] font-normal" itemProp="description">
              Hi, I'm Suman. I am a passionate Frontend Web Developer crafting fast, responsive, and visually engaging web applications with modern UI design principles. Engineering digital experiences that blur the line between
              <TypewriterWord />
            </p>
          </div>

          <div className="reveal mt-10 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6" data-delay="160">
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#002FA7] dark:bg-[#2563EB] px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-[#002FA7]/25 active:scale-95 cursor-pointer"
            >
              <span>Selected Work</span>
              <ArrowDownRight className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => setShowCoffeeModal(true)}
              className="group relative inline-flex items-center gap-2.5 rounded-full border border-amber-500/30 dark:border-amber-400/30 bg-white/90 dark:bg-[#18181B] hover:bg-amber-500/[0.08] dark:hover:bg-amber-400/[0.12] hover:border-amber-500/60 dark:hover:border-amber-400/60 px-6 py-3.5 font-mono text-xs font-semibold text-[#1A1A1A] dark:text-[#F3F4F6] transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/15 dark:hover:shadow-amber-400/15 active:scale-95 cursor-pointer shadow-xs"
              aria-label="Buy Me a Coffee"
            >
              <span className="flex items-center justify-center w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-6 text-[#1A1A1A] dark:text-white">
                <BuyMeACoffeeIcon className="w-4.5 h-4.5 shrink-0" />
              </span>
              <span className="transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-300">
                Buy Me a Coffee
              </span>
            </button>
          </div>

          <div className="reveal mt-16 sm:mt-20 grid grid-cols-2 gap-6 border-t border-[#DDDDDA] dark:border-[#2A2A2A] pt-8 font-mono sm:grid-cols-4 sm:gap-8" data-delay="240">
            <div>
              <div className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] dark:text-[#EAEAEA]">
                2y+
              </div>
              <div className="mt-1 text-xs text-[#6B6B68] dark:text-[#9A9A97]">
                Frontend Experience
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] dark:text-[#EAEAEA]">
                20+
              </div>
              <div className="mt-1 text-xs text-[#6B6B68] dark:text-[#9A9A97]">
                Projects Delivered
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] dark:text-[#EAEAEA]">
                100%
              </div>
              <div className="mt-1 text-xs text-[#6B6B68] dark:text-[#9A9A97]">
                Responsive UI
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] dark:text-[#EAEAEA]">
                99/100
              </div>
              <div className="mt-1 text-xs text-[#6B6B68] dark:text-[#9A9A97]">
                Lighthouse Score
              </div>
            </div>
          </div>

          <div className="reveal mt-6 flex flex-wrap items-center gap-6 text-xs text-[#6B6B68] dark:text-[#9A9A97] font-mono" data-delay="320">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#002FA7] dark:text-[#60A5FA]" />
              Pixel-Perfect Responsive Design
            </span>
            <span className="w-px h-3.5 bg-[#DDDDDA] dark:bg-[#2A2A2A]" />
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#002FA7] dark:text-[#60A5FA]" />
              Modern Frontend Architecture
            </span>
          </div>
        </div>
      </div>

      {showCoffeeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowCoffeeModal(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-[#1E293B] border border-[#0F2C59]/10 dark:border-white/10 p-6 sm:p-7 shadow-2xl text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCoffeeModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col items-center gap-1.5 pt-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 flex items-center justify-center text-[#1A1A1A] dark:text-white">
                <BuyMeACoffeeIcon className="w-6 h-6" />
              </div>
              <h3 className="font-monument text-lg text-[#0F172A] dark:text-[#F8FAFC]">
                Buy Me a Coffee
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Support my development via any UPI app
              </p>
            </div>

            <div className="bg-white p-3 rounded-2xl shadow-inner border border-slate-200 mx-auto max-w-[240px]">
              <img
                src="/coffee_qr.png"
                alt="UPI QR Code - Suman Kundu"
                className="w-full h-auto rounded-xl object-contain block"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-left">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">UPI ID</div>
                  <div className="text-xs font-mono font-semibold text-[#0F172A] dark:text-[#F8FAFC]">sumanverse@naviaxis</div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-[#D97706] dark:text-[#FBBF24] text-[11px] font-mono font-semibold transition-colors cursor-pointer"
                  title="Copy UPI ID"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Google Pay · PhonePe · Paytm · Navi · BHIM
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

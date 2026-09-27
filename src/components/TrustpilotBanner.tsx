import { PenLine } from 'lucide-react';
import { TrustpilotStar } from './ui/TrustpilotIcon';

const TRUSTPILOT_REVIEW_URL = 'https://www.trustpilot.com/review/suman-verse.vercel.app';
const TRUSTPILOT_WRITE_URL = 'https://www.trustpilot.com/evaluate/suman-verse.vercel.app';

export const TrustpilotBanner = () => {
  return (
    <section id="trustpilot-reviews" className="py-10 relative z-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="reveal rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#00B67A]/10 via-[#00B67A]/05 to-transparent border border-[#00B67A]/25 dark:border-[#00B67A]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#00B67A] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#00B67A]/25">
              <TrustpilotStar className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white">
                Have we built something together?
              </h3>
              <p className="text-xs sm:text-sm text-[#0F172A]/70 dark:text-[#F8FAFC]/70 font-light mt-0.5">
                Share your experience on Trustpilot to help others make informed decisions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={TRUSTPILOT_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-[#0F2C59]/15 dark:border-white/15 bg-white dark:bg-[#1E293B] text-xs font-mono font-semibold text-[#0F172A] dark:text-white hover:border-[#00B67A] hover:text-[#00B67A] transition-colors"
            >
              Read Reviews
            </a>
            <a
              href={TRUSTPILOT_WRITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#00B67A] hover:bg-[#009e69] text-white text-xs font-mono font-semibold flex items-center gap-2 shadow-lg shadow-[#00B67A]/25 hover:scale-105 active:scale-95 transition-all"
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>Leave a Review</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

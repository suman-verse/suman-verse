interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200/80 dark:bg-slate-800/80 ${className}`}
      aria-hidden="true"
    />
  );
}

export function ImageSkeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-r from-slate-200/90 via-slate-100/90 to-slate-200/90 dark:from-slate-800/90 dark:via-slate-700/60 dark:to-slate-800/90 animate-pulse flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <div className="w-9 h-9 rounded-full bg-slate-300/60 dark:bg-slate-700/60 flex items-center justify-center">
        <svg
          className="w-4 h-4 text-slate-400 dark:text-slate-500 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="card rounded-3xl overflow-hidden flex flex-col h-full border border-slate-200/60 dark:border-white/10 bg-white dark:bg-[#1E293B]">
      <div className="relative w-full h-60 sm:h-72 shrink-0 bg-slate-200/80 dark:bg-slate-800/80 animate-pulse">
        <div className="absolute top-3.5 left-3.5 w-20 h-6 rounded-full bg-slate-300/80 dark:bg-slate-700/80" />
      </div>

      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2 flex-1">
              <Skeleton className="w-24 h-3 rounded-md" />
              <Skeleton className="w-4/5 h-6 rounded-lg" />
            </div>
            <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
          </div>

          <Skeleton className="w-full h-4 rounded-md" />
          <Skeleton className="w-3/4 h-4 rounded-md" />
        </div>

        <div className="space-y-4 pt-2 mt-auto">
          <div className="flex gap-2">
            <Skeleton className="w-16 h-6 rounded-lg" />
            <Skeleton className="w-20 h-6 rounded-lg" />
            <Skeleton className="w-14 h-6 rounded-lg" />
          </div>

          <div className="pt-3.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
            <Skeleton className="w-28 h-4 rounded-md" />
            <Skeleton className="w-24 h-7 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;

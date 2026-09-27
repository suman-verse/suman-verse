import type { SVGProps, HTMLAttributes } from 'react';

export const TrustpilotStar = ({ className = 'w-4 h-4', ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M24 9.17H14.832L12 0.5L9.168 9.17H0L7.416 14.529L4.584 23.199L12 17.841L19.416 23.199L16.584 14.529L24 9.17Z"
      fill="#00B67A"
    />
    <path
      d="M17.062 14.877L16.584 14.529L19.416 23.199L12 17.841V9.17H14.832L17.062 14.877Z"
      fill="#005128"
      opacity="0.3"
    />
  </svg>
);

export const TrustpilotLogo = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`inline-flex items-center gap-1.5 font-sans font-semibold tracking-tight text-[#0F172A] dark:text-white ${className}`} {...props}>
    <TrustpilotStar className="w-5 h-5 shrink-0" />
    <span className="text-sm font-bold tracking-tight">Trustpilot</span>
  </div>
);

'use client';

import React from 'react';

interface LogoMarkProps {
  /** Tailwind size classes for the tile, e.g. "w-9 h-9" */
  className?: string;
  /** Tile shape: rounded square (header) or circle (footer) */
  variant?: 'tile' | 'circle';
}

/**
 * Aarambh brand mark — a lit diya (oil lamp), for the auspicious
 * beginning the name refers to. Drawn inline so it scales cleanly
 * and inherits the surrounding text color where needed.
 */
export function LogoMark({ className = 'w-9 h-9', variant = 'tile' }: LogoMarkProps) {
  return (
    <div
      className={`${className} ${
        variant === 'circle' ? 'rounded-full' : 'rounded-xl sm:rounded-2xl'
      } bg-gradient-to-tr from-[#E65D5D] via-[#EA6D63] to-amber-500 flex items-center justify-center text-white shadow-sm shrink-0 transition-all`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-[62%] h-[62%]"
        aria-hidden="true"
      >
        {/* Flame */}
        <path
          d="M12 2.5c2.15 2.5 3.2 4.35 3.2 5.9a3.2 3.2 0 1 1-6.4 0c0-1.55 1.05-3.4 3.2-5.9Z"
          fill="#FEF3C7"
        />
        {/* Flame inner glow */}
        <path
          d="M12 6c.95 1.2 1.4 2.05 1.4 2.75a1.4 1.4 0 1 1-2.8 0c0-.7.45-1.55 1.4-2.75Z"
          fill="#F59E0B"
        />
        {/* Lamp bowl */}
        <path
          d="M3.6 13.4h16.8c0 3.4-3.76 5.6-8.4 5.6s-8.4-2.2-8.4-5.6Z"
          fill="currentColor"
        />
        {/* Base */}
        <path
          d="M7.5 20.6h9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default LogoMark;

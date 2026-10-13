'use client';

import React from 'react';

interface LogoMarkProps {
  /** Tailwind size classes for the tile, e.g. "w-9 h-9" */
  className?: string;
  /** Tile shape: rounded square or circle (footer), or a bare line-drawn diya (header) */
  variant?: 'tile' | 'circle' | 'outline';
}

/**
 * Aarambh brand mark — a lit diya (oil lamp), for the auspicious
 * beginning the name refers to. Drawn inline so it scales cleanly
 * and inherits the surrounding text color where needed.
 */
export function LogoMark({ className = 'w-9 h-9', variant = 'tile' }: LogoMarkProps) {
  if (variant === 'outline') {
    return (
      <svg viewBox="0 0 32 32" fill="none" className={`${className} shrink-0 transition-all`} aria-hidden="true">
        {/* Flame */}
        <path d="M16 3.5c2.6 3 3.9 5.2 3.9 7.1a3.9 3.9 0 1 1-7.8 0c0-1.9 1.3-4.1 3.9-7.1Z" fill="#C9A13B" />
        <path d="M16 7.6c1.05 1.35 1.55 2.3 1.55 3.05a1.55 1.55 0 1 1-3.1 0c0-.75.5-1.7 1.55-3.05Z" fill="#FDF5EC" />
        {/* Bowl, drawn as an outline in the text colour (maroon in the header, gold in the footer) */}
        <path d="M4.5 17.5h23c0 4.6-5.15 7.6-11.5 7.6S4.5 22.1 4.5 17.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        {/* Base */}
        <path d="M10.5 28h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

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

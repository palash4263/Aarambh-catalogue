import React from 'react';

// Hand-drawn festive artwork for the hero, as inline SVG so it stays sharp at
// every screen size and costs no image downloads.

const MARIGOLD = ['#F08A24', '#F9C74F'];
const BEAD = ['#E05A5A', '#FFFFFF'];

/** Point on a swag that starts at (x0, y0), dips to `dip` mid-way, and ends at (x1, y0). */
function swagPoint(x0: number, x1: number, y0: number, dip: number, t: number) {
  const cx = (x0 + x1) / 2;
  const cy = 2 * dip - y0; // control point that makes the curve pass through `dip` at t = 0.5
  const u = 1 - t;
  return { x: u * u * x0 + 2 * u * t * cx + t * t * x1, y: u * u * y0 + 2 * u * t * cy + t * t * y0 };
}

/** One garland swag, 240 units wide, with half a mango-leaf cluster at each edge. */
function ToranSwag() {
  return (
    <svg viewBox="0 0 240 120" className="h-full w-auto shrink-0" aria-hidden="true">
      {/* Gold cord the garland hangs from, right under the nav */}
      <rect y="4" width="240" height="2.5" fill="#C9A13B" />

      {Array.from({ length: 19 }, (_, i) => {
        const p = swagPoint(30, 210, 40, 104, (i + 0.5) / 19);
        return <circle key={`b${i}`} cx={p.x} cy={p.y} r="2.6" fill={BEAD[i % 2]} />;
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const p = swagPoint(0, 240, 16, 74, i / 11);
        return <circle key={`m${i}`} cx={p.x} cy={p.y} r="11" fill={MARIGOLD[i % 2]} />;
      })}

      {/* Leaf clusters sit on the tile edges; neighbouring tiles each draw one half */}
      {[0, 240].map((x) => (
        <g key={x}>
          <path d={`M${x} 12 C${x - 30} 30 ${x - 26} 66 ${x - 6} 84 C${x - 10} 60 ${x - 8} 34 ${x} 12Z`} fill="#6B8E3D" />
          <path d={`M${x} 12 C${x + 30} 30 ${x + 26} 66 ${x + 6} 84 C${x + 10} 60 ${x + 8} 34 ${x} 12Z`} fill="#6B8E3D" />
          <path d={`M${x} 10 C${x - 14} 34 ${x - 10} 64 ${x} 86 C${x + 10} 64 ${x + 14} 34 ${x} 10Z`} fill="#58772F" />
          <circle cx={x} cy="96" r="6.5" fill="#C9A13B" />
          <circle cx={x} cy="10" r="10" fill="#F9C74F" />
        </g>
      ))}
    </svg>
  );
}

/**
 * Marigold toran: a row of garland swags between mango-leaf clusters. The
 * container's height sets the garland's size; swags repeat to fill the width
 * and overflow evenly off both sides, so it never crops vertically.
 */
export function Toran({ className = '' }: { className?: string }) {
  return (
    <div className={`flex justify-center overflow-hidden ${className}`} aria-hidden="true">
      {Array.from({ length: 24 }, (_, i) => (
        <ToranSwag key={i} />
      ))}
    </div>
  );
}

/** A small gold diya between two fading gold rules, used to close the hero. */
export function DiyaDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="divider-left" x1="0" x2="1">
          <stop offset="0" stopColor="#C9A13B" stopOpacity="0" />
          <stop offset="1" stopColor="#C9A13B" />
        </linearGradient>
        <linearGradient id="divider-right" x1="1" x2="0">
          <stop offset="0" stopColor="#C9A13B" stopOpacity="0" />
          <stop offset="1" stopColor="#C9A13B" />
        </linearGradient>
      </defs>
      <rect x="10" y="27" width="118" height="1.5" fill="url(#divider-left)" />
      <rect x="192" y="27" width="118" height="1.5" fill="url(#divider-right)" />
      <path d="M160 6c3 3.5 4.5 6 4.5 8.2a4.5 4.5 0 1 1-9 0c0-2.2 1.5-4.7 4.5-8.2Z" fill="#E8A33D" />
      <path d="M144 22h32c0 6.2-7.2 10-16 10s-16-3.8-16-10Z" fill="#C9A13B" />
      <circle cx="136" cy="27.75" r="2" fill="#C9A13B" />
      <circle cx="184" cy="27.75" r="2" fill="#C9A13B" />
    </svg>
  );
}

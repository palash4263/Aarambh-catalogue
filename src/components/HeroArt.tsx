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

/**
 * Marigold toran: garland swags hung between mango-leaf clusters, with a bead
 * string under each swag. Drawn 1440 units wide; `slice` keeps the garland at
 * full size on narrow screens and crops the sides instead of shrinking it.
 */
export function Toran({ className = '' }: { className?: string }) {
  const anchors = [0, 240, 480, 720, 960, 1200, 1440];
  const swags = anchors.slice(0, -1).map((x0, i) => [x0, anchors[i + 1]] as const);

  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="xMidYMin slice" className={className} aria-hidden="true">
      {/* Gold cord the garland hangs from, right under the nav */}
      <rect y="4" width="1440" height="2.5" fill="#C9A13B" />

      {swags.map(([x0, x1]) => (
        <g key={`beads-${x0}`}>
          {Array.from({ length: 19 }, (_, i) => {
            const p = swagPoint(x0 + 30, x1 - 30, 40, 104, (i + 0.5) / 19);
            return <circle key={i} cx={p.x} cy={p.y} r="2.6" fill={BEAD[i % 2]} />;
          })}
        </g>
      ))}

      {swags.map(([x0, x1]) => (
        <g key={`marigold-${x0}`}>
          {Array.from({ length: 12 }, (_, i) => {
            const p = swagPoint(x0, x1, 16, 74, i / 11);
            return <circle key={i} cx={p.x} cy={p.y} r="11" fill={MARIGOLD[i % 2]} />;
          })}
        </g>
      ))}

      {anchors.slice(1, -1).map((x) => (
        <g key={`leaves-${x}`}>
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

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

/** One lit diya: a soft glow, a flickering flame, and a clay bowl resting on the floor line. */
function Diya({ x, floor }: { x: number; floor: number }) {
  return (
    <g>
      <circle cx={x} cy={floor - 34} r="36" fill="#F5CBA7" opacity="0.75" />
      <g className="animate-flicker">
        <path d={`M${x} ${floor - 58} C${x + 12} ${floor - 40} ${x + 11} ${floor - 22} ${x} ${floor - 18} C${x - 11} ${floor - 22} ${x - 12} ${floor - 40} ${x} ${floor - 58}Z`} fill="#F5B83D" />
        <path d={`M${x} ${floor - 44} C${x + 6} ${floor - 34} ${x + 5} ${floor - 25} ${x} ${floor - 22} C${x - 5} ${floor - 25} ${x - 6} ${floor - 34} ${x} ${floor - 44}Z`} fill="#FFE7A3" />
      </g>
      <path d={`M${x - 44} ${floor} Q${x} ${floor + 46} ${x + 44} ${floor} Z`} fill="#C45A30" />
    </g>
  );
}

/**
 * A gold double-line arch over a peach sun, with two diyas at its base and a
 * few rangoli dots. The floor line sits at y = 490 of 600, so the parent's
 * floor band must be 110/520 of this artwork's rendered width.
 */
export function DiyaArch({ className = '' }: { className?: string }) {
  const floor = 490;
  return (
    <svg viewBox="0 0 520 600" className={className} aria-hidden="true">
      <circle cx="260" cy="260" r="260" fill="#F6DDD0" />
      <path d={`M60 ${floor} V250 A200 200 0 0 1 460 250 V${floor}`} fill="none" stroke="#D4A447" strokeWidth="2.5" />
      <path d={`M78 ${floor} V250 A182 182 0 0 1 442 250 V${floor}`} fill="none" stroke="#E2C27A" strokeWidth="1.2" />
      <Diya x={140} floor={floor} />
      <Diya x={380} floor={floor} />
      <circle cx="220" cy="535" r="5" fill="#E8893A" />
      <circle cx="250" cy="548" r="4.5" fill="#E06B6B" />
      <circle cx="280" cy="538" r="5" fill="#E8893A" />
      <circle cx="310" cy="550" r="4.5" fill="#F5C451" />
    </svg>
  );
}

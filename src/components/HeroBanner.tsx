'use client';

import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Festival } from '@/types';
import { FESTIVALS } from '@/data/festivals';
import { Toran, DiyaDivider } from './HeroArt';

interface HeroBannerProps {
  festival?: Festival | null;
}

// The year-round storefront, used when no festival window is open.
const DEFAULT_THEME = FESTIVALS.find((f) => f.slug === 'diwali')!.theme;

const HERO_PHOTOS = [
  { src: '/images/shubh_labh_pink_tassel_hanging_latkan.jpg', alt: 'Shubh Labh pink tassel latkan pair' },
  { src: '/images/yellow_festive_bell_string.jpg', alt: 'Yellow festive bell strings' },
];

const CUSTOM_ORDER_URL = `https://wa.me/919790996188?text=${encodeURIComponent(
  "Hi Aarambh! I'd like to request a custom order. Here's my idea:"
)}`;

/** The headline with its accent phrase (if any) set in maroon. */
function Headline({ text, accent }: { text: string; accent?: string }) {
  const at = accent ? text.indexOf(accent) : -1;
  if (!accent || at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="text-[#7A1730]">{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}

const photoFrame = 'aspect-[3/4] object-cover rounded-xl sm:rounded-2xl border-[3px] sm:border-4 border-white shadow-lg';

export default function HeroBanner({ festival = null }: HeroBannerProps) {
  const theme = festival?.theme ?? DEFAULT_THEME;

  return (
    // Fades from the hero cream into the page colour, so there's no hard edge
    // where the catalogue begins
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDF5EC] from-70% to-[#FAF8F5]">
      <Toran className="w-full h-10 sm:h-14 lg:h-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* On wide screens two real products flank the headline... */}
        <img src={HERO_PHOTOS[0].src} alt={HERO_PHOTOS[0].alt} className={`hidden xl:block absolute left-10 top-1/2 -translate-y-1/2 -rotate-6 w-40 ${photoFrame}`} />
        <img src={HERO_PHOTOS[1].src} alt={HERO_PHOTOS[1].alt} className={`hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 rotate-6 w-40 ${photoFrame}`} />

        <div className="relative max-w-3xl mx-auto pt-4 sm:pt-6 xl:pt-10 pb-3 sm:pb-4 xl:pb-8 space-y-3 sm:space-y-4 text-center">
          {/* ...and on smaller screens they sit side by side above it */}
          <div className="xl:hidden flex justify-center gap-3 sm:gap-5 pb-1" aria-hidden="true">
            <img src={HERO_PHOTOS[0].src} alt="" className={`w-20 sm:w-28 -rotate-6 ${photoFrame}`} />
            <img src={HERO_PHOTOS[1].src} alt="" className={`w-20 sm:w-28 rotate-6 ${photoFrame}`} />
          </div>

          <h1 className="text-[1.65rem] sm:text-4xl lg:text-5xl font-semibold text-[#2B1A12] font-['Cinzel',serif] tracking-[0.06em] leading-[1.15]">
            <Headline text={theme.headline} accent={theme.headlineAccent} />
          </h1>

          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {theme.subhead}
          </p>

          <div className="pt-1 flex flex-col xs:flex-row items-stretch xs:items-center justify-center gap-2.5 sm:gap-3">
            <a
              href="#catalog"
              className="bg-[#C2403C] hover:bg-[#A93531] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 group"
            >
              <span>{theme.ctaLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={CUSTOM_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#7A1730]/40 hover:border-[#7A1730] hover:bg-[#7A1730]/[0.05] text-[#7A1730] px-6 py-3 rounded-full text-sm font-semibold transition-all inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Request Custom Order</span>
            </a>
          </div>
        </div>
      </div>

      <DiyaDivider className="block mx-auto w-48 sm:w-64 pb-2 sm:pb-3" />
    </section>
  );
}

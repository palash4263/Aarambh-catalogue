'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Festival } from '@/types';
import { FESTIVALS } from '@/data/festivals';
import { Toran } from './HeroArt';

interface HeroBannerProps {
  festival?: Festival | null;
}

// The year-round storefront, used when no festival window is open.
const DEFAULT_THEME = FESTIVALS.find((f) => f.slug === 'diwali')!.theme;

export default function HeroBanner({ festival = null }: HeroBannerProps) {
  const theme = festival?.theme ?? DEFAULT_THEME;

  return (
    <section className="relative overflow-hidden bg-[#FDF5EC]">
      <Toran className="block w-full h-14 sm:h-20 lg:h-28" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 lg:pt-12 pb-10 sm:pb-14 lg:pb-16 space-y-4 sm:space-y-5 text-center">
        <h1 className="text-[1.65rem] sm:text-4xl lg:text-5xl font-semibold text-[#2B1A12] font-['Cinzel',serif] tracking-[0.06em] leading-[1.15]">
          {theme.headline}
        </h1>

        <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {theme.subhead}
        </p>

        <div className="pt-1 flex justify-center">
          <a
            href="#catalog"
            className="bg-[#C2403C] hover:bg-[#A93531] text-white px-7 py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 group"
          >
            <span>{theme.ctaLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

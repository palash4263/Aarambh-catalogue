'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Festival } from '@/types';
import { FESTIVALS } from '@/data/festivals';
import { Toran, DiyaArch } from './HeroArt';

interface HeroBannerProps {
  festival?: Festival | null;
}

// The year-round storefront, used when no festival window is open.
const DEFAULT_THEME = FESTIVALS.find((f) => f.slug === 'diwali')!.theme;

// The floor band's height is tied to the arch artwork's width (110/520 of it)
// so the diyas always sit exactly on the floor line. Keep the two in step.
const ARCH_WIDTH = 'w-[200px] sm:w-[340px] lg:w-[440px] xl:w-[520px]';
const FLOOR_HEIGHT = 'h-[42px] sm:h-[72px] lg:h-[93px] xl:h-[110px]';
const CLEAR_FLOOR = 'lg:pb-[93px] xl:pb-[110px]';

export default function HeroBanner({ festival = null }: HeroBannerProps) {
  const theme = festival?.theme ?? DEFAULT_THEME;

  return (
    <section className="relative overflow-hidden bg-[#FDF5EC]">
      <Toran className="block w-full h-14 sm:h-20 lg:h-28" />

      <div className={`absolute inset-x-0 bottom-0 bg-[#F4E6D6] ${FLOOR_HEIGHT}`} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 items-end gap-4 sm:gap-6 lg:gap-10">
        <div className={`self-center pt-5 sm:pt-8 lg:pt-0 ${CLEAR_FLOOR} space-y-3 sm:space-y-5 text-center lg:text-left`}>
          <h1 className="text-[1.65rem] sm:text-4xl lg:text-5xl font-semibold text-[#2B1A12] font-['Cinzel',serif] tracking-[0.06em] leading-[1.15]">
            {theme.headline}
          </h1>

          <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
            {theme.subhead}
          </p>

          <div className="pt-1 flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center justify-center lg:justify-start gap-3">
            <a
              href="#catalog"
              className="bg-[#C2403C] hover:bg-[#A93531] text-white px-6 py-2.5 sm:py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>{theme.ctaLabel}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            {/* During an exclusive festival the rest of the catalogue is off
                sale, so the secondary CTA would lead nowhere. */}
            {festival?.mode !== 'exclusive' && (
              <a
                href="#catalog"
                className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 px-6 py-2.5 sm:py-3 rounded-full text-sm font-semibold transition-all text-center"
              >
                Explore Home Decor
              </a>
            )}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <DiyaArch className={`block h-auto ${ARCH_WIDTH}`} />
        </div>
      </div>
    </section>
  );
}

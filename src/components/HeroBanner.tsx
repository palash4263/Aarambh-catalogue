'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Festival } from '@/types';
import { FESTIVALS } from '@/data/festivals';

interface HeroBannerProps {
  festival?: Festival | null;
}

// The year-round storefront, used when no festival window is open.
const DEFAULT_THEME = FESTIVALS.find((f) => f.slug === 'diwali')!.theme;

export default function HeroBanner({ festival = null }: HeroBannerProps) {
  const theme = festival?.theme ?? DEFAULT_THEME;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div
        className="relative overflow-hidden py-5 sm:py-10 lg:py-12 min-h-0 sm:min-h-[300px] flex items-center"
      >

        {/* Content Layout */}
        <div className="w-full relative z-10">

          <div className="max-w-3xl mx-auto lg:mx-0 space-y-3 sm:space-y-4 text-center lg:text-left">
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#2B1A12] font-['Cinzel',serif] tracking-[0.06em] leading-tight">
                {theme.headline}
              </h1>
              <div className="mt-3 h-px w-24 sm:w-32 mx-auto lg:mx-0 bg-gradient-to-r from-transparent via-[#E6C878] to-transparent lg:from-[#B8893B] lg:via-[#E6C878] lg:to-transparent" />
            </div>

            <p className="text-stone-600 text-[13px] sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {theme.subhead}
            </p>

            <div className="pt-1 sm:pt-2 grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
              <a
                href="#catalog"
                className="text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                style={{ backgroundColor: theme.accent }}
              >
                <span>{theme.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              {/* During an exclusive festival the rest of the catalogue is off
                  sale, so the secondary CTA would lead nowhere. */}
              {festival?.mode !== 'exclusive' && (
                <a
                  href="#catalog"
                  className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 px-5 py-3 rounded-full text-sm font-semibold transition-all text-center"
                >
                  Explore Home Decor
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

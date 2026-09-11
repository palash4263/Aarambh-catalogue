'use client';

import React from 'react';
import { Sparkles, Gift, ArrowRight, CalendarDays } from 'lucide-react';
import { Festival } from '@/types';
import { FESTIVALS, daysUntil } from '@/data/festivals';

interface HeroBannerProps {
  festival?: Festival | null;
}

// The year-round storefront, used when no festival window is open.
const DEFAULT_THEME = FESTIVALS.find((f) => f.slug === 'diwali')!.theme;

function countdownLabel(festival: Festival): string | null {
  const days = daysUntil(festival);
  if (days > 1) return `${days} days to go`;
  if (days === 1) return 'Tomorrow';
  if (days === 0) return 'Today';
  return null; // in the tail window — no countdown, the festival is under way
}

export default function HeroBanner({ festival = null }: HeroBannerProps) {
  const theme = festival?.theme ?? DEFAULT_THEME;
  const countdown = festival ? countdownLabel(festival) : null;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden border shadow-sm p-5 sm:p-10 lg:p-12 min-h-0 sm:min-h-[300px] flex items-center"
        style={{
          background: `linear-gradient(to right, ${theme.accentSoft}, #FDF8F3, ${theme.accentSoft})`,
          borderColor: `${theme.accent}33`,
        }}
      >

        {/* Festive background accents */}
        <div className="absolute top-4 right-12 opacity-50 hidden md:block" style={{ color: theme.accent }}>
          <Sparkles className="w-16 h-16 animate-pulse" />
        </div>
        <div className="absolute bottom-6 right-1/3 opacity-30 hidden md:block" style={{ color: theme.accent }}>
          <Sparkles className="w-10 h-10" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center w-full relative z-10">

          {/* Left Text */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-center lg:text-left order-2 lg:order-1">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ backgroundColor: theme.accentSoft, color: theme.accentDark }}
              >
                <Gift className="w-3.5 h-3.5" />
                <span>{theme.eyebrow}</span>
              </div>

              {countdown && (
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: theme.accent }}
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>{countdown}</span>
                </div>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-display tracking-tight leading-tight">
              {theme.headline}
            </h1>

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

          {/* Right Banner Image matching screenshot style */}
          <div className="lg:col-span-5 flex justify-center relative order-1 lg:order-2">
            <div className="relative w-full max-w-sm aspect-[16/10] sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-2 sm:border-4 border-white bg-amber-50">
              <img
                src={theme.bannerUrl}
                alt={theme.bannerCaption}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-semibold tracking-wide bg-stone-900/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  ✨ {theme.bannerCaption}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

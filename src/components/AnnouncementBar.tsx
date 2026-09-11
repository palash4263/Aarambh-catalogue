'use client';

import React from 'react';
import { Truck, Sparkles } from 'lucide-react';
import { Festival } from '@/types';
import { FESTIVALS } from '@/data/festivals';

interface AnnouncementBarProps {
  festival?: Festival | null;
}

const DEFAULT_THEME = FESTIVALS.find((f) => f.slug === 'diwali')!.theme;

export default function AnnouncementBar({ festival = null }: AnnouncementBarProps) {
  const theme = festival?.theme ?? DEFAULT_THEME;

  return (
    <div
      className="text-white text-[11px] sm:text-xs md:text-sm py-2 px-3 sm:px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 shadow-sm"
      style={{ backgroundColor: theme.accent }}
    >
      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse text-amber-200 shrink-0" />
      <span>{theme.announcement}</span>
      <Truck className="w-4 h-4 hidden sm:inline-block shrink-0" />
    </div>
  );
}

'use client';

import React from 'react';
import { Truck, Sparkles } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-[#E65D5D] text-white text-[11px] sm:text-xs md:text-sm py-2 px-3 sm:px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 shadow-sm">
      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse text-amber-200 shrink-0" />
      <span>Express 4-Hour <span className="hidden xs:inline">Festival </span>Delivery<span className="hidden sm:inline"> Available</span> in Select Cities!</span>
      <Truck className="w-4 h-4 hidden sm:inline-block shrink-0" />
    </div>
  );
}

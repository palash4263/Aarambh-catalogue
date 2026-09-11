'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, MessageSquare, Phone, MapPin } from 'lucide-react';
import { DeliveryLocation } from '@/types';
import LogoMark from '@/components/Logo';

interface HeaderProps {
  onOpenInquiry: () => void;
  onOpenDeliveryModal: () => void;
  location: DeliveryLocation;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function Header({
  onOpenInquiry,
  onOpenDeliveryModal,
  location,
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { label: 'Catalogue', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname !== '/' && searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/70 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 lg:h-20 flex items-center justify-between gap-2 sm:gap-4">

        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
          <LogoMark className="w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-105 group-hover:shadow-md" />
          <div className="flex flex-col min-w-0">
            <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-stone-900 font-display leading-tight group-hover:text-[#E65D5D] transition-colors truncate">
              Aarambh
            </span>
            <span className="hidden sm:block text-[10px] text-stone-400 font-semibold tracking-widest uppercase">
              Digital Catalogue
            </span>
          </div>
        </Link>

        {/* Center: Aesthetic Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#FDEAEA] text-[#E65D5D] font-semibold shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Refined Utilities & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 shrink-0">

          {/* Delivery Location Pill */}
          <button
            onClick={onOpenDeliveryModal}
            className="hidden lg:flex items-center gap-1.5 bg-stone-50 hover:bg-stone-100/90 border border-stone-200/80 rounded-full px-3 py-1.5 text-xs text-stone-700 font-medium transition-all hover:border-stone-300"
            title="Change Delivery Location"
          >
            <MapPin className="w-3.5 h-3.5 text-[#E65D5D]" />
            <span className="text-stone-400 font-normal">To:</span>
            <span className="font-semibold text-stone-800 max-w-[80px] truncate">
              {location.pincode || 'Select'}
            </span>
          </button>

          {/* Expandable / Sleek Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search decor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`bg-stone-50 hover:bg-stone-100/70 focus:bg-white text-stone-800 text-xs rounded-full py-2 pl-8 pr-7 border border-stone-200/80 focus:outline-none focus:ring-2 focus:ring-[#E65D5D]/20 focus:border-[#E65D5D] transition-all duration-300 ${
                isSearchFocused || searchQuery ? 'w-52 lg:w-60' : 'w-36 lg:w-44'
              }`}
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                title="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </form>

          {/* Aesthetic WhatsApp Icon Button */}
          <a
            href="https://wa.me/919790996188?text=Hi!%20I%20would%20like%20to%20inquire%20about%20your%20decor%20catalog."
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200/80 flex items-center justify-center transition-all hover:scale-105 shrink-0"
            title="Chat on WhatsApp (+91 97909 96188)"
          >
            <Phone className="w-4 h-4 fill-emerald-600 stroke-emerald-600" />
          </a>

          {/* Primary CTA: Get Quote — icon-only on phones, full pill from sm up */}
          <button
            onClick={onOpenInquiry}
            className="bg-gradient-to-r from-[#E65D5D] to-[#d64d4d] hover:from-[#d64d4d] hover:to-[#c63d3d] text-white w-9 h-9 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full text-xs font-semibold shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
            aria-label="Get a quote"
          >
            <MessageSquare className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Get Quote</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-700 lg:hidden shrink-0 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar (Below Header on small devices) */}
      <div className="md:hidden px-3 sm:px-4 pb-2.5">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search lights, diyas, wall decor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 text-stone-800 text-sm rounded-full py-2.5 pl-9 pr-9 border border-stone-200/80 focus:outline-none focus:ring-2 focus:ring-[#E65D5D]/20 focus:border-[#E65D5D]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
      </div>

      {/* Mobile "Deliver to" strip (matches the reference layout) */}
      <button
        onClick={onOpenDeliveryModal}
        className="lg:hidden w-full flex items-center justify-center gap-2 bg-[#FDEAEA] border-t border-red-100 px-4 py-2 text-xs text-stone-700 font-medium active:bg-[#fbdada] transition-colors"
      >
        <MapPin className="w-3.5 h-3.5 text-[#E65D5D] shrink-0" />
        <span className="truncate">
          Deliver to <strong className="text-[#E65D5D]">{location.pincode || 'select pincode'}</strong>
          {location.city ? ` · ${location.city}` : ''}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E65D5D] underline shrink-0">
          Change
        </span>
      </button>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-100 bg-white px-4 sm:px-5 py-4 space-y-3 text-sm font-medium text-stone-700 shadow-xl animate-slide-down max-h-[70vh] overflow-y-auto">
          
          {/* Navigation Links */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#FDEAEA] text-[#E65D5D] font-semibold'
                      : 'hover:bg-stone-50 text-stone-700 hover:text-stone-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Actions */}
          <div className="pt-3 grid grid-cols-2 gap-2.5 border-t border-stone-100">
            <a
              href="https://wa.me/919790996188?text=Hi!%20I%20would%20like%20to%20inquire%20about%20your%20decor%20catalog."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 fill-emerald-600 stroke-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full bg-[#E65D5D] hover:bg-[#d64d4d] text-white py-2.5 rounded-xl text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Get Quote</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

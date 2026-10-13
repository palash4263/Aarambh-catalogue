'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, MessageSquare, Phone } from 'lucide-react';
import LogoMark from '@/components/Logo';

interface HeaderProps {
  onOpenInquiry: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const WHATSAPP_URL =
  'https://wa.me/919790996188?text=Hi!%20I%20would%20like%20to%20inquire%20about%20your%20decor%20catalog.';

export default function Header({
  onOpenInquiry,
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // On the home page the nav blends into the cream hero and the toran hangs
  // from its bottom edge, so it only gets a shadow once the page scrolls.
  // Other pages have no hero beneath it, so they keep a hairline border.
  const isHome = pathname === '/';
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <>
      {/* Announcement bar — scrolls away; only the nav below it is sticky */}
      <div className="bg-[#7A1730] text-[#F6E7C8] text-[11px] sm:text-xs tracking-wide text-center px-3 py-1.5">
        Diwali Collection 2026
        <span className="hidden sm:inline"> · Handcrafted in India</span>
        <span className="mx-1.5 text-[#E6C878]">·</span>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2 decoration-[#E6C878]/70 hover:decoration-[#E6C878]">
          Order on WhatsApp<span className="hidden sm:inline"> +91 97909 96188</span>
        </a>
      </div>

      <header
        className={`sticky top-0 z-40 bg-[#FDF5EC]/95 backdrop-blur-md transition-shadow duration-300 ${
          isScrolled ? 'shadow-[0_4px_20px_-8px_rgba(60,20,10,0.25)]' : ''
        } ${isHome ? '' : 'border-b border-[#EADBC8]'}`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 lg:h-20 flex items-center justify-between gap-2 sm:gap-4">

          {/* Left: Brand */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group min-w-0">
            <LogoMark variant="outline" className="w-8 h-8 sm:w-9 sm:h-9 group-hover:scale-105" />
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-[0.08em] text-[#2B1A12] font-['Cinzel',serif] leading-none truncate">
                Aarambh
              </span>
              <span className="hidden sm:block mt-1 text-[9px] lg:text-[10px] text-[#9A7B4F] font-semibold tracking-[0.2em] uppercase">
                Handcrafted Festive Décor
              </span>
            </div>
          </Link>

          {/* Center: Navigation */}
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
                  className={`relative px-3.5 py-2 text-xs tracking-wide transition-colors ${
                    isActive ? 'text-[#7A1730] font-semibold' : 'text-stone-600 font-medium hover:text-[#7A1730]'
                  }`}
                >
                  {link.label}
                  {/* Gold underline marks the current page */}
                  <span
                    className={`absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full bg-[#C9A13B] transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right: Search & actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 shrink-0">
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search decor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`bg-white/70 hover:bg-white focus:bg-white text-stone-800 text-xs rounded-full py-2 pl-8 pr-7 border border-[#EADBC8] focus:outline-none focus:ring-2 focus:ring-[#7A1730]/15 focus:border-[#7A1730]/50 transition-all duration-300 ${
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

            {/* WhatsApp: a quiet maroon outline icon */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#7A1730]/30 text-[#7A1730] hover:bg-[#7A1730]/[0.06] hover:border-[#7A1730]/60 flex items-center justify-center transition-all shrink-0"
              title="Chat on WhatsApp (+91 97909 96188)"
              aria-label="Chat on WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Get Quote in maroon, so coral is left for the main shopping action */}
            <button
              onClick={onOpenInquiry}
              className="bg-[#7A1730] hover:bg-[#62112A] text-[#FDF5EC] w-9 h-9 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 shrink-0"
              aria-label="Get a quote"
            >
              <MessageSquare className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Get Quote</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-[#7A1730]/[0.06] flex items-center justify-center text-[#2B1A12] lg:hidden shrink-0 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search (below the bar on small screens) */}
        <div className="md:hidden px-3 sm:px-4 pb-2.5">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search bandhanwar, mats, strings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/70 text-stone-800 text-sm rounded-full py-2.5 pl-9 pr-9 border border-[#EADBC8] focus:outline-none focus:ring-2 focus:ring-[#7A1730]/15 focus:border-[#7A1730]/50"
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

        {/* Mobile menu drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EADBC8] bg-[#FDF5EC] px-4 sm:px-5 py-4 space-y-3 text-sm font-medium text-stone-700 shadow-xl animate-slide-down max-h-[70vh] overflow-y-auto">
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
                    className={`block px-3 py-3 rounded-xl text-sm transition-colors ${
                      isActive
                        ? 'bg-[#7A1730]/[0.07] text-[#7A1730] font-semibold'
                        : 'font-medium hover:bg-[#7A1730]/[0.04] text-stone-700 hover:text-[#7A1730]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 grid grid-cols-2 gap-2.5 border-t border-[#EADBC8]">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-[#7A1730]/30 text-[#7A1730] hover:bg-[#7A1730]/[0.05] py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full bg-[#7A1730] hover:bg-[#62112A] text-[#FDF5EC] py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Get Quote</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

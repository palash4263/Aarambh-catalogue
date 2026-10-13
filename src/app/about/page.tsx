'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InquiryModal from '@/components/InquiryModal';
import MobileActionBar, { whatsappUrl } from '@/components/MobileActionBar';
import { mockProducts } from '@/data/products';
import { MessageCircle } from 'lucide-react';

// Swap these for a photo of you or your artisans at work once you have one;
// until then a real workshop shot stands in, with a finished piece over it.
const STORY_PHOTO = { src: '/images/red_rose_pearl_bandhanwar_angle.jpg', alt: 'Rose bandhanwars being finished in the Aarambh workshop' };
const STORY_PRINT = { src: '/images/shubh_labh_pink_tassel_hanging_latkan.jpg', alt: 'A finished Shubh Labh latkan pair' };

// Products shown in the "From our workshop" grid.
const WORKSHOP_IDS = ['real-24', 'real-19', 'real-22', 'real-28'];

const STEPS = [
  { title: 'Share your idea', text: 'Message us on WhatsApp with a photo, the colours you like, a name, or the size you need.' },
  { title: 'We suggest a design', text: 'We reply with a design and a price, and adjust it until it feels right.' },
  { title: 'We handcraft it', text: 'Your piece is cut, stitched and finished by hand, just for you.' },
  { title: 'Ready for your celebration', text: 'We pack it with care and send it to your door.' },
];

const CUSTOM_ORDER_MESSAGE = "Hi Aarambh! I'd like to request a custom order. Here's my idea:";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 text-[#B8893B] text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#C9A13B]" />
      {children}
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#C9A13B]" />
    </div>
  );
}

export default function AboutPage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const workshop = WORKSHOP_IDS.map((id) => mockProducts.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p?.imageUrl)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] pb-20 md:pb-0">
      <Header
        onOpenInquiry={() => setIsInquiryModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1 w-full min-w-0">
        {/* Intro */}
        <section className="bg-gradient-to-b from-[#FDF5EC] to-[#FAF8F5] px-4 pt-10 sm:pt-14 pb-8 text-center space-y-3 sm:space-y-4">
          <Eyebrow>Our Story</Eyebrow>
          <h1 className="text-3xl sm:text-5xl font-semibold text-[#2B1A12] font-['Cinzel',serif] tracking-[0.06em]">
            About Aarambh
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Custom festive décor, handcrafted with love and made for you. You name it, we create it.
          </p>
        </section>

        {/* Story: photo + text */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="relative max-w-sm mx-auto w-full md:max-w-none pr-6 pb-6 sm:pr-10 sm:pb-10">
            <img src={STORY_PHOTO.src} alt={STORY_PHOTO.alt} className="w-full aspect-[4/5] object-cover rounded-3xl shadow-lg" />
            <img
              src={STORY_PRINT.src}
              alt={STORY_PRINT.alt}
              className="absolute right-0 bottom-0 w-[42%] aspect-[3/4] object-cover rounded-2xl border-4 border-white shadow-xl rotate-6"
            />
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#2B1A12] font-['Cinzel',serif] tracking-[0.04em] leading-snug">
              Made by hand, <span className="text-[#7A1730]">for your celebrations</span>
            </h2>
            <div className="h-px w-20 mx-auto md:mx-0 bg-gradient-to-r from-[#B8893B] via-[#E6C878] to-transparent" />
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Aarambh means “a beginning”, and every piece we make is meant to mark one: a new home, a wedding, the
              first diya of Diwali. Each bandhanwar, string and mat is cut, stitched and finished by hand, so no two are
              ever exactly alike.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Because we make everything ourselves, we can make it your way. Share the colours of your décor, a name you
              would like worked in, or the size of your doorway, and we will create a piece that is truly yours.
            </p>
          </div>
        </section>

        {/* How custom orders work */}
        <section className="bg-[#FDF5EC] border-y border-[#EADBC8]/70">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8 sm:space-y-10">
            <div className="text-center space-y-3">
              <Eyebrow>You name it, we create it</Eyebrow>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#2B1A12] font-['Cinzel',serif] tracking-[0.04em]">
                How Custom Orders Work
              </h2>
            </div>

            {/* Numbered steps joined by a gold line: vertical on phones, horizontal from md up */}
            <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
              <span className="absolute left-5 top-5 bottom-5 w-px bg-[#C9A13B]/60 md:hidden" aria-hidden="true" />
              <span className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-[#C9A13B]/60" aria-hidden="true" />
              {STEPS.map((step, i) => (
                <li key={step.title} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-3 md:text-center">
                  <span className="relative z-10 w-10 h-10 shrink-0 rounded-full bg-[#7A1730] text-[#FDF5EC] font-['Cinzel',serif] font-semibold flex items-center justify-center ring-4 ring-[#FDF5EC]">
                    {i + 1}
                  </span>
                  <div className="space-y-1 pt-1.5 md:pt-0">
                    <h3 className="font-semibold text-[#2B1A12] text-sm sm:text-base">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* From our workshop */}
        {workshop.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6 sm:space-y-8">
            <div className="text-center space-y-3">
              <Eyebrow>Handcrafted</Eyebrow>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#2B1A12] font-['Cinzel',serif] tracking-[0.04em]">
                From Our Workshop
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {workshop.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="group block rounded-2xl overflow-hidden bg-white shadow-sm">
                  <img src={p.imageUrl} alt={p.name} loading="lazy" className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105" />
                  <p className="px-3 py-2.5 text-xs sm:text-sm text-stone-700 font-medium truncate">{p.name}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Closing call to action */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="relative overflow-hidden rounded-3xl bg-[#7A1730] text-center px-6 py-10 sm:py-14 space-y-4">
            <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-[#E6C878]/30 pointer-events-none" aria-hidden="true" />
            <h2 className="relative text-2xl sm:text-3xl font-semibold text-[#FDF5EC] font-['Cinzel',serif] tracking-[0.04em]">
              Have Something in Mind?
            </h2>
            <p className="relative text-[#F6E7C8]/90 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Send us a photo or a few words about your idea, and we’ll take it from there.
            </p>
            <a
              href={whatsappUrl(CUSTOM_ORDER_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 bg-[#FDF5EC] hover:bg-white text-[#7A1730] px-6 py-3 rounded-full text-sm font-semibold shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Order on WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <MobileActionBar message={CUSTOM_ORDER_MESSAGE} />
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </div>
  );
}

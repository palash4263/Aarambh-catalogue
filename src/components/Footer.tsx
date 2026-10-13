'use client';

import React from 'react';
import Link from 'next/link';
import { Hand, Palette, MessageCircle, Sparkles, Phone, Mail, Instagram } from 'lucide-react';
import LogoMark from '@/components/Logo';
import { mockCategories } from '@/data/products';
import { PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from '@/components/MobileActionBar';

// Set this to your Instagram profile URL to show it in the footer.
const INSTAGRAM_URL: string | null = null;
const EMAIL = 'monu.tani@gmail.com';

const TRUST_POINTS = [
  { icon: Hand, title: '100% Handmade', text: 'Cut, stitched and finished by hand' },
  { icon: Palette, title: 'Custom Orders', text: 'Your colours, names and sizes' },
  { icon: MessageCircle, title: 'Order on WhatsApp', text: 'Chat with us directly to order' },
  { icon: Sparkles, title: 'For Every Celebration', text: 'Diwali, weddings and housewarmings' },
];

export default function Footer() {
  return (
    <footer className="bg-[#2B1A12] text-[#E9DCC8] pt-10 sm:pt-12 pb-8 mt-10 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">

        {/* Trust points, all in the same gold */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 pb-8 sm:pb-10 border-b border-[#E6C878]/15">
          {TRUST_POINTS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#E6C878]/40 text-[#E6C878] flex items-center justify-center shrink-0">
                <Icon className="w-[18px] h-[18px]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-sm text-[#FDF5EC]">{title}</h4>
                <p className="text-xs text-[#E9DCC8]/60 leading-snug">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <LogoMark variant="outline" className="w-9 h-9 text-[#E6C878]" />
              <span className="text-xl font-semibold tracking-[0.08em] text-[#FDF5EC] font-['Cinzel',serif]">Aarambh</span>
            </div>
            <p className="text-xs text-[#E9DCC8]/60 leading-relaxed max-w-xs">
              Custom décor · Handcrafted with love · Made for you. Bandhanwars, festive strings, mats and more for
              your celebrations.
            </p>
          </div>

          {/* Collections */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-semibold text-[#E6C878] text-xs uppercase tracking-[0.2em]">Collections</h5>
            <ul className="space-y-2 text-xs">
              {mockCategories.map((c) => (
                <li key={c.id}>
                  <Link href={`/collections/${c.slug}`} className="text-[#E9DCC8]/70 hover:text-[#FDF5EC] transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="font-semibold text-[#E6C878] text-xs uppercase tracking-[0.2em]">Get in Touch</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href={PHONE_TEL} className="inline-flex items-center gap-2 text-[#E9DCC8]/70 hover:text-[#FDF5EC] transition-colors">
                  <Phone className="w-4 h-4 text-[#E6C878]" /> {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl('Hi Aarambh! I have a question about your décor.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#E9DCC8]/70 hover:text-[#FDF5EC] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#E6C878]" /> WhatsApp us
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 text-[#E9DCC8]/70 hover:text-[#FDF5EC] transition-colors break-all">
                  <Mail className="w-4 h-4 text-[#E6C878] shrink-0" /> {EMAIL}
                </a>
              </li>
              {INSTAGRAM_URL && (
                <li>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#E9DCC8]/70 hover:text-[#FDF5EC] transition-colors">
                    <Instagram className="w-4 h-4 text-[#E6C878]" /> Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E6C878]/15 text-xs text-[#E9DCC8]/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <span>© {new Date().getFullYear()} Aarambh Creations. All rights reserved.</span>
          <span>You name it, we create it.</span>
        </div>
      </div>
    </footer>
  );
}

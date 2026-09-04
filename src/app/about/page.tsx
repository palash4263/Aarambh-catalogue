'use client';

import React, { useState } from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DeliveryModal from '@/components/DeliveryModal';
import InquiryModal from '@/components/InquiryModal';
import { DeliveryLocation } from '@/types';
import { Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation>({
    pincode: '110001',
    city: 'New Delhi',
    state: 'Delhi',
    expressAvailable: true,
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <AnnouncementBar />
      <Header
        onOpenInquiry={() => setIsInquiryModalOpen(true)}
        onOpenDeliveryModal={() => setIsDeliveryModalOpen(true)}
        location={deliveryLocation}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1 w-full min-w-0 max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8 sm:space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FDEAEA] text-[#E65D5D] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Story</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-display">
            About Aarambh
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto">
            Crafting elegance and festive joy for homes across India. Specializing in handcrafted mirror rangoli mats, brass diyas, brocade pooja chowkis, and traditional door latkans.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6">
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-stone-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg">Master Artisans</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Every item is handcrafted by traditional artisans using premium silk, brocade fabric, and genuine mirror artwork.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-stone-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E65D5D] flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg">Festive Perfection</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Designed specifically to bring auspicious warmth to Diwali, Housewarmings, Weddings, and daily home shrines.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-stone-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg">Express Delivery</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Guaranteed 4-hour express delivery options in select metro cities so your celebration never waits.
            </p>
          </div>
        </div>
      </main>

      <Footer />

      <DeliveryModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
        currentLocation={deliveryLocation}
        onSaveLocation={(loc) => setDeliveryLocation(loc)}
      />

      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </div>
  );
}

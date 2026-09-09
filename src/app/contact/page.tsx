'use client';

import React, { useState } from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DeliveryModal from '@/components/DeliveryModal';
import InquiryModal from '@/components/InquiryModal';
import { DeliveryLocation } from '@/types';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation>({
    pincode: '110001',
    city: 'New Delhi',
    state: 'Delhi',
    expressAvailable: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-display">Contact Customer Support</h1>
          <p className="text-stone-600 text-sm">Have questions about bulk orders, custom latkan designs, or express delivery?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-stone-100 shadow-sm">
          
          <div className="md:col-span-5 space-y-5 sm:space-y-6 bg-[#FAF3EB] p-5 sm:p-6 rounded-2xl border border-amber-100">
            <h3 className="font-bold text-stone-900 text-lg font-display">Get in Touch</h3>
            
            <div className="space-y-4 text-xs text-stone-700">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-white text-[#E65D5D] flex items-center justify-center shadow-sm shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold">Phone / WhatsApp</span>
                  <span>+91 97909 96188</span>
                </div>
              </div>

              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-white text-[#E65D5D] flex items-center justify-center shadow-sm shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold">Email</span>
                  <a href="mailto:monu.tani@gmail.com" className="break-all hover:text-[#E65D5D] transition-colors">
                    monu.tani@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-white text-[#E65D5D] flex items-center justify-center shadow-sm shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-semibold">Address</span>
                  <span>Design Hub, Connaught Place, New Delhi 110001</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="font-bold text-lg text-stone-900">Message Sent Successfully!</h3>
                <p className="text-xs text-stone-500">Thank you for contacting Aarambh. Our support team will respond within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65D5D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="priya@example.com"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65D5D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help you?"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65D5D]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E65D5D] hover:bg-[#d64d4d] text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
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

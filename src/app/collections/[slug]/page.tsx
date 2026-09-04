'use client';

import React, { useState, useEffect } from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import DeliveryModal from '@/components/DeliveryModal';
import InquiryModal from '@/components/InquiryModal';
import Footer from '@/components/Footer';
import { Product, DeliveryLocation } from '@/types';
import { Sparkles } from 'lucide-react';

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation>({
    pincode: '110001',
    city: 'New Delhi',
    state: 'Delhi',
    expressAvailable: true,
  });

  useEffect(() => {
    async function fetchBackendData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products?category=${params.slug}`, { cache: 'no-store' });
        const json = await res.json();
        if (json.success) {
          setProducts(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch from backend API:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBackendData();
  }, [params.slug]);

  const categoryTitles: Record<string, string> = {
    festivals: '🪔 Festival Lights & Diyas Collection',
    'house-decor': '🏠 House Decor & Handicrafts',
    'wall-hangings': '🎈 Wall & Door Hanging Latkans',
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <AnnouncementBar />

      <Header
        onOpenInquiry={() => {
          setSelectedProduct(null);
          setIsInquiryModalOpen(true);
        }}
        onOpenDeliveryModal={() => setIsDeliveryModalOpen(true)}
        location={deliveryLocation}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1 w-full min-w-0 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <div className="bg-gradient-to-r from-[#FDEAEA] to-[#FAF3EB] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-red-100/60 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[#E65D5D] uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Digital Catalogue Showcase</span>
          </div>
          <h1 className="text-xl sm:text-4xl font-extrabold text-stone-900 font-display break-words">
            {categoryTitles[params.slug] || `Collection: ${params.slug}`}
          </h1>
          <p className="text-[13px] sm:text-sm text-stone-600 mt-2 max-w-2xl">
            Explore authentic handcrafted products carefully designed for your home decor and festive celebrations.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-stone-500">
            Loading collection items from server API...
          </div>
        ) : (
          <ProductGrid
            products={products}
            onAddToCart={(p) => {
              setSelectedProduct(p);
              setIsInquiryModalOpen(true);
            }}
            searchQuery={searchQuery}
          />
        )}
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
        product={selectedProduct}
      />
    </div>
  );
}

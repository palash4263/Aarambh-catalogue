'use client';

import React, { useState, useEffect } from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import ProductGrid from '@/components/ProductGrid';
import DeliveryModal from '@/components/DeliveryModal';
import InquiryModal from '@/components/InquiryModal';
import Footer from '@/components/Footer';
import { mockProducts } from '@/data/products';
import { Product, DeliveryLocation } from '@/types';

export default function Home() {
  // Live catalogue from the API (Supabase). mockProducts is only the offline
  // fallback so the page never renders empty if the DB is unreachable.
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState<Product | null>(null);
  
  const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation>({
    pincode: '110001',
    city: 'New Delhi',
    state: 'Delhi',
    expressAvailable: true,
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchCatalogue() {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        const json = await res.json();
        if (!cancelled && json.success && Array.isArray(json.data) && json.data.length) {
          setProducts(json.data);
        }
      } catch (err) {
        // Keep the local fallback already in state.
        console.warn('Catalogue fetch failed, showing local data:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCatalogue();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleOpenInquiryForProduct = (product?: Product | null) => {
    setSelectedProductForInquiry(product || null);
    setIsInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Main Header */}
      <Header
        onOpenInquiry={() => handleOpenInquiryForProduct(null)}
        onOpenDeliveryModal={() => setIsDeliveryModalOpen(true)}
        location={deliveryLocation}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Body */}
      <main className="flex-1 space-y-4">
        {/* Category Hero Banner */}
        <HeroBanner />

        {/* Product Catalog Grid */}
        <ProductGrid
          products={products}
          onAddToCart={(p) => handleOpenInquiryForProduct(p)}
          searchQuery={searchQuery}
          loading={loading}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Delivery Pincode Modal */}
      <DeliveryModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
        currentLocation={deliveryLocation}
        onSaveLocation={(loc) => setDeliveryLocation(loc)}
      />

      {/* Catalogue Quote Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        product={selectedProductForInquiry}
      />
    </div>
  );
}

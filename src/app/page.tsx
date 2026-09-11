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
import { getActiveFestival, applyFestival } from '@/data/festivals';
import { Product, DeliveryLocation, Festival } from '@/types';

export default function Home() {
  // Which festival the storefront is dressed for. Resolved from the calendar so
  // server and client agree on first render; a ?festival= override is picked up
  // after mount (see below) purely as a preview/demo hatch.
  const [festival, setFestival] = useState<Festival | null>(() => getActiveFestival());

  // Live catalogue from the API (Supabase). mockProducts is only the offline
  // fallback so the page never renders empty if the DB is unreachable.
  const [products, setProducts] = useState<Product[]>(() =>
    applyFestival(mockProducts, getActiveFestival())
  );
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

    // Read the override from location rather than useSearchParams(), which would
    // force this route behind a Suspense boundary at build time.
    const override = new URLSearchParams(window.location.search).get('festival');
    const active = getActiveFestival(undefined, override);
    if (!cancelled) {
      setFestival(active);
      setProducts(applyFestival(mockProducts, active));
    }

    async function fetchCatalogue() {
      try {
        // Send the resolved slug (or 'none') so the API filters the same way the
        // page does — otherwise an override would theme the UI for one festival
        // while the grid showed another's products.
        const res = await fetch(`/api/products?festival=${active?.slug ?? 'none'}`, {
          cache: 'no-store',
        });
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
      <AnnouncementBar festival={festival} />

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
        <HeroBanner festival={festival} />

        {/* Product Catalog Grid */}
        <ProductGrid
          products={products}
          onAddToCart={(p) => handleOpenInquiryForProduct(p)}
          searchQuery={searchQuery}
          loading={loading}
          festival={festival}
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

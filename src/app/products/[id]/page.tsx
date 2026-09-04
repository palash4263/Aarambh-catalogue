'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DeliveryModal from '@/components/DeliveryModal';
import InquiryModal from '@/components/InquiryModal';
import ProductCard from '@/components/ProductCard';
import { Product, DeliveryLocation } from '@/types';
import { mockProducts } from '@/data/products';
import {
  Star,
  MessageSquare,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Share2,
  Phone,
} from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [catalogue, setCatalogue] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation>({
    pincode: '110001',
    city: 'New Delhi',
    state: 'Delhi',
    expressAvailable: true,
  });

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${params.id}`, { cache: 'no-store' });
        const json = await res.json();
        if (json.success && json.data) {
          setProduct(json.data);
        } else {
          const local = mockProducts.find((p) => p.id === params.id);
          if (local) setProduct(local);
        }
      } catch (err) {
        const local = mockProducts.find((p) => p.id === params.id);
        if (local) setProduct(local);
      } finally {
        setLoading(false);
      }
    }
    fetchProductDetails();
  }, [params.id]);

  // Related items come from the live catalogue so their prices match the
  // product page they link to; mockProducts stays as the offline fallback.
  useEffect(() => {
    let cancelled = false;

    async function fetchCatalogue() {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        const json = await res.json();
        if (!cancelled && json.success && Array.isArray(json.data) && json.data.length) {
          setCatalogue(json.data);
        }
      } catch (err) {
        console.warn('Related products fetch failed, showing local data:', err);
      }
    }

    fetchCatalogue();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
        <AnnouncementBar />
        <div className="flex-1 flex items-center justify-center text-stone-500 text-sm">
          Loading catalog item...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
        <AnnouncementBar />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
          <h2 className="text-2xl font-bold text-stone-900 font-display">Product Not Found</h2>
          <p className="text-stone-500 text-sm">The item you are looking for is unavailable in our catalog.</p>
          <Link href="/" className="bg-[#E65D5D] text-white px-6 py-2.5 rounded-full text-xs font-semibold">
            Return to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Prefer items from the same category, then fill from the rest of the catalogue.
  const relatedProducts = [
    ...catalogue.filter((p) => p.id !== product.id && p.category === product.category),
    ...catalogue.filter((p) => p.id !== product.id && p.category !== product.category),
  ].slice(0, 4);

  const whatsappMessage = encodeURIComponent(
    `Hi Aarambh! I'm interested in "${product.name}" (Price: ₹${product.price}). Please share wholesale/retail catalog details.`
  );

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

      <main className="flex-1 w-full min-w-0 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-8 sm:space-y-12">

        {/* Breadcrumb Links — scrolls sideways instead of wrapping on phones */}
        <nav className="flex items-center gap-2 text-[11px] sm:text-xs text-stone-500 font-medium overflow-x-auto scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0 whitespace-nowrap">
          <Link href="/" className="hover:text-stone-900 shrink-0">Catalogue</Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href={`/collections/${product.category}`} className="hover:text-stone-900 capitalize shrink-0">
            {product.category.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-stone-900 font-semibold truncate max-w-[10rem] sm:max-w-xs">{product.name}</span>
        </nav>

        {/* Product Details Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">

          {/* Left: Image Gallery View */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
            <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-md">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Badge Overlays */}
              {product.badge && (
                <div className="absolute top-4 left-4 bg-stone-900/90 text-white text-xs font-bold px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-md">
                  {product.badge}
                </div>
              )}

              {product.tagOverlay && (
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="inline-block bg-stone-900/80 text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/20">
                    {product.tagOverlay}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Catalog Info & Inquiry Actions */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-stone-100 shadow-sm">

            {/* Title & Category */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] sm:text-xs font-bold text-[#E65D5D] uppercase tracking-wider bg-[#FDEAEA] px-2.5 sm:px-3 py-1 rounded-full">
                  Artisanal Collection Item
                </span>
                <button className="text-stone-400 hover:text-stone-700 flex items-center gap-1 text-xs shrink-0">
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share Product</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3 text-xs font-semibold text-amber-500">
                <div className="flex items-center bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="ml-1 text-stone-900">{product.rating}</span>
                </div>
                <span className="text-stone-500 font-normal">({product.reviewsCount} Customer Reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/60 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-stone-900">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-base text-stone-400 line-through">₹{product.originalPrice}</span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Save {discountPercent}% OFF
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500">Available for retail & wholesale bulk inquiries</p>
            </div>

            {/* Description */}
            <div className="space-y-2 text-stone-700 text-sm leading-relaxed">
              <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">Product Details</h4>
              <p>{product.description}</p>
            </div>

            {/* Delivery Estimator */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FDEAEA]/50 border border-red-100 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs">
              <div className="flex items-center gap-2.5 text-stone-800 min-w-0">
                <Truck className="w-4 h-4 text-[#E65D5D] shrink-0" />
                <span>
                  Delivery to <strong>{deliveryLocation.pincode}</strong>: <strong className="text-[#E65D5D]">Express 4 Hours</strong>
                </span>
              </div>
              <button
                onClick={() => setIsDeliveryModalOpen(true)}
                className="text-[#E65D5D] font-bold underline hover:text-[#d64d4d] shrink-0"
              >
                Change
              </button>
            </div>

            {/* Catalogue Inquiry Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/919790996188?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-4 sm:px-6 rounded-2xl text-[13px] sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-center"
              >
                <Phone className="w-4 h-4 fill-white shrink-0" />
                <span>Instant WhatsApp Inquiry<span className="hidden sm:inline"> (+91 97909 96188)</span></span>
              </a>

              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full bg-[#E65D5D] hover:bg-[#d64d4d] text-white py-3.5 px-4 sm:px-6 rounded-2xl text-[13px] sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 text-center"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Request Catalog Quote<span className="hidden sm:inline"> / Bulk Details</span></span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-stone-100 text-[10px] sm:text-[11px] text-stone-600 text-center">
              <div className="space-y-1">
                <Sparkles className="w-4 h-4 mx-auto text-amber-500" />
                <span>100% Handcrafted</span>
              </div>
              <div className="space-y-1">
                <ShieldCheck className="w-4 h-4 mx-auto text-emerald-500" />
                <span>Verified Quality</span>
              </div>
              <div className="space-y-1">
                <RotateCcw className="w-4 h-4 mx-auto text-blue-500" />
                <span>Customization Available</span>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Section */}
        <div className="space-y-5 sm:space-y-6 pt-6 border-t border-stone-200/60">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">More Catalogue Items</h3>
            <Link href="/" className="text-[10px] sm:text-xs font-bold text-[#E65D5D] hover:underline uppercase tracking-wider text-right shrink-0">
              View <span className="hidden sm:inline">Full </span>Catalogue
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>

      </main>

      {/* Sticky mobile action bar — keeps the inquiry CTAs reachable while scrolling */}
      <div className="lg:hidden sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 pt-3 pb-safe flex items-center gap-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="min-w-0 pr-1">
          <div className="text-base font-extrabold text-stone-900 leading-none">₹{product.price}</div>
          {discountPercent > 0 && (
            <span className="text-[10px] text-emerald-600 font-bold">Save {discountPercent}%</span>
          )}
        </div>
        <a
          href={`https://wa.me/919790996188?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0"
          aria-label="Inquire on WhatsApp"
        >
          <Phone className="w-4 h-4 fill-emerald-600 stroke-emerald-600" />
        </a>
        <button
          onClick={() => setIsInquiryModalOpen(true)}
          className="flex-1 bg-[#E65D5D] active:bg-[#d64d4d] text-white h-11 rounded-2xl text-[13px] font-bold shadow-sm flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-4 h-4 shrink-0" />
          <span>Request Quote</span>
        </button>
      </div>

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
        product={product}
      />
    </div>
  );
}

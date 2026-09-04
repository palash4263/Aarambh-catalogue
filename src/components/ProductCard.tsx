'use client';

import React from 'react';
import Link from 'next/link';
import { Star, MessageSquare, Phone, ArrowUpRight } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onInquire?: (product: Product) => void;
}

export default function ProductCard({ product, onInquire }: ProductCardProps) {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const whatsappMessage = encodeURIComponent(
    `Hi Aarambh! I'm interested in viewing catalog details for "${product.name}" (Price: ₹${product.price}).`
  );

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative">
      
      {/* Product Image Link Container */}
      <Link href={`/products/${product.id}`} className="relative aspect-square overflow-hidden bg-stone-100 block cursor-pointer">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-Left Dark Pill Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-stone-900/90 text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full backdrop-blur-md shadow-md z-10 max-w-[calc(100%-1rem)] truncate">
            {product.badge}
          </div>
        )}

        {/* Image Text Tag Overlay */}
        {product.tagOverlay && (
          <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 text-center z-10">
            <span className="inline-block max-w-full truncate bg-stone-900/70 text-white text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-2 sm:px-2.5 py-1 rounded-md backdrop-blur-md border border-white/20">
              {product.tagOverlay}
            </span>
          </div>
        )}
      </Link>

      {/* Details Container */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between gap-2.5 sm:gap-3">
        <div>
          {/* Rating & Review Count */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-amber-500 font-semibold mb-1">
            <div className="flex items-center">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="ml-1 text-stone-800">{product.rating}</span>
            </div>
            <span className="text-stone-400 font-normal">({product.reviewsCount})</span>
          </div>

          {/* Product Name Link */}
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-semibold text-stone-900 text-[13px] sm:text-sm line-clamp-2 group-hover:text-[#E65D5D] transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Delivery Note */}
        {product.deliveryEstimate && (
          <p className="text-[10px] sm:text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded max-w-full truncate">
            ⚡ {product.deliveryEstimate}
          </p>
        )}

        {/* Price & Catalogue Inquiry Action — stacks on phones, sits inline from md up */}
        <div className="pt-2 border-t border-stone-100 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-bold text-stone-900 text-sm sm:text-base">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-[11px] sm:text-xs text-stone-400 line-through">₹{product.originalPrice}</span>
              )}
              {discountPercent > 0 && (
                <span className="text-[10px] text-emerald-600 font-bold md:hidden">-{discountPercent}%</span>
              )}
            </div>
            {discountPercent > 0 && (
              <span className="hidden md:inline text-[10px] text-emerald-600 font-bold">Save {discountPercent}%</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* WhatsApp Quick Chat */}
            <a
              href={`https://wa.me/919790996188?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-200 transition-colors shrink-0"
              title="Inquire on WhatsApp"
              aria-label="Inquire on WhatsApp"
            >
              <Phone className="w-3.5 h-3.5 fill-emerald-600 stroke-emerald-600" />
            </a>

            {/* View Details Link */}
            <Link
              href={`/products/${product.id}`}
              className="flex-1 md:flex-none bg-[#E65D5D] hover:bg-[#d64d4d] text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1"
            >
              <span>View</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

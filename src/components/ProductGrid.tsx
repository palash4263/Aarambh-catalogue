'use client';

import React, { useState } from 'react';
import { Product, Festival } from '@/types';
import ProductCard from './ProductCard';
import { FESTIVALS } from '@/data/festivals';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  searchQuery: string;
  loading?: boolean;
  festival?: Festival | null;
}

const DEFAULT_THEME = FESTIVALS.find((f) => f.slug === 'diwali')!.theme;

// Display names for the category slugs used in the database.
const CATEGORY_LABELS: Record<string, string> = {
  festivals: '🪔 Festival Lights & Diyas',
  'house-decor': '🏠 House Decor & Crafts',
  'wall-hangings': '🎈 Wall & Door Hangings',
  'party-hampers': '🎁 Party & Gift Hampers',
};

export default function ProductGrid({
  products,
  onAddToCart,
  searchQuery,
  loading = false,
  festival = null,
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'low-high' | 'high-low' | 'rating'>('featured');

  const theme = festival?.theme ?? DEFAULT_THEME;
  const isExclusive = festival?.mode === 'exclusive';

  // Build the filter pills from the categories actually present, so a pill can
  // never point at an empty category and no category is left unreachable.
  const categories = [
    { id: 'all', label: festival ? `All ${festival.name} Picks` : 'All Products' },
    ...Array.from(new Set(products.map((p) => p.category))).map((id) => ({
      id,
      label: CATEGORY_LABELS[id] || id.replace(/-/g, ' '),
    })),
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'low-high') return a.price - b.price;
    if (sortBy === 'high-low') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured
  });

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5 sm:space-y-6">

      {/* Section Header Matching Reference Screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200/60 pb-4 gap-3 sm:gap-4">

        {/* Left: Collection Title */}
        <div>
          <div
            className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1"
            style={{ color: theme.accentDark }}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{festival ? theme.eyebrow : 'Handcrafted Collection'}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 font-display">
            {festival ? theme.collectionTitle : 'Festive & House Decor'}
          </h2>
          {isExclusive && (
            <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
              Showing {festival!.name} essentials only — our full decor range is
              back right after the festival.
            </p>
          )}
        </div>

        {/* Right: Item Count Header with Accent Underline (Matching Screenshot '37 total results') */}
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="relative pb-1 shrink-0">
            <span className="text-[#71717A] text-xs sm:text-sm font-medium">
              <strong className="text-stone-900 font-bold">{sortedProducts.length}</strong> total results
            </span>
            <div
              className="absolute bottom-0 right-0 left-0 h-0.5 rounded-full"
              style={{ backgroundColor: theme.accent }}
            ></div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-full pl-3 pr-2 py-1.5 text-xs text-stone-700 font-medium min-w-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-stone-800 focus:outline-none cursor-pointer text-xs max-w-[9.5rem] truncate"
              aria-label="Sort products"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Category Pills — swipeable rail on phones, edge-to-edge like the
          reference. Hidden during an exclusive festival: the whole shelf is the
          festival collection, so splitting it by category only buries products. */}
      {!isExclusive && (
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0 pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-stone-900 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      )}

      {/* Grid of Product Cards */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-stone-100 overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-stone-200/70" />
              <div className="p-3 sm:p-4 space-y-2">
                <div className="h-3 w-12 bg-stone-200/70 rounded" />
                <div className="h-3 w-full bg-stone-200/70 rounded" />
                <div className="h-3 w-2/3 bg-stone-200/70 rounded" />
                <div className="h-7 w-full bg-stone-200/70 rounded-xl mt-3" />
              </div>
            </div>
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-white rounded-2xl sm:rounded-3xl border border-stone-100 px-5 sm:p-8">
          <p className="text-stone-500 text-sm sm:text-base">No decorative items match your filter/search criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs font-bold hover:underline"
            style={{ color: theme.accentDark }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onInquire={onAddToCart} />
          ))}
        </div>
      )}
    </section>
  );
}

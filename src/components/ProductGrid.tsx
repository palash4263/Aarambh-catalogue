'use client';

import React, { useState } from 'react';
import { Product, Festival } from '@/types';
import ProductCard from './ProductCard';
import ProductMedia from './ProductMedia';
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
  festivals: 'Plates & Rangoli',
  'wall-hangings': 'Wall & Door Hangings',
  bandhanwar: 'Bandhanwar & Torans',
  'festive-strings': 'Festive Strings',
  'chand-strings': 'Chand Strings',
  mats: 'Mats',
  'party-hampers': 'Party & Gift Hampers',
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

  // Build the category tiles from the categories actually present, so a tile
  // can never point at an empty category and no category is left unreachable.
  // Each tile shows the first product in its category as its thumbnail.
  const categoryTiles = Array.from(new Set(products.map((p) => p.category))).map((id) => ({
    id,
    label: CATEGORY_LABELS[id] || id.replace(/-/g, ' '),
    cover: products.find((p) => p.category === id),
  }));
  // "All" gets a photo of its own — one not already used by a category tile.
  const allCover = products.find((p) => p.imageUrl && !categoryTiles.some((t) => t.cover === p));
  const categories: { id: string; label: string; cover?: Product }[] = [
    { id: 'all', label: festival ? `All ${festival.name} Picks` : 'All Products', cover: allCover },
    ...categoryTiles,
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
    <section id="catalog" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6 sm:pb-8 space-y-5 sm:space-y-6">

      {/* Section Header Matching Reference Screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200/60 pb-4 gap-3 sm:gap-4">

        {/* Left: Collection Title */}
        <div>
          <h2 className="text-xl sm:text-3xl font-semibold text-[#2B1A12] font-['Cinzel',serif] tracking-[0.12em] leading-snug">
            {festival ? theme.collectionTitle : 'Festive & House Decor'}
          </h2>
          <div className="mt-2 h-px w-20 sm:w-28 bg-gradient-to-r from-[#B8893B] via-[#E6C878] to-transparent" />
          {isExclusive && (
            <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
              Showing {festival!.name} essentials only — our full decor range is
              back right after the festival.
            </p>
          )}
        </div>

        {/* Right: Item Count Header with Accent Underline (Matching Screenshot '37 total results') */}
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
          <span className="text-stone-500 text-xs sm:text-sm shrink-0">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
          </span>

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

      {/* Category tiles — a round thumbnail with the name underneath. On phones
          the rail swipes edge to edge and the next tile peeks in to show there
          is more. Hidden during an exclusive festival: the whole shelf is the
          festival collection, so splitting it by category only buries products. */}
      {!isExclusive && (
      <div className="flex items-start lg:justify-center gap-3 sm:gap-5 overflow-x-auto scrollbar-none snap-x -mx-3 px-3 sm:mx-0 sm:px-0 pb-1">
        {categories.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              aria-pressed={active}
              className="group snap-start shrink-0 w-[4.5rem] sm:w-24 flex flex-col items-center gap-2 text-center"
            >
              <span
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[3px] transition-all ${
                  active
                    ? 'bg-[#7A1730] shadow-md'
                    : 'bg-stone-200/80 group-hover:bg-[#7A1730]/40'
                }`}
              >
                <span className="block w-full h-full rounded-full overflow-hidden bg-[#FAF8F5] ring-2 ring-[#FAF8F5]">
                  {cat.cover ? (
                    <ProductMedia
                      product={cat.cover}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <span
                      className="w-full h-full flex items-center justify-center text-white"
                      style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})` }}
                    >
                      <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
                    </span>
                  )}
                </span>
              </span>
              <span
                className={`text-[11px] sm:text-xs leading-tight line-clamp-2 transition-colors ${
                  active ? 'text-[#2B1A12] font-bold' : 'text-stone-600 font-medium group-hover:text-stone-900'
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
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

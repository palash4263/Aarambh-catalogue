import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { mockProducts } from '@/data/products';

// Catalogue data must never be served from a build-time or Data Cache:
// prices edited in Supabase have to appear on the next page load.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('q');
  const sort = searchParams.get('sort');

  // 1. If Supabase is configured, fetch live from Supabase PostgreSQL Database
  if (isSupabaseConfigured && supabase) {
    try {
      let queryBuilder = supabase.from('products').select('*');

      if (category && category !== 'all') {
        queryBuilder = queryBuilder.eq('category', category);
      }

      if (query) {
        queryBuilder = queryBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%`);
      }

      if (sort === 'low-high') {
        queryBuilder = queryBuilder.order('price', { ascending: true });
      } else if (sort === 'high-low') {
        queryBuilder = queryBuilder.order('price', { ascending: false });
      } else if (sort === 'rating') {
        queryBuilder = queryBuilder.order('rating', { ascending: false });
      }

      const { data, error } = await queryBuilder;

      if (!error && data) {
        // Map database column names to typescript camelCase format
        const mappedData = data.map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          price: p.price,
          originalPrice: p.original_price,
          rating: p.rating,
          reviewsCount: p.reviews_count,
          badge: p.badge,
          tagOverlay: p.tag_overlay,
          imageUrl: p.image_url,
          inStock: p.in_stock,
          description: p.description,
          deliveryEstimate: p.delivery_estimate,
        }));

        return NextResponse.json({
          success: true,
          source: 'Supabase PostgreSQL DB',
          total: mappedData.length,
          data: mappedData,
        },
      { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
    );
      }
    } catch (err) {
      console.warn('Supabase query failed, falling back to local dataset:', err);
    }
  }

  // 2. Fallback to local data layer
  let filtered = [...mockProducts];

  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (query) {
    const qLower = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(qLower) ||
        p.description.toLowerCase().includes(qLower)
    );
  }

  if (sort === 'low-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'high-low') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return NextResponse.json({
    success: true,
    source: 'Local Backend Data Layer',
    total: filtered.length,
    data: filtered,
  },
      { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
    );
}

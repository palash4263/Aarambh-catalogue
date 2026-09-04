import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { mockProducts } from '@/data/products';

// Catalogue data must never be served from a build-time or Data Cache:
// prices edited in Supabase have to appear on the next page load.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = params.id;

  // 1. Query Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (!error && data) {
        const product = {
          id: data.id,
          name: data.name,
          category: data.category,
          price: data.price,
          originalPrice: data.original_price,
          rating: data.rating,
          reviewsCount: data.reviews_count,
          badge: data.badge,
          tagOverlay: data.tag_overlay,
          imageUrl: data.image_url,
          inStock: data.in_stock,
          description: data.description,
          deliveryEstimate: data.delivery_estimate,
        };

        return NextResponse.json({
          success: true,
          source: 'Supabase PostgreSQL DB',
          data: product,
        },
      { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
    );
      }
    } catch (err) {
      console.warn('Supabase product query error:', err);
    }
  }

  // 2. Fallback to local dataset
  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    return NextResponse.json(
      { success: false, message: 'Product not found.' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    source: 'Local Backend Data Layer',
    data: product,
  },
      { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
    );
}

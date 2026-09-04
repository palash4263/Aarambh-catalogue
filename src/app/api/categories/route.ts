import { NextResponse } from 'next/server';
import { mockCategories } from '@/data/products';

// Catalogue data must never be served from a build-time or Data Cache:
// prices edited in Supabase have to appear on the next page load.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockCategories,
  },
      { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } }
    );
}

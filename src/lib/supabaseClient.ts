import { createClient } from '@supabase/supabase-js';

// This client is only used from API routes, so the credentials never need
// the NEXT_PUBLIC_ prefix. Vercel refuses that prefix on variables marked
// Sensitive, so production uses NEXT_SUPABASE_*; .env.local keeps the
// conventional NEXT_PUBLIC_ names. Either works.
const supabaseUrl =
  process.env.NEXT_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  '';
const supabaseAnonKey =
  process.env.NEXT_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('YOUR_SUPABASE')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        // Next.js patches global fetch with a Data Cache that defaults to
        // caching forever. supabase-js uses fetch internally, so without
        // no-store the catalogue would be frozen at whatever was read first
        // and price edits made in Supabase would never reach the site.
        fetch: (url, options = {}) => fetch(url, { ...options, cache: 'no-store' }),
      },
    })
  : null;

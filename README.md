# Aarambh — Festival & House Decor Catalogue

A mobile-first digital catalogue for handcrafted festive and home decor, built with
Next.js 14 (App Router), TypeScript, Tailwind CSS, and Supabase.

Customers browse the catalogue and send enquiries over WhatsApp or the quote form —
there is no checkout; the site is a catalogue, not a store.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Create a `.env.local` in the project root (it is git-ignored — never commit it):

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

Without these the site still runs, falling back to the local dataset in
`src/data/products.ts`.

## Deploying (Vercel)

1. Import this repository at [vercel.com/new](https://vercel.com/new). The Next.js
   preset needs no changes.
2. Add both environment variables above under **Project Settings → Environment
   Variables**, for Production, Preview, and Development.
3. Deploy.

Step 2 is not optional: without those variables the deployed site silently serves the
hardcoded fallback prices instead of the live catalogue.

## Editing the catalogue

Product data lives in the Supabase `products` table. Edit a row in the Supabase
dashboard (Table Editor → `products`) and the change appears on the site on the next
page load — no code change and no redeploy.

This works because the catalogue routes opt out of every caching layer
(`dynamic = 'force-dynamic'`, `Cache-Control: no-store`, and a `no-store` fetch inside
the Supabase client). Next.js otherwise caches `fetch` responses indefinitely, which
would freeze prices at whatever was read first.

Two changes still need code:

- **New product images** — `image_url` points at files in `public/images/`, so a new
  product needs its image committed to the repo.
- **New categories** — filter pills are generated from the categories present, but a
  readable label needs an entry in `CATEGORY_LABELS` in `src/components/ProductGrid.tsx`.

## Data and security

`supabase_schema.sql` creates the tables and seeds them; paste it into the Supabase SQL
Editor to set up a fresh project.

Row Level Security allows public **reads** of products and categories, and inserts on
orders only. The anon key ships to the browser, as Supabase intends — the RLS policies,
not the key, are what protect the data. Do not add write policies to `products` without
authentication.

## Project layout

```
src/app/            Pages (home, collections, product detail, about, contact)
src/app/api/        Route handlers — Supabase reads with local fallback
src/components/     Header, Footer, ProductGrid, ProductCard, modals, Logo
src/data/           Offline fallback catalogue
src/lib/            Supabase client
```

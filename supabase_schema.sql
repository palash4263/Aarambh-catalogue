-- ========================================================
-- UTSAV DECOR - SUPABASE DATABASE SCHEMA & SEED DATA
-- Copy & Paste this entire script into Supabase SQL Editor
-- ========================================================

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    item_count INT DEFAULT 0,
    hero_banner_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    rating NUMERIC DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    badge TEXT,
    tag_overlay TEXT,
    image_url TEXT NOT NULL,
    in_stock BOOLEAN DEFAULT true,
    description TEXT,
    delivery_estimate TEXT,
    -- Festival merchandising is cross-cutting: a product keeps ONE category but
    -- can be sold into several festivals. festival_rank orders the collection.
    festivals TEXT[] DEFAULT '{}',
    festival_rank INT,
    video_url TEXT,
    gallery_urls TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Migration for databases created before festival merchandising existed.
-- Safe to re-run.
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS festivals TEXT[] DEFAULT '{}';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS festival_rank INT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS gallery_urls TEXT[] DEFAULT '{}';
CREATE INDEX IF NOT EXISTS products_festivals_idx ON public.products USING GIN (festivals);

-- 3. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT,
    customer_email TEXT,
    customer_phone TEXT,
    pincode TEXT NOT NULL,
    address TEXT,
    subtotal NUMERIC NOT NULL,
    shipping NUMERIC DEFAULT 0,
    total_amount NUMERIC NOT NULL,
    status TEXT DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES public.products(id),
    product_name TEXT NOT NULL,
    quantity INT NOT NULL,
    unit_price NUMERIC NOT NULL,
    total_price NUMERIC NOT NULL
);

-- Enable Row Level Security (RLS) & Public Read Access
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert order_items" ON public.order_items FOR INSERT WITH CHECK (true);

-- ========================================================
-- SEED DATA FOR CATEGORIES & PRODUCTS
-- ========================================================

INSERT INTO public.categories (id, name, slug, description, item_count, hero_banner_url) VALUES
('festivals', 'Plates & Rangoli', 'festivals', 'Traditional handcrafted mirror rangoli mats, brocade thali mats, and auspicious door latkans.', 16, '/images/pink_mirror_rangoli_mat_with_diya.jpg'),
('wall-hangings', 'Wall & Door Hangings', 'wall-hangings', 'Jeweled Shubh Labh hanging latkans and handcrafted lotus door accents.', 8, '/images/gold_lotus_flower_latkan_with_pearls.jpg'),
('bandhanwar', 'Bandhanwar & Torans', 'bandhanwar', 'Handcrafted bandhanwars and door torans with zari lace, pom-poms and ghungroo drops to welcome guests at the entrance.', 1, '/images/yellow_pompom_zari_ghungroo_toran.jpg'),
('festive-strings', 'Festive Strings', 'festive-strings', 'Handcrafted festive bell strings in bright colours, to hang at doorways, mandirs and windows.', 0, NULL),
('chand-strings', 'Chand Strings', 'chand-strings', 'Handcrafted chand (moon) strings in bright colours, to hang at doorways, mandirs and windows.', 0, NULL),
('mats', 'Mats', 'mats', 'Handcrafted rangoli and decorative mats for pooja, festivals and home decor.', 0, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, name, category, price, original_price, rating, reviews_count, badge, tag_overlay, image_url, in_stock, description, delivery_estimate) VALUES
('real-1', 'Pink Silk Mirror-Work Festive Rangoli Mat', 'festivals', 799, 1199, 4.9, 146, 'Best Seller', 'HANDCRAFTED MIRROR WORK', '/images/pink_mirror_rangoli_mat_with_diya.jpg', true, 'Vibrant hot pink silk circular rangoli mat embellished with intricate mirror artwork and pearl lace border for Diwali and home poojas.', 'Express 4-Hour Delivery'),
('real-2', 'Shubh Labh Pink Tassel Door Latkan (Pair)', 'wall-hangings', 549, 799, 4.8, 92, 'Best Seller', 'PAIR OF 2 LATKANS', '/images/shubh_labh_pink_tassel_hanging_latkan.jpg', true, 'Auspicious Shubh Labh door hanging pair featuring pink silk thread tassels, golden rings, and pearl detailing.', 'Express 4-Hour Delivery'),
('real-3', 'Handmade Lotus Flower Pearl Door Hanging Set', 'wall-hangings', 699, 999, 4.9, 118, 'Handcrafted', 'LOTUS DESIGN WITH PEARLS', '/images/gold_lotus_flower_latkan_with_pearls.jpg', true, 'Gold wire frame pink lotus flower hanging pair adorned with cascading white pearl bead tassels.', 'Standard 2 Days Delivery'),
('real-5', 'Festive Beaded & Brocade Thali Mat Trio Set', 'festivals', 1499, 2199, 5.0, 205, 'Best Seller', 'SET OF 3 MATS', '/images/beaded_festive_mats_trio_studio.jpg', true, 'Set of 3 round decorative thali mats in Orange, Yellow, and Red brocade fabric with golden pearl borders.', 'Express 4-Hour Delivery'),
('real-7', 'Shubh Labh Emerald Green Jeweled Latkan Set', 'wall-hangings', 599, 899, 4.7, 73, 'Best Seller', 'EMERALD GREEN STONES', '/images/shubh_labh_emerald_jeweled_latkan.jpg', true, 'Auspicious entrance hanging pair studded with deep green emerald stones, golden bell tassels, and pearl rings.', 'Standard 2 Days Delivery')
ON CONFLICT (id) DO NOTHING;

-- Festival tagging for the seed catalogue. Run this after the seed inserts (and
-- re-run any time you retag) — it overwrites, so it is the single source of
-- truth for which products appear during each festival window.
UPDATE public.products SET festivals = '{ganesh-chaturthi,diwali}', festival_rank = 9  WHERE id = 'real-1';
UPDATE public.products SET festivals = '{ganesh-chaturthi,diwali}', festival_rank = 10 WHERE id = 'real-5';
UPDATE public.products SET festivals = '{ganesh-chaturthi,diwali}', festival_rank = 11 WHERE id = 'real-2';
UPDATE public.products SET festivals = '{diwali}',          festival_rank = NULL WHERE id = 'real-3';
UPDATE public.products SET festivals = '{diwali,navratri}', festival_rank = NULL WHERE id = 'real-7';

-- ========================================================
-- GANESH CHATURTHI ASAN DROP (Sep 2026) — ranks 3-8 so the
-- asans sit right after the two chowkis in the festival shelf.
-- ========================================================
INSERT INTO public.products (id, name, category, price, original_price, rating, reviews_count, badge, tag_overlay, image_url, in_stock, description, delivery_estimate, festivals, festival_rank) VALUES
('real-9',  'Orange Gota Patti Pooja Asan with Pearl Border',   'festivals', 1199, 1699, 5.0, 38, 'New Arrival',     'HAND-EMBROIDERED GOTA PATTI', '/images/orange_gota_patti_pearl_asan.jpg',   true, 'Saffron silk pooja asan with hand-stitched gota patti floral medallions in pink, yellow and green, finished with a gold bead and pearl cluster border. Made for Ganpati sthapana.', 'Express 4-Hour Delivery',  '{ganesh-chaturthi,diwali,navratri}', 3),
('real-10', 'Pom-Pom Rangoli Asan & Tealight Holder Set',        'festivals', 2499, 3499, 4.9, 27, 'Limited Edition', 'COMPLETE 13-PIECE SET',        '/images/pompom_rangoli_tealight_set.jpg',    true, 'Complete sthapana rangoli set: one large gota asan with red and yellow pom-poms and pearls, six matching mini asans, and six kundan-studded pearl tealight holders.', 'Standard 2 Days Delivery', '{ganesh-chaturthi,diwali}', 4),
('real-11', 'Red Patola Print Asan with Gold Bead Border',       'festivals',  749, 1099, 4.8, 44, 'Handcrafted',     'PATOLA IKAT PRINT',            '/images/red_patola_gold_bead_asan.jpg',      true, 'Round pooja asan in traditional red Patola ikat print fabric, edged with gold ribbed beads and a ghungroo bead fringe. Available in multiple sizes.', 'Express 4-Hour Delivery', '{ganesh-chaturthi,diwali,navratri}', 5),
('real-12', 'Mint Green Brocade Asan with Gold Bead Border',     'festivals',  649,  899, 4.9, 56, 'Best Seller',     'SET OF 8 AVAILABLE',           '/images/mint_brocade_gold_bead_asan.jpg',    true, 'Pastel mint brocade round asan with a ribbed gold bead and ghungroo cluster border. Sold individually; order eight for a full mandap or return-gift set.', 'Express 4-Hour Delivery', '{ganesh-chaturthi,diwali}', 6),
('real-13', 'Brocade Gold Bead Asan — Mint & Rani Pink',         'festivals',  649,  899, 4.8, 31, 'New Arrival',     'CHOOSE YOUR COLOR',            '/images/mint_pink_brocade_asan_set.jpg',     true, 'Round brocade asan with a rich gold bead border, in your choice of mint green or rani pink. Mix both colours for a layered mandap look.', 'Express 4-Hour Delivery', '{ganesh-chaturthi,diwali}', 7),
('real-14', 'Jute Mirror-Work Rangoli Mat with Red Pom-Poms',    'festivals',  899, 1299, 4.7, 22, 'Handcrafted',     'ECO-FRIENDLY JUTE',            '/images/jute_mirror_pompom_rangoli_mat.jpg', true, 'Large hand-coiled natural jute rangoli mat with concentric mirror rings, a lace-trimmed border and a red pom-pom centre. Eco-friendly base for Ganpati rangoli or a floating-flower urli.', 'Standard 2 Days Delivery', '{ganesh-chaturthi,diwali}', 8)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, price = EXCLUDED.price, original_price = EXCLUDED.original_price,
  badge = EXCLUDED.badge, tag_overlay = EXCLUDED.tag_overlay, image_url = EXCLUDED.image_url,
  description = EXCLUDED.description, delivery_estimate = EXCLUDED.delivery_estimate,
  festivals = EXCLUDED.festivals, festival_rank = EXCLUDED.festival_rank;

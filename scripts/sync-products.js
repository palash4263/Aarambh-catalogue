// Push the festival-tagged catalogue from src/data/products.ts into Supabase.
// Upserts every product by id so it is safe to re-run after editing prices.
const path = require('path');
const fs = require('fs');
const ROOT = path.resolve(__dirname, '..');

// Load .env.local
for (const line of fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
  if (m) process.env[m[1]] = m[2];
}

// Transpile the TS data module on the fly
const ts = require(path.join(ROOT, 'node_modules/typescript'));
const Module = require('module');
const orig = Module._resolveFilename;
Module._resolveFilename = function (r, ...a) {
  if (r.startsWith('@/')) r = path.join(ROOT, 'src', r.slice(2));
  return orig.call(this, r, ...a);
};
require.extensions['.ts'] = (m, f) =>
  m._compile(ts.transpileModule(fs.readFileSync(f, 'utf8'), { compilerOptions: { module: 1, target: 7 } }).outputText, f);
const { mockProducts } = require(path.join(ROOT, 'src/data/products.ts'));

const { createClient } = require(path.join(ROOT, 'node_modules/@supabase/supabase-js'));
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, key);

const rows = mockProducts.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  original_price: p.originalPrice ?? null,
  rating: p.rating,
  reviews_count: p.reviewsCount,
  badge: p.badge ?? null,
  tag_overlay: p.tagOverlay ?? null,
  image_url: p.imageUrl,
  in_stock: p.inStock,
  description: p.description,
  delivery_estimate: p.deliveryEstimate ?? null,
  festivals: p.festivals ?? [],
  festival_rank: p.festivalRank ?? null,
}));

(async () => {
  console.log(`Using ${process.env.SUPABASE_SERVICE_ROLE_KEY ? 'service-role' : 'anon'} key, upserting ${rows.length} rows…`);
  const { error } = await supabase.from('products').upsert(rows, { onConflict: 'id' });
  if (error) {
    console.error('UPSERT FAILED:', error.code, error.message);
    process.exit(1);
  }
  const { data, error: e2 } = await supabase
    .from('products')
    .select('id,name,festival_rank')
    .contains('festivals', ['ganesh-chaturthi'])
    .order('festival_rank');
  if (e2) { console.error('verify failed:', e2.message); process.exit(1); }
  console.log(`\nSupabase now has ${data.length} Ganesh Chaturthi products:`);
  data.forEach((r) => console.log(' ', String(r.festival_rank).padStart(2), r.id.padEnd(8), r.name));
})();

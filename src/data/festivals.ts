import { Festival } from '@/types';

// India has no DST, so a fixed +5:30 offset is enough to pin "today" to IST.
// Both the server render and the browser render must agree on the date or the
// countdown hydrates mismatched, so every date here goes through istToday().
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/**
 * The festival calendar. `date` is the main day; the storefront switches over
 * `leadDays` before it and switches back `tailDays` after.
 *
 * `mode` decides how hard the switch is:
 *   'exclusive' — the catalogue shows ONLY products tagged for this festival.
 *   'lead'      — festival products are featured, the rest stay shoppable.
 * Flipping a festival back to 'lead' is the one-line way to reopen the full
 * catalogue without touching any component.
 */
export const FESTIVALS: Festival[] = [
  {
    slug: 'ganesh-chaturthi',
    name: 'Ganesh Chaturthi',
    date: '2026-09-14',
    leadDays: 21,
    tailDays: 10, // through Anant Chaturdashi / visarjan on Sep 24
    mode: 'exclusive',
    theme: {
      accent: '#E2711D',
      accentDark: '#C25E14',
      accentSoft: '#FDF0E2',
      eyebrow: 'Ganpati Bappa Morya',
      headline: 'Bappa Deserves the Best Seat in the House',
      subhead:
        'Handcrafted brocade chowki asans, mirror-work rangoli mats, pooja thali mats and door latkans — everything you need to welcome Ganpati home.',
      collectionTitle: 'Ganesh Chaturthi Essentials',
      bannerUrl: '/images/yellow_brocade_thali_mat.jpg',
      bannerCaption: 'Handpicked Ganpati Sthapana Collection',
      ctaLabel: 'Shop Ganpati Decor',
      announcement: 'Express 4-Hour Delivery — order in time for Sthapana!',
    },
  },
  {
    slug: 'diwali',
    name: 'Diwali',
    date: '2026-11-08',
    leadDays: 30,
    tailDays: 3,
    mode: 'lead',
    theme: {
      accent: '#E65D5D',
      accentDark: '#D64D4D',
      accentSoft: '#FDEAEA',
      eyebrow: 'Festive & House Decor Season',
      headline: 'Brighten Your Home with Handcrafted Festive Charm',
      subhead:
        'Mirror-work rangoli mats, brocade thali sets, and auspicious Shubh Labh door latkans delivered to your doorstep.',
      collectionTitle: 'Diwali Collection',
      bannerUrl: '/images/festive_couple_diwali_celebration.jpg',
      bannerCaption: 'Handpicked Diwali Collection',
      ctaLabel: 'Shop Diwali Collection',
      announcement: 'Express 4-Hour Festival Delivery Available in Select Cities!',
    },
  },
];

/** Today's date in IST, normalised to midnight, as a UTC-epoch Date. */
function istToday(now: Date = new Date()): Date {
  const ist = new Date(now.getTime() + IST_OFFSET_MS);
  return new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate()));
}

function parseDay(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** Whole days from today until the festival's main day. Negative once it's past. */
export function daysUntil(festival: Festival, now?: Date): number {
  return Math.round((parseDay(festival.date).getTime() - istToday(now).getTime()) / DAY_MS);
}

export function getFestivalBySlug(slug: string): Festival | null {
  return FESTIVALS.find((f) => f.slug === slug) ?? null;
}

/**
 * The festival the storefront should be dressed for, or null in a quiet month.
 *
 * `override` (wired to a ?festival= query param) wins outright so the team can
 * preview or demo a festival off-season — including `?festival=none`, which
 * forces the normal year-round storefront.
 */
export function getActiveFestival(now?: Date, override?: string | null): Festival | null {
  if (override) {
    if (override === 'none' || override === 'all') return null;
    return getFestivalBySlug(override);
  }

  const today = istToday(now).getTime();

  const inWindow = FESTIVALS.filter((f) => {
    const main = parseDay(f.date).getTime();
    return today >= main - f.leadDays * DAY_MS && today <= main + f.tailDays * DAY_MS;
  });

  if (!inWindow.length) return null;

  // Overlapping windows (Navratri running into Diwali): the nearest main day wins.
  return inWindow.sort(
    (a, b) => Math.abs(daysUntil(a, now)) - Math.abs(daysUntil(b, now))
  )[0];
}

/** Products to show for a festival, honouring its mode and festivalRank ordering. */
export function applyFestival<T extends { festivals?: string[]; festivalRank?: number }>(
  products: T[],
  festival: Festival | null
): T[] {
  if (!festival) return products;

  const tagged = products.filter((p) => p.festivals?.includes(festival.slug));

  // An exclusive festival with nothing tagged would render an empty shop, so
  // fall back to the full catalogue rather than showing a dead storefront.
  const base = festival.mode === 'exclusive' && tagged.length ? tagged : products;

  return [...base].sort((a, b) => {
    const aFest = a.festivals?.includes(festival.slug) ? 0 : 1;
    const bFest = b.festivals?.includes(festival.slug) ? 0 : 1;
    if (aFest !== bFest) return aFest - bFest;
    return (a.festivalRank ?? 99) - (b.festivalRank ?? 99);
  });
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: 'Best Seller' | 'New Arrival' | 'Handcrafted' | 'Express Delivery' | 'Limited Edition';
  tagOverlay?: string; // e.g. "CHOOSE YOUR COLOR", "CUSTOMIZABLE NAME", "SET OF 4"
  imageUrl: string;
  inStock: boolean;
  description: string;
  deliveryEstimate?: string;
  /**
   * Festival slugs this product is merchandised for. A product keeps its single
   * `category` for shelf organisation; festivals are cross-cutting, so a pooja
   * chowki can be both 'ganesh-chaturthi' and 'diwali'.
   */
  festivals?: string[];
  /** Lower sorts first within a festival collection. Unranked items go last. */
  festivalRank?: number;
}

export interface FestivalTheme {
  accent: string;
  accentDark: string;
  accentSoft: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  collectionTitle: string;
  bannerUrl: string;
  bannerCaption: string;
  ctaLabel: string;
  announcement: string;
}

export interface Festival {
  slug: string;
  name: string;
  /** Main day, ISO yyyy-mm-dd, interpreted in IST. */
  date: string;
  leadDays: number;
  tailDays: number;
  /** 'exclusive' shows only tagged products; 'lead' just features them first. */
  mode: 'exclusive' | 'lead';
  theme: FestivalTheme;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  customText?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  heroBannerUrl: string;
}

export interface DeliveryLocation {
  pincode: string;
  city: string;
  state: string;
  expressAvailable: boolean;
}

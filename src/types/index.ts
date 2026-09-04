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

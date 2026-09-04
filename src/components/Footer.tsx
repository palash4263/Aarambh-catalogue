'use client';

import React from 'react';
import { Sparkles, Heart, ShieldCheck, Truck, RefreshCw, PhoneCall } from 'lucide-react';
import LogoMark from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-10 sm:pt-12 pb-8 border-t border-stone-800 mt-10 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-8 sm:pb-10 border-b border-stone-800 text-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E65D5D]/20 text-[#E65D5D] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Express Delivery</h4>
              <p className="text-xs text-stone-400">4-Hour delivery in select metro cities</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Artisan Crafted</h4>
              <p className="text-xs text-stone-400">100% Authentic handmade decor</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Secure Checkout</h4>
              <p className="text-xs text-stone-400">Encrypted payments & UPI</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Easy Returns</h4>
              <p className="text-xs text-stone-400">7-Day replacement guarantee</p>
            </div>
          </div>
        </div>

        {/* Links & Newsletter */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8">

          {/* Brand Info */}
          <div className="col-span-2 md:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <LogoMark className="w-9 h-9" variant="circle" />
              <span className="text-xl font-bold text-white font-display">Aarambh</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Your one-stop destination for decorative items for home celebrations, festivals, traditional brass lights, and handcrafted gift hampers.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400 pt-2">
              <PhoneCall className="w-4 h-4 text-[#E65D5D]" />
              <span>Customer Support: +91 97909 96188</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-2">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Collections</h5>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li><a href="#festivals" className="hover:text-white transition-colors">Festival Lights</a></li>
              <li><a href="#festivals" className="hover:text-white transition-colors">Brass Diyas</a></li>
              <li><a href="#house-decor" className="hover:text-white transition-colors">Macrame Art</a></li>
              <li><a href="#house-decor" className="hover:text-white transition-colors">Ceramic Vases</a></li>
              <li><a href="#party-hampers" className="hover:text-white transition-colors">Party Hampers</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-2">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Help & Info</h5>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Delivery Pincodes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refund</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4 space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Stay Updated</h5>
            <p className="text-xs text-stone-400">Subscribe to receive festival discount offers & new decor arrivals.</p>
            <div className="flex flex-col xs:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email..."
                className="bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#E65D5D] flex-1 min-w-0"
              />
              <button className="bg-[#E65D5D] hover:bg-[#d64d4d] text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors shrink-0">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Aarambh Store. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-[#E65D5D] fill-[#E65D5D]" /> for House & Festival Decorations
          </span>
        </div>

      </div>
    </footer>
  );
}

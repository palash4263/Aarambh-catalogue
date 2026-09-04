'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Phone } from 'lucide-react';
import { Product } from '@/types';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export default function InquiryModal({ isOpen, onClose, product }: InquiryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    product ? `Hi, I am interested in getting catalog details for "${product.name}".` : 'Hi, I would like to inquire about your festival decor products.'
  );
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const whatsappMessage = encodeURIComponent(
    product
      ? `Hi Aarambh! I'm interested in "${product.name}" (Price: ₹${product.price}). Please share more catalog details.`
      : `Hi Aarambh! I would like to inquire about your house and festival decor catalog.`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full p-5 pb-safe sm:p-6 shadow-2xl relative border border-stone-100 max-h-[92vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#FDEAEA] flex items-center justify-center text-[#E65D5D]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-stone-900 font-display">Product Inquiry & Quote</h3>
            <p className="text-xs text-stone-500">Request pricing, bulk order details & customization</p>
          </div>
        </div>

        {product && (
          <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-100 mb-4 text-xs">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-12 h-12 rounded-xl object-cover border border-stone-200"
            />
            <div>
              <h4 className="font-semibold text-stone-900 line-clamp-1">{product.name}</h4>
              <span className="font-bold text-[#E65D5D]">₹{product.price}</span>
            </div>
          </div>
        )}

        {/* Quick WhatsApp Inquiry Option */}
        <a
          href={`https://wa.me/919790996188?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-2 mb-4"
        >
          <Phone className="w-4 h-4 fill-white" />
          <span>Instant WhatsApp Inquiry (+91 97909 96188)</span>
        </a>

        <div className="relative text-center my-3">
          <span className="bg-white px-3 text-[11px] text-stone-400 font-semibold uppercase tracking-wider relative z-10">Or Send Email Inquiry</span>
          <div className="absolute inset-0 top-1/2 border-t border-stone-200"></div>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-stone-900 text-sm">Inquiry Submitted!</h4>
            <p className="text-xs text-stone-600">Our catalog team will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Patel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65D5D]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Phone Number / WhatsApp *</label>
              <input
                type="tel"
                required
                placeholder="+91 97909 96188"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65D5D]"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Message / Requirements</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65D5D]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#E65D5D] hover:bg-[#d64d4d] text-white font-semibold py-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Catalog Request</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { MapPin, X, CheckCircle2, Zap } from 'lucide-react';
import { DeliveryLocation } from '@/types';

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: DeliveryLocation;
  onSaveLocation: (loc: DeliveryLocation) => void;
}

export default function DeliveryModal({
  isOpen,
  onClose,
  currentLocation,
  onSaveLocation,
}: DeliveryModalProps) {
  const [pincode, setPincode] = useState(currentLocation.pincode);
  const [city, setCity] = useState(currentLocation.city);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length >= 6) {
      const isExpress = pincode.startsWith('11') || pincode.startsWith('40') || pincode.startsWith('56') || pincode.startsWith('70') || pincode.startsWith('60');
      onSaveLocation({
        pincode,
        city: city || 'New Delhi',
        state: 'India',
        expressAvailable: isExpress,
      });
      setMessage(isExpress ? '🎉 Great news! Express 4-Hour Delivery is available in your area.' : '✅ Standard 2-Day Delivery available for your pincode.');
      setTimeout(() => {
        onClose();
      }, 1200);
    } else {
      setMessage('Please enter a valid 6-digit Pincode.');
    }
  };

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
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-stone-900 font-display">Select Delivery Location</h3>
            <p className="text-xs text-stone-500">Check express delivery & festival availability</p>
          </div>
        </div>

        <form onSubmit={handleCheck} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Pincode / ZIP Code
            </label>
            <input
              type="text"
              maxLength={6}
              placeholder="e.g. 110001"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65D5D]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              City (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Delhi, Mumbai, Bengaluru"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65D5D]"
            />
          </div>

          {message && (
            <div className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${message.includes('Express') ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#E65D5D] hover:bg-[#d64d4d] text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-amber-300 stroke-amber-300" />
              <span>Check Delivery Options</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

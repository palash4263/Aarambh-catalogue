import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const PHONE_DISPLAY = '+91 97909 96188';
export const PHONE_TEL = 'tel:+919790996188';
export const whatsappUrl = (message: string) =>
  `https://wa.me/919790996188?text=${encodeURIComponent(message)}`;

/**
 * Call and "Order on WhatsApp", pinned to the bottom of the screen on phones.
 * Pages that use it need bottom padding (pb-20 md:pb-0) so it never covers
 * the last of their content.
 */
export default function MobileActionBar({ message }: { message: string }) {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-[#FDF5EC]/95 backdrop-blur-md border-t border-[#EADBC8] px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] flex gap-2.5">
      <a
        href={PHONE_TEL}
        className="w-12 h-12 rounded-2xl border border-[#7A1730]/30 text-[#7A1730] flex items-center justify-center shrink-0"
        aria-label={`Call ${PHONE_DISPLAY}`}
      >
        <Phone className="w-5 h-5" />
      </a>
      <a
        href={whatsappUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-12 rounded-2xl bg-[#7A1730] text-[#FDF5EC] text-sm font-semibold flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Order on WhatsApp</span>
      </a>
    </div>
  );
}

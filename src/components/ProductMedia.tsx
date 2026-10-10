import React from 'react';
import { Product } from '@/types';

interface ProductMediaProps {
  product: Pick<Product, 'name' | 'imageUrl' | 'videoUrl'>;
  className?: string;
  /** Play the video silently on loop when standing in for a missing photo. */
  autoPlay?: boolean;
}

/**
 * A product's photo, or its video when no photo has been added yet.
 * Without autoplay the `#t=0.5` fragment makes the browser show a frame
 * from half a second in, so the thumbnail isn't a blank first frame.
 */
export default function ProductMedia({ product, className = '', autoPlay = false }: ProductMediaProps) {
  if (!product.imageUrl && product.videoUrl) {
    return (
      <video
        src={autoPlay ? product.videoUrl : `${product.videoUrl}#t=0.5`}
        className={className}
        aria-label={product.name}
        muted
        playsInline
        preload="metadata"
        autoPlay={autoPlay}
        loop={autoPlay}
      />
    );
  }

  return <img src={product.imageUrl} alt={product.name} loading="lazy" className={className} />;
}

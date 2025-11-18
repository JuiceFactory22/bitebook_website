'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface TrackingButtonProps {
  href: string;
  value?: number;
  className?: string;
  children: React.ReactNode;
}

export default function TrackingButton({ href, value, className, children }: TrackingButtonProps) {
  const pathname = usePathname();

  const handleClick = () => {
    // Track button click with Meta Pixel if available
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'AddToCart', {
        content_name: 'BiteBook Coupon',
        content_category: 'Coupon Book',
        value: value || 29.99,
        currency: 'USD'
      });
    }

    // Track with Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'add_to_cart', {
        currency: 'USD',
        value: value || 29.99,
        items: [{
          item_id: 'bitebook-coupon',
          item_name: 'BiteBook Coupon Book',
          price: value || 29.99,
          quantity: 1
        }]
      });
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}



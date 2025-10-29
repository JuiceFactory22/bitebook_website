'use client';

import { trackAddToCart } from '@/utils/facebookPixel';

interface TrackingButtonProps {
  href: string;
  className: string;
  children: React.ReactNode;
  value?: number;
}

export default function TrackingButton({ href, className, children, value = 29.99 }: TrackingButtonProps) {
  const handleClick = () => {
    trackAddToCart(value);
  };

  return (
    <a 
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}

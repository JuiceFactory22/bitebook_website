'use client';

import { trackAddToCart } from '@/utils/facebookPixel';
import { trackButtonClick } from '@/utils/analytics';

interface TrackingButtonProps {
  href: string;
  className: string;
  children: React.ReactNode;
  value?: number;
  buttonName?: string;
  location?: string;
}

export default function TrackingButton({ 
  href, 
  className, 
  children, 
  value = 29.99,
  buttonName,
  location 
}: TrackingButtonProps) {
  const handleClick = () => {
    // Track with Meta Pixel
    trackAddToCart(value);
    
    // Track with GA4
    const buttonText = buttonName || (typeof children === 'string' ? children : 'CTA Button');
    const buttonLocation = location || window.location.pathname;
    trackButtonClick(buttonText, buttonLocation, value);
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

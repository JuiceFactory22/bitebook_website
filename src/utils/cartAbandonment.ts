// Cart Abandonment Tracking Utility

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
    dataLayer?: any[];
  }
}

interface CartAbandonmentData {
  value: number;
  currency: string;
  email?: string;
  timestamp: number;
  checkoutUrl: string;
}

/**
 * Track cart abandonment
 * Called when user leaves checkout page without completing purchase
 */
export const trackCartAbandonment = (value: number, email?: string) => {
  const data: CartAbandonmentData = {
    value,
    currency: 'USD',
    email,
    timestamp: Date.now(),
    checkoutUrl: window.location.href,
  };

  // Store in localStorage for potential recovery
  try {
    localStorage.setItem('cartAbandonment', JSON.stringify(data));
  } catch (e) {
    console.error('Failed to store cart abandonment:', e);
  }

  // Track with Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      value: value,
      currency: 'USD',
      content_type: 'product',
      content_name: 'BiteBook Coupon Book',
      content_ids: ['bitebook_coupon_book'],
      // Mark as abandoned
      eventID: `abandon_${Date.now()}`,
    });
  }

  // Track with Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'USD',
      value: value,
      items: [{
        item_id: 'bitebook_coupon_book',
        item_name: 'BiteBook Coupon Book',
        price: value,
        quantity: 1,
      }],
      // Custom parameter for abandonment
      abandoned: true,
    });
  }

  // Send to tracking endpoint (optional - for server-side logging)
  try {
    fetch('/api/track-abandonment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch(err => {
      console.error('Failed to send abandonment to server:', err);
    });
  } catch (e) {
    // Silently fail - tracking shouldn't break the site
  }
};

/**
 * Clear cart abandonment data (called on successful purchase)
 */
export const clearCartAbandonment = () => {
  try {
    localStorage.removeItem('cartAbandonment');
  } catch (e) {
    console.error('Failed to clear cart abandonment:', e);
  }
};

/**
 * Check if user has abandoned cart (for recovery campaigns)
 */
export const getCartAbandonment = (): CartAbandonmentData | null => {
  try {
    const data = localStorage.getItem('cartAbandonment');
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to get cart abandonment:', e);
  }
  return null;
};


// Facebook Pixel utility functions
declare global {
  interface Window {
    fbq: (action: string, event: string, parameters?: any) => void;
  }
}

export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Common events for BiteBook
export const trackPurchase = (value: number, currency: string = 'USD') => {
  trackEvent('Purchase', {
    value: value,
    currency: currency,
    content_type: 'product',
    content_name: 'BiteBook Coupon Book'
  });
};

export const trackAddToCart = (value: number, currency: string = 'USD') => {
  trackEvent('AddToCart', {
    value: value,
    currency: currency,
    content_type: 'product',
    content_name: 'BiteBook Coupon Book'
  });
};

export const trackInitiateCheckout = (value: number, currency: string = 'USD') => {
  trackEvent('InitiateCheckout', {
    value: value,
    currency: currency,
    content_type: 'product',
    content_name: 'BiteBook Coupon Book'
  });
};

export const trackLead = () => {
  trackEvent('Lead', {
    content_name: 'BiteBook Partner Application',
    content_category: 'lead_generation'
  });
};

export const trackViewContent = (contentName: string) => {
  trackEvent('ViewContent', {
    content_name: contentName,
    content_type: 'product'
  });
};

export const trackCompleteRegistration = () => {
  trackEvent('CompleteRegistration', {
    content_name: 'BiteBook Partner Application'
  });
};

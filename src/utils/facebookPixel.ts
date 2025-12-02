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
export const trackPurchase = (value: number, currency: string = 'USD', email?: string) => {
  const params: any = {
    value: value, // Use the actual value passed in
    currency: currency,
    content_type: 'product',
    content_name: 'BiteBook Coupon Book',
    content_ids: ['bitebook_coupon_book']
  };
  
  // Add email for advanced matching if provided (will be hashed by Meta)
  if (email) {
    params.em = email;
  }
  
  trackEvent('Purchase', params);
};

export const trackAddToCart = (value: number, currency: string = 'USD') => {
  trackEvent('AddToCart', {
    value: value,
    currency: currency,
    content_type: 'product',
    content_name: 'BiteBook Coupon Book',
    content_ids: ['bitebook_coupon_book']
  });
};

export const trackInitiateCheckout = (value: number, currency: string = 'USD') => {
  trackEvent('InitiateCheckout', {
    value: value,
    currency: currency,
    content_type: 'product',
    content_name: 'BiteBook Coupon Book',
    content_ids: ['bitebook_coupon_book']
  });
};

export const trackLead = (value?: number, email?: string, phone?: string) => {
  const params: any = {
    content_name: 'BiteBook Lead Magnet',
    content_category: 'lead_generation'
  };
  
  // Add value for ROAS tracking if provided
  if (value !== undefined) {
    params.value = value;
    params.currency = 'USD';
  }
  
  // Add email and phone for advanced matching (will be hashed by Meta)
  if (email) {
    params.em = email; // Email will be hashed automatically
  }
  if (phone) {
    params.ph = phone; // Phone will be hashed automatically
  }
  
  trackEvent('Lead', params);
};

export const trackViewContent = (contentName: string, value?: number) => {
  const params: any = {
    content_name: contentName,
    content_type: 'product',
    content_ids: ['bitebook_coupon_book']
  };
  
  if (value !== undefined) {
    params.value = value;
    params.currency = 'USD';
  }
  
  trackEvent('ViewContent', params);
};

export const trackCompleteRegistration = () => {
  trackEvent('CompleteRegistration', {
    content_name: 'BiteBook Partner Application'
  });
};

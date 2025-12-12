// Enhanced Analytics Tracking Utility
// Provides comprehensive tracking for GA4, Meta Pixel, and Google Ads

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
    dataLayer?: any[];
    fbq?: (action: string, event: string, parameters?: any) => void;
  }
}

// GA4 Event Tracking
export const trackGA4Event = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      // Add common parameters
      page_path: window.location.pathname,
      page_title: document.title,
      timestamp: new Date().toISOString(),
    });
  }
};

// Enhanced Purchase Tracking (GA4 E-Commerce)
export const trackPurchaseGA4 = (
  transactionId: string,
  value: number,
  currency: string = 'USD',
  items?: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>
) => {
  trackGA4Event('purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency,
    items: items || [{
      item_id: 'bitebook_subscription',
      item_name: 'BiteBook Monthly Subscription',
      price: value,
      quantity: 1,
    }],
    // Subscription-specific
    subscription_type: 'monthly',
    subscription_price: value,
  });
};

// Button Click Tracking
export const trackButtonClick = (
  buttonName: string,
  location: string,
  value?: number
) => {
  trackGA4Event('button_click', {
    button_name: buttonName,
    button_location: location,
    value: value,
  });
  
  // Also track with Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'ButtonClick', {
      button_name: buttonName,
      location: location,
      value: value,
    });
  }
};

// Form Interaction Tracking
export const trackFormStart = (formName: string, formLocation: string) => {
  trackGA4Event('form_start', {
    form_name: formName,
    form_location: formLocation,
  });
};

export const trackFormSubmit = (
  formName: string,
  formLocation: string,
  success: boolean = true
) => {
  trackGA4Event(success ? 'form_submit' : 'form_error', {
    form_name: formName,
    form_location: formLocation,
    success: success,
  });
};

// Scroll Depth Tracking
export const trackScrollDepth = (depth: number) => {
  trackGA4Event('scroll', {
    scroll_depth: depth,
  });
};

// Page View with Enhanced Parameters
export const trackPageView = (
  pageName: string,
  pageCategory?: string,
  value?: number
) => {
  trackGA4Event('page_view', {
    page_name: pageName,
    page_category: pageCategory,
    value: value,
  });
};

// Conversion Funnel Tracking
export const trackFunnelStep = (
  step: string,
  stepNumber: number,
  funnelName: string = 'subscription'
) => {
  trackGA4Event('funnel_step', {
    funnel_name: funnelName,
    step_name: step,
    step_number: stepNumber,
  });
};

// Error Tracking
export const trackError = (
  errorType: string,
  errorMessage: string,
  errorLocation?: string
) => {
  trackGA4Event('exception', {
    description: `${errorType}: ${errorMessage}`,
    fatal: false,
    error_location: errorLocation || window.location.pathname,
  });
};

// User Engagement Tracking
export const trackEngagement = (
  engagementType: string,
  engagementValue?: number
) => {
  trackGA4Event('user_engagement', {
    engagement_type: engagementType,
    engagement_value: engagementValue,
  });
};

// Link Click Tracking
export const trackLinkClick = (
  linkText: string,
  linkUrl: string,
  linkLocation: string
) => {
  trackGA4Event('link_click', {
    link_text: linkText,
    link_url: linkUrl,
    link_location: linkLocation,
  });
};

// Time on Page Tracking
export const trackTimeOnPage = (timeInSeconds: number, pageName: string) => {
  trackGA4Event('timing_complete', {
    name: 'time_on_page',
    value: timeInSeconds,
    page_name: pageName,
  });
};


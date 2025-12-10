'use client';

import { useState, useEffect, Suspense } from 'react';
import { ArrowLeft, CreditCard, Shield, Truck, CheckCircle } from "lucide-react";
import Link from "next/link";
import emailjs from '@emailjs/browser';
import { useSearchParams } from 'next/navigation';
import { trackPurchase, trackInitiateCheckout } from '@/utils/facebookPixel';
import { trackCartAbandonment, clearCartAbandonment } from '@/utils/cartAbandonment';
import SquarePaymentForm from '@/components/SquarePaymentForm';

function CheckoutContent() {
  const [isSubscription, setIsSubscription] = useState(true); // Always subscription
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentToken, setPaymentToken] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const searchParams = useSearchParams();

  // Check for coupon code from URL
  useEffect(() => {
    // Subscription is always enabled, no need to check subscription parameter
    // Check for coupon code from URL (e.g., from spin wheel)
    const urlCoupon = searchParams.get('coupon');
    if (urlCoupon && validCoupons[urlCoupon.toUpperCase()]) {
      setAppliedCoupon(urlCoupon.toUpperCase());
    }
    // Track page view for checkout
    trackInitiateCheckout(29.99);
  }, [searchParams]);
  
  const couponBookDetails = {
    price: 29.99,
    subscriptionPrice: 29.99, // Standard subscription price
    originalValue: 300,
    savings: 270.01,
    subscriptionSavings: 270.01, // $300 - $29.99
    restaurants: 30,
    validity: 30
  };

  // Valid coupon codes
  // For percentage discounts: value is between 0 and 1 (e.g., 0.5 = 50% off)
  // For fixed prices: value is negative (e.g., -19.99 = fixed price of $19.99)
  const validCoupons: { [key: string]: number } = {
    'BITEBOOKNH50': 0.5, // 50% off
    'WINGS20NH': -19.99, // Fixed price of $19.99
  };

  // Calculate base price before discounts
  const getBasePrice = () => {
    if (isSubscription) return couponBookDetails.subscriptionPrice;
    return couponBookDetails.price;
  };

  // Calculate current price with coupon discount
  const getCurrentPrice = () => {
    const basePrice = getBasePrice();
    
    // Apply coupon discount
    if (appliedCoupon) {
      const coupon = validCoupons[appliedCoupon];
      if (coupon !== undefined) {
        // If coupon value is negative, it's a fixed price
        if (coupon < 0) {
          return Math.abs(coupon); // Return the absolute value (fixed price)
        }
        // Otherwise, it's a percentage discount (e.g., 0.5 = 50% off)
        return basePrice * coupon;
      }
    }
    
    return basePrice;
  };

  // Handle coupon code application
  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    
    if (!code) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    if (validCoupons[code]) {
      setAppliedCoupon(code);
      setCouponCode('');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  // Remove coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const getCurrentSavings = () => {
    if (isSubscription) return couponBookDetails.subscriptionSavings;
    return couponBookDetails.savings;
  };

  const handlePaymentSuccess = async (token: string) => {
    setPaymentToken(token);
    setPaymentError(null);
    
    // Validate form data
    if (!formData.first_name || !formData.last_name || !formData.email) {
      setPaymentError('Please fill in all customer information fields.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setPaymentError('Please enter a valid email address.');
      return;
    }
    
    // Process payment with Square API
    try {
      setIsSubmitting(true);
      const currentPrice = getCurrentPrice();
      
      // Generate unique idempotency key
      const idempotencyKey = crypto.randomUUID();
      
      // Process payment
      const paymentResponse = await fetch('/api/square-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceId: token,
          amount: currentPrice,
          idempotencyKey,
          customerInfo: {
            firstName: formData.first_name,
            lastName: formData.last_name,
            email: formData.email,
          },
        }),
      });

      // Check if response is JSON
      const contentType = paymentResponse.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await paymentResponse.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned an error. Please check your server logs or try again.');
      }

      const paymentResult = await paymentResponse.json();

      if (!paymentResponse.ok || !paymentResult.success) {
        throw new Error(paymentResult.error || 'Payment processing failed');
      }

      // Send order confirmation email
      const templateParams = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        is_subscription: isSubscription,
        total_price: currentPrice,
        payment_id: paymentResult.paymentId,
        to_email: 'info@getbitebook.com'
      };

      await emailjs.send(
        'service_u460dtm',
        'template_1rbwvvd',
        templateParams,
        'qq3QK0zGBYaHNI2DW'
      );

      // Track purchase event with email for advanced matching
      trackPurchase(currentPrice, 'USD', formData.email);
      
      // Clear cart abandonment data on successful purchase
      clearCartAbandonment();

      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch (error: any) {
      console.error('Payment processing error:', error);
      setPaymentError(error.message || 'Payment processing failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    setPaymentToken(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Subscription Active!
            </h2>
            <p className="text-gray-600 mb-6">
              Welcome to BiteBook! Your subscription is active. You'll receive your first coupon book within 24 hours prior to the start of the event, and a new book will be delivered to your email each month. You can cancel anytime from your account.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-[#ff6b35] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#e55a2b] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <ArrowLeft className="w-5 h-5 text-gray-600 mr-2" />
                <span className="text-gray-600 hover:text-gray-900">Back to BiteBook</span>
              </Link>
            </div>
            <div className="flex items-center">
              <h1 className="text-2xl font-display font-bold text-gray-900">
                <span className="text-[#ff6b35]">Bite</span>Book
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Subscribe to BiteBook Monthly
              </h2>
              
              {/* Product Details */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      BiteBook Monthly Subscription
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Join BiteBook and receive a new coupon book every month featuring over 25 local restaurants. Each month brings a new theme - wings, tacos, pizza, burgers, and more. You'll get hundreds of dollars in value every month for less than the cost of a single meal out. Cancel anytime - no commitment required.
                    </p>
                  </div>
                  <div className="text-right md:ml-4 flex-shrink-0">
                    {appliedCoupon && (
                      <div className="text-xs text-green-600 font-semibold mb-1">
                        {appliedCoupon === 'BITEBOOKNH50' ? '50% OFF' : appliedCoupon === 'WINGS20NH' ? '$19.99 Special Price' : 'Coupon Applied'}
                      </div>
                    )}
                    <div className="text-2xl font-bold text-[#ff6b35]">
                      ${getCurrentPrice().toFixed(2)}/month
                    </div>
                    {(appliedCoupon || getBasePrice() !== getCurrentPrice()) && (
                      <div className="text-sm text-gray-500 line-through">
                        ${getBasePrice().toFixed(2)}/month
                      </div>
                    )}
                    <div className="text-sm text-gray-500 line-through">
                      ${couponBookDetails.originalValue} value
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Billed monthly • Cancel anytime
                    </div>
                  </div>
                </div>
                
              {/* Subscription Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-4">
                <div className="flex items-start mb-3">
                  <span className="text-2xl mr-3">📅</span>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Monthly Subscription</h4>
                    <ul className="text-sm text-blue-800 space-y-1.5">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>New coupon book delivered monthly</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>Billed automatically each month</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>Cancel anytime - no commitment</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>Skip or pause anytime</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="text-sm text-blue-900">
                    {appliedCoupon ? (
                      <>
                        <div className="font-semibold mb-1">First Month: ${getCurrentPrice().toFixed(2)} <span className="text-green-600">(Discount Applied)</span></div>
                        <div className="text-blue-700">Then: $29.99/month (standard price, billed monthly)</div>
                      </>
                    ) : (
                      <>
                        <div className="font-semibold mb-1">First Month: ${getCurrentPrice().toFixed(2)}</div>
                        <div className="text-blue-700">Then: ${getCurrentPrice().toFixed(2)}/month (billed monthly)</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              </div>

              {/* Coupon Code Section */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Have a Coupon Code?</h4>
                <p className="text-xs text-gray-500 mb-2">Coupon codes apply to your first month only. After that, you'll be billed at the standard $29.99/month rate.</p>
                {!appliedCoupon ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleApplyCoupon();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-6 py-2 bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-semibold rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <div>
                        <span className="text-green-800 font-semibold">
                          Coupon Applied: {appliedCoupon}
                        </span>
                        <div className="text-xs text-green-600 mt-1">First month only - then $29.99/month</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-red-600 hover:text-red-800 font-semibold text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-red-600 text-sm mt-2">{couponError}</p>
                )}
              </div>

              {/* What's Included */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">New coupon book every month</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">{couponBookDetails.restaurants}+ restaurant coupons per month</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">{couponBookDetails.validity}-day validity per book</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Digital coupon access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Cancel anytime</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">No commitment required</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-1" />
                  <span>Instant Access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                Complete Your Subscription
              </h2>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Payment Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="mb-4">
                      <div className="bg-[#ff6b35] text-white px-6 py-3 rounded-lg font-semibold text-center mb-4">
                        {appliedCoupon && (
                          <div className="text-sm opacity-90 mb-1 line-through">
                            ${getBasePrice().toFixed(2)}
                          </div>
                        )}
                        <div className="text-2xl">
                          ${getCurrentPrice().toFixed(2)}
                        </div>
                        <div className="text-sm opacity-90 mt-1">
                          First month{appliedCoupon && <span className="text-yellow-200"> (discount applied)</span>}
                        </div>
                        {appliedCoupon && (
                          <div className="text-xs opacity-90 mt-2 pt-2 border-t border-white/20">
                            Then $29.99/month
                          </div>
                        )}
                        {!appliedCoupon && (
                          <div className="text-xs opacity-90 mt-1">
                            Then ${getCurrentPrice().toFixed(2)}/month
                          </div>
                        )}
                      </div>
                      {paymentError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                          <p className="text-red-800 text-sm">{paymentError}</p>
                        </div>
                      )}
                      <SquarePaymentForm
                        amount={getCurrentPrice()}
                        onPaymentSuccess={handlePaymentSuccess}
                        onPaymentError={handlePaymentError}
                      />
                    </div>
                  </div>
                </div>

                {/* Billing Information */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Billing Information</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>You'll be charged <strong>${getCurrentPrice().toFixed(2)}</strong> today for your first month{appliedCoupon && <span className="text-green-600"> (discount applied)</span>}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Starting month 2, you'll be charged <strong>$29.99/month</strong> at the standard subscription rate</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Future charges will occur on the same date each month</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Cancel anytime - no fees or penalties</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Access your account to manage subscription</span>
                    </li>
                  </ul>
                </div>

                {/* Terms */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 mr-3"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    By subscribing, I agree to the{" "}
                    <a href="#" className="text-[#ff6b35] hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#ff6b35] hover:underline">
                      Privacy Policy
                    </a>
                    . I understand that I will be charged <strong>${getCurrentPrice().toFixed(2)}/month</strong> and can cancel anytime.
                  </label>
                </div>

                {isSubmitting && (
                  <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6b35]"></div>
                    <p className="mt-2 text-sm text-gray-600">Processing payment...</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

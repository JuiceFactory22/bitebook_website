'use client';

import { useState, useEffect, Suspense } from 'react';
import { ArrowLeft, CreditCard, Shield, Truck, CheckCircle } from "lucide-react";
import Link from "next/link";
import emailjs from '@emailjs/browser';
import { useSearchParams } from 'next/navigation';
import { trackPurchase, trackInitiateCheckout } from '@/utils/facebookPixel';
import SquarePaymentForm from '@/components/SquarePaymentForm';

function CheckoutContent() {
  const [isSubscription, setIsSubscription] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentToken, setPaymentToken] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const searchParams = useSearchParams();

  // Check if subscription parameter is present
  useEffect(() => {
    if (searchParams.get('subscription') === 'true') {
      setIsSubscription(true);
    }
    // Track page view for checkout
    trackInitiateCheckout(29.99);
  }, [searchParams]);
  
  const couponBookDetails = {
    price: 29.99,
    subscriptionPrice: 20.99, // 30% off
    originalValue: 300,
    savings: 270.01,
    subscriptionSavings: 279.01, // $300 - $20.99
    restaurants: 30,
    validity: 30
  };

  // Calculate current price based on selected options
  const getCurrentPrice = () => {
    if (isSubscription) return couponBookDetails.subscriptionPrice;
    return couponBookDetails.price;
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
              Order Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order! We'll process your BiteBook and send it to your email within 24 hours.
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
                Your BiteBook Order
              </h2>
              
              {/* Product Details */}
              <div className="border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      BiteBook Monthly Coupon Book
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      With over 30 local restaurants participating you'll be getting hundreds of dollars in value for less than the cost of another parking ticket. We've partnered with some of the best establishments in the area to put together an incredible deal book for this January. Share with your friends and family or keep all the deals to yourself. Whatever you decide, January is for wing lovers. Checkout now and make some memories with BiteBook.
                    </p>
                  </div>
                  <div className="text-right md:ml-4 flex-shrink-0">
                    <div className="text-2xl font-bold text-[#ff6b35]">
                      ${getCurrentPrice().toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      ${couponBookDetails.originalValue} value
                    </div>
                    {isSubscription && (
                      <div className="text-xs text-blue-600 font-semibold mt-1">
                        30% Off
                      </div>
                    )}
                  </div>
                </div>
                
              {/* Subscription Toggle */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-blue-900">Subscribe & Save 30%</h4>
                    <p className="text-sm text-blue-700">Get your BiteBook delivered monthly</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSubscription}
                      onChange={(e) => setIsSubscription(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                {isSubscription && (
                  <div className="mt-3 text-sm text-blue-800">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Cancel anytime • No commitment</span>
                    </div>
                  </div>
                )}
              </div>

              </div>

              {/* What's Included */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">{couponBookDetails.restaurants}+ restaurant coupons</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">{couponBookDetails.validity}-day validity</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Digital coupon access</span>
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
                Complete Your Purchase
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
                        Total: ${getCurrentPrice().toFixed(2)}
                        {isSubscription && (
                          <div className="text-xs opacity-90 mt-1">
                            Monthly subscription (30% off)
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

                {/* Terms */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 mr-3"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-[#ff6b35] hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#ff6b35] hover:underline">
                      Privacy Policy
                    </a>
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

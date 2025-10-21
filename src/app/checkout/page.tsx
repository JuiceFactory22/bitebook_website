'use client';

import { useState } from 'react';
import { ArrowLeft, CreditCard, Shield, Truck, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const [isSubscription, setIsSubscription] = useState(false);
  
  const couponBookDetails = {
    price: 29.99,
    subscriptionPrice: 20.99, // 30% off
    originalValue: 300,
    savings: 270.01,
    subscriptionSavings: 279.01, // $300 - $20.99
    restaurants: 30,
    validity: 30
  };

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
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      November 2024 - Nacho Month
                    </h3>
                    <p className="text-gray-600 text-sm">
                      "Stacked. Loaded. Melted." - Nacho deals from Boston's best casual dining spots
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#ff6b35]">
                      ${couponBookDetails.price}
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      ${couponBookDetails.originalValue} value
                    </div>
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

              {/* Value Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Original Value:</span>
                  <span className="font-semibold">${couponBookDetails.originalValue}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Your Price:</span>
                  <span className="font-semibold">
                    ${isSubscription ? couponBookDetails.subscriptionPrice : couponBookDetails.price}
                  </span>
                </div>
                {isSubscription && (
                  <div className="flex justify-between text-sm text-blue-600">
                    <span>Subscription Discount:</span>
                    <span className="font-semibold">-${(couponBookDetails.price - couponBookDetails.subscriptionPrice).toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between text-sm font-bold text-green-600">
                  <span>You Save:</span>
                  <span>${isSubscription ? couponBookDetails.subscriptionSavings.toFixed(2) : couponBookDetails.savings}</span>
                </div>
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
                    <span className="text-sm text-gray-600">Boston metro area coverage</span>
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

              <form className="space-y-6">
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
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Payment processing will be integrated here
                    </p>
                    <div className="bg-[#ff6b35] text-white px-6 py-3 rounded-lg font-semibold">
                      Total: ${isSubscription ? couponBookDetails.subscriptionPrice : couponBookDetails.price}
                      {isSubscription && (
                        <div className="text-xs opacity-90 mt-1">
                          Monthly subscription
                        </div>
                      )}
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

                {/* Place Order Button */}
                <button
                  type="submit"
                  className="w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white py-4 rounded-lg font-semibold text-lg btn-hover shadow-lg transition-all duration-300"
                >
                  {isSubscription ? 'Start Subscription' : 'Place Order'} - ${isSubscription ? couponBookDetails.subscriptionPrice : couponBookDetails.price}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  {isSubscription 
                    ? 'Your first coupon book will be delivered instantly via email. Future books will be delivered monthly.' 
                    : 'Your coupon book will be delivered instantly via email'
                  }
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

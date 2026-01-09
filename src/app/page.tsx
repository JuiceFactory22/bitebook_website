'use client';

import { useEffect, useState } from 'react';
import { 
  Utensils, 
  Star, 
  Clock, 
  MapPin, 
  Check, 
  ChevronRight,
  Sparkles,
  Wallet,
  Gift,
  Users,
  ArrowRight,
  BadgeCheck,
  Zap,
  Shield,
  RefreshCw,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import TrackingButton from '@/components/TrackingButton';
import RestaurantLogosCarousel from '@/components/RestaurantLogosCarousel';
import { trackViewContent } from '@/utils/facebookPixel';
import { trackPageView, trackFunnelStep } from '@/utils/analytics';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { usePageTimeTracking } from '@/hooks/usePageTimeTracking';
import { locations, getDefaultPricing } from '@/data/locations';
import { restaurants } from '@/data/restaurants';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  
  const foodTypes = ['Cuisine', 'Burger', 'Wing', 'Taco', 'Pizza', 'BBQ', 'Noodle', 'Sandwich'];
  const pricing = getDefaultPricing();
  const activeLocations = locations.filter(l => l.status === 'active');
  const comingSoonLocations = locations.filter(l => l.status === 'coming-soon' || l.status === 'waitlist');

  useEffect(() => {
    trackViewContent('BiteBook Homepage', pricing.introPrice);
    trackPageView('Homepage', 'main', pricing.introPrice);
    trackFunnelStep('homepage_view', 1, 'subscription');
    setIsVisible(true);
  }, [pricing.introPrice]);

  // Rotate through food types every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFoodIndex((prevIndex) => (prevIndex + 1) % foodTypes.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [foodTypes.length]);

  useScrollTracking();
  usePageTimeTracking('Homepage');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-display font-bold text-gray-900">
                <span className="text-[#ff6b35]">Bite</span>Book
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#how-it-works" className="text-gray-700 hover:text-[#ff6b35] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  How It Works
                </a>
                <a href="#locations" className="text-gray-700 hover:text-[#ff6b35] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Select Location
                </a>
                <a href="/partner" className="text-gray-700 hover:text-[#ff6b35] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Partner Restaurants
                </a>
                <a
                  href="/locations"
                  className="inline-block bg-[#ff6b35] text-white px-6 py-2 rounded-full text-sm font-medium btn-hover"
                >
                  Find Your BiteBook
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-amber-700">Save at Local Restaurants Every Month</span>
            </div>

            {/* Main headline */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-amber-500">BiteBook</span>?
            </h1>

            {/* Subheadline */}
            <p className={`text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              A digital coupon book that gives you <strong className="text-gray-900">hundreds in savings</strong> at <strong className="text-gray-900">dozens of local restaurants</strong> every month. Wings, pizza, burgers, tacos — all in one place.
            </p>

            {/* Animated food types */}
            <div className={`mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-lg text-gray-500">
                Discounts and free food at dozens of local restaurants.
              </p>
              <p className="text-lg text-gray-500">
                Refreshed every single month. All in one digital book.
              </p>
            </div>

            {/* Primary CTA */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <TrackingButton
                href="/locations"
                eventName="hero_find_location_click"
                eventCategory="conversion"
                value={pricing.introPrice}
                className="w-full sm:w-auto bg-gradient-to-r from-[#ff6b35] to-orange-500 text-white px-8 py-4 rounded-full text-lg font-bold btn-hover shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                Find Your Local BiteBook
                <MapPin className="w-5 h-5" />
              </TrackingButton>
            </div>

            {/* Trust indicators */}
            <div className={`flex flex-wrap justify-center gap-6 text-sm text-gray-600 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                <span>Risk-free: Start for ${pricing.introPrice}</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                <span>Instant digital access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is BiteBook - Simple Explanation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              Think of BiteBook as Your Restaurant Savings App
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Like Groupon, but better — because you get a new book of deals every single month
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">One Digital Book</h3>
              <p className="text-gray-600">
                Get all your restaurant coupons in one place. Access them on your phone anytime, anywhere. No paper to carry around.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 text-[#ff6b35]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fresh Deals Monthly</h3>
              <p className="text-gray-600">
                New coupons every single month. Different restaurants, different deals. Never run out of places to try.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Save Big Every Time</h3>
              <p className="text-gray-600">
                Each book has ${pricing.totalValue}+ worth of savings. Use one coupon and you've already paid for the month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Why BiteBook? */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              Why Choose BiteBook?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple benefits that add up to real savings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1: Risk-Free */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Risk-Free to Try
              </h3>
              <p className="text-gray-600 mb-4">
                Your first month is just <strong>${pricing.introPrice}</strong> — less than most appetizers. Try it once, and if it's not for you, cancel anytime. No questions asked.
              </p>
              <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                <Check className="w-4 h-4" />
                Cancel anytime, no fees
              </div>
            </div>

            {/* Benefit 2: Value */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#ff6b35]/10 rounded-2xl flex items-center justify-center mb-6">
                <Gift className="w-7 h-7 text-[#ff6b35]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Massive Value
              </h3>
              <p className="text-gray-600 mb-4">
                Each book has <strong>${pricing.totalValue}+ in savings</strong> from {pricing.restaurantCount}+ local restaurants. Use one coupon and you're already ahead.
              </p>
              <div className="flex items-center gap-2 text-[#ff6b35] font-medium text-sm">
                <Check className="w-4 h-4" />
                Pays for itself instantly
              </div>
            </div>

            {/* Benefit 3: Variety */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                All Cuisines, Every Month
              </h3>
              <p className="text-gray-600 mb-4">
                No more single-theme months. Get wings, pizza, tacos, burgers, Asian, BBQ, and desserts — all in one book, every month.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                <Check className="w-4 h-4" />
                Variety every month
              </div>
            </div>

            {/* Benefit 4: Local */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Support Local
              </h3>
              <p className="text-gray-600 mb-4">
                Every restaurant is locally owned and operated. Support your community while saving money on great food.
              </p>
              <div className="flex items-center gap-2 text-purple-600 font-medium text-sm">
                <Check className="w-4 h-4" />
                Community-focused
              </div>
            </div>

            {/* Benefit 5: Convenient */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Digital & Convenient
              </h3>
              <p className="text-gray-600 mb-4">
                All coupons are digital. No paper to carry. Show your phone at the restaurant. Simple and easy.
              </p>
              <div className="flex items-center gap-2 text-amber-600 font-medium text-sm">
                <Check className="w-4 h-4" />
                Access on your phone
              </div>
            </div>

            {/* Benefit 6: Restaurant Partners */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Trusted Restaurants
              </h3>
              <p className="text-gray-600 mb-4">
                Work with dozens of local favorites. From neighborhood gems to popular spots, all verified and trusted.
              </p>
              <div className="flex items-center gap-2 text-rose-600 font-medium text-sm">
                <Check className="w-4 h-4" />
                Verified partners
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Showcase */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Trusted by Local Favorites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              Some of the Participating Restaurants
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From neighborhood gems to local favorites — these restaurants trust BiteBook to bring them hungry customers.
            </p>
          </div>

          <RestaurantLogosCarousel />
        </div>
      </section>

      {/* How It Works - Updated */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              How BiteBook Works
            </h2>
            <p className="text-lg text-gray-600">
              Get started in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Find Your Location</h3>
              <p className="text-gray-600 mb-4">
                Select your city to see available deals in your area. We're expanding to new cities all the time.
              </p>
              <a href="/locations" className="inline-flex items-center gap-2 text-[#ff6b35] font-medium text-sm hover:gap-3 transition-all">
                Browse Locations
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Subscribe</h3>
              <p className="text-gray-600 mb-4">
                Start for <strong>${pricing.introPrice}</strong> your first month. Get instant access to your digital coupon book. Cancel anytime.
              </p>
              <div className="flex items-center justify-center gap-2 text-emerald-600 font-medium text-sm">
                <BadgeCheck className="w-4 h-4" />
                Risk-free trial
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Save & Enjoy</h3>
              <p className="text-gray-600 mb-4">
                Browse your coupons, pick a restaurant, show your phone at checkout. Save money, enjoy great food, repeat all month long.
              </p>
              <div className="flex items-center justify-center gap-2 text-blue-600 font-medium text-sm">
                <RefreshCw className="w-4 h-4" />
                New deals monthly
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              Find BiteBook in Your City
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're bringing restaurant savings to cities across the country
            </p>
          </div>

          {/* Active Locations */}
          {activeLocations.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Available Now</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeLocations.map((location) => (
                  <a
                    key={location.id}
                    href={`/locations/${location.id}`}
                    className="group bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-xl hover:border-[#ff6b35]/20 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-[#ff6b35]/10 rounded-xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-[#ff6b35]" />
                      </div>
                      {location.featured && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          Active
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#ff6b35] transition-colors">
                      {location.city}, {location.state}
                    </h4>
                    <p className="text-gray-500 text-sm mb-4">{location.region}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        <strong className="text-gray-900">{location.restaurantCount}+</strong> restaurants
                      </span>
                      <span className="flex items-center gap-1 text-[#ff6b35] font-medium text-sm group-hover:gap-2 transition-all">
                        View deals
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Coming Soon Locations */}
          {comingSoonLocations.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Coming Soon</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comingSoonLocations.map((location) => (
                  <div
                    key={location.id}
                    className="bg-white/50 rounded-2xl border border-gray-200 border-dashed p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-gray-400" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        {location.status === 'waitlist' ? 'Join Waitlist' : 'Coming Soon'}
                      </span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-600 mb-1">
                      {location.city}, {location.state}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">{location.region}</p>
                    
                    {location.status === 'waitlist' && (
                      <button className="w-full py-2 px-4 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                        Notify Me
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No locations message */}
          {activeLocations.length === 0 && comingSoonLocations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">More locations coming soon!</p>
              <a 
                href="mailto:hello@getbitebook.com?subject=Bring BiteBook to my city"
                className="inline-flex items-center gap-2 text-[#ff6b35] font-medium hover:gap-3 transition-all"
              >
                Request Your City
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-4xl font-bold">{restaurants.length}+</p>
              <p className="text-slate-400 text-sm">Restaurant Partners</p>
            </div>
            <div className="h-12 w-px bg-slate-700 hidden md:block" />
            <div className="text-center">
              <p className="text-4xl font-bold">${pricing.totalValue}+</p>
              <p className="text-slate-400 text-sm">Monthly Savings Value</p>
            </div>
            <div className="h-12 w-px bg-slate-700 hidden md:block" />
            <div className="text-center">
              <p className="text-4xl font-bold">30</p>
              <p className="text-slate-400 text-sm">Day Validity</p>
            </div>
            <div className="h-12 w-px bg-slate-700 hidden md:block" />
            <div className="text-center">
              <p className="text-4xl font-bold text-[#ff6b35]">${pricing.introPrice}</p>
              <p className="text-slate-400 text-sm">First Month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#ff6b35] to-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of people saving money at their favorite local restaurants. Risk-free trial for just ${pricing.introPrice}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackingButton
              href="/locations"
              eventName="footer_cta_click"
              eventCategory="conversion"
              value={pricing.introPrice}
              className="w-full sm:w-auto bg-white text-[#ff6b35] px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              Find Your Local BiteBook
              <ChevronRight className="w-5 h-5" />
            </TrackingButton>
          </div>
          <p className="text-white/70 text-sm mt-6">
            Start for ${pricing.introPrice} • Then ${pricing.regularPrice}/month • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-2xl font-display font-bold">
                <span className="text-[#ff6b35]">Bite</span>Book
              </h2>
              <p className="text-slate-400 text-sm mt-1">Local deals, everywhere</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="/partner" className="hover:text-white transition-colors">Partner With Us</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="/locations" className="hover:text-white transition-colors">Locations</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} BiteBook. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

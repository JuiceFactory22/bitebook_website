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
  Zap
} from 'lucide-react';
import TrackingButton from '@/components/TrackingButton';
import { trackViewContent } from '@/utils/facebookPixel';
import { trackPageView, trackFunnelStep } from '@/utils/analytics';
import { useScrollTracking } from '@/hooks/useScrollTracking';
import { usePageTimeTracking } from '@/hooks/usePageTimeTracking';
import { restaurants } from '@/data/restaurants';

// Food categories represented in the book
const foodCategories = [
  { name: 'Wings', emoji: '🍗', color: 'bg-orange-100 text-orange-600' },
  { name: 'Pizza', emoji: '🍕', color: 'bg-red-100 text-red-600' },
  { name: 'Burgers', emoji: '🍔', color: 'bg-amber-100 text-amber-600' },
  { name: 'Tacos', emoji: '🌮', color: 'bg-yellow-100 text-yellow-600' },
  { name: 'BBQ', emoji: '🔥', color: 'bg-rose-100 text-rose-600' },
  { name: 'Asian', emoji: '🥢', color: 'bg-emerald-100 text-emerald-600' },
  { name: 'Seafood', emoji: '🦐', color: 'bg-cyan-100 text-cyan-600' },
  { name: 'Desserts', emoji: '🍦', color: 'bg-pink-100 text-pink-600' },
];

// Pricing tiers
const pricing = {
  introPrice: 0.99,
  regularPrice: 9.99,
  totalValue: 400,
  restaurantCount: 30,
};

// Component for restaurant logo with fallback
function RestaurantLogo({ image, name }: { image: string; name: string }) {
  const [imageError, setImageError] = useState(false);

  if (imageError || !image) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Utensils className="w-12 h-12 text-gray-300" />
      </div>
    );
  }

  return (
    <img 
      src={image} 
      alt={name}
      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
      onError={() => setImageError(true)}
    />
  );
}

export default function NewHavenPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  
  const foodTypes = ['Cuisine', 'Burger', 'Wing', 'Taco', 'Pizza', 'BBQ', 'Noodle', 'Sandwich'];
  
  useEffect(() => {
    trackViewContent('BiteBook New Haven', pricing.regularPrice);
    trackPageView('New Haven Location', 'location', pricing.regularPrice);
    trackFunnelStep('location_page_view', 1, 'subscription');
    setIsVisible(true);
  }, []);

  // Rotate through food types every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFoodIndex((prevIndex) => (prevIndex + 1) % foodTypes.length);
    }, 1000); // Change every 1 second as requested

    return () => clearInterval(interval);
  }, [foodTypes.length]);

  useScrollTracking();
  usePageTimeTracking('New Haven Location');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-display font-bold text-gray-900">
                <span className="text-[#ff6b35]">Bite</span>Book
              </h1>
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                <MapPin className="w-3 h-3 mr-1" />
                New Haven, CT
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/partner" className="hidden md:block text-gray-600 hover:text-[#ff6b35] text-sm font-medium transition-colors">
                Restaurant Partners
              </a>
              <TrackingButton
                href="/checkout"
                eventName="nav_cta_click"
                eventCategory="navigation"
                value={pricing.introPrice}
                className="bg-[#ff6b35] text-white px-5 py-2 rounded-full text-sm font-semibold btn-hover flex items-center gap-2"
              >
                Start for 99¢
                <ArrowRight className="w-4 h-4" />
              </TrackingButton>
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
              <span className="text-sm font-medium text-amber-700">New Haven's #1 Restaurant Savings App</span>
            </div>

            {/* Main headline */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="inline-block">
                Every{' '}
                <span className="relative inline-block min-w-[180px] sm:min-w-[200px] lg:min-w-[240px] text-left align-baseline ml-2">
                  <span 
                    key={currentFoodIndex}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-amber-500 animate-slide-up"
                  >
                    {foodTypes[currentFoodIndex]}
                  </span>
                  <span className="text-gray-900">.</span>
                </span>
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-amber-500">Every Month.</span><br />
              One BiteBook.
            </h1>

            {/* Subheadline */}
            <p className={`text-xl text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Discounts and free food at dozens of local restaurants. Refreshed every single month. All in one digital book.
            </p>

            {/* Pricing highlight */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center gap-3 bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-4">
                <div className="text-left">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">First Month</p>
                  <p className="text-3xl font-bold text-[#ff6b35]">99¢</p>
                </div>
                <div className="h-12 w-px bg-gray-200" />
                <div className="text-left">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Then</p>
                  <p className="text-xl font-semibold text-gray-700">${pricing.regularPrice}/mo</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 font-medium">
                <BadgeCheck className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <TrackingButton
                href="/checkout"
                eventName="hero_cta_click"
                eventCategory="conversion"
                value={pricing.introPrice}
                className="w-full sm:w-auto bg-gradient-to-r from-[#ff6b35] to-orange-500 text-white px-8 py-4 rounded-full text-lg font-bold btn-hover shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                Start Saving for 99¢
                <ChevronRight className="w-5 h-5" />
              </TrackingButton>
              <a 
                href="#restaurants" 
                className="text-gray-600 hover:text-[#ff6b35] font-medium flex items-center gap-2 transition-colors"
              >
                See all restaurants
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Food Categories Strip */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {foodCategories.map((category) => (
              <div 
                key={category.name}
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${category.color} font-medium text-sm`}
              >
                <span className="text-lg">{category.emoji}</span>
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              Why BiteBook Pays for Itself
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              One meal out. That's all it takes to save more than you paid.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Wallet className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                99¢ First Month
              </h3>
              <p className="text-gray-600 mb-4">
                Try BiteBook risk-free. Your first month is just 99 cents. Use just one coupon and you're already ahead.
              </p>
              <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                <Check className="w-4 h-4" />
                No-brainer entry price
              </div>
            </div>

            {/* Value Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#ff6b35]/10 rounded-2xl flex items-center justify-center mb-6">
                <Gift className="w-7 h-7 text-[#ff6b35]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                ${pricing.totalValue}+ in Savings
              </h3>
              <p className="text-gray-600 mb-4">
                Every book includes {pricing.restaurantCount}+ coupons from local restaurants. Free appetizers, BOGO deals, discounts, and more.
              </p>
              <div className="flex items-center gap-2 text-[#ff6b35] font-medium text-sm">
                <Check className="w-4 h-4" />
                New coupons every month
              </div>
            </div>

            {/* Value Card 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                All Cuisines Included
              </h3>
              <p className="text-gray-600 mb-4">
                No more single-theme months. Get wings, pizza, tacos, burgers, Asian, BBQ, and desserts — all in one book.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium text-sm">
                <Check className="w-4 h-4" />
                Variety every month
              </div>
            </div>
          </div>

          {/* Math breakdown */}
          <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">The Math is Simple</h3>
              <p className="text-slate-300">See how fast BiteBook pays for itself</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-[#ff6b35] mb-2">99¢</p>
                <p className="text-slate-300">Your first month</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-emerald-400 mb-2">1 coupon</p>
                <p className="text-slate-300">To break even</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-amber-400 mb-2">${pricing.totalValue}+</p>
                <p className="text-slate-300">Potential savings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Partners Section */}
      <section id="restaurants" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Trusted by Local Favorites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              {restaurants.length}+ Restaurant Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From neighborhood gems to local favorites — these restaurants trust BiteBook to bring them hungry customers.
            </p>
          </div>

          {/* Restaurant grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {restaurants.map((restaurant, index) => (
              <div 
                key={restaurant.name}
                className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg hover:border-[#ff6b35]/20 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-square rounded-lg bg-gray-50 mb-3 overflow-hidden flex items-center justify-center p-2">
                  <RestaurantLogo image={restaurant.image} name={restaurant.name} />
                </div>
                <p className="text-sm font-medium text-gray-900 text-center line-clamp-2">
                  {restaurant.name}
                </p>
              </div>
            ))}
          </div>

          {/* Become a partner CTA */}
          <div className="mt-12 text-center">
            <a 
              href="/partner" 
              className="inline-flex items-center gap-2 text-[#ff6b35] hover:text-orange-600 font-medium transition-colors"
            >
              Want your restaurant featured?
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-4">
              How BiteBook Works
            </h2>
            <p className="text-lg text-gray-600">
              Start saving in under 2 minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Subscribe</h3>
              <p className="text-gray-600">
                Sign up for 99¢ your first month. Get instant access to your digital coupon book.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Browse & Choose</h3>
              <p className="text-gray-600">
                Pick from {pricing.restaurantCount}+ restaurants. Wings tonight? Pizza tomorrow? It's all there.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Save & Enjoy</h3>
              <p className="text-gray-600">
                Show your coupon at the restaurant. Save money. Repeat all month long.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">{restaurants.length}+</p>
              <p className="text-gray-500 text-sm">Restaurant Partners</p>
            </div>
            <div className="h-12 w-px bg-gray-200 hidden md:block" />
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">${pricing.totalValue}+</p>
              <p className="text-gray-500 text-sm">Monthly Savings</p>
            </div>
            <div className="h-12 w-px bg-gray-200 hidden md:block" />
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">30</p>
              <p className="text-gray-500 text-sm">Day Validity</p>
            </div>
            <div className="h-12 w-px bg-gray-200 hidden md:block" />
            <div className="text-center">
              <p className="text-4xl font-bold text-[#ff6b35]">99¢</p>
              <p className="text-gray-500 text-sm">First Month</p>
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
            Join BiteBook today. Your first month is just 99¢ — then ${pricing.regularPrice}/month. Cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackingButton
              href="/checkout"
              eventName="footer_cta_click"
              eventCategory="conversion"
              value={pricing.introPrice}
              className="w-full sm:w-auto bg-white text-[#ff6b35] px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              Get Started — 99¢
              <ChevronRight className="w-5 h-5" />
            </TrackingButton>
          </div>
          <p className="text-white/70 text-sm mt-6">
            Then ${pricing.regularPrice}/month • Cancel anytime • Instant access
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
              <p className="text-slate-400 text-sm mt-1">New Haven, CT</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="/partner" className="hover:text-white transition-colors">Partner With Us</a>
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


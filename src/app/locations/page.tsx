'use client';

import { useEffect } from 'react';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Available locations - add new cities here as you expand
const locations = [
  {
    id: 'new-haven',
    city: 'New Haven',
    state: 'CT',
    region: 'Connecticut',
    restaurantCount: 27,
    status: 'active', // 'active' | 'coming-soon' | 'waitlist'
    featured: true,
    image: '/images/locations/new-haven.jpg', // Optional hero image
  },
  // Future locations - uncomment as you launch
  // {
  //   id: 'hartford',
  //   city: 'Hartford',
  //   state: 'CT',
  //   region: 'Connecticut',
  //   restaurantCount: 0,
  //   status: 'coming-soon',
  //   featured: false,
  // },
  // {
  //   id: 'boston',
  //   city: 'Boston',
  //   state: 'MA',
  //   region: 'Massachusetts',
  //   restaurantCount: 0,
  //   status: 'waitlist',
  //   featured: false,
  // },
];

export default function LocationsPage() {
  const activeLocations = locations.filter(l => l.status === 'active');
  const comingSoonLocations = locations.filter(l => l.status === 'coming-soon' || l.status === 'waitlist');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-display font-bold text-gray-900">
                <span className="text-[#ff6b35]">Bite</span>Book
              </h1>
            </Link>
            <a href="/partner" className="text-gray-600 hover:text-[#ff6b35] text-sm font-medium transition-colors">
              Restaurant Partners
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 mb-8">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-700">Expanding Nationwide</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-6">
            Find <span className="text-[#ff6b35]">BiteBook</span><br />
            in Your City
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Local restaurant deals, delivered digitally. Choose your location to start saving.
          </p>
        </div>
      </section>

      {/* Active Locations */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Available Now</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeLocations.map((location) => (
              <Link
                key={location.id}
                href={`/locations/${location.id}`}
                className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-[#ff6b35]/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#ff6b35]/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#ff6b35]" />
                  </div>
                  {location.featured && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                      Featured
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#ff6b35] transition-colors">
                  {location.city}, {location.state}
                </h3>
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Locations */}
      {comingSoonLocations.length > 0 && (
        <section className="py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Coming Soon</h2>
            
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
                  
                  <h3 className="text-xl font-bold text-gray-600 mb-1">
                    {location.city}, {location.state}
                  </h3>
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
        </section>
      )}

      {/* Request a Location */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Don't See Your City?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            We're expanding fast. Let us know where you'd like to see BiteBook next, and we'll prioritize your area.
          </p>
          <a 
            href="mailto:hello@getbitebook.com?subject=Bring BiteBook to my city"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-medium hover:bg-slate-800 transition-colors"
          >
            Request Your City
            <ArrowRight className="w-4 h-4" />
          </a>
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


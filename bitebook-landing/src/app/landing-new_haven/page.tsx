import Link from 'next/link';
import { Metadata } from 'next';
import Script from 'next/script';
import TrackingButton from '@/components/TrackingButton';
import RestaurantLogosCarousel from '@/components/RestaurantLogosCarousel';

export const metadata: Metadata = {
  title: 'Wings Month - BiteBook | Get $300+ in Local Restaurant Deals for $29.99',
  description: 'Love wings for less! Unlock unbeatable Wing Month deals at local favorites. Get $300+ in savings for just $29.99. Digital, mobile-friendly, instant access.',
  keywords: 'wings month, restaurant deals, local restaurant coupons, wing deals, food coupons',
};

export default function LandingBiteBook() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Meta Pixel Code for Landing Page */}
      <Script
        id="meta-pixel-landing"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); 
            fbq('init', '2728483774150410'); 
            fbq('track', 'PageView');
          `
        }}
      />
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{display: 'none'}}
          src="https://www.facebook.com/tr?id=2728483774150410&ev=PageView&noscript=1"
        />
      </noscript>
      {/* End Meta Pixel Code */}
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              <span className="text-orange-600">Bite</span>Book
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-slate-700 hover:text-orange-600">Home</Link>
              <Link href="/partner" className="text-slate-700 hover:text-orange-600">Partner Restaurants</Link>
              <TrackingButton
                href="/checkout"
                value={29.99}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Buy Now
              </TrackingButton>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Love <span className="text-orange-600">Wings</span> for Less
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Unlock unbeatable Wing Month deals at local favorites — all in one simple digital BiteBook for just <span className="font-semibold">$29.99</span>.
            </p>
            <div className="mt-6 flex gap-3">
              <TrackingButton
                href="/checkout"
                value={29.99}
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold bg-yellow-400 hover:bg-yellow-300 text-slate-900 shadow"
              >
                Get Yours Now
              </TrackingButton>
              <a href="#how-it-works-copy" className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow">
                See How It Works
              </a>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Secure checkout • Instant email confirmation • Limited quantity
            </p>
          </div>

          <div className="relative">
            <img
              src="/images/hero-wings.jpg"
              alt="Saucy wings and beer"
              className="w-full rounded-2xl shadow-lg object-cover aspect-[4/3]"
            />
            {/* Optional decorative gradient */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-transparent to-blue-50" />
          </div>
        </div>
      </section>

      {/* How It Works Copy */}
      <section id="how-it-works-copy" className="bg-white py-12 md:py-12 -mt-8">
        <div className="mx-auto max-w-4xl px-4">
          <div className="prose prose-lg max-w-none text-slate-700">
            <p className="text-lg leading-relaxed mb-4">
              How does it work? Well I'm glad you asked
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Here at BiteBook we don't believe you have to sacrifice quality for price.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Each month we put together a coupon book featuring around 30 local restaurants. We focus only on the best (most delicious) types of food. Wings, tacos, pizza, burgers, BBQ, fried chicken, etc.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              We petitioned those food pyramid guys to recreate it based on our suggestions - but we haven't heard back yet...
            </p>
            <p className="text-lg leading-relaxed mb-4">
              So each monthly coupon book is centered around a theme and features 30 local restaurants.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              January is Wing Month.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Each restaurant includes a coupon of their choosing, like a free half or full order of chicken wings. Most coupons are between $10 and $20 in value and are valid for the entire month.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              And the entire book costs $30 (or $19.99 if you subscribe)
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Quick math shakes out to - if you eat food then it's a pretty good deal.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Oh, and all the participating restaurants are centered around the New Haven area, so you won't have to go far to enjoy these deals.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              We have some outstanding places who are participating and our team is constantly reaching out to find the absolute best places in the area.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Every month we are working to bring you the VERY BEST in New Haven for less.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              We hope you check out the book and consider subscribing.
            </p>
          </div>
        </div>
      </section>

      {/* Some of our Participating Restaurants */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Some of our Participating Restaurants
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We partner with the best restaurants in the New Haven area to bring you incredible deals
            </p>
          </div>
          <RestaurantLogosCarousel />
        </div>
      </section>

      {/* Value Stack */}
      <section className="bg-blue-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose BiteBook?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Save Big</h3>
              <p className="text-slate-600">Get $300+ in restaurant deals for just $29.99</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">Digital & Instant</h3>
              <p className="text-slate-600">Access your coupons immediately via email</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold mb-2">Local Favorites</h3>
              <p className="text-slate-600">Support amazing local restaurants in your area</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-orange-600 text-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-xl mb-8 opacity-90">Get your Wings Month coupon book today!</p>
          <TrackingButton
            href="/checkout"
            value={29.99}
            className="inline-flex items-center justify-center rounded-xl px-8 py-4 font-semibold bg-yellow-400 hover:bg-yellow-300 text-slate-900 shadow-lg text-lg"
          >
            Get Yours Now - $29.99
          </TrackingButton>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-slate-600">
          <p>&copy; {new Date().getFullYear()} BiteBook. All rights reserved.</p>
          <p className="mt-2">
            <a href="mailto:info@getbitebook.com" className="text-orange-600 hover:underline">info@getbitebook.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}


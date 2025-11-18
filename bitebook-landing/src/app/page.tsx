'use client';

import TrackingButton from "@/components/TrackingButton";
import RestaurantLogosCarousel from "@/components/RestaurantLogosCarousel";

// Monthly promotions for 2025 (Sept-Dec) and 2026 (Jan-Aug)
const monthlyPromotions = [
    { month: "January 2026", theme: "Wings Month", tagline: "Kick Off the Year with Heat.", description: "Perfect for bars, breweries, and sports grills. Tie into football playoffs or Super Bowl promos.", color: "from-red-500 to-orange-600", icon: "🍗" },
    { month: "February 2026", theme: "Taco Month", tagline: "Love at First Bite.", description: "Works with Valentine's tie-ins — 'Taco 'bout love.' Feature street tacos, taquerias, and Mexican cantinas.", color: "from-orange-400 to-red-500", icon: "🌮" },
    { month: "March 2026", theme: "Pizza Month", tagline: "In Crust We Trust.", description: "Celebrate National Pizza Day (Mar 9). Include local pizzerias, breweries, and family spots.", color: "from-red-400 to-pink-500", icon: "🍕" },
    { month: "April 2026", theme: "Breakfast Sandwich Month", tagline: "Rise & Bite.", description: "Partner with coffee shops and cafés. Feature breakfast burritos, croissant sandwiches, and biscuit specials.", color: "from-yellow-400 to-orange-500", icon: "🥪" },
    { month: "May 2026", theme: "Burger Month", tagline: "Build the Perfect Bite.", description: "National Burger Month — ideal time for contests or polls ('Best Burger in Town').", color: "from-amber-600 to-red-600", icon: "🍔" },
    { month: "June 2026", theme: "BBQ Month", tagline: "Smokin' Deals All Month Long.", description: "Kick off summer with ribs, brisket, pulled pork, and grilled chicken. Feature BBQ joints and food trucks.", color: "from-orange-600 to-red-700", icon: "🔥" },
    { month: "July 2026", theme: "Fried Chicken Month", tagline: "Crispy. Juicy. Legendary.", description: "Peak picnic season — highlight fried chicken sandwiches, tenders, and Korean fried chicken spots.", color: "from-yellow-500 to-orange-600", icon: "🍗" },
    { month: "August 2026", theme: "Ice Cream & Dessert Month", tagline: "Sweet Summer Bites.", description: "Pair ice cream shops, donut cafés, bakeries, and dessert trucks. Great for families and social media engagement.", color: "from-pink-300 to-purple-400", icon: "🍦" },
    { month: "September 2025", theme: "Wings Month (Round 2)", tagline: "Fall Back into Flavor.", description: "Football season kickoff — repeat your January success with a new slate of wing joints. Consider spicy challenges.", color: "from-red-500 to-orange-600", icon: "🍗" },
    { month: "October 2025", theme: "Appetizers Month", tagline: "Start with a Bite.", description: "Tapas, nachos, sliders, quesadillas, mozzarella sticks. Encourage sharing and date-night promos.", color: "from-orange-500 to-yellow-500", icon: "🍤" },
    { month: "November 2025", theme: "Nacho Month", tagline: "Stacked. Loaded. Melted.", description: "Great for casual dining and sports bars. Include creative twists: BBQ nachos, breakfast nachos, etc.", color: "from-yellow-500 to-orange-600", icon: "🧀" },
    { month: "December 2025", theme: "Burger Month (Round 2)", tagline: "Holiday Edition — The Gift of the Grill.", description: "Cozy comfort food for winter. Repeat top performers or feature new premium burger collabs.", color: "from-amber-600 to-red-600", icon: "🍔" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold">
              <span className="text-orange-600">Bite</span>Book
            </a>
            <nav className="hidden md:flex gap-6">
              <a href="/" className="text-slate-700 hover:text-orange-600">Home</a>
              <a href="/partner" className="text-slate-700 hover:text-orange-600">Partner Restaurants</a>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 text-white py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Discover Amazing Local Restaurant Deals
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Get over $300 in savings at 30+ local restaurants for just $29.99
          </p>
          <div className="flex gap-4 justify-center">
            <TrackingButton
              href="/checkout"
              value={29.99}
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold rounded-xl shadow-lg text-lg"
            >
              Buy Your Coupon Book - $29.99
            </TrackingButton>
            <a href="/partner" className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl backdrop-blur">
              Partner With Us
            </a>
          </div>
        </div>
      </section>


      {/* How It Works */}
      <section id="how" className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
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

      {/* Participating Restaurants */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Participating Restaurants
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here is a list of some of the restaurants featured in next month's book
            </p>
          </div>
          <RestaurantLogosCarousel />
        </div>
      </section>

      {/* Our 2026 Events Schedule */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our 2026 Events Schedule</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthlyPromotions.filter(p => p.month.includes("2026")).map((promo, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
                <div className={`h-24 bg-gradient-to-r ${promo.color} flex items-center justify-center`}>
                  <span className="text-5xl">{promo.icon}</span>
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    {promo.month}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{promo.theme}</h3>
                  <p className="text-sm font-medium text-orange-600 mb-2 italic">
                    "{promo.tagline}"
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">{promo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-orange-600 text-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-xl mb-8 opacity-90">Get your coupon book today!</p>
          <TrackingButton
            href="/checkout"
            value={29.99}
            className="inline-flex items-center justify-center rounded-xl px-8 py-4 font-semibold bg-yellow-400 hover:bg-yellow-300 text-slate-900 shadow-lg text-lg"
          >
            Get Yours Now - $29.99
          </TrackingButton>
        </div>
      </section>

      {/* Footer */}
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


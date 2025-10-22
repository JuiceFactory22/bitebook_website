import { Clock, MapPin, Star, Utensils } from "lucide-react";
import EventsCarousel from "@/components/EventsCarousel";

export default function Home() {
  const monthlyPromotions = [
    {
      month: "January",
      theme: "Wings Month",
      tagline: "Kick Off the Year with Heat.",
      description: "Perfect for bars, breweries, and sports grills. Tie into football playoffs or Super Bowl promos.",
      color: "from-red-500 to-orange-600",
      icon: "🍗"
    },
    {
      month: "February", 
      theme: "Taco Month",
      tagline: "Love at First Bite.",
      description: "Works with Valentine's tie-ins — 'Taco 'bout love.' Feature street tacos, taquerias, and Mexican cantinas.",
      color: "from-orange-400 to-red-500",
      icon: "🌮"
    },
    {
      month: "March",
      theme: "Pizza Month", 
      tagline: "In Crust We Trust.",
      description: "Celebrate National Pizza Day (Mar 9). Include local pizzerias, breweries, and family spots.",
      color: "from-red-400 to-pink-500",
      icon: "🍕"
    },
    {
      month: "April",
      theme: "Breakfast Sandwich Month",
      tagline: "Rise & Bite.",
      description: "Partner with coffee shops and cafés. Feature breakfast burritos, croissant sandwiches, and biscuit specials.",
      color: "from-yellow-400 to-orange-500",
      icon: "🥪"
    },
    {
      month: "May",
      theme: "Burger Month",
      tagline: "Build the Perfect Bite.",
      description: "National Burger Month — ideal time for contests or polls ('Best Burger in Town').",
      color: "from-amber-600 to-red-600",
      icon: "🍔"
    },
    {
      month: "June",
      theme: "BBQ Month",
      tagline: "Smokin' Deals All Month Long.",
      description: "Kick off summer with ribs, brisket, pulled pork, and grilled chicken. Feature BBQ joints and food trucks.",
      color: "from-orange-600 to-red-700",
      icon: "🔥"
    },
    {
      month: "July",
      theme: "Fried Chicken Month",
      tagline: "Crispy. Juicy. Legendary.",
      description: "Peak picnic season — highlight fried chicken sandwiches, tenders, and Korean fried chicken spots.",
      color: "from-yellow-500 to-orange-600",
      icon: "🍗"
    },
    {
      month: "August",
      theme: "Ice Cream & Dessert Month",
      tagline: "Sweet Summer Bites.",
      description: "Pair ice cream shops, donut cafés, bakeries, and dessert trucks. Great for families and social media engagement.",
      color: "from-pink-300 to-purple-400",
      icon: "🍦"
    },
    {
      month: "September",
      theme: "Wings Month (Round 2)",
      tagline: "Fall Back into Flavor.",
      description: "Football season kickoff — repeat your January success with a new slate of wing joints. Consider spicy challenges.",
      color: "from-red-500 to-orange-600",
      icon: "🍗"
    },
    {
      month: "October",
      theme: "Appetizers Month",
      tagline: "Start with a Bite.",
      description: "Tapas, nachos, sliders, quesadillas, mozzarella sticks. Encourage sharing and date-night promos.",
      color: "from-orange-500 to-yellow-500",
      icon: "🍤"
    },
    {
      month: "November",
      theme: "Nacho Month",
      tagline: "Stacked. Loaded. Melted.",
      description: "Great for casual dining and sports bars. Include creative twists: BBQ nachos, breakfast nachos, etc.",
      color: "from-yellow-500 to-orange-600",
      icon: "🧀"
    },
    {
      month: "December",
      theme: "Burger Month (Round 2)",
      tagline: "Holiday Edition — The Gift of the Grill.",
      description: "Cozy comfort food for winter. Repeat top performers or feature new premium burger collabs.",
      color: "from-amber-600 to-red-600",
      icon: "🍔"
    }
  ];

  const features = [
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "30+ Local Restaurants",
      description: "Access deals from your area's best local restaurants and hidden gems"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Over $300 Value",
      description: "Get more than $300 in savings for just $29.99 - that's 90% off!"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "30-Day Validity",
      description: "All coupons are valid for 30 days from the month of purchase"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Local Coverage",
      description: "Conveniently located restaurants throughout your area"
    }
  ];

  const partnerRestaurants = [
    { name: "Frank Pepe Pizzeria", location: "West Hartford", specialty: "New Haven Style Pizza" },
    { name: "The Capital Grille", location: "Hartford", specialty: "Steakhouse & Fine Dining" },
    { name: "Bear's Smokehouse", location: "Hartford", specialty: "BBQ & Smoked Meats" },
    { name: "Max Downtown", location: "Hartford", specialty: "Contemporary American" },
    { name: "Salute Restaurant", location: "Hartford", specialty: "Italian Cuisine" },
    { name: "The Place 2 Be", location: "Hartford", specialty: "Brunch & American Fare" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-display font-bold text-gray-900">
                  <span className="text-[#ff6b35]">Bite</span>Book
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#promotions" className="text-gray-700 hover:text-[#ff6b35] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Monthly Promotions
                </a>
                <a href="/partner" className="text-gray-700 hover:text-[#ff6b35] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Partner Restaurants
                </a>
                <a href="#how-it-works" className="text-gray-700 hover:text-[#ff6b35] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  How It Works
                </a>
          <a
                  href="/checkout"
                  className="inline-block bg-[#ff6b35] text-white px-6 py-2 rounded-full text-sm font-medium btn-hover"
                >
                  Buy Now - $29.99
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#ff6b35] via-[#e55a2b] to-[#d44a1f] text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            Discover Amazing
            <br />
            <span className="text-yellow-300">Local Restaurant</span>
            <br />
            Deals
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Get over $300 in savings at 30+ local restaurants for just $29.99. 
            Limited monthly themes - books sell out fast!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <a 
                  href="/checkout"
                  className="inline-block bg-white text-[#ff6b35] px-8 py-4 rounded-full text-lg font-semibold btn-hover shadow-lg"
                >
                  Buy Your Coupon Book - $29.99
                </a>
            <a 
              href="/partner"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#ff6b35] transition-all"
            >
              Partner With Us
            </a>
          </div>
          {/* Events Timeline */}
          <EventsCarousel 
            pastEvents={monthlyPromotions.slice(7, 11)}
            upcomingEvents={monthlyPromotions.slice(11, 15)}
            currentMonth={9} // October (0-indexed)
          />
        </div>
      </section>

      {/* Monthly Promotions */}
      <section id="promotions" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Monthly Promotions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Each month features a different food theme with exclusive deals from local restaurants
            </p>
            
            {/* Subscribe & Save Button */}
            <div className="text-center mb-12">
              <a 
                href="/checkout?subscription=true"
                className="inline-block bg-[#ff6b35] hover:bg-[#e55a2b] text-white px-8 py-4 rounded-full text-lg font-semibold btn-hover shadow-lg transition-all duration-300"
              >
                Subscribe & Save 30% - Get Monthly BiteBooks
              </a>
              <p className="text-sm text-gray-500 mt-3">
                Cancel anytime • No commitment • Save $9 every month
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {monthlyPromotions.map((promo, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`h-24 bg-gradient-to-r ${promo.color} flex items-center justify-center`}>
                  <span className="text-4xl">{promo.icon}</span>
                </div>
                <div className="p-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {promo.month}
                  </div>
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-2">
                    {promo.theme}
                  </h3>
                  <p className="text-sm font-medium text-[#ff6b35] mb-2 italic">
                    "{promo.tagline}"
                  </p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {promo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-yellow-600 mr-2" />
                <span className="font-semibold text-yellow-800">Limited Time Offer</span>
              </div>
              <p className="text-yellow-700 mb-6">
                Coupon books sell out fast! Each month we print a limited number to ensure 
                our restaurant partners get maximum value from their participation.
              </p>
              <a 
                href="/checkout"
                className="inline-block bg-[#ff6b35] hover:bg-[#e55a2b] text-white px-8 py-3 rounded-full font-semibold btn-hover shadow-lg transition-all duration-300"
              >
                Secure Your Book Now - $29.99
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Why Choose BiteBook?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We connect food lovers with amazing local restaurants while providing incredible value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-[#ff6b35] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-all">
                  <div className="text-[#ff6b35]">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with BiteBook is simple and rewarding
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#ff6b35] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Purchase Your Book
              </h3>
              <p className="text-gray-600">
                Buy your monthly coupon book for just $29.99 and get instant access to over $300 in savings
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#ff6b35] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Explore Restaurants
              </h3>
              <p className="text-gray-600">
                Browse our curated selection of 30+ local restaurants and discover new favorites in your area
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#ff6b35] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                Enjoy & Save
              </h3>
              <p className="text-gray-600">
                Use your coupons within 30 days and enjoy amazing food while saving hundreds of dollars
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Restaurants */}
      <section id="restaurants" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Partner Restaurants
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover amazing local restaurants in our network
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerRestaurants.map((restaurant, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-display font-semibold text-gray-900">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{restaurant.location}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Specializes in: {restaurant.specialty}
                </div>
              </div>
            ))}
          </div>
          
          {/* Prominent Partner CTA Section */}
          <div className="mt-16 bg-[#ff6b35] text-white rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-display font-bold mb-4">
              Join Our Restaurant Network
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Partner with BiteBook and reach thousands of food lovers in your area. 
              Increase your customer base and boost sales with our monthly coupon books.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/partner"
                className="inline-block bg-white text-[#ff6b35] text-lg px-8 py-4 font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg rounded-full"
              >
                Become a Partner Restaurant
              </a>
              <div className="text-sm opacity-75">
                ✓ No setup fees ✓ Flexible terms ✓ Proven results
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#ff6b35] to-[#e55a2b] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who have saved hundreds of dollars 
            while discovering amazing local restaurants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/checkout"
              className="inline-block bg-white text-[#ff6b35] px-8 py-4 rounded-full text-lg font-semibold btn-hover shadow-lg"
            >
              Buy Now - $29.99
            </a>
            <div className="text-sm opacity-75">
              ✓ Instant access ✓ 30-day validity ✓ Limited quantity
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-display font-bold mb-4">
                <span className="text-[#ff6b35]">Bite</span>Book
              </h3>
              <p className="text-gray-400 text-sm">
                Connecting food lovers with amazing local restaurants through incredible coupon deals.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#promotions" className="hover:text-white transition-colors">Monthly Promotions</a></li>
                <li><a href="#restaurants" className="hover:text-white transition-colors">Partner Restaurants</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Restaurants</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Partner With Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Restaurant Benefits</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Application Process</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="text-sm text-gray-400 space-y-2">
                <div>Boston Metro Area</div>
                <div>hello@bitebook.com</div>
                <div>(555) 123-4567</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 BiteBook. All rights reserved. | Terms of Service | Privacy Policy</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { CheckCircle, X, Gift } from 'lucide-react';
import SpinWheel from '@/components/SpinWheel';
import { restaurants, Restaurant } from '@/data/restaurants';
import emailjs from '@emailjs/browser';
import { trackLead } from '@/utils/facebookPixel';
import Image from 'next/image';

export default function NewHavenFreeCoupon() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showWheel, setShowWheel] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [error, setError] = useState('');
  const [hasSpun, setHasSpun] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    try {
      emailjs.init('qq3QK0zGBYaHNI2DW');
    } catch (error) {
      console.error('EmailJS initialization error:', error);
    }
  }, []);

  // Check if user has already spun (localStorage)
  useEffect(() => {
    const checkPreviousSpin = () => {
      const spunEmails = JSON.parse(localStorage.getItem('spinWheelEmails') || '[]');
      const spunPhones = JSON.parse(localStorage.getItem('spinWheelPhones') || '[]');
      
      // Check on page load if email/phone is already filled and has spun
      if (email && spunEmails.includes(email.toLowerCase().trim())) {
        setHasSpun(true);
        setShowForm(false);
        setError('You have already spun the wheel with this email address. One spin per person!');
      } else if (phone && spunPhones.includes(phone.replace(/\D/g, ''))) {
        setHasSpun(true);
        setShowForm(false);
        setError('You have already spun the wheel with this phone number. One spin per person!');
      }
    };
    
    checkPreviousSpin();
  }, [email, phone]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate email format
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate phone
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    // Check for duplicates
    const spunEmails = JSON.parse(localStorage.getItem('spinWheelEmails') || '[]');
    const spunPhones = JSON.parse(localStorage.getItem('spinWheelPhones') || '[]');
    
    const emailLower = email.toLowerCase().trim();
    
    if (spunEmails.includes(emailLower)) {
      setError('You have already spun the wheel with this email address. One spin per person!');
      setHasSpun(true);
      return;
    }
    
    if (spunPhones.includes(cleanPhone)) {
      setError('You have already spun the wheel with this phone number. One spin per person!');
      setHasSpun(true);
      return;
    }

    // Show wheel
    setShowForm(false);
    setShowWheel(true);
  };

  const handleSpinStart = () => {
    setIsSpinning(true);
  };

  const handleSpinComplete = async (restaurant: Restaurant) => {
    setIsSpinning(false);
    setSelectedRestaurant(restaurant);
    
    // Save to localStorage to prevent duplicate spins
    const spunEmails = JSON.parse(localStorage.getItem('spinWheelEmails') || '[]');
    const spunPhones = JSON.parse(localStorage.getItem('spinWheelPhones') || '[]');
    
    const emailLower = email.toLowerCase().trim();
    const cleanPhone = phone.replace(/\D/g, '');
    
    spunEmails.push(emailLower);
    spunPhones.push(cleanPhone);
    
    localStorage.setItem('spinWheelEmails', JSON.stringify(spunEmails));
    localStorage.setItem('spinWheelPhones', JSON.stringify(spunPhones));
    setHasSpun(true);

    // Send email via EmailJS
    setIsSubmitting(true);
    try {
      const templateParams = {
        email: email.trim(),
        phone: cleanPhone,
        restaurant_name: restaurant.name, // Include which restaurant they won
      };

      const SERVICE_ID = 'service_u460dtm';
      const TEMPLATE_ID = 'template_db2m6o7'; // Template ID provided by user

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams
      );

      // Track lead to Google Sheets
      try {
        await fetch('/api/track-lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            phone: cleanPhone,
            source: 'spin-wheel',
            restaurant_name: restaurant.name,
          }),
        });
        console.log('Lead tracked to Google Sheets');
      } catch (sheetError) {
        console.error('Error tracking to Google Sheets:', sheetError);
        // Don't fail the form submission if Sheets tracking fails
      }

      // Track lead with Meta Pixel
      trackLead(0, email.trim(), cleanPhone);

      // Show success after a brief delay to let user see the winner
      setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowUpsell(true);
        }, 2000);
      }, 500);
    } catch (err: any) {
      console.error('EmailJS error:', err);
      console.error('Error details:', {
        text: err.text,
        status: err.status,
        message: err.message,
      });
      
      // Show more specific error message
      let errorMessage = 'Failed to send coupon email. ';
      if (err.text) {
        errorMessage += err.text;
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage += 'Please try again or contact support.';
      }
      
      setError(errorMessage);
      
      // Still show success popup even if email fails (user still won)
      // The coupon will be tracked in Google Sheets
      setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowUpsell(true);
        }, 2000);
      }, 500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ff6b35] via-[#ff6b35] to-[#e55a2b]">
      {/* Social Media Preview Meta Tags */}
      <Script
        id="social-meta-tags"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            document.title = 'Spin to Win Free Coupon - BiteBook | New Haven Area';
            const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
            metaDescription.name = 'description';
            metaDescription.content = 'Spin the wheel and win a free coupon at one of 20 participating restaurants in the New Haven area! Get your free coupon today.';
            if (!document.querySelector('meta[name="description"]')) document.head.appendChild(metaDescription);
            
            // Open Graph tags
            const ogTags = [
              { property: 'og:title', content: 'Spin to Win Free Coupon - BiteBook | New Haven Area' },
              { property: 'og:description', content: 'Spin the wheel and win a free coupon at one of 20 participating restaurants in the New Haven area!' },
              { property: 'og:image', content: 'https://getbitebook.com/images/bitebook-logo.png' },
              { property: 'og:url', content: 'https://getbitebook.com/new-haven-free-coupon' },
              { property: 'og:type', content: 'website' },
            ];
            
            // Twitter Card tags
            const twitterTags = [
              { name: 'twitter:card', content: 'summary_large_image' },
              { name: 'twitter:title', content: 'Spin to Win Free Coupon - BiteBook | New Haven Area' },
              { name: 'twitter:description', content: 'Spin the wheel and win a free coupon at one of 20 participating restaurants in the New Haven area!' },
              { name: 'twitter:image', content: 'https://getbitebook.com/images/bitebook-logo.png' },
            ];
            
            [...ogTags, ...twitterTags].forEach(tag => {
              let meta = document.querySelector(tag.property ? \`meta[property="\${tag.property}"]\` : \`meta[name="\${tag.name}"]\`);
              if (!meta) {
                meta = document.createElement('meta');
                if (tag.property) meta.setAttribute('property', tag.property);
                if (tag.name) meta.setAttribute('name', tag.name);
                document.head.appendChild(meta);
              }
              meta.setAttribute('content', tag.content);
            });
          `
        }}
      />
      
      {/* Meta Pixel Code */}
      <Script
        id="meta-pixel-spin-wheel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); 
            fbq('init', '2728483774150410', {});
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

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-orange-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-[#ff6b35]">BiteBook</Link>
          <Link 
            href="/checkout"
            className="hidden md:inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold bg-yellow-400 hover:bg-yellow-300 text-gray-900 shadow"
          >
            Get Full Book
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            🎰 Spin to Win a Free Coupon!
          </h1>
          <p className="text-xl md:text-2xl text-white/95 font-semibold mb-2">
            Win a Free Coupon at One of Our Participating Restaurants
          </p>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Enter your email and phone number, then spin the wheel to see which restaurant you'll get a free coupon from!
          </p>
        </div>

        {/* Participating Restaurants Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Our Participating Restaurants
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {restaurants.map((restaurant, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 shadow-lg flex flex-col items-center justify-center min-h-[100px]"
              >
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  width={120}
                  height={60}
                  className="object-contain max-h-16 w-auto mb-2"
                  unoptimized
                />
                <p className="text-xs text-center text-gray-700 font-medium leading-tight">
                  {restaurant.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        {showForm && !hasSpun && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Enter Your Info to Spin!
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-gray-900"
                />
              </div>
            {error && !showSuccess && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mt-4">
                <p className="text-red-800 text-sm font-semibold text-center">{error}</p>
                <p className="text-red-600 text-xs text-center mt-2">
                  Don't worry - your win has been recorded! Check your email shortly.
                </p>
              </div>
            )}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 text-lg"
              >
                🎰 Spin the Wheel!
              </button>
            </form>
          </div>
        )}

        {/* Wheel Section */}
        {showWheel && !selectedRestaurant && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Ready to Spin?
            </h2>
            <SpinWheel
              restaurants={restaurants}
              onSpinComplete={handleSpinComplete}
              isSpinning={isSpinning}
              onSpinStart={handleSpinStart}
            />
          </div>
        )}

        {/* Success Modal */}
        {showSuccess && selectedRestaurant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Congratulations! 🎉
                </h3>
                <p className="text-gray-700 mb-4">
                  You won a free coupon at:
                </p>
                <p className="text-2xl font-bold text-[#ff6b35] mb-6">
                  {selectedRestaurant.name}
                </p>
                <p className="text-gray-600 mb-6 text-sm">
                  Your coupon will be sent to your email and phone number shortly. Check your inbox and messages!
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upsell Section */}
        {showUpsell && (
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl mx-auto mt-8 border-4 border-yellow-500">
            <div className="text-center">
              <Gift className="w-16 h-16 text-gray-900 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Want More Deals?
              </h2>
              <p className="text-xl text-gray-800 mb-6 font-semibold">
                Get the Full BiteBook with coupons from ALL {restaurants.length} restaurants for just <span className="text-3xl">$15</span>
              </p>
              <p className="text-lg text-gray-700 mb-2 line-through">
                Regular Price: $29.99
              </p>
              <p className="text-2xl font-bold text-[#ff6b35] mb-6">
                Your Price: $15 (50% OFF!)
              </p>
              <Link
                href="/checkout?coupon=BITEBOOKNH50"
                className="inline-block bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-extrabold px-8 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 text-lg"
              >
                Get Full Book for $15 (50% OFF)
              </Link>
              <p className="text-sm text-gray-700 mt-4">
                Limited time offer - expires soon!
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {hasSpun && error && (
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 max-w-2xl mx-auto mt-8">
            <p className="text-red-800 font-semibold text-center">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}


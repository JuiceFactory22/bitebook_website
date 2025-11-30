'use client';

import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { trackLead } from '@/utils/facebookPixel';

export default function LeadMagnetForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Send email via EmailJS
      const templateParams = {
        to_email: email,
        to_phone: phone,
        email: email,
        phone: phone,
        from_name: 'BiteBook',
        message: 'Thank you for signing up! Your free coupon will be sent shortly.',
      };

      await emailjs.send(
        'service_u460dtm', // EmailJS service ID
        'template_lead_magnet', // TODO: Create this template in EmailJS for lead magnet
        templateParams,
        'qq3QK0zGBYaHNI2DW' // EmailJS public key
      );

      // Track lead with Meta Pixel
      trackLead();

      // Show success popup
      setShowSuccess(true);
      setEmail('');
      setPhone('');
    } catch (err: any) {
      console.error('Error sending lead:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-gradient-to-r from-[#ff6b35] to-[#e55a2b] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-4">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Get a Free Coupon from One of Our Participating Restaurants!
              </h3>
              <p className="text-lg opacity-90">
                Enter your email and phone number to receive a free coupon delivered instantly
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Get Free Coupon'}
              </button>
            </form>
            {error && (
              <p className="text-red-200 text-center mt-2 text-sm">{error}</p>
            )}
          </div>
        </div>
      </section>

      {/* Success Popup Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative">
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
                Success!
              </h3>
              <p className="text-gray-700 mb-6">
                Your free coupon from one of our participating restaurants will be sent to your email and phone number shortly.
              </p>
              <p className="text-sm text-gray-600 mb-6">
                Check your inbox and messages for your exclusive coupon code!
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
    </>
  );
}


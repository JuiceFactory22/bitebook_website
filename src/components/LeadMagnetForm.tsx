'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { trackLead } from '@/utils/facebookPixel';

export default function LeadMagnetForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  // Initialize EmailJS on component mount
  useEffect(() => {
    try {
      emailjs.init('qq3QK0zGBYaHNI2DW');
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('EmailJS initialization error:', error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validate email format
      if (!email || !email.includes('@')) {
        setError('Please enter a valid email address');
        setIsSubmitting(false);
        return;
      }

      // Clean phone number (remove any non-digits)
      const cleanPhone = phone.replace(/\D/g, '');

      // Send email via EmailJS
      // Template variables must match exactly what's defined in your EmailJS template
      // The template uses {{email}} in the "To Email" field
      const templateParams = {
        email: email.trim(), // Maps to {{email}} in template - must be valid email
        phone: cleanPhone, // Clean phone number
      };

      const SERVICE_ID = 'service_u460dtm';
      // Try template_rwwf15i - the other template_lead_magnet in your list
      const TEMPLATE_ID = 'template_rwwf15i';
      const PUBLIC_KEY = 'qq3QK0zGBYaHNI2DW';

      console.log('=== EmailJS Send Request ===');
      console.log('Service ID:', SERVICE_ID);
      console.log('Template ID:', TEMPLATE_ID);
      console.log('Public Key:', PUBLIC_KEY);
      console.log('Template Params:', templateParams);
      console.log('===========================');

      // Pass public key explicitly to ensure it's used
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      console.log('EmailJS result:', result);

      // Send notification email to site owner
      try {
        await emailjs.send(
          SERVICE_ID,
          'template_8sfrufk', // NEW Partner Restaurant Application template - we'll use this for notifications
          {
            to_email: 'info@getbitebook.com',
            email: email.trim(),
            phone: cleanPhone,
            message: `New Lead Magnet Submission:\n\nEmail: ${email.trim()}\nPhone: ${cleanPhone}\n\nThis lead submitted the free coupon form on the homepage.`,
          },
          PUBLIC_KEY
        );
        console.log('Notification email sent to site owner');
      } catch (notificationError) {
        console.error('Failed to send notification email:', notificationError);
        // Don't fail the form submission if notification fails
      }

      // Track lead with Meta Pixel
      trackLead();

      // Show success popup
      setShowSuccess(true);
      setEmail('');
      setPhone('');
    } catch (err: any) {
      console.error('Full error object:', err);
      console.error('Error text:', err.text);
      console.error('Error status:', err.status);
      console.error('Error statusText:', err.statusText);
      
      // More specific error messages
      if (err.text) {
        setError(`Error: ${err.text}`);
      } else if (err.message) {
        setError(`Error: ${err.message}`);
      } else {
        setError('Something went wrong. Please check the browser console for details.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="sticky top-0 z-50 bg-gradient-to-r from-[#ff6b35] via-[#ff6b35] to-[#e55a2b] text-white py-2 md:py-4 shadow-2xl border-b-2 md:border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
              {/* Left side - Heading */}
              <div className="flex-1 text-center md:text-left w-full md:w-auto">
                <h3 className="text-sm md:text-xl lg:text-2xl font-extrabold mb-0.5 md:mb-1 leading-tight">
                  🎉 Get a Free Coupon!
                </h3>
                <p className="text-xs md:text-sm lg:text-base opacity-95 font-medium hidden md:block">
                  Enter your email and phone number to receive a free coupon delivered instantly
                </p>
              </div>
              
              {/* Right side - Form */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-1.5 md:gap-2 flex-1 max-w-2xl md:max-w-none w-full md:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="flex-1 px-2 md:px-4 py-1.5 md:py-3 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-yellow-300 shadow-lg text-sm md:text-base font-medium"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  required
                  className="flex-1 px-2 md:px-4 py-1.5 md:py-3 rounded-lg bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-yellow-300 shadow-lg text-sm md:text-base font-medium"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 md:px-6 lg:px-8 py-1.5 md:py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold rounded-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-base lg:text-lg whitespace-nowrap transform hover:scale-105"
                >
                  {isSubmitting ? 'Sending...' : 'Get Free Coupon'}
                </button>
              </form>
            </div>
            {error && (
              <p className="text-red-200 text-center mt-1 md:mt-3 text-xs md:text-sm font-semibold">{error}</p>
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


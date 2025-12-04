'use client';

import { useState } from 'react';

export default function GenerateCoupon() {
  const [restaurant, setRestaurant] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [month, setMonth] = useState('January 2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Call the PDF generation API
      const response = await fetch('/api/generate-coupon-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurant: restaurant.trim(),
          code: code.trim() || undefined,
          email: email.trim() || undefined,
          phone: phone.trim() || undefined,
          month: month.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate coupon');
      }

      const data = await response.json();

      if (data.format === 'pdf' && data.pdfBase64) {
        // Convert base64 to blob and download
        const binaryString = atob(data.pdfBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bitebook-coupon-${code || 'coupon'}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          // Clear form
          setRestaurant('');
          setCode('');
          setEmail('');
          setPhone('');
        }, 3000);
      } else {
        throw new Error('PDF generation failed - check Vercel logs');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate coupon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Generate PDF Coupon
          </h1>
          <p className="text-gray-600 mb-6">
            Use this tool to generate PDF coupons for customers who didn't receive them properly.
          </p>

          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label htmlFor="restaurant" className="block text-sm font-medium text-gray-700 mb-2">
                Restaurant Name *
              </label>
              <input
                type="text"
                id="restaurant"
                value={restaurant}
                onChange={(e) => setRestaurant(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., Capotorto's Apizza Center"
              />
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Coupon Code *
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="e.g., BB-A3F9-240115"
              />
              <p className="mt-1 text-sm text-gray-500">
                Format: BB-XXXX-YYMMDD (e.g., BB-A3F9-240115)
              </p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="customer@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="(203) 555-1234"
              />
            </div>

            <div>
              <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
                Valid Month *
              </label>
              <input
                type="text"
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="January 2026"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                ✅ Coupon generated successfully! The PDF should download automatically.
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating PDF...' : 'Generate & Download PDF Coupon'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Where to find this information:</h3>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li><strong>Restaurant Name:</strong> Check Google Sheets or EmailJS logs</li>
              <li><strong>Coupon Code:</strong> Generate a new one (BB-XXXX-YYMMDD) or check if they have one</li>
              <li><strong>Email & Phone:</strong> From Google Sheets or EmailJS logs</li>
              <li><strong>Month:</strong> Usually "January 2026" for current promotions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


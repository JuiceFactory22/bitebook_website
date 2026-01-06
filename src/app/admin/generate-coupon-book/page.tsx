'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

export default function GenerateCouponBook() {
  const [month, setMonth] = useState('January 2026');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/generate-coupon-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          month: month.trim(),
          customerName: customerName.trim() || undefined,
          customerEmail: customerEmail.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate coupon book');
      }

      const data = await response.json();

      if (data.format === 'pdf' && data.pdfBase64) {
        // Convert base64 to blob and download
        const byteCharacters = atob(data.pdfBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `bitebook-coupon-book-${month.replace(/\s/g, '-').toLowerCase()}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        setSuccess(true);
      } else if (data.html) {
        // Fallback: Download as HTML
        const blob = new Blob([data.html], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `bitebook-coupon-book-${month.replace(/\s/g, '-').toLowerCase()}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        setSuccess(true);
      } else {
        throw new Error('No PDF or HTML data returned');
      }
    } catch (err: any) {
      console.error('Error generating coupon book:', err);
      setError(err.message || 'Failed to generate coupon book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Generate Coupon Book
          </h1>
          <p className="text-gray-600 mb-8">
            Generate a complete coupon book PDF with all participating restaurants and their promotions from your Google Sheet.
          </p>

          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Month *
              </label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="January 2026"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                The month this coupon book is valid for
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name (Optional)
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                Will appear on the cover page if provided
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Email (Optional)
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="customer@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                Will appear on the cover page if provided
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                <p className="text-red-800 font-semibold">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                <p className="text-green-800 font-semibold">
                  ✓ Coupon book generated successfully! Check your downloads.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Coupon Book...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Generate & Download Coupon Book
                </>
              )}
            </button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Fetches all restaurants with promotions from your Google Sheet</li>
              <li>• Generates a coupon page for each restaurant</li>
              <li>• Combines all coupons into one PDF document</li>
              <li>• Includes a cover page with month and customer info</li>
              <li>• Each coupon includes terms & conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


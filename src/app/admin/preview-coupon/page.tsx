'use client';

import { useState, useEffect } from 'react';

export default function PreviewCoupon() {
  const [restaurant, setRestaurant] = useState("Archie Moore's");
  const [code, setCode] = useState('BB-A3F9-240115');
  const [email, setEmail] = useState('customer@example.com');
  const [phone, setPhone] = useState('2035551234');
  const [month, setMonth] = useState('January 2026');
  const [previewHtml, setPreviewHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-generate preview on mount
  useEffect(() => {
    generatePreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generatePreview = async () => {
    console.log('generatePreview called');
    setLoading(true);
    setError('');
    setPreviewHtml('');
    
    try {
      const requestBody = {
        restaurant: restaurant.trim(),
        code: code.trim() || 'BITEBOOKWINGS',
        email: email.trim() || '',
        phone: phone.trim() || '',
        month: month.trim() || 'January 2026',
      };
      
      console.log('Sending request:', requestBody);
      
      const response = await fetch('/api/generate-coupon-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Failed to generate preview: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // The API returns html in the response
      if (data.html) {
        console.log('Setting preview HTML, length:', data.html.length);
        setPreviewHtml(data.html);
        setError('');
      } else {
        console.error('No HTML in response:', data);
        setError('No HTML in API response. Check console for details.');
        setPreviewHtml('<p>Error: Could not generate preview. Check console for details.</p>');
      }
    } catch (err: any) {
      console.error('Error generating preview:', err);
      const errorMsg = err.message || 'Unknown error occurred';
      setError(errorMsg);
      setPreviewHtml(`<div style="padding: 20px; color: red;"><h3>Error</h3><p>${errorMsg}</p></div>`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Coupon Preview
          </h1>
          <p className="text-gray-600 mb-6">
            Enter coupon details and click "Generate Preview" to see how the coupon will look.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Restaurant Name
              </label>
              <input
                type="text"
                value={restaurant}
                onChange={(e) => setRestaurant(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Restaurant Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coupon Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="BB-A3F9-240115"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="customer@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="2035551234"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valid Month
              </label>
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="January 2026"
              />
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              console.log('Button clicked');
              generatePreview();
            }}
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating Preview...' : 'Update Preview'}
          </button>
          
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        {previewHtml && (
          <div className="bg-white shadow-xl rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview:</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <iframe
                srcDoc={previewHtml}
                className="w-full"
                style={{ minHeight: '800px', border: 'none' }}
                title="Coupon Preview"
              />
            </div>
          </div>
        )}
        
        {loading && !previewHtml && (
          <div className="bg-white shadow-xl rounded-lg p-8 text-center">
            <p className="text-gray-600">Generating preview...</p>
          </div>
        )}
      </div>
    </div>
  );
}


'use client';

import { Suspense, useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function RedeemContent() {
  const searchParams = useSearchParams();
  const redemptionId = searchParams.get('id');
  const restaurantNameParam = searchParams.get('restaurant');
  const [status, setStatus] = useState<'loading' | 'redeemed' | 'already_redeemed' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [restaurantName, setRestaurantName] = useState(restaurantNameParam || '');

  useEffect(() => {
    if (!redemptionId) {
      setStatus('error');
      setMessage('Invalid redemption ID');
      return;
    }

    // Extract restaurant name and coupon code from redemption ID if possible
    // Format: BB-XXX-XXXX-YYMMDD-HASH
    const parts = redemptionId.split('-');
    if (parts.length >= 4) {
      // Try to match restaurant code to name (simplified)
      setRestaurantName('Restaurant');
    }

    // Redeem the coupon
    const redeemCoupon = async () => {
      try {
        // Extract coupon code from redemption ID
        // The redemption ID format is: couponCode-hash
        const couponCodeMatch = redemptionId.match(/^(BB-[^-]+-[^-]+-[^-]+)/);
        const couponCode = couponCodeMatch ? couponCodeMatch[1] : '';
        
        // For now, use a generic restaurant name
        // The redemption tracking will work with just the redemption ID
        const response = await fetch('/api/redeem-coupon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            redemptionId,
            restaurantName: restaurantName || 'Participating Restaurant',
            couponCode: couponCode || redemptionId
          }),
        });

        const data = await response.json();

        if (data.success) {
          if (data.alreadyRedeemed) {
            setStatus('already_redeemed');
            setMessage(data.message || 'This coupon has already been redeemed');
          } else {
            setStatus('redeemed');
            setMessage(data.message || 'Coupon redeemed successfully!');
          }
        } else {
          setStatus('error');
          setMessage(data.error || 'Failed to redeem coupon');
        }
      } catch (error: any) {
        setStatus('error');
        setMessage(error.message || 'An error occurred');
      }
    };

    redeemCoupon();
  }, [redemptionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 text-[#ff6b35] mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing...</h1>
            <p className="text-gray-600">Redeeming your coupon</p>
          </>
        )}

        {status === 'redeemed' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">✓ Redeemed!</h1>
            {restaurantName && (
              <p className="text-lg font-semibold text-gray-800 mb-2">{restaurantName}</p>
            )}
            <p className="text-gray-700 mb-4">{message}</p>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mt-4">
              <p className="text-green-800 font-semibold">This coupon has been successfully redeemed.</p>
            </div>
          </>
        )}

        {status === 'already_redeemed' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-red-600 mb-2">Already Redeemed</h1>
            {restaurantName && (
              <p className="text-lg font-semibold text-gray-800 mb-2">{restaurantName}</p>
            )}
            <p className="text-gray-700 mb-4">{message}</p>
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mt-4">
              <p className="text-red-800 font-semibold">This coupon was already redeemed and cannot be used again.</p>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-red-600 mb-2">Error</h1>
            <p className="text-gray-700 mb-4">{message}</p>
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mt-4">
              <p className="text-red-800 font-semibold">Unable to process redemption. Please try again or contact support.</p>
            </div>
          </>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Redemption ID: <span className="font-mono text-xs">{redemptionId}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RedeemPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            <Loader2 className="w-16 h-16 text-[#ff6b35] mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h1>
          </div>
        </div>
      }
    >
      <RedeemContent />
    </Suspense>
  );
}


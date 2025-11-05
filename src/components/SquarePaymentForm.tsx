'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface SquarePaymentFormProps {
  amount: number;
  onPaymentSuccess: (paymentToken: string) => void;
  onPaymentError: (error: string) => void;
}

declare global {
  interface Window {
    Square: any;
  }
}

export default function SquarePaymentForm({ amount, onPaymentSuccess, onPaymentError }: SquarePaymentFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [squareLoaded, setSquareLoaded] = useState(false);
  const paymentFormRef = useRef<HTMLDivElement>(null);
  const paymentsRef = useRef<any>(null);
  const cardRef = useRef<any>(null);

  useEffect(() => {
    if (!squareLoaded) return;

    const initializeSquare = async () => {
      try {
        // Get Square Application ID and Location ID from environment variables
        const applicationId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
        const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

        if (!applicationId || !locationId) {
          setError('Square payment credentials not configured. Please add NEXT_PUBLIC_SQUARE_APPLICATION_ID and NEXT_PUBLIC_SQUARE_LOCATION_ID to your environment variables.');
          setIsLoading(false);
          return;
        }

        // Wait a bit for Square to fully initialize
        if (!window.Square) {
          setError('Square SDK failed to load. Please refresh the page.');
          setIsLoading(false);
          return;
        }

        // Initialize Square Payments
        const payments = window.Square.payments(applicationId, locationId);
        paymentsRef.current = payments;

        if (!paymentFormRef.current) {
          setIsLoading(false);
          return;
        }

        // Create card payment method
        const card = await payments.card();
        cardRef.current = card;
        await card.attach(paymentFormRef.current);

        setIsLoading(false);
      } catch (err: any) {
        console.error('Error initializing Square:', err);
        setError(`Failed to initialize payment form: ${err.message || 'Unknown error'}. Please check your Square credentials and refresh the page.`);
        setIsLoading(false);
      }
    };

    // Small delay to ensure Square is fully loaded
    const timer = setTimeout(() => {
      initializeSquare();
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timer);
      if (cardRef.current) {
        try {
          cardRef.current.destroy();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, [squareLoaded]);

  const handlePayment = async () => {
    if (!cardRef.current || !paymentsRef.current) {
      onPaymentError('Payment form not ready');
      return;
    }

    try {
      const paymentResult = await cardRef.current.tokenize();
      
      if (paymentResult.status === 'OK') {
        // Payment token created successfully
        onPaymentSuccess(paymentResult.token);
      } else {
        // Handle payment errors
        let errorMessage = 'Payment failed. ';
        if (paymentResult.errors) {
          errorMessage += paymentResult.errors.map((e: any) => e.detail).join(' ');
        }
        onPaymentError(errorMessage);
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      onPaymentError(err.message || 'Payment processing failed');
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm font-semibold mb-2">{error}</p>
        <p className="text-red-600 text-xs">
          Check your browser console for more details. Make sure your .env.local file has:
          <br />• NEXT_PUBLIC_SQUARE_APPLICATION_ID
          <br />• NEXT_PUBLIC_SQUARE_LOCATION_ID
          <br />• NEXT_PUBLIC_SQUARE_ENVIRONMENT=sandbox
        </p>
      </div>
    );
  }

  return (
    <div>
      <Script
        src={process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === 'production' 
          ? 'https://web.squarecdn.com/v1/square.js'
          : 'https://sandbox.web.squarecdn.com/v1/square.js'}
        onLoad={() => {
          console.log('Square SDK loaded');
          setSquareLoaded(true);
        }}
        onError={() => {
          console.error('Failed to load Square SDK');
          setError('Failed to load Square payment SDK. Please check your internet connection and refresh the page.');
          setIsLoading(false);
        }}
        strategy="afterInteractive"
      />
      <div 
        id="square-payment-form" 
        ref={paymentFormRef}
        className="mb-4 min-h-[200px]"
      >
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading payment form...</div>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={handlePayment}
        disabled={isLoading || !squareLoaded}
        className="w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {isLoading ? 'Loading...' : `Pay $${amount.toFixed(2)}`}
      </button>
    </div>
  );
}

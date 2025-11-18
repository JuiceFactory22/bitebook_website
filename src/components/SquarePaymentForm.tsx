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
  const [applePayAvailable, setApplePayAvailable] = useState(false);
  const [googlePayAvailable, setGooglePayAvailable] = useState(false);
  const paymentFormRef = useRef<HTMLDivElement>(null);
  const applePayButtonRef = useRef<HTMLDivElement>(null);
  const googlePayButtonRef = useRef<HTMLDivElement>(null);
  const paymentsRef = useRef<any>(null);
  const cardRef = useRef<any>(null);
  const applePayRef = useRef<any>(null);
  const googlePayRef = useRef<any>(null);

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

        // Check and initialize Apple Pay if available
        try {
          const applePay = await payments.applePay({
            countryCode: 'US',
            currencyCode: 'USD',
          });
          
          if (applePay && applePayButtonRef.current) {
            applePayRef.current = applePay;
            
            // Configure payment request
            const paymentRequest = {
              requestShippingAddress: false,
              requestBillingContact: true,
              requestEmailAddress: true,
              countryCode: 'US',
              currencyCode: 'USD',
              total: {
                amount: (amount * 100).toString(), // Convert to cents
                label: 'BiteBook',
              },
            };
            
            await applePay.configure({
              paymentRequest,
              async onPaymentMethodSelected() {
                // Handle payment method selection if needed
                return {};
              },
            });
            
            // Attach button and get button element
            const applePayButton = await applePay.attach(applePayButtonRef.current);
            setApplePayAvailable(true);
            
            // Handle button click to tokenize payment
            applePayButton.addEventListener('click', async () => {
              try {
                const tokenResult = await applePay.tokenize();
                if (tokenResult.status === 'OK') {
                  onPaymentSuccess(tokenResult.token);
                } else {
                  onPaymentError('Apple Pay payment failed');
                }
              } catch (err: any) {
                onPaymentError(err.message || 'Apple Pay error');
              }
            });
          }
        } catch (applePayError) {
          console.log('Apple Pay not available:', applePayError);
          setApplePayAvailable(false);
        }

        // Check and initialize Google Pay if available
        try {
          const googlePay = await payments.googlePay({
            countryCode: 'US',
            currencyCode: 'USD',
          });
          
          if (googlePay && googlePayButtonRef.current) {
            googlePayRef.current = googlePay;
            
            // Configure payment request
            const paymentRequest = {
              requestShippingAddress: false,
              requestBillingContact: true,
              requestEmailAddress: true,
              countryCode: 'US',
              currencyCode: 'USD',
              total: {
                amount: (amount * 100).toString(), // Convert to cents
                label: 'BiteBook',
              },
            };
            
            await googlePay.configure({
              paymentRequest,
            });
            
            // Attach button and get button element
            const googlePayButton = await googlePay.attach(googlePayButtonRef.current);
            setGooglePayAvailable(true);
            
            // Handle button click to tokenize payment
            googlePayButton.addEventListener('click', async () => {
              try {
                const tokenResult = await googlePay.tokenize();
                if (tokenResult.status === 'OK') {
                  onPaymentSuccess(tokenResult.token);
                } else {
                  onPaymentError('Google Pay payment failed');
                }
              } catch (err: any) {
                onPaymentError(err.message || 'Google Pay error');
              }
            });
          }
        } catch (googlePayError) {
          console.log('Google Pay not available:', googlePayError);
          setGooglePayAvailable(false);
        }

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
      if (applePayRef.current) {
        try {
          applePayRef.current.destroy();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
      if (googlePayRef.current) {
        try {
          googlePayRef.current.destroy();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, [squareLoaded, amount]);

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
      {/* Fast Checkout Options */}
      {(applePayAvailable || googlePayAvailable) && !isLoading && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-3 text-center">Fast checkout options:</p>
          <div className="flex gap-3 mb-4">
            {applePayAvailable && (
              <div 
                ref={applePayButtonRef}
                className="flex-1 min-h-[48px]"
                style={{ minHeight: '48px' }}
              />
            )}
            {googlePayAvailable && (
              <div 
                ref={googlePayButtonRef}
                className="flex-1 min-h-[48px]"
                style={{ minHeight: '48px' }}
              />
            )}
          </div>
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or pay with card</span>
            </div>
          </div>
        </div>
      )}

      {/* Card Payment Form */}
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

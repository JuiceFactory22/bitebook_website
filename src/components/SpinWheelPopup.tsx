'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

interface SpinWheelPopupProps {
  delay?: number; // Delay in seconds before showing popup
  showOncePerSession?: boolean; // Only show once per browser session
  showOncePerVisitor?: boolean; // Only show once per visitor (uses localStorage)
}

export default function SpinWheelPopup({ 
  delay = 5, // Default: show after 5 seconds
  showOncePerSession = true,
  showOncePerVisitor = false 
}: SpinWheelPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if we should show the popup
    const shouldShow = () => {
      if (showOncePerVisitor) {
        const hasSeenPopup = localStorage.getItem('spinWheelPopupSeen');
        if (hasSeenPopup === 'true') {
          return false;
        }
      }
      return true;
    };

    if (!shouldShow()) {
      return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay, showOncePerVisitor]);

  const handleClose = () => {
    setIsVisible(false);
    if (showOncePerVisitor) {
      localStorage.setItem('spinWheelPopupSeen', 'true');
    }
  };

  const handleGoToSpinWheel = () => {
    if (showOncePerVisitor) {
      localStorage.setItem('spinWheelPopupSeen', 'true');
    }
    // The Link component will handle navigation
  };

  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Popup Content */}
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative animate-popup-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close popup"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="text-center">
            {/* Icon/Emoji */}
            <div className="text-6xl mb-4">🎰</div>
            
            {/* Headline */}
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
              Want 6 Free Wings? 🍗
            </h3>
            
            {/* Description */}
            <p className="text-gray-700 mb-6 text-base md:text-lg leading-relaxed">
              Spin the wheel and you're guaranteed a coupon for at least 6 free wings at one of our participating restaurants. Click here to get yours.
            </p>
            
            {/* CTA Button */}
            <Link
              href="/new-haven-free-coupon"
              onClick={handleGoToSpinWheel}
              className="inline-block w-full px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#e55a2b] hover:from-[#e55a2b] hover:to-[#d44a1f] text-white font-extrabold rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 text-lg"
            >
              Spin the Wheel Now! 🎉
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}


'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  month: string;
  theme: string;
  tagline: string;
  description: string;
  icon: string;
}

interface EventsCarouselProps {
  pastEvents: Event[];
  upcomingEvents: Event[];
  currentMonth: number; // 0-indexed month (0=January, 9=October)
}

export default function EventsCarousel({ pastEvents, upcomingEvents, currentMonth }: EventsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPosition, setScrollLeftPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const allEvents = [...pastEvents, ...upcomingEvents];
  const maxIndex = Math.max(0, allEvents.length - 4); // Show 4 at a time

  // Helper function to determine if an event should be marked as SOLD OUT
  const isEventSoldOut = (event: Event) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Check if it's a 2026 event (all should be available)
    if (event.month.includes('2026')) {
      return false;
    }
    
    // For 2025 events, mark November and earlier as sold out
    const eventMonthIndex = monthNames.indexOf(event.month);
    return eventMonthIndex <= 10; // November is index 10, so November and earlier are sold out
  };

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeftPosition(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeftPosition - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeftPosition(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeftPosition - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (container) {
      const cardWidth = 240; // 25% smaller than 320px
      const gap = 16; // space-x-4 = 16px
      const scrollPosition = index * (cardWidth + gap);
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const scrollRight = () => {
    if (currentIndex < maxIndex) {
      scrollToIndex(currentIndex + 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-2xl font-display font-bold text-center mb-8 text-white">
        Upcoming & Past Events
      </h3>
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          disabled={currentIndex === 0}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all ${
            currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
          }`}
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          disabled={currentIndex >= maxIndex}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all ${
            currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
          }`}
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>

            {/* Events Container */}
            <div className="overflow-hidden">
              <div
                ref={containerRef}
                className={`flex space-x-4 transition-transform duration-300 ease-in-out scrollbar-hide ${
                  isDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                style={{
                  transform: `translateX(-${currentIndex * (240 + 16)}px)`,
                  width: `${allEvents.length * (240 + 16) - 16}px`
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
          {/* All Events with Dynamic Status */}
          {allEvents.map((event, index) => {
            const isSoldOut = isEventSoldOut(event);
            return (
              <div
                key={`event-${index}`}
                className={`flex flex-col flex-shrink-0 w-60 backdrop-blur-sm rounded-xl p-4 border border-white relative snap-start ${
                  isSoldOut
                    ? 'bg-white bg-opacity-10 border-opacity-20'
                    : 'bg-white bg-opacity-20 border-opacity-30'
                }`}
              >
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                  isSoldOut 
                    ? 'bg-red-500 text-white' 
                    : 'bg-green-500 text-white'
                }`}>
                  {isSoldOut ? 'SOLD OUT' : 'UPCOMING'}
                </div>
                {/* Content area that grows to fill space */}
                <div className="flex-grow">
                  <div className="text-4xl mb-4">{event.icon}</div>
                  <div className="text-lg font-bold text-black mb-2">
                    {event.month}
                  </div>
                  <div className="text-xl font-display font-bold text-black mb-3">
                    {event.theme}
                  </div>
                  <div className="text-sm text-black opacity-80 italic mb-3">
                    "{event.tagline}"
                  </div>
                  <div className="text-xs text-black opacity-70">
                    {event.description.substring(0, 60)}...
                  </div>
                </div>
                
                {/* Buy Now Button - always at bottom */}
                <button
                  className={`w-full py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isSoldOut
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
                      : 'bg-[#ff6b35] hover:bg-[#e55a2b] text-white hover:shadow-lg'
                  }`}
                  disabled={isSoldOut}
                  onClick={() => {
                    if (!isSoldOut) {
                      window.location.href = '/checkout';
                    }
                  }}
                >
                  {isSoldOut ? 'Sold Out' : 'Buy Now - $29.99'}
                </button>
              </div>
            );
          })}
          </div>
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-white bg-opacity-75'
              }`}
            />
          ))}
        </div>
        
            {/* Scroll hint */}
            <div className="text-center mt-2">
              <p className="text-white text-xs opacity-75">
                Showing 4 events at a time • Click and drag to scroll • Use arrows to navigate • Click Buy Now to purchase
              </p>
            </div>
      </div>
    </div>
  );
}

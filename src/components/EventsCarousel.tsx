'use client';

import { useState, useEffect } from 'react';
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

  const allEvents = [...pastEvents, ...upcomingEvents];
  const maxIndex = Math.max(0, allEvents.length - 4); // Show 4 at a time

  // Helper function to determine if an event should be marked as SOLD OUT
  const isEventSoldOut = (event: Event) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const eventMonthIndex = monthNames.indexOf(event.month);
    
    // Mark as SOLD OUT if it's the current month or prior month
    return eventMonthIndex <= currentMonth;
  };

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };

    const container = document.getElementById('events-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToIndex = (index: number) => {
    const container = document.getElementById('events-container');
    if (container) {
      const cardWidth = 320; // w-80 = 320px
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
            id="events-container"
            className="flex space-x-4 transition-transform duration-300 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (320 + 16)}px)`,
              width: `${allEvents.length * (320 + 16) - 16}px`
            }}
          >
          {/* All Events with Dynamic Status */}
          {allEvents.map((event, index) => {
            const isSoldOut = isEventSoldOut(event);
            return (
              <div 
                key={`event-${index}`} 
                className={`flex-shrink-0 w-80 backdrop-blur-sm rounded-xl p-6 border border-white relative snap-start ${
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
                  {event.description.substring(0, 80)}...
                </div>
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
            Showing 4 events at a time • Use arrows to navigate
          </p>
        </div>
      </div>
    </div>
  );
}

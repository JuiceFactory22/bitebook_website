'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RestaurantNamesCarouselProps {
  restaurants: string[];
}

export default function RestaurantNamesCarousel({ restaurants }: RestaurantNamesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPosition, setScrollLeftPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemsPerView = 4; // Show 4 restaurants at a time
  const maxIndex = Math.max(0, restaurants.length - itemsPerView);

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    setStartX(e.pageX - rect.left);
    setScrollLeftPosition(containerRef.current.scrollLeft);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeftPosition - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    setStartX(e.touches[0].pageX - rect.left);
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

  // Update index on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleScroll = () => {
        if (!isDragging) {
          const cardWidth = 288; // Updated width (280px + 8px padding)
          const gap = 20; // Updated gap (space-x-5 = 1.25rem = 20px)
          const scrollPosition = container.scrollLeft;
          const newIndex = Math.round(scrollPosition / (cardWidth + gap));
          setCurrentIndex(Math.min(newIndex, maxIndex));
        }
      };
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isDragging, maxIndex]);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (container) {
      const cardWidth = 288; // Updated width
      const gap = 20; // Updated gap
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
    <div className="relative w-full max-w-6xl mx-auto px-8">
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={scrollLeft}
          disabled={currentIndex === 0}
          className="p-3 rounded-full bg-white hover:bg-gray-50 shadow-lg border border-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white z-10 flex-shrink-0"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>

        <div
          ref={containerRef}
          className={`flex space-x-5 scrollbar-hide overflow-x-auto snap-x snap-mandatory py-6 flex-1 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollBehavior: isDragging ? 'auto' : 'smooth',
            userSelect: isDragging ? 'none' : 'auto',
            WebkitUserSelect: isDragging ? 'none' : 'auto',
            backgroundImage: 'none'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 min-w-[280px] bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 flex items-center justify-center snap-start border-2 border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300"
              style={{ backgroundImage: 'none' }}
            >
              <h3 className="text-2xl font-bold text-gray-900 text-center leading-tight tracking-tight">
                {restaurant}
              </h3>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          disabled={currentIndex >= maxIndex}
          className="p-3 rounded-full bg-white hover:bg-gray-50 shadow-lg border border-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white z-10 flex-shrink-0"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-orange-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}


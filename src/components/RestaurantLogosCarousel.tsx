'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const restaurantLogos = [
  { name: "Capotorto's Apizza Center", image: '/images/Logos/New Haven/capotortos logo.jpeg' },
  { name: 'Castle Black Rock', image: '/images/Logos/New Haven/The-Castle-Black-Rock-Logo.jpeg' },
  { name: "Gaetano's Tavern", image: '/images/Logos/New Haven/gaetanos tavern logo.jpeg' },
  { name: "Jordan's Hot Dogs", image: '/images/Logos/New Haven/jordans hot dogs logo.jpeg' },
  { name: "Jroos Restaurant", image: '/images/Logos/New Haven/jroos.jpeg' },
  { name: 'Outriggers', image: '/images/Logos/New Haven/outriggers logo.jpeg' },
  { name: 'Prime 16', image: '/images/Logos/New Haven/Prime 16 logo.jpeg' },
  { name: "Ricky D's Rib Shack", image: '/images/Logos/New Haven/Ricky Ds logo.jpeg' },
  { name: 'The Breakwall', image: '/images/Logos/New Haven/the breakwall logo.jpeg' },
];

export default function RestaurantLogosCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPosition, setScrollLeftPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemsPerView = 4; // Show 4 logos at a time
  const maxIndex = Math.max(0, restaurantLogos.length - itemsPerView);

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
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].pageX - rect.left;
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
        const cardWidth = 200;
        const gap = 16;
        const scrollPosition = container.scrollLeft;
        const newIndex = Math.round(scrollPosition / (cardWidth + gap));
        setCurrentIndex(Math.min(newIndex, maxIndex));
      };
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [maxIndex]);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (container) {
      const cardWidth = 200;
      const gap = 16;
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
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-center">
        <button
          onClick={scrollLeft}
          disabled={currentIndex === 0}
          className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10 -ml-4"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>

        <div
          ref={containerRef}
          className={`flex space-x-4 scrollbar-hide overflow-x-auto snap-x snap-mandatory ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollBehavior: isDragging ? 'auto' : 'smooth',
            userSelect: isDragging ? 'none' : 'auto',
            WebkitUserSelect: isDragging ? 'none' : 'auto'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {restaurantLogos.map((restaurant, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 h-32 bg-white rounded-lg shadow-md p-4 flex items-center justify-center snap-start"
            >
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                width={180}
                height={100}
                className="object-contain max-h-24 w-auto"
                unoptimized
              />
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          disabled={currentIndex >= maxIndex}
          className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-40 transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10 -mr-4"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}


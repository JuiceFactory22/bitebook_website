'use client';

import { useState, useEffect, useRef } from 'react';
import { Restaurant } from '@/data/restaurants';

interface SpinWheelProps {
  restaurants: Restaurant[];
  onSpinComplete: (restaurant: Restaurant) => void;
  isSpinning: boolean;
  onSpinStart: () => void;
}

export default function SpinWheel({ restaurants, onSpinComplete, isSpinning, onSpinStart }: SpinWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const SPIN_DURATION = 4000; // 4 seconds

  // Calculate angle per slice
  const anglePerSlice = 360 / restaurants.length;

  const spin = () => {
    if (isSpinning) return;
    
    onSpinStart();
    
    // Random selection
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    setSelectedIndex(randomIndex);
    
    // Calculate rotation: multiple full spins + land on selected slice
    // Add extra spins (5-8 full rotations) for visual effect
    const extraSpins = 5 + Math.random() * 3; // 5-8 full spins
    const targetRotation = extraSpins * 360 + (360 - (randomIndex * anglePerSlice)) - (anglePerSlice / 2);
    
    // Start rotation
    setRotation(targetRotation);
    
    // Call onSpinComplete after animation
    setTimeout(() => {
      onSpinComplete(restaurants[randomIndex]);
    }, SPIN_DURATION);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        {/* Wheel Container */}
        <div
          ref={wheelRef}
          className="relative w-full h-full rounded-full border-8 border-yellow-400 shadow-2xl overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: `transform ${SPIN_DURATION}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`,
          }}
        >
          {/* Wheel Slices */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
            {restaurants.map((restaurant, index) => {
              const sliceAngle = anglePerSlice;
              const startAngle = (index * sliceAngle - 90) * (Math.PI / 180);
              const endAngle = ((index + 1) * sliceAngle - 90) * (Math.PI / 180);
              
              const centerX = 200;
              const centerY = 200;
              const radius = 200;
              
              const x1 = centerX + radius * Math.cos(startAngle);
              const y1 = centerY + radius * Math.sin(startAngle);
              const x2 = centerX + radius * Math.cos(endAngle);
              const y2 = centerY + radius * Math.sin(endAngle);
              
              const largeArc = sliceAngle > 180 ? 1 : 0;
              
              // Alternate colors
              const isEven = index % 2 === 0;
              const fillColor = isEven ? '#ff6b35' : '#e55a2b';
              
              return (
                <g key={index}>
                  <path
                    d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={fillColor}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x={centerX + (radius * 0.6) * Math.cos((startAngle + endAngle) / 2)}
                    y={centerY + (radius * 0.6) * Math.sin((startAngle + endAngle) / 2)}
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="select-none"
                  >
                    {restaurant.name.length > 12 
                      ? restaurant.name.substring(0, 12) + '...' 
                      : restaurant.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* Pointer/Arrow at top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 z-10">
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-yellow-400 drop-shadow-lg" />
        </div>
        
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-yellow-400 rounded-full border-4 border-white shadow-xl z-20 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">🎯</span>
        </div>
      </div>
      
      {/* Spin Button */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className={`mt-8 px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold rounded-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg md:text-xl ${
          isSpinning ? 'animate-pulse' : ''
        }`}
      >
        {isSpinning ? 'Spinning...' : '🎰 Spin the Wheel!'}
      </button>
    </div>
  );
}


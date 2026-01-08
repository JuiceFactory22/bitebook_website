// Location configuration for multi-city expansion
export interface Location {
  id: string;
  city: string;
  state: string;
  region: string;
  restaurantCount: number;
  status: 'active' | 'coming-soon' | 'waitlist';
  featured: boolean;
  image?: string;
  pricing?: {
    introPrice: number;
    regularPrice: number;
    totalValue: number;
  };
}

export const locations: Location[] = [
  {
    id: 'new-haven',
    city: 'New Haven',
    state: 'CT',
    region: 'Connecticut',
    restaurantCount: 27,
    status: 'active',
    featured: true,
    pricing: {
      introPrice: 4.99,
      regularPrice: 14.99,
      totalValue: 400,
    },
  },
  // Add new locations here as you expand
  // {
  //   id: 'hartford',
  //   city: 'Hartford',
  //   state: 'CT',
  //   region: 'Connecticut',
  //   restaurantCount: 0,
  //   status: 'coming-soon',
  //   featured: false,
  // },
  // {
  //   id: 'boston',
  //   city: 'Boston',
  //   state: 'MA',
  //   region: 'Massachusetts',
  //   restaurantCount: 0,
  //   status: 'waitlist',
  //   featured: false,
  // },
  // {
  //   id: 'stamford',
  //   city: 'Stamford',
  //   state: 'CT',
  //   region: 'Connecticut',
  //   restaurantCount: 0,
  //   status: 'coming-soon',
  //   featured: false,
  // },
];

// Helper function to get location by ID
export function getLocationById(id: string): Location | undefined {
  return locations.find(location => location.id === id);
}

// Helper function to get active locations
export function getActiveLocations(): Location[] {
  return locations.filter(location => location.status === 'active');
}

// Helper function to get default pricing
export function getDefaultPricing() {
  return {
    introPrice: 4.99,
    regularPrice: 14.99,
    totalValue: 400,
  };
}


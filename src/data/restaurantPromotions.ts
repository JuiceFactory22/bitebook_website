import { Restaurant } from './restaurants';

/**
 * Restaurant-specific promotions for spin wheel
 * 
 * This file contains FALLBACK promotions that are used if:
 * 1. Google Sheets integration is not configured, OR
 * 2. Google Sheets fetch fails
 * 
 * FOR GOOGLE SHEETS INTEGRATION:
 * See RESTAURANT_PROMOTIONS_GOOGLE_SHEETS_SETUP.md for setup instructions
 * Once configured, promotions will be fetched dynamically from your Google Sheet
 * 
 * TO UPDATE FALLBACK PROMOTIONS (if not using Google Sheets):
 * 1. Update the restaurantPromotions object below with each restaurant's unique offer
 * 2. The restaurant name must match EXACTLY (case-sensitive) with the name in restaurants.ts
 * 3. Use \n to create line breaks in the promotion text
 * 
 * Example format:
 * 'Restaurant Name': '6 FREE WINGS\nwith the purchase of an additional item',
 * 
 * If a restaurant is not found, it will use the default promotion.
 */

export interface RestaurantPromotion {
  name: string;
  promotion: string; // The unique offer description for this restaurant
}

// Fallback promotions (used if Google Sheets is not configured or fails)
export const restaurantPromotions: Record<string, string> = {
  'Orange Ale House': '6 FREE WINGS\nwith the purchase of an additional item',
  'Pizza at the Brick Oven': '6 FREE WINGS\nwith the purchase of an additional item',
  'Hop Haus Craft Eatery': '6 FREE WINGS\nwith the purchase of an additional item',
  'Heffer': '6 FREE WINGS\nwith the purchase of an additional item',
  'Giulios Apizza': '6 FREE WINGS\nwith the purchase of an additional item',
  'Sly Fox Tavern': '6 FREE WINGS\nwith the purchase of an additional item',
  'The Landing at Five Twenty': '6 FREE WINGS\nwith the purchase of an additional item',
  'Amity Brick Oven': '6 FREE WINGS\nwith the purchase of an additional item',
  'Prime 16': '6 FREE WINGS\nwith the purchase of an additional item',
  'Transilvania': '6 FREE WINGS\nwith the purchase of an additional item',
  'Naked Wings': '6 FREE WINGS\nwith the purchase of an additional item',
  "Ricky D's Rib Shack": '6 FREE WINGS\nwith the purchase of an additional item',
  "Jack's Bar & Steakhouse": '6 FREE WINGS\nwith the purchase of an additional item',
  'Southern Wings Express': '6 FREE WINGS\nwith the purchase of an additional item',
  'The Castle Black Rock': '6 FREE WINGS\nwith the purchase of an additional item',
  "Archie Moore's NH": '6 FREE WINGS\nwith the purchase of an additional item',
  "Capotorto's Apizza Center": '6 FREE WINGS\nwith the purchase of an additional item',
  "Gaetano's Tavern on Main": '6 FREE WINGS\nwith the purchase of an additional item',
  "J Roo's": '6 FREE WINGS\nwith the purchase of an additional item',
  "Jordan's Hot Dog's & Mac": '6 FREE WINGS\nwith the purchase of an additional item',
  'Blue Orchid Pan Asian Cuisine': '6 FREE WINGS\nwith the purchase of an additional item',
  "Porky's Cafe": '6 FREE WINGS\nwith the purchase of an additional item',
  "Delaney's Restaurant & Tap": '6 FREE WINGS\nwith the purchase of an additional item',
  'The Breakwall': '6 FREE WINGS\nwith the purchase of an additional item',
  'New West Cafe': '6 FREE WINGS\nwith the purchase of an additional item',
  'Pub 67': '6 FREE WINGS\nwith the purchase of an additional item',
  'Pianca Pizza': '6 FREE WINGS\nwith the purchase of an additional item',
};

// Cache for promotions fetched from Google Sheets
let cachedPromotions: Record<string, string> | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch promotions from Google Sheets API (with caching)
 * Falls back to static file if API fails or is not configured
 */
async function fetchPromotionsFromAPI(): Promise<Record<string, string> | null> {
  // Use cache if still valid
  if (cachedPromotions && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedPromotions;
  }

  try {
    const response = await fetch('/api/fetch-restaurant-promotions', {
      cache: 'no-store', // Always fetch fresh from API
    });

    if (!response.ok) {
      console.warn('Failed to fetch promotions from API, using fallback');
      return null;
    }

    const data = await response.json();
    
    if (data.success && data.promotions && Object.keys(data.promotions).length > 0) {
      cachedPromotions = data.promotions;
      cacheTimestamp = Date.now();
      return cachedPromotions;
    }
    
    return null;
  } catch (error) {
    console.warn('Error fetching promotions from API, using fallback:', error);
    return null;
  }
}

/**
 * Get the promotion description for a restaurant by name
 * First tries to fetch from Google Sheets (if configured), then falls back to static data
 * @param restaurantName - The name of the restaurant (must match exactly)
 * @returns The promotion description, or a default if not found
 */
export async function getRestaurantPromotion(restaurantName: string): Promise<string> {
  // Try to fetch from Google Sheets first
  const apiPromotions = await fetchPromotionsFromAPI();
  
  // Use API promotions if available, otherwise use fallback
  const promotions = apiPromotions || restaurantPromotions;
  
  return promotions[restaurantName] || '6 FREE WINGS\nwith the purchase of an additional item';
}

/**
 * Synchronous version for use in components (uses cache or fallback only)
 * Use this if you need the promotion immediately without async
 */
export function getRestaurantPromotionSync(restaurantName: string): string {
  // Use cached promotions if available, otherwise use fallback
  const promotions = cachedPromotions || restaurantPromotions;
  return promotions[restaurantName] || '6 FREE WINGS\nwith the purchase of an additional item';
}

/**
 * Get list of restaurants that have promotions available
 * Filters out restaurants with blank/empty promotions
 * @param allRestaurants - Array of all restaurants
 * @returns Array of restaurants that have promotions
 */
export async function getAvailableRestaurants(allRestaurants: Restaurant[]): Promise<Restaurant[]> {
  // Fetch promotions from Google Sheets first
  const apiPromotions = await fetchPromotionsFromAPI();
  
  // Use API promotions if available, otherwise use fallback
  const promotions = apiPromotions || restaurantPromotions;
  
  // Filter restaurants to only include those with promotions
  return allRestaurants.filter(restaurant => {
    const promotion = promotions[restaurant.name];
    // Only include if promotion exists and is not empty/whitespace
    return promotion && promotion.trim().length > 0;
  });
}


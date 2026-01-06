/**
 * Generate a unique coupon code for a specific restaurant
 * Format: BB-[RESTAURANT_CODE]-[RANDOM]-[DATE]
 * Example: BB-NWC-A3F9-240115
 */
export function generateUniqueCouponCode(restaurantName: string): string {
  // Create a short code from restaurant name (first 3 letters of each word, max 3 words)
  const words = restaurantName.toUpperCase().split(' ').slice(0, 3);
  const restaurantCode = words
    .map(word => word.substring(0, 3))
    .join('')
    .substring(0, 6)
    .padEnd(3, 'X'); // Ensure at least 3 characters
  
  // Generate random alphanumeric string (4 characters)
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  
  // Get current date in YYMMDD format
  const now = new Date();
  const year = now.getFullYear().toString().substring(2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const datePart = `${year}${month}${day}`;
  
  // Combine: BB-[RESTAURANT]-[RANDOM]-[DATE]
  return `BB-${restaurantCode.substring(0, 3)}-${randomPart}-${datePart}`;
}

/**
 * Generate a unique redemption ID for tracking
 * This will be embedded in the QR code
 */
export function generateRedemptionId(restaurantName: string, couponCode: string): string {
  // Create a unique ID: restaurant name + coupon code + timestamp
  const timestamp = Date.now();
  const hash = Buffer.from(`${restaurantName}-${couponCode}-${timestamp}`)
    .toString('base64')
    .substring(0, 12)
    .replace(/[^A-Z0-9]/g, '');
  
  return `${couponCode}-${hash}`;
}


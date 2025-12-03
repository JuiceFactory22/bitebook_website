/**
 * Generate a unique coupon code for each submission
 * Format: BB-[RANDOM]-[TIMESTAMP]
 * Example: BB-A3F9-240115
 */
export function generateCouponCode(): string {
  // Generate random alphanumeric string (4 characters)
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  
  // Get current date in YYMMDD format
  const now = new Date();
  const year = now.getFullYear().toString().substring(2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const datePart = `${year}${month}${day}`;
  
  // Combine: BB-[RANDOM]-[DATE]
  return `BB-${randomPart}-${datePart}`;
}


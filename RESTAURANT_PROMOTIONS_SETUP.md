# Restaurant Promotions Setup Guide

## Overview
Each participating restaurant now has a unique promotion that displays on their spin wheel coupon. When someone spins the wheel and lands on a restaurant, they receive a coupon with that restaurant's specific offer.

## How It Works

1. **Data Storage**: Restaurant promotions are stored in `src/data/restaurantPromotions.ts`
2. **Integration**: The spin wheel page automatically fetches the correct promotion when a restaurant is selected
3. **Coupon Generation**: The coupon PDF/HTML is generated with the restaurant-specific promotion text

## Updating Promotions

### Option 1: Direct File Edit (Recommended for small updates)

Edit `src/data/restaurantPromotions.ts` and update the `restaurantPromotions` object:

```typescript
export const restaurantPromotions: Record<string, string> = {
  'Restaurant Name': '6 FREE WINGS\nwith the purchase of an additional item',
  'Another Restaurant': 'FREE APPETIZER\nwith any entree purchase',
  // ... etc
};
```

**Important Notes:**
- Restaurant names must match EXACTLY (case-sensitive) with names in `src/data/restaurants.ts`
- Use `\n` for line breaks in promotion text
- If a restaurant isn't listed, it will use the default promotion

### Option 2: Import from Spreadsheet

If you have your promotions in a spreadsheet:

1. Export your spreadsheet as CSV with columns: `Restaurant Name`, `Promotion`
2. Convert the CSV data to the format above
3. Replace the `restaurantPromotions` object in the file

**Example CSV format:**
```csv
Restaurant Name,Promotion
Archie Moore's,6 FREE WINGS
with the purchase of an additional item
Prime 16,FREE APPETIZER
with any entree purchase
```

### Option 3: Google Sheets Integration (Future)

If you want dynamic updates from Google Sheets without code changes, we can set up:
- A Google Apps Script to fetch data
- An API endpoint to pull promotions from Sheets
- Automatic updates when your spreadsheet changes

## Current Default Promotion

If a restaurant's promotion is not found, it defaults to:
```
6 FREE WINGS
with the purchase of an additional item
```

## Testing

1. Go to `/new-haven-free-coupon`
2. Enter your info and spin the wheel
3. When you land on a restaurant, check the generated coupon PDF/email
4. Verify the promotion text matches what you entered in the data file

## Need Help?

- Check restaurant names match exactly between `restaurants.ts` and `restaurantPromotions.ts`
- Use the admin preview page at `/admin/preview-coupon` to test coupon generation
- Check browser console for any errors


# Cart Abandonment Tracking Setup

## Overview
Cart abandonment tracking helps you identify users who add items to cart or start checkout but don't complete their purchase. This data can be used for retargeting campaigns and recovery emails.

## What's Tracked

### 1. Automatic Tracking
- **Add to Cart**: When users click "Buy Now" buttons (via `TrackingButton`)
- **Initiate Checkout**: When users land on checkout page
- **Abandonment**: When users leave checkout without purchasing

### 2. Abandonment Triggers
- User leaves checkout page (beforeunload event)
- User stays on checkout for 30+ seconds without entering email
- User navigates away without completing purchase

### 3. Data Collected
- Cart value (price)
- Email (if provided)
- Timestamp
- Checkout URL
- Currency

## Where Data is Sent

### Meta Pixel
- Event: `AddToCart` (marked as abandoned)
- Includes value, currency, product info
- Can be used for retargeting campaigns

### Google Analytics 4
- Event: `add_to_cart`
- Includes custom `abandoned: true` parameter
- View in GA4 → Events → add_to_cart

### Server Logging
- API endpoint: `/api/track-abandonment`
- Currently logs to console
- Can be extended to save to database

### LocalStorage
- Stored locally for potential recovery
- Key: `cartAbandonment`
- Cleared on successful purchase

## Viewing Abandonment Data

### Meta Pixel
1. Go to Meta Events Manager
2. Navigate to Events → AddToCart
3. Filter by custom parameters
4. Use for retargeting campaigns

### Google Analytics 4
1. Go to GA4 Dashboard
2. Navigate to Reports → Engagement → Events
3. Find `add_to_cart` event
4. Filter by `abandoned: true` parameter

### Server Logs
- Check Vercel function logs for `/api/track-abandonment`
- Currently logs to console
- Can be extended to save to database/Google Sheets

## Extending the Tracking

### Option 1: Save to Database
Update `/api/track-abandonment/route.ts` to save to your database:
```typescript
// Example: Save to PostgreSQL
await db.cartAbandonments.create({
  value,
  email,
  timestamp,
  checkoutUrl,
});
```

### Option 2: Send to Google Sheets
Similar to lead tracking, add Google Sheets integration:
```typescript
await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
  method: 'POST',
  body: JSON.stringify({ value, email, timestamp }),
});
```

### Option 3: Trigger Recovery Email
Send automated recovery emails:
```typescript
// Example: Send via SendGrid
await sgMail.send({
  to: email,
  subject: 'Complete Your BiteBook Purchase!',
  templateId: 'recovery-email-template',
});
```

## Recovery Campaign Ideas

1. **Email Recovery**
   - Send email 1 hour after abandonment
   - Include discount code or urgency message
   - Link back to checkout with coupon applied

2. **Meta Retargeting**
   - Create custom audience of abandoners
   - Show ads with special offer
   - Use dynamic product ads

3. **Google Ads Retargeting**
   - Create remarketing list
   - Show ads to abandoners
   - Include discount code

## Current Implementation

✅ **Working:**
- Add to Cart tracking (via TrackingButton)
- Initiate Checkout tracking
- Abandonment detection (page leave, 30s timer)
- Meta Pixel events
- GA4 events
- LocalStorage storage
- Server logging

## Next Steps

1. **Set up recovery emails** (optional)
2. **Create retargeting campaigns** in Meta/Google Ads
3. **Extend server logging** to database/Google Sheets
4. **Monitor abandonment rate** in GA4/Meta

## Testing

1. Add item to cart (click "Buy Now")
2. Go to checkout page
3. Wait 30 seconds OR leave page
4. Check:
   - Meta Events Manager for `AddToCart` event
   - GA4 for `add_to_cart` event with `abandoned: true`
   - Browser localStorage for `cartAbandonment` key
   - Vercel logs for `/api/track-abandonment` calls

## Notes

- Abandonment is only tracked if user hasn't submitted purchase
- Email is optional but recommended for recovery campaigns
- Data is stored locally and sent to tracking services
- Can be extended to trigger automated recovery emails


# QR Code Redemption System - Complete Setup Guide

## Overview

Your coupon book now includes:
- ✅ **Unique QR code** on each coupon
- ✅ **Unique coupon code** for each restaurant
- ✅ **One coupon per page** (fits perfectly)
- ✅ **Redemption tracking** - Green on first scan, Red if already redeemed

## What's Been Set Up

### 1. QR Code Generation
- Each coupon gets a unique QR code
- QR codes link to: `https://getbitebook.com/redeem?id=REDEMPTION_ID`
- QR codes are embedded directly in the PDF

### 2. Unique Coupon Codes
- Format: `BB-REST-XXXX-YYMMDD`
- Example: `BB-NWC-A3F9-240115`
- Each restaurant gets a unique code based on their name

### 3. Redemption Tracking API
- **Endpoint**: `/api/redeem-coupon`
- **First scan**: Returns green "Redeemed" response
- **Subsequent scans**: Returns red "Already Redeemed" response

### 4. Redemption Page
- **URL**: `/redeem?id=REDEMPTION_ID`
- Shows green checkmark for first redemption
- Shows red X for already redeemed coupons

## Setup Steps

### Step 1: Create Google Sheet for Redemptions

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet: **"BiteBook Coupon Redemptions"**
3. Set up headers in Row 1:
   - **A1**: `Timestamp`
   - **B1**: `Redemption ID`
   - **C1**: `Restaurant Name`
   - **D1**: `Coupon Code`
   - **E1**: `Status`
   - **F1**: `First Redeemed At`

### Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Copy the code from `COUPON_REDEMPTION_GOOGLE_SHEETS_SETUP.md`
3. Save and deploy as Web app with "Anyone" access
4. Copy the Web app URL

### Step 3: Add Environment Variables to Vercel

Add these two environment variables:

1. **Redemption Tracking URL**:
   - Key: `GOOGLE_APPS_SCRIPT_REDEMPTIONS_URL`
   - Value: (your Apps Script URL from Step 2)
   - Environment: All

2. **Site URL** (for QR codes):
   - Key: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://getbitebook.com`
   - Environment: All

### Step 4: Redeploy Your Site

After adding environment variables, redeploy your site.

## How It Works

### Generating a Coupon Book

1. Go to `/admin/generate-coupon-book`
2. Enter month and customer info
3. Click "Generate & Download"
4. Each coupon in the book will have:
   - Unique coupon code
   - Unique QR code
   - Restaurant-specific promotion

### Scanning a QR Code

1. **First Scan**:
   - User scans QR code
   - Goes to `/redeem?id=REDEMPTION_ID`
   - API checks Google Sheets
   - Not found → Records redemption → Returns **GREEN** success
   - Page shows: ✓ Redeemed! (green)

2. **Subsequent Scans**:
   - Same QR code scanned again
   - API finds existing redemption in sheet
   - Returns **RED** "Already Redeemed"
   - Page shows: Already Redeemed (red)

## Testing

1. Generate a test coupon book
2. Scan a QR code from a coupon
3. You should see green "Redeemed" message
4. Scan the same QR code again
5. You should see red "Already Redeemed" message
6. Check your Google Sheet - redemption should be recorded

## Files Created/Updated

- ✅ `src/app/api/generate-coupon-book/route.ts` - Generates coupon book with QR codes
- ✅ `src/app/api/redeem-coupon/route.ts` - Handles redemption (green/red responses)
- ✅ `src/app/redeem/page.tsx` - Redemption page (shows green/red status)
- ✅ `src/utils/couponRedemption.ts` - Helper functions for codes
- ✅ `COUPON_REDEMPTION_GOOGLE_SHEETS_SETUP.md` - Setup guide

## Next Steps

1. Set up Google Sheet for redemptions
2. Create and deploy Google Apps Script
3. Add environment variables to Vercel
4. Redeploy site
5. Test by generating a coupon book and scanning QR codes

## Troubleshooting

**QR codes not working?**
- Check `NEXT_PUBLIC_SITE_URL` is set correctly
- Verify QR code links to `/redeem?id=...`

**Redemption not tracking?**
- Check `GOOGLE_APPS_SCRIPT_REDEMPTIONS_URL` is set
- Verify Apps Script is deployed with "Anyone" access
- Check Google Sheet has correct column headers

**Always showing green?**
- Apps Script might not be checking for duplicates
- Verify the script code matches the setup guide


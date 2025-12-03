# Coupon System - Unique Codes & Customer Info

## What Was Implemented

### 1. Unique Coupon Code Generation
- Each spin wheel submission now generates a **unique coupon code**
- Format: `BB-[RANDOM]-[DATE]`
- Example: `BB-A3F9-240115`
  - `BB` = BiteBook prefix
  - `A3F9` = Random 4-character code
  - `240115` = Date (YYMMDD format)

### 2. Customer Information on Coupon
- Email address is displayed on the coupon
- Phone number is displayed (formatted as (XXX) XXX-XXXX)
- Both appear in a "Customer Information" section on the coupon

### 3. EmailJS Integration
- Coupon code is passed to EmailJS as `{{coupon_code}}`
- Email and phone are already available as `{{email}}` and `{{phone}}`
- Restaurant name is available as `{{restaurant_name}}`

## How to Set Up EmailJS Attachment

### Step 1: Update Your EmailJS Template

1. Go to https://dashboard.emailjs.com/
2. Open template `template_db2m6o7`
3. Go to **Attachments** section
4. Click **"Add Attachment"**
5. Choose **"From URL"**
6. Paste this URL:

```
https://getbitebook.com/api/generate-coupon?restaurant={{restaurant_name}}&code={{coupon_code}}&email={{email}}&phone={{phone}}&month=January%202026
```

### Step 2: Verify Template Variables

Make sure your EmailJS template has these variables available:
- ✅ `{{email}}` - Already in use
- ✅ `{{phone}}` - Already in use
- ✅ `{{restaurant_name}}` - Already in use
- ✅ `{{coupon_code}}` - **NEW** - Unique code for each submission

### Step 3: Test

1. Submit a test spin wheel entry
2. Check the email attachment
3. Verify:
   - Unique coupon code appears
   - Email address is shown
   - Phone number is formatted correctly
   - Restaurant name is correct

## What Each Coupon Contains

1. **BiteBook Branding** - Orange gradient header
2. **Restaurant Name** - The restaurant they won
3. **Offer** - "6 FREE WINGS"
4. **Unique Coupon Code** - Format: BB-XXXX-YYMMDD
5. **Validity** - Month (e.g., "January 2026")
6. **Customer Information** - Email and phone number
7. **Terms & Conditions** - Usage rules
8. **Barcode Area** - For scanning (placeholder)

## Code Locations

- **Coupon Code Generator**: `src/utils/couponCode.ts`
- **Spin Wheel Page**: `src/app/new-haven-free-coupon/page.tsx`
- **Coupon API**: `src/app/api/generate-coupon/route.ts`
- **Template**: `public/coupons/coupon-template.html`

## Testing the Coupon Generator

You can test the coupon generator directly in your browser:

```
https://getbitebook.com/api/generate-coupon?restaurant=Test%20Restaurant&code=BB-TEST-240115&email=test@example.com&phone=2035551234&month=January%202026
```

This will show you how the coupon looks with all the information.

## Notes

- Coupon codes are generated client-side when the wheel spins
- Each code is unique (random + timestamp)
- Email and phone are automatically included from the form
- The coupon is generated as HTML and can be converted to PDF by EmailJS
- All customer information is securely passed via URL parameters


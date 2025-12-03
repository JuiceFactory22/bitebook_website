# How to Add Coupon Attachment to EmailJS

## Overview

You can attach a coupon to your EmailJS template in two ways:
1. **Static PDF/Image** - Upload a generic coupon file
2. **Dynamic URL** - Use our API to generate custom coupons per email

## Option 1: Static Coupon Attachment (Simplest)

### Step 1: Generate a PDF from the Template

1. Open `public/coupons/coupon-template.html` in your browser
2. Customize it with a generic restaurant name (or leave it as "Participating Restaurant")
3. Use your browser's "Print to PDF" feature:
   - Chrome/Edge: `Ctrl+P` (or `Cmd+P` on Mac) → "Save as PDF"
   - Firefox: `Ctrl+P` → "Print to File" → Choose PDF
4. Save it as `bitebook-coupon.pdf`

### Step 2: Upload to EmailJS

1. Go to https://dashboard.emailjs.com/
2. Navigate to **Email Templates**
3. Open your template (`template_db2m6o7`)
4. Scroll to **"Attachments"** section
5. Click **"Add Attachment"**
6. Upload your `bitebook-coupon.pdf` file
7. Save the template

**Pros:** Simple, works immediately  
**Cons:** Same coupon for everyone (can't customize restaurant name)

## Option 2: Dynamic Coupon via URL (Recommended)

This generates a unique coupon for each email with the restaurant name.

### Step 1: Use the API Endpoint

Your coupon API is available at:
```
https://getbitebook.com/api/generate-coupon?restaurant=RESTAURANT_NAME&code=COUPONCODE&month=January%202026
```

### Step 2: Add to EmailJS Template

In your EmailJS template, add an attachment using a URL:

1. Go to EmailJS → Your Template → **Attachments**
2. Click **"Add Attachment"**
3. Choose **"From URL"** option
4. Use this URL format:
   ```
   https://getbitebook.com/api/generate-coupon?restaurant={{restaurant_name}}&code=BITEBOOKWINGS&month=January%202026
   ```
5. Save the template

**Note:** EmailJS will fetch the HTML and convert it to PDF automatically.

### Step 3: Generate Unique Coupon Codes (Optional)

If you want unique coupon codes per user, you can:

1. Create a simple coupon code generator
2. Pass it as a template variable: `{{coupon_code}}`
3. Update the URL:
   ```
   https://getbitebook.com/api/generate-coupon?restaurant={{restaurant_name}}&code={{coupon_code}}&month=January%202026
   ```

## Option 3: Base64 Encoded Attachment (Advanced)

If you need more control, you can generate the coupon server-side and attach it as base64.

### Implementation Steps:

1. Create a server-side function to generate PDF from HTML
2. Convert to base64
3. Pass as template variable: `{{coupon_attachment}}`
4. In EmailJS, use base64 attachment option

**This requires additional setup and is more complex.**

## Recommended Approach

**Start with Option 2 (Dynamic URL)** because:
- ✅ Customizes restaurant name automatically
- ✅ No file uploads needed
- ✅ Works with your existing template variables
- ✅ Easy to update coupon design

## Testing

1. Send a test email from EmailJS
2. Check that the coupon attachment appears
3. Verify the restaurant name is correct
4. Make sure the coupon is readable/printable

## Customization

You can customize the coupon by editing:
- **Design**: `public/coupons/coupon-template.html`
- **API**: `src/app/api/generate-coupon/route.ts`

## Example EmailJS Attachment URL

```
https://getbitebook.com/api/generate-coupon?restaurant={{restaurant_name}}&code=BITEBOOKWINGS&month=January%202026
```

This will:
- Replace `{{restaurant_name}}` with the actual restaurant name
- Generate a coupon with that restaurant's name
- Include the coupon code "BITEBOOKWINGS"
- Set validity to "January 2026"

## Troubleshooting

**Attachment not appearing?**
- Check that the URL is accessible (test in browser)
- Verify EmailJS supports URL attachments on your plan
- Check EmailJS logs for errors

**Restaurant name not showing?**
- Verify `{{restaurant_name}}` is set in your template variables
- Test the URL manually with a restaurant name

**Coupon looks wrong?**
- Check the HTML template renders correctly in browser
- Verify CSS is loading properly


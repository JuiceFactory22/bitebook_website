# EmailJS Attachment Setup - Fixed Method

## Problem
EmailJS doesn't reliably support URL-based attachments. We need to pass the coupon as base64 content directly in the template parameters.

## Solution
The coupon is now generated server-side and passed to EmailJS as a base64-encoded HTML attachment.

## Setup Instructions

### Step 1: Update Your EmailJS Template

1. Go to https://dashboard.emailjs.com/
2. Open template `template_db2m6o7`
3. Go to **"Attachments"** section
4. Click **"Add Attachment"**
5. Choose **"From Parameter"** (not "From URL")
6. Set the **Parameter Name** to: `coupon_attachment`
7. Set the **File Name** to: `bitebook-coupon.html` (or `bitebook-coupon.pdf` if EmailJS converts it)
8. Save the template

### Step 2: Verify Template Variables

Your template should have these variables:
- ✅ `{{email}}` - Customer email
- ✅ `{{phone}}` - Customer phone
- ✅ `{{restaurant_name}}` - Restaurant they won
- ✅ `{{coupon_code}}` - Unique coupon code
- ✅ `{{coupon_attachment}}` - **NEW** - Base64 encoded coupon HTML

### Step 3: Test

1. Submit a test spin wheel entry
2. Check the email
3. Verify the attachment appears

## How It Works

1. When user spins the wheel, a unique coupon code is generated
2. The coupon HTML is generated server-side via `/api/generate-coupon-base64`
3. The HTML is converted to base64 data URI
4. The base64 content is passed to EmailJS as `coupon_attachment` parameter
5. EmailJS attaches it to the email

## Alternative: If Base64 Doesn't Work

If EmailJS doesn't accept base64 HTML attachments, you can:

### Option A: Generate PDF Server-Side
- Use a library like `puppeteer` or `pdfkit` to convert HTML to PDF
- Pass PDF as base64
- This requires additional setup

### Option B: Include Coupon in Email Body
- Add the coupon HTML directly in the email body
- Users can print it from the email
- No attachment needed

### Option C: Send Coupon Link
- Include a link in the email: `https://getbitebook.com/api/generate-coupon?restaurant={{restaurant_name}}&code={{coupon_code}}&email={{email}}&phone={{phone}}`
- Users click to view/print the coupon
- Simpler but requires internet connection

## Troubleshooting

**Attachment not appearing?**
1. Check EmailJS logs to see if the parameter was received
2. Verify the parameter name matches: `coupon_attachment`
3. Check if your EmailJS plan supports attachments
4. Try viewing the email in different email clients

**Coupon looks wrong?**
1. Test the API directly: `POST /api/generate-coupon-base64`
2. Check the HTML output
3. Verify all parameters are being passed correctly

**Base64 too large?**
- EmailJS might have size limits
- Consider Option C (link) instead
- Or compress the HTML

## Current Implementation

The code automatically:
- ✅ Generates unique coupon code
- ✅ Creates coupon HTML with restaurant name, email, phone
- ✅ Converts to base64
- ✅ Passes to EmailJS as `coupon_attachment`

You just need to configure the EmailJS template to use the `coupon_attachment` parameter.


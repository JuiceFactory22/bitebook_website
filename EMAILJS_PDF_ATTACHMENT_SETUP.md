# EmailJS PDF Attachment Setup

## Overview
The coupon is generated as HTML and passed to EmailJS as a base64-encoded attachment. EmailJS will handle the conversion to PDF or you can configure it to attach as HTML.

## Setup Instructions

### Step 1: Configure EmailJS Template Attachment

1. Go to https://dashboard.emailjs.com/
2. Open template `template_db2m6o7`
3. Go to **Attachments** section
4. Click **"Add Attachment"**
5. Choose **"Variable Attachment"** (or "Parameter Attachment")
6. Set the following:
   - **Parameter Name**: `coupon_attachment`
   - **Filename**: `bitebook-coupon.pdf` (or `.html` if PDF conversion doesn't work)
   - **Content Type**: `application/pdf` (or `text/html` if using HTML)
7. Save the template

### Step 2: How It Works

1. When user spins the wheel, a unique coupon code is generated
2. The coupon HTML is generated server-side via `/api/generate-coupon-pdf`
3. The HTML is converted to base64
4. The base64 content is passed to EmailJS as `coupon_attachment` parameter
5. EmailJS attaches it to the email

### Step 3: Template Variables

Your EmailJS template should have these variables:
- ✅ `{{email}}` - Customer email
- ✅ `{{phone}}` - Customer phone  
- ✅ `{{restaurant_name}}` - Restaurant they won
- ✅ `{{coupon_code}}` - Unique coupon code
- ✅ `{{coupon_attachment}}` - **Base64 encoded coupon** (for attachment)

## Troubleshooting

### If Attachment Shows as HTML Text

**Option 1: Use HTML Attachment**
- In EmailJS, set Content Type to `text/html`
- Set Filename to `bitebook-coupon.html`
- Email clients will open it as HTML

**Option 2: Convert to PDF (Recommended)**
- We need to add PDF conversion using a service
- Options:
  - Use a PDF conversion API (like htmlpdfapi.com)
  - Use puppeteer (requires server setup)
  - Use a serverless PDF service

### If Attachment Doesn't Appear

1. **Check Parameter Name**: Must match `coupon_attachment` exactly
2. **Check EmailJS Logs**: See if the parameter is being received
3. **Test Base64**: Verify the base64 string is valid
4. **Check Email Client**: Some clients block HTML attachments

### Current Implementation

The code currently:
- ✅ Generates coupon HTML
- ✅ Converts to base64
- ✅ Passes as `coupon_attachment` parameter

**Next Step**: If HTML attachments don't work well, we can add PDF conversion using a service.

## Testing

1. Submit a test spin wheel entry
2. Check the email attachment
3. Verify:
   - Attachment appears
   - Opens correctly (as PDF or HTML)
   - Contains correct restaurant name, code, email, phone

## Alternative: Use PDF Conversion Service

If HTML attachments don't work, we can integrate a PDF conversion service:

1. **htmlpdfapi.com** - Simple API
2. **Puppeteer** - More control but requires setup
3. **Playwright** - Similar to Puppeteer

Would you like me to add PDF conversion?


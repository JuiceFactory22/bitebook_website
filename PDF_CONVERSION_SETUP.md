# PDF Conversion Setup for Email Attachments

## Problem
HTML attachments don't render consistently across email clients. Chrome on desktop often shows them as raw HTML, while Safari handles them better. Converting to PDF ensures consistent display everywhere.

## Solution Options

### Option 1: Use HTMLPDFAPI.com (Recommended - Free Tier Available)

1. **Sign up**: Go to https://htmlpdfapi.com/
2. **Get API Key**: Free tier includes 100 PDFs/month
3. **Add to Vercel Environment Variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
     - `PDF_API_KEY` = Your API key from htmlpdfapi.com
     - `PDF_API_URL` = `https://api.htmlpdfapi.com/v1/pdf` (optional, this is the default)

4. **Redeploy**: Vercel will automatically use the new environment variable

### Option 2: Use PDFShift.io (Alternative)

1. **Sign up**: Go to https://pdfshift.io/
2. **Get API Key**: Free tier available
3. **Update the code** to use PDFShift API
4. **Add to Vercel**: `PDF_API_KEY` = Your PDFShift API key

### Option 3: Use Puppeteer (More Complex)

Requires additional setup with `@sparticuz/chromium` for Vercel serverless functions. More control but more complex.

## Current Implementation

The code will:
1. Try to convert HTML to PDF using the API (if `PDF_API_KEY` is set)
2. Fall back to HTML if PDF conversion fails or no API key

## Quick Setup (HTMLPDFAPI)

1. **Sign up**: https://htmlpdfapi.com/ (free account)
2. **Get API Key**: From your dashboard
3. **Add to Vercel**:
   ```
   PDF_API_KEY=your_api_key_here
   ```
4. **Redeploy**: Changes will take effect automatically

## Testing

After setting up the API key:
1. Submit a test spin wheel entry
2. Check the email attachment
3. It should now be a PDF file that opens correctly in Chrome

## Cost

- **HTMLPDFAPI**: Free tier = 100 PDFs/month, then $0.01 per PDF
- **PDFShift**: Free tier = 100 PDFs/month, then $0.01 per PDF

For your use case (lead magnet coupons), the free tier should be sufficient.

## If You Don't Want to Use a Service

The code will fall back to HTML attachments, which work on:
- ✅ Mobile Safari
- ✅ Some email clients
- ❌ Desktop Chrome (shows as raw HTML)

For best compatibility, PDF is recommended.


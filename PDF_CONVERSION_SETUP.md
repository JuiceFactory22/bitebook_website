# PDF Conversion Setup for Email Attachments

## Problem
HTML attachments don't render consistently across email clients. Chrome on desktop often shows them as raw HTML, while Safari handles them better. Converting to PDF ensures consistent display everywhere.

## Solution Options

### Option 1: Use PDFShift.io (Recommended - Free Tier Available)

1. **Sign up**: Go to https://pdfshift.io/ (free tier: 250 PDFs/month)
2. **Get API Key**: From your dashboard
3. **Add to Vercel Environment Variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
     - `PDF_API_KEY` = Your API key from pdfshift.io
     - `PDF_SERVICE` = `pdfshift` (optional, this is the default)

4. **Redeploy**: Vercel will automatically use the new environment variable

### Option 2: Use Api2Pdf (Alternative)

1. **Sign up**: Go to https://www.api2pdf.com/ (free tier available)
2. **Get API Key**: From your dashboard
3. **Add to Vercel**:
   - `PDF_API_KEY` = Your Api2Pdf API key
   - `PDF_SERVICE` = `api2pdf`

4. **Redeploy**: Changes will take effect automatically

### Option 3: Use Library-Based Solution (No External Service)

I can add a Puppeteer-based solution that runs entirely on your server. This requires:
- Adding `puppeteer-core` and `@sparticuz/chromium` dependencies
- More setup but no external API needed
- Works entirely within your Vercel function

## Current Implementation

The code will:
1. Try to convert HTML to PDF using the API (if `PDF_API_KEY` is set)
2. Fall back to HTML if PDF conversion fails or no API key

## Quick Setup (PDFShift - Recommended)

1. **Sign up**: https://pdfshift.io/ (free account - 250 PDFs/month)
2. **Get API Key**: From your dashboard
3. **Add to Vercel**:
   ```
   PDF_API_KEY=your_pdfshift_api_key_here
   PDF_SERVICE=pdfshift
   ```
4. **Redeploy**: Changes will take effect automatically

## Testing

After setting up the API key:
1. Submit a test spin wheel entry
2. Check the email attachment
3. It should now be a PDF file that opens correctly in Chrome

## Cost

- **PDFShift**: Free tier = 250 PDFs/month, then $9/month for 5,000 PDFs
- **Api2Pdf**: Free tier available, then pay-as-you-go pricing

For your use case (lead magnet coupons), the free tier should be more than sufficient.

## If You Don't Want to Use a Service

The code will fall back to HTML attachments, which work on:
- ✅ Mobile Safari
- ✅ Some email clients
- ❌ Desktop Chrome (shows as raw HTML)

For best compatibility, PDF is recommended.


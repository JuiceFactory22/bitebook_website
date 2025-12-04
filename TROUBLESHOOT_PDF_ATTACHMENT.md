# Troubleshooting PDF Attachment Issue

## Current Issue
The attachment is still coming through as HTML (`bitebook-coupon.html`) instead of PDF.

## Possible Causes

### 1. PDF Conversion Not Working
The PDF conversion API might be failing. Check Vercel function logs:
- Go to Vercel Dashboard → Your Project → Functions tab
- Look for `/api/generate-coupon-pdf` function logs
- Check for errors or "PDF conversion failed" messages

### 2. EmailJS Template Configuration
Your EmailJS template might still be set to HTML file type instead of PDF.

**Fix:**
1. Go to EmailJS → Template `template_db2m6o7`
2. Go to **Attachments** section
3. Edit the attachment:
   - **File Type**: Change from "HTML(File)" to "PDF" or "Application/PDF"
   - **Filename**: Change to `bitebook-coupon.pdf`
   - Keep **Parameter Name**: `coupon_attachment`
4. Save the template

### 3. Environment Variable Not Set
The `PDF_API_KEY` might not be set correctly in Vercel.

**Check:**
1. Vercel Dashboard → Settings → Environment Variables
2. Verify `PDF_API_KEY` exists and has the correct value
3. Make sure it's set for the right environment (Production, Preview, Development)

### 4. API Key Invalid
The PDFShift API key might be incorrect or expired.

**Check:**
1. Log into PDFShift dashboard
2. Verify your API key
3. Check if you've used up your free tier limit

## Debugging Steps

### Step 1: Check Vercel Logs
1. Go to Vercel → Your Project → Functions
2. Click on a recent deployment
3. Check the function logs for `/api/generate-coupon-pdf`
4. Look for:
   - "PDF conversion attempt"
   - "PDF conversion successful" or "PDF conversion failed"
   - Any error messages

### Step 2: Test the API Directly
Test the PDF conversion endpoint:
```bash
curl -X POST https://your-domain.vercel.app/api/generate-coupon-pdf \
  -H "Content-Type: application/json" \
  -d '{"restaurant":"Test Restaurant","code":"TEST123","email":"test@example.com","phone":"1234567890","month":"January 2026"}'
```

Check the response - does it return `format: 'pdf'` or `format: 'html'`?

### Step 3: Verify EmailJS Template
1. Open EmailJS template
2. Check Attachments section
3. Verify:
   - Parameter Name: `coupon_attachment`
   - File Type: **PDF** (not HTML)
   - Filename: `bitebook-coupon.pdf`

### Step 4: Check Browser Console
When submitting the spin wheel:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for any errors or logs from the coupon generation

## Quick Fixes

### Fix 1: Update EmailJS Template File Type
Even if the PDF conversion is working, EmailJS needs to know it's a PDF:
- Change File Type from "HTML(File)" to "PDF" or "Application/PDF"

### Fix 2: Verify Environment Variable
Make sure `PDF_API_KEY` is set in Vercel and matches your PDFShift API key exactly.

### Fix 3: Check PDFShift Account
- Verify your PDFShift account is active
- Check if you've exceeded the free tier (250 PDFs/month)
- Test your API key directly with PDFShift

## Expected Behavior

When working correctly:
1. User spins wheel
2. Code calls `/api/generate-coupon-pdf`
3. API converts HTML to PDF using PDFShift
4. Returns base64 PDF
5. EmailJS receives PDF and attaches it
6. Email has `bitebook-coupon.pdf` attachment
7. PDF opens correctly in Chrome

## Next Steps

1. Check Vercel logs first - this will tell us if PDF conversion is working
2. Update EmailJS template file type to PDF
3. Test again
4. If still HTML, check the logs to see why PDF conversion failed


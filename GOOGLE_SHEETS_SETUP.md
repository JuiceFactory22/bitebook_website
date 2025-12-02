# Google Sheets Integration Setup Guide

This guide will help you set up automatic tracking of free coupon submissions to a Google Sheet.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "BiteBook Lead Tracking" (or any name you prefer)
4. In the first row (Row 1), add these column headers:
   - **A1**: Timestamp
   - **B1**: Email
   - **C1**: Phone
   - **D1**: Source
   - **E1**: Restaurant Name

## Step 2: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it "BiteBook Lead Tracking" (or any name)
4. Click "Create"

## Step 3: Enable Google Sheets API

1. In your Google Cloud project, go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it and click "Enable"

## Step 4: Create a Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Name it "bitebook-sheets-service" (or any name)
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 5: Create and Download Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose "JSON" format
5. Click "Create" - this will download a JSON file
6. **Save this file securely** - you'll need it in the next step

## Step 6: Share Google Sheet with Service Account

1. Open your Google Sheet
2. Click the "Share" button (top right)
3. Copy the **Service Account Email** from the JSON file you downloaded (it looks like: `bitebook-sheets-service@your-project.iam.gserviceaccount.com`)
4. Paste it in the "Share" field
5. Give it "Editor" permissions
6. Click "Send" (you can uncheck "Notify people" since it's a service account)

## Step 7: Get Your Google Sheet ID

1. Open your Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
3. Copy the `YOUR_SHEET_ID` part (the long string between `/d/` and `/edit`)

## Step 8: Add Environment Variables to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add these three variables:

   **Variable 1:**
   - Name: `GOOGLE_SHEETS_ID`
   - Value: (paste your Sheet ID from Step 7)
   - Environment: Production, Preview, Development

   **Variable 2:**
   - Name: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - Value: (copy from the JSON file, it's the `client_email` field)
   - Environment: Production, Preview, Development

   **Variable 3:**
   - Name: `GOOGLE_PRIVATE_KEY`
   - Value: (copy from the JSON file, it's the `private_key` field - include the entire key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)
   - Environment: Production, Preview, Development

## Step 9: Add Environment Variables Locally (for testing)

Create or update `.env.local` in your project root:

```env
GOOGLE_SHEETS_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
```

**Important:** 
- The private key must be wrapped in quotes
- Keep the `\n` characters in the private key (they represent newlines)

## Step 10: Test the Integration

1. Submit a test form on your website
2. Check your Google Sheet - you should see a new row with:
   - Timestamp
   - Email
   - Phone
   - Source (either "homepage" or "spin-wheel")
   - Restaurant Name (if from spin wheel)

## Troubleshooting

**If submissions aren't appearing in the sheet:**
1. Verify the service account email has "Editor" access to the sheet
2. Check that all environment variables are set correctly in Vercel
3. Check Vercel function logs for any errors
4. Verify the Sheet ID is correct

**If you get authentication errors:**
1. Make sure the private key includes the BEGIN/END markers
2. Ensure the private key has `\n` characters for newlines
3. Verify the service account email matches the one in your JSON file

## Security Notes

- **Never commit the JSON key file or `.env.local` to Git**
- The service account should only have access to the specific sheet
- Keep your environment variables secure in Vercel

## What Gets Tracked

Each submission will create a row with:
- **Timestamp**: When the form was submitted (ISO format)
- **Email**: User's email address
- **Phone**: User's phone number
- **Source**: Either "homepage" (from main lead magnet) or "spin-wheel" (from spin wheel page)
- **Restaurant Name**: Which restaurant they won (only for spin wheel submissions)


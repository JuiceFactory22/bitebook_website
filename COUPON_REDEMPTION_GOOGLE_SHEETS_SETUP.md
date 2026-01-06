# Coupon Redemption Tracking - Google Sheets Setup

This guide will help you set up Google Sheets integration to track coupon redemptions when QR codes are scanned.

## Overview

When someone scans a QR code on a coupon:
- **First scan**: Returns green "Redeemed" response and records the redemption
- **Subsequent scans**: Returns red "Already Redeemed" response

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it **"BiteBook Coupon Redemptions"** (or any name you prefer)
4. Set up column headers in **Row 1**:
   - **A1**: `Timestamp`
   - **B1**: `Redemption ID`
   - **C1**: `Restaurant Name`
   - **D1**: `Coupon Code`
   - **E1**: `Customer Name`
   - **F1**: `Customer Email`
   - **G1**: `Status`
   - **H1**: `First Redeemed At`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste this code:

```javascript
/* BiteBook Coupon Redemption Tracker
 * Tracks coupon redemptions and prevents duplicate redemptions
 * Columns: A=Timestamp, B=Redemption ID, C=Restaurant Name, D=Coupon Code, E=Customer Name, F=Customer Email, G=Status, H=First Redeemed At
 */
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData && e.postData.contents ? e.postData.contents : '{}');
    
    const redemptionId = data.redemptionId || '';
    const restaurantName = data.restaurantName || '';
    const couponCode = data.couponCode || '';
    const customerName = data.customerName || '';
    const customerEmail = data.customerEmail || '';
    const timestamp = new Date().toISOString();
    
    if (!redemptionId) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          error: 'Missing redemptionId'
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check if this redemption ID already exists
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    // Skip header row, check column B (Redemption ID)
    let alreadyRedeemed = false;
    let firstRedeemedAt = null;
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][1] === redemptionId) { // Column B (index 1)
        alreadyRedeemed = true;
        firstRedeemedAt = values[i][0]; // Column A (Timestamp)
        break;
      }
    }
    
    if (!alreadyRedeemed) {
      // First time redemption - add to sheet
      sheet.appendRow([
        timestamp,           // Column A: Timestamp
        redemptionId,       // Column B: Redemption ID
        restaurantName,     // Column C: Restaurant Name
        couponCode,         // Column D: Coupon Code
        customerName,       // Column E: Customer Name
        customerEmail,      // Column F: Customer Email
        'Redeemed',         // Column G: Status
        timestamp           // Column H: First Redeemed At
      ]);
    }
    
    // Return response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        alreadyRedeemed: alreadyRedeemed,
        firstRedeemedAt: firstRedeemedAt,
        redemptionId: redemptionId
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Check redemption status (for GET requests)
 */
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const action = e.parameter.action;
    const redemptionId = e.parameter.redemptionId;
    
    if (action === 'check' && redemptionId) {
      const dataRange = sheet.getDataRange();
      const values = dataRange.getValues();
      
      // Skip header row, check column B (Redemption ID)
      for (let i = 1; i < values.length; i++) {
        if (values[i][1] === redemptionId) {
          return ContentService.createTextOutput(
            JSON.stringify({
              success: true,
              redeemed: true,
              firstRedeemedAt: values[i][0] // Column A (Timestamp)
            })
          ).setMimeType(ContentService.MimeType.JSON);
        }
      }
      
      return ContentService.createTextOutput(
        JSON.stringify({
          success: true,
          redeemed: false
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: 'Invalid request'
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (💾)
5. Name your project: **"BiteBook Coupon Redemption Tracker"**

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ → Choose **Web app**
3. Configure:
   - **Description**: "BiteBook Coupon Redemption API"
   - **Execute as**: **"Me"**
   - **Who has access**: **"Anyone"** ⚠️ CRITICAL!
4. Click **Deploy**
5. **Authorize access** when prompted
6. **Copy the Web app URL**

## Step 4: Add Environment Variable to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   - **Key**: `GOOGLE_APPS_SCRIPT_REDEMPTIONS_URL`
   - **Value**: (paste your Web app URL from Step 3)
   - **Environment**: Select all (Production, Preview, Development)
6. Click **Save**

## Step 5: Add Site URL Environment Variable

You also need to set your site URL for QR codes:

1. In Vercel, add another environment variable:
   - **Key**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://getbitebook.com` (or your domain)
   - **Environment**: Select all
2. Click **Save**

## Step 6: Redeploy Your Site

1. Go to **Deployments** tab
2. Click the three dots (⋯) on the latest deployment
3. Click **Redeploy**

## How It Works

1. **QR Code Generation**: Each coupon gets a unique QR code with a redemption ID, customer name, and email embedded in the URL
2. **First Scan**: 
   - QR code links to `/redeem?id=REDEMPTION_ID&restaurant=NAME&customer=NAME&email=EMAIL`
   - API checks Google Sheets
   - If not found, records redemption (including customer name and email) and returns green success
3. **Subsequent Scans**:
   - API finds existing redemption in sheet
   - Returns red "Already Redeemed" response

## What Gets Tracked

Each redemption records:
- **Timestamp**: When the coupon was scanned
- **Redemption ID**: Unique identifier for this specific coupon
- **Restaurant Name**: Which restaurant's coupon was redeemed
- **Coupon Code**: The coupon code (e.g., BB-NWC-A3F9-240115)
- **Customer Name**: Name of the customer who purchased the coupon book
- **Customer Email**: Email of the customer who purchased the coupon book
- **Status**: "Redeemed"
- **First Redeemed At**: When it was first redeemed (same as timestamp for first redemption)

## Testing

1. Generate a coupon book
2. Scan a QR code from a coupon
3. You should see green "Redeemed" message
4. Scan the same QR code again
5. You should see red "Already Redeemed" message
6. Check your Google Sheet - you should see the redemption recorded

## What Gets Tracked

Each redemption creates a row with:
- **Timestamp**: When the coupon was redeemed
- **Redemption ID**: Unique identifier for this coupon
- **Restaurant Name**: Which restaurant the coupon is for
- **Coupon Code**: The coupon code displayed on the coupon
- **Status**: "Redeemed"
- **First Redeemed At**: When it was first redeemed (same as timestamp for first redemption)


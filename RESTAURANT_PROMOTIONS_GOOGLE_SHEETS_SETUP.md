# Restaurant Promotions Google Sheets Setup Guide

This guide will help you set up Google Sheets integration so you can update restaurant promotions directly from a spreadsheet without editing code.

## Overview

Once set up, your restaurant promotions will be fetched from a Google Sheet. When you update the sheet, the changes will be reflected on your website within 5 minutes (cached for performance).

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet (or use an existing one)
3. Name it **"BiteBook Restaurant Promotions"** (or any name you prefer)
4. Set up column headers in **Row 1**:
   - **A1**: `Restaurant Name`
   - **B1**: `Promotion`

5. Fill in your restaurant data:
   - Column A: Restaurant names (must match EXACTLY with names in `src/data/restaurants.ts`)
   - Column B: Promotion descriptions (use line breaks by pressing Alt+Enter in the cell)

**Example Sheet Layout:**
```
| Restaurant Name              | Promotion                                                          |
|------------------------------|--------------------------------------------------------------------|
| Archie Moore's               | 6 FREE WINGS                                                       |
|                              | with the purchase of an additional item                            |
| Prime 16                     | FREE APPETIZER                                                     |
|                              | with any entree purchase                                           |
| The Breakwall                | 6 FREE WINGS                                                       |
|                              | with the purchase of an additional item                            |
```

**Important Notes:**
- Restaurant names must match **EXACTLY** (case-sensitive) with the restaurant names in your code
- Use line breaks within a cell (Alt+Enter) to create multi-line promotions
- Empty rows will be ignored
- If a restaurant isn't in the sheet, it will use the fallback promotion from the code

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste this code:

```javascript
/**
 * BiteBook Restaurant Promotions Reader
 * Reads restaurant promotions from the active sheet and returns as JSON
 */
function doGet(e) {
  try {
    // Get the active spreadsheet and sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get all data (skip header row)
    const data = sheet.getDataRange().getValues();
    
    // Skip header row (row 1)
    const rows = data.slice(1);
    
    // Build promotions object
    const promotions = {};
    
    rows.forEach(function(row) {
      const restaurantName = row[0]; // Column A
      const promotion = row[1];      // Column B
      
      // Skip empty rows
      if (restaurantName && promotion) {
        // Convert line breaks in cell to \n for JSON
        const promotionText = String(promotion).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        promotions[String(restaurantName).trim()] = promotionText.trim();
      }
    });
    
    // Return as JSON
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        promotions: promotions,
        count: Object.keys(promotions).length
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
        promotions: {}
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function to verify the script works
 */
function test() {
  const result = doGet();
  Logger.log(result.getContent());
}
```

4. Click **Save** (💾) or press `Cmd+S` / `Ctrl+S`
5. Name your project: **"BiteBook Restaurant Promotions Reader"**

## Step 3: Test the Script Locally

1. In Apps Script, click **Run** (▶️) at the top
2. Select `test` from the function dropdown
3. Click **Run**
4. You should see a JSON object in the execution log with your promotions
5. If you see errors, fix them before proceeding

## Step 4: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description**: "BiteBook Restaurant Promotions API"
   - **Execute as**: **"Me"** (your account)
   - **Who has access**: **"Anyone"** ⚠️ CRITICAL - Must be "Anyone"!
5. Click **Deploy**
6. **Authorize access** when prompted:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. **Copy the Web app URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

## Step 5: Verify Deployment Settings

1. Click **Deploy** → **Manage deployments**
2. Click the pencil icon (✏️) to edit
3. **VERIFY**: "Who has access" is set to **"Anyone"**
4. If it's not, change it to "Anyone" and click **Deploy** again
5. Copy the NEW URL if it changed

## Step 6: Test the Web App URL

1. Copy your Web app URL
2. Open it in a **new incognito/private browser window**
3. You should see JSON like:
   ```json
   {
     "success": true,
     "promotions": {
       "Archie Moore's": "6 FREE WINGS\nwith the purchase of an additional item",
       "Prime 16": "FREE APPETIZER\nwith any entree purchase"
     },
     "count": 2
   }
   ```
4. If you see an error, see troubleshooting below

## Step 7: Add Environment Variable to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add this variable:
   - **Key**: `GOOGLE_APPS_SCRIPT_PROMOTIONS_URL`
   - **Value**: (paste your Web app URL from Step 4)
   - **Environment**: Select all (Production, Preview, Development)
6. Click **Save**

## Step 8: Add Environment Variable Locally (for testing)

Create or update `.env.local` in your project root:

```env
GOOGLE_APPS_SCRIPT_PROMOTIONS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Step 9: Redeploy Your Site

1. After adding the environment variable, Vercel will automatically redeploy
2. Or manually trigger a deployment:
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click **Redeploy**

## Step 10: Test the Integration

1. Go to your website: `https://getbitebook.com/new-haven-free-coupon`
2. Fill out the form and spin the wheel
3. Check the generated coupon - it should show the promotion from your Google Sheet
4. Update a promotion in your Google Sheet
5. Wait up to 5 minutes (cache duration) and spin again - you should see the updated promotion

## How It Works

1. When someone spins the wheel, the code fetches promotions from your Google Sheet
2. Promotions are cached for 5 minutes to improve performance
3. If the Google Sheets fetch fails, it falls back to the static promotions in `src/data/restaurantPromotions.ts`
4. This ensures your site always works, even if Google Sheets is temporarily unavailable

## Updating Promotions

To update a promotion:
1. Open your Google Sheet
2. Find the restaurant name
3. Update the promotion text in column B
4. Changes will be reflected within 5 minutes on your website

**Tip:** Use Alt+Enter (Windows) or Option+Enter (Mac) to add line breaks within a cell.

## Troubleshooting

### Issue: "Sorry, unable to open the file at this time"

**Solution:**
- Make sure "Who has access" is set to **"Anyone"** in deployment settings
- Create a new deployment if needed

### Issue: Promotions not updating

**Check:**
1. Environment variable is set correctly in Vercel
2. Apps Script URL works in browser (shows JSON with promotions)
3. Restaurant names in sheet match EXACTLY (case-sensitive) with code
4. Wait 5 minutes for cache to expire
5. Check browser console for errors

### Issue: Getting fallback promotions instead of sheet data

**Check:**
1. Apps Script URL is correct and accessible
2. Sheet has data in correct format (Column A: names, Column B: promotions)
3. Restaurant names match exactly with `src/data/restaurants.ts`
4. Check Vercel function logs for API errors

### Issue: Line breaks not showing correctly

**Solution:**
- Make sure you're using line breaks within the cell (Alt+Enter/Option+Enter)
- The script automatically converts line breaks to `\n` for display

## Verification Checklist

- [ ] Google Sheet created with correct column headers
- [ ] Restaurant data entered in sheet
- [ ] Apps Script code saved and tested locally
- [ ] Web app deployed with "Anyone" access
- [ ] Web app URL works in browser (returns JSON)
- [ ] Environment variable added to Vercel
- [ ] Environment variable added to `.env.local` (for local testing)
- [ ] Site redeployed after adding environment variable
- [ ] Test spin shows promotion from Google Sheet
- [ ] Promotion updates appear after cache expires (5 minutes)

## Need Help?

If you're stuck:
1. Check the execution logs in Apps Script
2. Check Vercel function logs for API errors
3. Test the Apps Script URL directly in browser
4. Verify restaurant names match exactly between sheet and code
5. Review the troubleshooting guides for similar setup:
   - `COMPLETE_GOOGLE_SHEETS_SETUP.md`
   - `FIX_APPS_SCRIPT_ACCESS.md`


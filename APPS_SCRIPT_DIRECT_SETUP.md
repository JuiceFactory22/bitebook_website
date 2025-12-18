# Step-by-Step: Create Apps Script Directly from script.google.com

This guide walks you through creating the Apps Script directly from the Apps Script website, which can help avoid workspace restrictions.

## Step 1: Open Apps Script Website

1. Open a new browser tab
2. Go to: **https://script.google.com**
3. Sign in with your Google account (the same account that has access to your Google Sheet)

## Step 2: Create a New Project

1. Click the **"+"** button (or "New Project" button) in the top left
2. This creates a new, blank Apps Script project
3. You'll see a code editor with a default function

## Step 3: Name Your Project

1. In the top left, you'll see "Untitled project"
2. Click on it to rename it
3. Type: **"BiteBook Restaurant Promotions Reader"**
4. Press Enter to save

## Step 4: Delete Default Code

1. In the code editor, you'll see something like:
   ```javascript
   function myFunction() {
   
   }
   ```
2. Select all the code (Cmd+A or Ctrl+A)
3. Delete it (Backspace or Delete key)
4. The editor should now be empty

## Step 5: Paste the Apps Script Code

1. Copy this entire code block:

```javascript
/**
 * BiteBook Restaurant Promotions Reader
 * Reads restaurant promotions from a Google Sheet and returns as JSON
 */
function doGet(e) {
  try {
    // Your Google Sheet ID
    const SHEET_ID = '16dOGu9OcCoeU8AxdRxSL2WJUIU3oQydadhstaTXAGu0';
    
    // Open the spreadsheet by ID
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    // Get all data (skip header row)
    const data = sheet.getDataRange().getValues();
    
    // Skip header row (row 1)
    const rows = data.slice(1);
    
    // Build promotions object
    const promotions = {};
    
    rows.forEach(function(row) {
      const restaurantName = row[0]; // Column A
      const promotion = row[1];      // Column B
      
      // Skip empty rows and restaurants with blank promotions
      // Only include restaurants that have both a name and a non-empty promotion
      if (restaurantName && promotion && String(promotion).trim().length > 0) {
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
```

2. Paste it into the empty code editor (Cmd+V or Ctrl+V)

## Step 6: Get Your Google Sheet ID

1. Open your Google Sheet (the one with restaurant promotions)
2. Look at the URL in your browser
3. The URL will look like:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123xyz789/edit
   ```
4. Copy the part between `/d/` and `/edit`
   - In the example above, it's: `1ABC123xyz789`
5. This is your **Sheet ID**

## Step 7: Update the Code with Your Sheet ID

✅ **Already done!** Your Sheet ID is already in the code:
   ```javascript
   const SHEET_ID = '16dOGu9OcCoeU8AxdRxSL2WJUIU3oQydadhstaTXAGu0';
   ```

You can skip this step - just make sure the code above is pasted into your Apps Script.

## Step 8: Save the Project

1. Click the **Save** icon (💾) in the toolbar
2. Or press **Cmd+S** (Mac) or **Ctrl+S** (Windows)
3. The project is now saved

## Step 9: Authorize the Script (First Time Only)

1. Click **Run** (▶️) button at the top
2. You'll be prompted to authorize the script
3. Click **"Review Permissions"** or **"Authorize"**
4. Choose your Google account
5. You may see a warning: **"This app isn't verified"**
   - Click **"Advanced"**
   - Click **"Go to [Project Name] (unsafe)"**
   - Click **"Allow"**
6. The script will request permissions to:
   - View your Google Sheets
   - This is needed to read your restaurant promotions

## Step 10: Test the Script

1. In the function dropdown at the top, select **`doGet`**
2. Click **Run** (▶️)
3. Check the execution log at the bottom
4. You should see JSON output with your promotions
5. If you see errors, check:
   - Is the Sheet ID correct?
   - Does the script have permission to access the sheet?
   - Is the sheet shared with your Google account?

## Step 11: Deploy as Web App

1. Click **Deploy** in the top menu
2. Click **"New deployment"**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **"Web app"**
5. Configure the deployment:
   - **Description**: "BiteBook Restaurant Promotions API"
   - **Execute as**: Select **"Me"** (your account)
   - **Who has access**: Select **"Anyone"** ⚠️ (This is critical!)
6. Click **"Deploy"**

## Step 12: Authorize Deployment

1. You'll be prompted to authorize again
2. Click **"Authorize access"**
3. Choose your Google account
4. Click **"Advanced"** → **"Go to [Project Name] (unsafe)"**
5. Click **"Allow"**

## Step 13: Copy the Web App URL

1. After deployment, you'll see a **"Web app URL"**
2. It will look like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
3. Click the **copy icon** next to the URL
4. **Save this URL** - you'll need it for Vercel

## Step 14: Test the Web App URL

1. Open a **new incognito/private browser window**
2. Paste the Web App URL in the address bar
3. Press Enter
4. You should see JSON output like:
   ```json
   {
     "success": true,
     "promotions": {
       "Orange Ale House": "6 FREE WINGS\nwith the purchase...",
       ...
     },
     "count": 27
   }
   ```
5. If you see an error:
   - Go back to Step 11
   - Make sure "Who has access" is set to **"Anyone"**
   - Create a new deployment

## Step 15: Add to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Add:
   - **Key**: `GOOGLE_APPS_SCRIPT_PROMOTIONS_URL`
   - **Value**: (paste your Web App URL from Step 13)
   - **Environment**: Select all (Production, Preview, Development)
6. Click **"Save"**

## Step 16: Redeploy Your Site

1. Vercel should automatically redeploy
2. Or manually trigger:
   - Go to **Deployments** tab
   - Click the three dots (⋯) on latest deployment
   - Click **"Redeploy"**

## Step 17: Test on Your Website

1. Go to your spin wheel page
2. Fill out the form and spin the wheel
3. Check the generated coupon
4. It should show the promotion from your Google Sheet!

## Troubleshooting

### Error: "Cannot find method openById"
- Make sure you're using the correct Sheet ID
- Make sure the sheet is shared with your Google account

### Error: "Access denied"
- Make sure "Who has access" is set to **"Anyone"** in deployment settings
- Try creating a new deployment

### Error: "Bad Request" when accessing URL
- Make sure the deployment is set to "Anyone"
- Try accessing in an incognito window
- Check that the Sheet ID is correct in the code

### No promotions showing
- Check that your Google Sheet has data
- Verify restaurant names match exactly (case-sensitive)
- Check the execution log in Apps Script for errors

## Need Help?

If you get stuck:
1. Check the execution log in Apps Script (View → Execution log)
2. Verify your Sheet ID is correct
3. Make sure the sheet is accessible
4. Test the URL in an incognito window


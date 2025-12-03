# Complete Google Sheets Tracking Setup - Step by Step

Follow these steps to finish setting up Google Sheets tracking for your lead magnet forms.

## ✅ What's Already Done

- ✅ API route created (`/api/track-lead`)
- ✅ Forms updated to send data to the API
- ✅ Code tracks: email, phone, source, restaurant_name
- ✅ Google Apps Script code provided

## 📋 Setup Checklist

### Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **"BiteBook Lead Tracking"**
4. Set up column headers in **Row 1**:
   - **A1**: `Timestamp`
   - **B1**: `Email`
   - **C1**: `Phone`
   - **D1**: `Source`
   - **E1**: `Restaurant Name`

### Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date().toISOString();
    
    // Prepare the row data
    const rowData = [
      timestamp,
      data.email || '',
      data.phone || '',
      data.source || 'unknown',
      data.restaurant_name || ''
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Lead tracked successfully' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Test endpoint
  return ContentService.createTextOutput('BiteBook Lead Tracker is running!');
}
```

4. Click **Save** (💾) or press `Cmd+S` / `Ctrl+S`
5. Name your project: "BiteBook Lead Tracker"

### Step 3: Test the Script Locally

1. In Apps Script, click **Run** (▶️) at the top
2. Select `doGet` from the function dropdown
3. Click **Run**
4. You should see "BiteBook Lead Tracker is running!" in the execution log
5. If you see errors, fix them before proceeding

### Step 4: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description**: "BiteBook Lead Tracking API"
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

### Step 5: Verify Deployment Settings

1. Click **Deploy** → **Manage deployments**
2. Click the pencil icon (✏️) to edit
3. **VERIFY**: "Who has access" is set to **"Anyone"**
4. If it's not, change it to "Anyone" and click **Deploy** again
5. Copy the NEW URL if it changed

### Step 6: Test the Web App URL

1. Copy your Web app URL
2. Open it in a **new incognito/private browser window**
3. You should see: **"BiteBook Lead Tracker is running!"**
4. If you see an error, see troubleshooting below

### Step 7: Add Environment Variable to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **bitebook-landing** (or your project name)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add this variable:
   - **Key**: `GOOGLE_APPS_SCRIPT_URL`
   - **Value**: (paste your Web app URL from Step 4)
   - **Environment**: Select all (Production, Preview, Development)
6. Click **Save**

### Step 8: Redeploy Your Site

1. After adding the environment variable, Vercel will automatically redeploy
2. Or manually trigger a deployment:
   - Go to **Deployments** tab
   - Click the three dots (⋯) on the latest deployment
   - Click **Redeploy**

### Step 9: Test the Integration

1. Go to your website: `https://getbitebook.com/new-haven-free-coupon`
2. Fill out the form and spin the wheel
3. Check your Google Sheet - you should see a new row with:
   - Timestamp
   - Email
   - Phone
   - Source: "spin-wheel"
   - Restaurant Name: (the restaurant they won)

## 🔍 Troubleshooting

### Issue: "Sorry, unable to open the file at this time"

**Solution:**
- Make sure "Who has access" is set to **"Anyone"** in deployment settings
- Create a new deployment if needed
- See `FIX_APPS_SCRIPT_ACCESS.md` for detailed help

### Issue: Sheet isn't populating

**Check:**
1. Vercel environment variable is set correctly
2. Apps Script URL works in browser (shows "BiteBook Lead Tracker is running!")
3. Apps Script execution logs show successful runs
4. Vercel function logs show the API is being called

### Issue: Organization blocks Apps Script

**Solution:**
- See `ENABLE_APPS_SCRIPT_WORKSPACE.md` for how to enable it
- Or use a personal Gmail account as a workaround

## 📊 What Gets Tracked

Each submission creates a row with:
- **Timestamp**: When submitted (ISO format)
- **Email**: User's email address
- **Phone**: User's phone number (digits only)
- **Source**: Either "homepage" or "spin-wheel"
- **Restaurant Name**: Which restaurant they won (only for spin wheel, empty for homepage)

## ✅ Verification Checklist

- [ ] Google Sheet created with correct column headers
- [ ] Apps Script code saved and tested locally
- [ ] Web app deployed with "Anyone" access
- [ ] Web app URL works in browser
- [ ] Environment variable added to Vercel
- [ ] Site redeployed after adding environment variable
- [ ] Test submission shows up in Google Sheet

## 🎯 Next Steps After Setup

Once tracking is working:
1. Set up Google Sheet filters/sorting for easy analysis
2. Create charts/graphs to visualize lead sources
3. Set up email notifications (optional - using Apps Script)
4. Export data periodically for backup

## Need Help?

If you're stuck on any step:
1. Check the execution logs in Apps Script
2. Check Vercel function logs
3. Review the troubleshooting guides:
   - `FIX_APPS_SCRIPT_ACCESS.md`
   - `TROUBLESHOOT_GOOGLE_SHEETS.md`
   - `ENABLE_APPS_SCRIPT_WORKSPACE.md`


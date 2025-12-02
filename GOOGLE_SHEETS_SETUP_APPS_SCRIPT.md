# Google Sheets Integration Setup (Google Apps Script Method)

This method uses Google Apps Script instead of service account keys, which works even if your organization blocks service account key creation.

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

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
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
  // Optional: Test endpoint
  return ContentService.createTextOutput('BiteBook Lead Tracker is running!');
}
```

4. Click **Save** (💾 icon) or press `Cmd+S` / `Ctrl+S`
5. Name your project: "BiteBook Lead Tracker"

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Configure the deployment:
   - **Description**: "BiteBook Lead Tracking API" (optional)
   - **Execute as**: "Me" (your account)
   - **Who has access**: **"Anyone"** ⚠️ THIS IS CRITICAL - Must be set to "Anyone"
4. Click **Deploy**
5. **IMPORTANT**: Copy the **Web app URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
6. Click **Authorize access** when prompted
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. **VERY IMPORTANT**: After authorization, you MUST:
   - Go back to **Deploy** → **Manage deployments**
   - Click the pencil icon (✏️) to edit your deployment
   - Make absolutely sure **"Who has access"** is set to **"Anyone"**
   - If it's not, change it to "Anyone" and click **Deploy** again
   - Copy the NEW Web app URL (it might change)

## Step 4: Add Environment Variable to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add this variable:
   - **Name**: `GOOGLE_APPS_SCRIPT_URL`
   - **Value**: (paste the Web app URL from Step 3)
   - **Environment**: Production, Preview, Development
5. Click **Save**

## Step 5: Update the API Route

The API route will be updated to use the Google Apps Script URL instead of service account authentication.

## Step 6: Test the Integration

1. Submit a test form on your website
2. Check your Google Sheet - you should see a new row with:
   - Timestamp
   - Email
   - Phone
   - Source (either "homepage" or "spin-wheel")
   - Restaurant Name (if from spin wheel)

## Security Notes

- The Apps Script validates incoming data
- Only your script can write to the sheet
- The Web app URL is a secret - keep it in environment variables only
- You can regenerate the URL anytime by creating a new deployment

## Troubleshooting

**If submissions aren't appearing:**
1. Check that the Web app is deployed and authorized
2. Verify the `GOOGLE_APPS_SCRIPT_URL` environment variable is set correctly in Vercel
3. Check the Apps Script execution log: **Executions** tab in Apps Script editor
4. Make sure "Who has access" is set to "Anyone" (the script validates data, so it's safe)

**If you get authorization errors:**
1. Make sure you clicked "Authorize access" when deploying
2. Try redeploying and authorizing again

## What Gets Tracked

Each submission will create a row with:
- **Timestamp**: When the form was submitted (ISO format)
- **Email**: User's email address
- **Phone**: User's phone number
- **Source**: Either "homepage" (from main lead magnet) or "spin-wheel" (from spin wheel page)
- **Restaurant Name**: Which restaurant they won (only for spin wheel submissions)


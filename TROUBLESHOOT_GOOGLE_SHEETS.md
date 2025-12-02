# Troubleshooting Google Sheets Integration

If your Google Sheet isn't populating, follow these steps:

## Step 1: Verify Environment Variable

1. Go to your Vercel Dashboard
2. Check that `GOOGLE_APPS_SCRIPT_URL` is set correctly
3. The URL should look like: `https://script.google.com/macros/s/AKfycby.../exec`
4. Make sure there are no extra spaces or characters

## Step 2: Test the Apps Script Directly

1. Open your Google Apps Script editor
2. Click **Run** → Select `doGet` function → Click **Run**
3. You should see "BiteBook Lead Tracker is running!" in the execution log
4. If you see errors, fix them first

## Step 3: Test the Web App URL

1. Copy your Apps Script web app URL
2. Open it in a browser (just the URL, no parameters)
3. You should see: "BiteBook Lead Tracker is running!"
4. If you get an error, the deployment might not be correct

## Step 4: Check Apps Script Execution Logs

1. In Google Apps Script, go to **Executions** (left sidebar)
2. Look for recent executions when you submitted a form
3. Click on an execution to see details
4. Check for any errors

## Step 5: Verify the Apps Script Code

Make sure your Apps Script code matches this exactly:

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

## Step 6: Verify Deployment Settings

1. In Apps Script, click **Deploy** → **Manage deployments**
2. Click the pencil icon (edit) on your deployment
3. Verify:
   - **Execute as**: "Me" (your account)
   - **Who has access**: "Anyone" (important!)
4. If you changed anything, click **Deploy** again

## Step 7: Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project → **Functions** tab
2. Look for `/api/track-lead` executions
3. Check for any errors in the logs
4. Look for messages like "Google Apps Script URL not configured"

## Step 8: Test with a Manual Request

You can test the API directly using curl or Postman:

```bash
curl -X POST https://your-domain.com/api/track-lead \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "phone": "1234567890",
    "source": "homepage"
  }'
```

Then check:
1. Vercel function logs for the response
2. Google Apps Script execution logs
3. Your Google Sheet for the new row

## Step 9: Common Issues

### Issue: "Google Apps Script URL not configured"
- **Fix**: Add `GOOGLE_APPS_SCRIPT_URL` to Vercel environment variables

### Issue: Apps Script returns 401 or 403
- **Fix**: Make sure "Who has access" is set to "Anyone" in deployment settings

### Issue: Apps Script executes but sheet doesn't update
- **Fix**: Check that you're looking at the correct sheet tab (should be the active sheet)
- **Fix**: Verify the sheet has the correct column headers in Row 1

### Issue: CORS errors
- **Fix**: Google Apps Script web apps handle CORS automatically, but make sure the deployment is set to "Anyone"

### Issue: Data appears in wrong columns
- **Fix**: Check that your sheet has headers in Row 1: Timestamp, Email, Phone, Source, Restaurant Name

## Step 10: Enable Detailed Logging

Add this to your Apps Script to see what's happening:

```javascript
function doPost(e) {
  try {
    // Log the incoming request
    console.log('Received data:', e.postData.contents);
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date().toISOString();
    
    const rowData = [
      timestamp,
      data.email || '',
      data.phone || '',
      data.source || 'unknown',
      data.restaurant_name || ''
    ];
    
    console.log('Appending row:', rowData);
    sheet.appendRow(rowData);
    console.log('Row appended successfully');
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Lead tracked successfully' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('Error:', error);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

Then check the **Executions** tab in Apps Script to see the console logs.

## Still Not Working?

If none of these steps work, please check:
1. Vercel function logs for the exact error message
2. Google Apps Script execution logs for errors
3. Browser console when submitting the form (for client-side errors)

Share the error messages and I can help debug further!


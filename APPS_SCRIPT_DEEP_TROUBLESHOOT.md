# Deep Troubleshooting: Apps Script Still Not Working

If "Who has access" is already set to "Anyone" but you're still getting errors, try these steps:

## Step 1: Verify the Script Code is Correct

1. Open your Apps Script editor
2. Make sure your code looks exactly like this:

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

3. Click **Save** (💾) to save the script

## Step 2: Test the doGet Function Locally

1. In Apps Script, click **Run** (▶️) at the top
2. Select `doGet` from the function dropdown
3. Click **Run**
4. Check the execution log - you should see "BiteBook Lead Tracker is running!"
5. If you see errors, fix them first

## Step 3: Create a Fresh Deployment

Sometimes deployments get corrupted. Let's create a brand new one:

1. In Apps Script, click **Deploy** → **Manage deployments**
2. If you have an existing deployment, click the trash icon to delete it
3. Click **Deploy** → **New deployment**
4. Click the gear icon ⚙️ next to "Select type"
5. Choose **Web app**
6. Configure:
   - **Description**: "BiteBook Lead Tracker v2" (or any name)
   - **Execute as**: "Me" (your account)
   - **Who has access**: **"Anyone"** (double-check this!)
7. Click **Deploy**
8. **IMPORTANT**: When you see the authorization screen:
   - Click **Authorize access**
   - Choose your Google account
   - You might see a warning - click **Advanced**
   - Click **Go to [Project Name] (unsafe)**
   - Click **Allow**
9. Copy the NEW Web app URL (it will be different from before)

## Step 4: Test the New URL

1. Copy the new Web app URL
2. Open it in a **new incognito/private browser window** (to avoid cache issues)
3. You should see: "BiteBook Lead Tracker is running!"
4. If you still see an error, continue to Step 5

## Step 5: Check for Organization Policies

If you're using a Google Workspace account, your organization might have restrictions:

1. Try creating the Apps Script with a **personal Gmail account** instead
2. Or contact your Google Workspace admin to allow Apps Script web apps

## Step 6: Verify the URL Format

The URL should look like:
```
https://script.google.com/macros/s/AKfycby.../exec
```

**NOT** like:
```
https://script.google.com/macros/u/2/s/.../exec
```

If your URL has `/u/2/` or `/u/0/` in it, that might be the issue. Try creating a new deployment.

## Step 7: Check Execution Logs

1. In Apps Script, click **Executions** (left sidebar)
2. Look for recent executions
3. Click on one to see details
4. Check for any errors or warnings

## Step 8: Try a Simple Test Script

If nothing works, try this minimal test script:

```javascript
function doGet(e) {
  return ContentService.createTextOutput('Hello World!');
}

function doPost(e) {
  return ContentService.createTextOutput('POST received!');
}
```

1. Replace your current code with this
2. Save it
3. Deploy as a new web app
4. Test the URL - you should see "Hello World!"
5. If this works, then add back the full code piece by piece

## Step 9: Check Browser Console

When you open the Apps Script URL and see an error:
1. Open browser Developer Tools (F12)
2. Go to the **Console** tab
3. Look for any JavaScript errors
4. Share what you see

## Step 10: Alternative - Use a Different Google Account

If you're using a Google Workspace account:
1. Create the Apps Script with a personal Gmail account
2. Share the Google Sheet with that account
3. Deploy from the personal account

## Still Not Working?

If none of these work, the issue might be:
1. **Organization restrictions** - Your Google Workspace admin needs to allow Apps Script web apps
2. **Account permissions** - Try a different Google account
3. **Script errors** - Check the execution logs for hidden errors

Let me know:
1. What happens when you test `doGet` in the Apps Script editor?
2. What's the exact URL format you're using?
3. Are you using a personal Gmail or Google Workspace account?


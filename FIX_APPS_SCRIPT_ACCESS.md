# Fix: "Sorry, unable to open the file at this time"

If you're seeing this error when accessing your Apps Script URL, follow these steps:

## The Problem

The error "Sorry, unable to open the file at this time" means the Apps Script web app isn't properly configured for public access.

## Solution: Fix Deployment Settings

### Step 1: Open Your Apps Script

1. Go to your Google Sheet
2. Click **Extensions** → **Apps Script**

### Step 2: Check Current Deployment

1. Click **Deploy** → **Manage deployments**
2. You should see your deployment listed
3. Click the pencil icon (✏️) to edit it

### Step 3: Fix "Who has access" Setting

1. In the deployment settings, look for **"Who has access"**
2. **It MUST be set to "Anyone"** - this is critical!
3. If it says "Only myself" or anything else:
   - Change the dropdown to **"Anyone"**
   - Click **Deploy**
   - Copy the NEW Web app URL (it may have changed)

### Step 4: Re-authorize if Needed

1. After changing to "Anyone", you may need to authorize again
2. Click **Authorize access** if prompted
3. Choose your Google account
4. Click **Advanced** → **Go to [Project Name] (unsafe)**
5. Click **Allow**

### Step 5: Test the URL Again

1. Copy the Web app URL from the deployment
2. Open it in a new browser tab (or incognito window)
3. You should see: **"BiteBook Lead Tracker is running!"**
4. If you still see an error, continue to Step 6

### Step 6: Create a New Deployment (if still not working)

If the above doesn't work, create a fresh deployment:

1. In Apps Script, click **Deploy** → **Manage deployments**
2. Click the trash icon to delete the old deployment
3. Click **Deploy** → **New deployment**
4. Click the gear icon ⚙️ → Choose **Web app**
5. Set:
   - **Execute as**: "Me"
   - **Who has access**: **"Anyone"** (very important!)
6. Click **Deploy**
7. Authorize when prompted
8. Copy the NEW Web app URL
9. Test it in your browser

### Step 7: Update Vercel Environment Variable

1. Once you have a working URL, go to Vercel Dashboard
2. Update the `GOOGLE_APPS_SCRIPT_URL` environment variable with the new URL
3. Redeploy your site (or wait for automatic deployment)

## Why "Anyone" is Safe

Setting "Who has access" to "Anyone" is safe because:
- The script validates all incoming data
- It only writes to YOUR specific sheet
- No one can access your sheet without the URL
- The script only accepts POST requests with valid data

## Still Not Working?

If you've tried all the above and it still doesn't work:

1. **Check the Apps Script code** - Make sure the `doGet` function is present:
   ```javascript
   function doGet(e) {
     return ContentService.createTextOutput('BiteBook Lead Tracker is running!');
   }
   ```

2. **Check for script errors**:
   - In Apps Script, click **Run** → Select `doGet` → Click **Run**
   - Check for any errors in the execution log

3. **Try a different browser** or incognito mode to rule out caching issues

4. **Verify the URL format** - It should end with `/exec` not `/dev`

## Quick Test

Once you have the correct URL, test it with this command in your terminal:

```bash
curl "YOUR_APPS_SCRIPT_URL"
```

You should get back: `BiteBook Lead Tracker is running!`

If you get an error, the deployment still isn't configured correctly.


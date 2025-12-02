# Enable Apps Script Web Apps in Google Workspace

If you're using a Google Workspace (business) account, you may need to enable Apps Script web apps. Here's how:

## Option 1: If You're the Google Workspace Admin

### Step 1: Access Admin Console

1. Go to [admin.google.com](https://admin.google.com)
2. Sign in with your admin account
3. You need to have **Super Admin** or **Apps Script Admin** privileges

### Step 2: Enable Apps Script API

1. In Admin Console, go to **Apps** → **Google Workspace** → **Apps Script**
2. Look for **"Apps Script API"** or **"Apps Script Web Apps"**
3. Make sure it's **Enabled** for your organization
4. If it's disabled, click to enable it

### Step 3: Allow External Access (if needed)

1. Still in Apps Script settings
2. Look for **"Allow users to publish Apps Script web apps"** or similar setting
3. Enable this option
4. You may see options like:
   - **"Anyone"** - Allows public web apps
   - **"Anyone in your organization"** - Only internal access
   - Choose based on your security needs

### Step 4: Check Organization Policies

1. In Admin Console, go to **Security** → **Access and data control** → **API controls**
2. Look for **"Apps Script API"** restrictions
3. Make sure it's not blocked
4. If there are restrictions, you may need to:
   - Add your domain to allowlist
   - Or remove the restriction temporarily

### Step 5: Check Apps Script Settings

1. Go to **Apps** → **Additional Google services** → **Apps Script**
2. Make sure Apps Script is enabled for your organization
3. Check service status - should be "ON for everyone" or "ON for some users"

## Option 2: If You're NOT the Admin

### Contact Your Google Workspace Admin

You'll need to ask your IT/admin to:

1. **Enable Apps Script API** for your organization
2. **Allow Apps Script web apps** to be published
3. **Set access level** to "Anyone" (or at least allow external access)
4. **Remove any blocks** on Apps Script in security policies

### Email Template for Your Admin

You can send this to your admin:

```
Subject: Request to Enable Apps Script Web Apps

Hi [Admin Name],

I need to enable Google Apps Script web apps for a business integration. 
Could you please:

1. Enable the Apps Script API in Admin Console
   (Apps → Google Workspace → Apps Script)

2. Allow users to publish Apps Script web apps with external access
   (Set "Who has access" to allow "Anyone" or external access)

3. Ensure Apps Script is not blocked in security policies
   (Security → Access and data control → API controls)

This is needed for [brief explanation of what you're doing - e.g., 
"automatically tracking form submissions to Google Sheets"].

Thank you!
```

## Option 3: Alternative - Use Personal Gmail (Temporary Workaround)

If you can't get admin access immediately, you can:

1. **Create the Apps Script with a personal Gmail account**
2. **Share your Google Sheet** with that personal account
3. **Deploy the web app** from the personal account
4. **Use that web app URL** in your Vercel environment variable

This works as a temporary solution while you get Workspace permissions sorted out.

## Step-by-Step Admin Console Navigation

If you're the admin, here's the exact path:

1. **Go to**: [admin.google.com](https://admin.google.com)
2. **Navigate to**: Apps → Google Workspace → Apps Script
3. **Look for**:
   - "Apps Script API" - Enable this
   - "Allow users to publish web apps" - Enable this
   - "Web app access" - Set to "Anyone" or "Anyone in your organization"
4. **Also check**: Security → Access and data control → API controls
   - Make sure Apps Script API is not restricted

## Common Settings to Check

### In Apps Script Settings:
- ✅ Apps Script API: **Enabled**
- ✅ Web apps: **Enabled**
- ✅ External access: **Allowed** (or "Anyone")

### In Security/API Controls:
- ✅ Apps Script API: **Not blocked**
- ✅ No domain restrictions on Apps Script

### In Service Status:
- ✅ Apps Script: **ON for everyone** (or at least for your account)

## After Enabling

Once your admin enables these settings:

1. **Wait a few minutes** for changes to propagate
2. **Go back to your Apps Script**
3. **Create a new deployment** (Deploy → New deployment)
4. **Set "Who has access" to "Anyone"**
5. **Test the URL** - it should work now!

## Still Having Issues?

If you've enabled everything but it still doesn't work:

1. **Check if you have the right admin role** - You need Super Admin or Apps Script Admin
2. **Wait 15-30 minutes** - Settings can take time to propagate
3. **Try creating a new Apps Script project** - Sometimes old projects are cached
4. **Check Google Workspace status** - Make sure there are no service outages

## Need Help?

If you're not sure about any of these settings:
- Contact Google Workspace support
- Or use the personal Gmail workaround (Option 3) as a temporary solution


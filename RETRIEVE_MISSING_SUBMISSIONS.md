# How to Retrieve Missing Submissions from EmailJS

## Overview

If submissions happened before Google Sheets was linked, you can retrieve the phone numbers and restaurant names from **EmailJS Logs**. EmailJS keeps a history of all emails sent through their service.

## Step-by-Step Guide

### Step 1: Access EmailJS Dashboard

1. Go to https://dashboard.emailjs.com/
2. Log in to your account
3. Make sure you're viewing the correct service: `service_u460dtm`

### Step 2: View Email Logs

1. In the left sidebar, click on **"Logs"** or **"Activity"**
2. You should see a list of all emails sent through your templates
3. Filter by:
   - **Template**: `template_db2m6o7` (spin wheel template)
   - **Date Range**: Select the date range when submissions happened before Google Sheets was linked
   - **Status**: "Sent" (to see successful submissions)

### Step 3: Extract Data from Logs

For each email in the logs, you can see:

1. **To Email** - The user's email address
2. **Template Variables** - Click on each email to see the template parameters that were sent:
   - `email` - User's email
   - `phone` - User's phone number
   - `restaurant_name` - Which restaurant they won

### Step 4: Export or Copy Data

**Option A: Manual Copy**
- Click on each email log entry
- Copy the template variables (email, phone, restaurant_name)
- Paste into a spreadsheet or document

**Option B: EmailJS Export (if available)**
- Some EmailJS plans allow exporting logs
- Check if there's an "Export" or "Download" button in the Logs section

### Step 5: Add to Google Sheets

Once you have the data, you can manually add it to your Google Sheet with columns:
- Email
- Phone
- Restaurant Name
- Source: "spin-wheel"
- Timestamp: (the date/time from EmailJS logs)

## Alternative: Check Your Email Inbox

If the emails were sent to you (as notifications), you can also:

1. Check your email inbox for emails from EmailJS
2. Look for emails sent during the period before Google Sheets was linked
3. The email content should include the template variables

## EmailJS Logs Location

The exact path in EmailJS dashboard:
```
Dashboard → Logs (or Activity) → Filter by Template → View Details
```

## What to Look For

In each log entry, look for:
- **Template Parameters** or **Variables** section
- Fields:
  - `email`: user@example.com
  - `phone`: 1234567890
  - `restaurant_name`: Restaurant Name Here

## If Logs Are Not Available

If EmailJS logs don't show the data you need:

1. **Check EmailJS Plan Limits**
   - Free plans may have limited log history
   - Paid plans typically keep logs longer

2. **Contact EmailJS Support**
   - They may be able to provide historical data
   - Support: support@emailjs.com

3. **Check Your Email Notifications**
   - If you set up notification emails, check your inbox
   - The notification emails might contain the submission data

## Quick Checklist

- [ ] Logged into EmailJS dashboard
- [ ] Navigated to Logs/Activity section
- [ ] Filtered by template `template_db2m6o7`
- [ ] Selected date range (before Google Sheets was linked)
- [ ] Opened each email log entry
- [ ] Copied email, phone, and restaurant_name
- [ ] Added data to Google Sheet manually

## Notes

- EmailJS logs typically show the last 30-90 days (depending on your plan)
- Older logs may not be available on free plans
- Template variables are shown in the log details for each sent email
- You can search/filter logs by date, template, or status


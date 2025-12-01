# Troubleshooting Lead Magnet Form Error

## Most Common Issue: Template Name Mismatch

The error "Something went wrong" usually means the template name in EmailJS doesn't match the code.

## Quick Fix Steps

### Step 1: Find Your Actual Template Name in EmailJS

1. Go to https://dashboard.emailjs.com/
2. Click **Email Templates** in the left sidebar
3. Find your lead magnet template
4. Look at the **Template ID** - it will look like `template_xxxxxxx` or just a name

### Step 2: Update the Code to Match

Once you know your template name, I can update the code. Or you can tell me:
- What is the template ID/name shown in EmailJS?
- What is the service ID? (should be `service_u460dtm`)

## Other Common Issues

### Issue 2: Template Not Connected to Service
- In EmailJS, make sure your template is connected to service `service_u460dtm`
- Go to your template → Settings → Check the service connection

### Issue 3: Missing Template Variables
Your template needs these variables:
- `{{email}}`
- `{{phone}}`
- `{{from_name}}`
- `{{message}}`
- `{{to_email}}`
- `{{to_phone}}`

### Issue 4: EmailJS Quota Exceeded
- Check your EmailJS dashboard for quota limits
- Free tier has 200 emails/month

## How to Check the Error

1. Open your website
2. Open browser DevTools (Press F12)
3. Go to the **Console** tab
4. Submit the form
5. Look for error messages - they will tell you exactly what's wrong

## Quick Test

After fixing, test by:
1. Submitting the form with a test email
2. Check EmailJS dashboard → **Email Logs** to see if it was sent
3. Check the recipient's email inbox

## Need Help?

Share with me:
1. The exact template ID/name from your EmailJS dashboard
2. Any error messages from the browser console
3. What you see in EmailJS → Email Logs

Then I can fix the code to match your exact EmailJS setup!


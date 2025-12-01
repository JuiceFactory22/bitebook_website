# EmailJS Connection Checklist

## ✅ Current Configuration in Code

The lead magnet form is already configured with:
- **Service ID:** `service_u460dtm`
- **Template Name:** `template_lead_magnet`
- **Public Key:** `qq3QK0zGBYaHNI2DW`

## Steps to Verify Connection

### 1. Check Template Name in EmailJS
- Go to https://dashboard.emailjs.com/
- Navigate to **Email Templates**
- Find your template
- **Verify the template ID/name is exactly:** `template_lead_magnet`
- If it's different, either:
  - Rename it in EmailJS to `template_lead_magnet`, OR
  - Update the code to match your template name

### 2. Check Service Connection
- In EmailJS, go to **Email Services**
- Find service `service_u460dtm`
- Make sure your `template_lead_magnet` is connected to this service
- If you're using a different service, update the service ID in the code

### 3. Verify Template Variables
Your EmailJS template should have access to these variables:
- `{{email}}` - User's email address
- `{{phone}}` - User's phone number
- `{{from_name}}` - Will be "BiteBook"
- `{{message}}` - Thank you message
- `{{to_email}}` - Same as email (for EmailJS routing)
- `{{to_phone}}` - Same as phone (for EmailJS routing)

### 4. Test the Connection
1. Go to your website: https://getbitebook.com
2. Fill out the lead magnet form
3. Submit it
4. Check your EmailJS dashboard under **Email Logs** to see if the email was sent
5. Check the recipient's email inbox

## Troubleshooting

### If emails aren't sending:

1. **Check EmailJS Dashboard:**
   - Go to **Email Logs** in EmailJS
   - Look for any error messages
   - Check if the email was attempted

2. **Check Browser Console:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Submit the form
   - Look for any error messages

3. **Common Issues:**
   - Template name mismatch (case-sensitive!)
   - Service not connected to template
   - Missing template variables
   - EmailJS quota exceeded
   - Invalid email service configuration

### If you need to change the template name:

If your template has a different name in EmailJS, update this line in `src/components/LeadMagnetForm.tsx`:

```typescript
await emailjs.send(
  'service_u460dtm',
  'YOUR_TEMPLATE_NAME_HERE', // Change this to match your EmailJS template name
  templateParams,
  'qq3QK0zGBYaHNI2DW'
);
```

## Current Code Location

The EmailJS integration is in:
- **File:** `src/components/LeadMagnetForm.tsx`
- **Function:** `handleSubmit`
- **Lines:** 31-36

The code is already set up and ready to work once your EmailJS template name matches!


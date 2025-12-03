# Verify EmailJS Template Setup

## Quick Verification Steps

### Step 1: Check Template Exists

1. Go to https://dashboard.emailjs.com/
2. Click **Email Templates**
3. Look for template `template_rwwf15i`
4. If it doesn't exist, you need to create it or use a different template ID

### Step 2: Verify Template is Connected to Service

1. Open template `template_rwwf15i`
2. Check that it's connected to service `service_u460dtm`
3. If not connected, you may need to:
   - Create a new template
   - Or connect the existing template to the service

### Step 3: Check Template Variables

Make sure your template can accept these variables:
- `{{email}}` - Required (used in "To Email" field)
- `{{phone}}` - Optional
- `{{restaurant_name}}` - Optional (for spin wheel)

### Step 4: Test the Template

1. In EmailJS, click **"Test It"** button on your template
2. Fill in test values:
   - Email: `test@example.com`
   - Phone: `1234567890`
   - Restaurant Name: `Test Restaurant`
3. Click send
4. If test works, the template is fine
5. If test fails, fix the template first

## If Template Doesn't Exist

If `template_rwwf15i` doesn't exist, you have two options:

### Option 1: Create New Template

1. Create a new template in EmailJS
2. Copy the content from `EMAILJS_LEAD_MAGNET_TEMPLATE.md`
3. Make sure to include `{{restaurant_name}}` variable
4. Connect it to service `service_u460dtm`
5. Copy the new Template ID
6. Share it with me and I'll update the code

### Option 2: Use Existing Template

1. Find an existing template that works
2. Share the Template ID with me
3. I'll update the code to use it

## Current Template IDs in Use

- **Homepage Lead Magnet**: `template_rwwf15i`
- **Spin Wheel**: `template_rwwf15i` (same as homepage)
- **Checkout Confirmation**: `template_1rbwvvd`
- **Partner Application**: `template_8sfrufk`

## Need Help?

Please check your EmailJS dashboard and tell me:
1. Does template `template_rwwf15i` exist?
2. Is it connected to service `service_u460dtm`?
3. What Template ID should we use instead?


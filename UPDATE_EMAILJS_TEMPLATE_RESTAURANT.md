# How to Update Your EmailJS Template to Include Restaurant Name

## Current Status

✅ The code is already sending `restaurant_name` to EmailJS  
✅ The code is already tracking `restaurant_name` to Google Sheets  
❌ Your EmailJS template needs to be updated to display the restaurant name

## Step-by-Step: Update Your EmailJS Template

### Step 1: Open Your Template

1. Go to https://dashboard.emailjs.com/
2. Click **Email Templates**
3. Find and open template `template_rwwf15i` (the one used for spin wheel)

### Step 2: Update the Email Content

In your template, find this section (around line 94-101):

**BEFORE:**
```
<p>We will text you 1 coupon for Free Wings at one of our participating restaurants. Keep an eye on your phone - it should arrive shortly!</p>
```

**AFTER:**
```
{{#if restaurant_name}}
<div style="background: #fff3cd; border-left: 4px solid #ff6b35; padding: 15px; margin: 20px 0; border-radius: 5px;">
  <p style="margin: 0; font-size: 18px; font-weight: bold; color: #333;">
    🎉 Congratulations! You won a free coupon at:
  </p>
  <p style="margin: 10px 0 0 0; font-size: 24px; font-weight: bold; color: #ff6b35;">
    {{restaurant_name}}
  </p>
</div>
{{/if}}

<p>We will text you 1 coupon for Free Wings at {{#if restaurant_name}}{{restaurant_name}}{{else}}one of our participating restaurants{{/if}}. Keep an eye on your phone - it should arrive shortly!</p>
```

### Step 3: Update the "Here's How to Use Your Coupon" Section

Find this section (around line 106):

**BEFORE:**
```
<li>We will text you 1 coupon for Free Wings at one of our participating restaurants.</li>
```

**AFTER:**
```
<li>We will text you 1 coupon for Free Wings at {{#if restaurant_name}}{{restaurant_name}}{{else}}one of our participating restaurants{{/if}}.</li>
```

### Step 4: Save the Template

1. Click **Save** in the top right
2. The template is now updated!

## What This Does

- **If restaurant_name exists** (spin wheel): Shows a highlighted box with the restaurant name
- **If restaurant_name is empty** (homepage form): Shows generic text
- The template works for both scenarios

## Testing

1. Submit the spin wheel form on your website
2. Check the email you receive
3. You should see: "🎉 Congratulations! You won a free coupon at: [Restaurant Name]"

## Google Sheets Tracking

The restaurant name is **already being tracked** to Google Sheets in the "Restaurant Name" column. You should see it in your sheet after each spin wheel submission.

## Full Updated Template Section

Here's the complete updated section you can copy/paste:

```html
<p><strong>Your free coupon is on the way!</strong></p>

{{#if restaurant_name}}
<div style="background: #fff3cd; border-left: 4px solid #ff6b35; padding: 15px; margin: 20px 0; border-radius: 5px;">
  <p style="margin: 0; font-size: 18px; font-weight: bold; color: #333;">
    🎉 Congratulations! You won a free coupon at:
  </p>
  <p style="margin: 10px 0 0 0; font-size: 24px; font-weight: bold; color: #ff6b35;">
    {{restaurant_name}}
  </p>
</div>
{{/if}}

<p>We will text you 1 coupon for Free Wings at {{#if restaurant_name}}{{restaurant_name}}{{else}}one of our participating restaurants{{/if}}. Keep an eye on your phone - it should arrive shortly!</p>

<div class="coupon-box">
  <h2 style="margin-top: 0; color: #333;">Here's How to Use Your Coupon:</h2>
  <ul style="text-align: left; display: inline-block; margin: 15px 0;">
    <li>We will text you 1 coupon for Free Wings at {{#if restaurant_name}}{{restaurant_name}}{{else}}one of our participating restaurants{{/if}}.</li>
    <li>Present this coupon which is valid for the month of January.</li>
    <li>If you want more great deals sign up for the full version of BiteBook and get deals at over 25 restaurants.</li>
  </ul>
</div>
```


# EmailJS Template - Include Coupon in Email Body

## Problem
HTML attachments don't render properly in email clients. The solution is to include the coupon HTML directly in the email body.

## Solution
Pass the coupon HTML as a template variable (`{{coupon_html}}`) and include it in your EmailJS template.

## Update Your EmailJS Template

### Step 1: Open Your Template
1. Go to https://dashboard.emailjs.com/
2. Open template `template_db2m6o7`
3. Go to the **Content** tab

### Step 2: Add Coupon HTML Variable
In your email template, add this where you want the coupon to appear:

```html
{{#if coupon_html}}
{{{coupon_html}}}
{{/if}}
```

**Important:** Use `{{{coupon_html}}}` (triple braces) instead of `{{coupon_html}}` (double braces). This tells EmailJS to render the HTML instead of escaping it.

### Step 3: Full Template Example

Here's where to place it in your existing template:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border-radius: 0 0 10px 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎉 Your Free Coupon is On the Way!</h1>
  </div>
  
  <div class="content">
    <p>Hi there!</p>
    
    <p>Thank you for signing up with BiteBook! We're excited to have you join our community of food lovers in the New Haven area.</p>
    
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
    
    <p><strong>Your coupon code: {{coupon_code}}</strong></p>
    
    <!-- COUPON HTML GOES HERE -->
    {{#if coupon_html}}
    <div style="margin: 30px 0;">
      {{{coupon_html}}}
    </div>
    {{/if}}
    
    <p><strong>Special Offer Just For You!</strong></p>
    
    <p>We have a special offer for you. Sign up now and get the full book for only <strong style="color: #ff6b35; font-size: 20px;">$19.99</strong>. Discounted from the standard price of $29.99!</p>
    
    <div style="text-align: center;">
      <a href="https://getbitebook.com/checkout?coupon=BITEBOOKNH50" style="display: inline-block; background: #ff6b35; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">
        Get Full BiteBook - $19.99 (Save $10!)
      </a>
    </div>
    
    <p style="margin-top: 30px;">Questions? Reply to this email or contact us at <a href="mailto:info@getbitebook.com">info@getbitebook.com</a></p>
    
    <p>Happy eating!<br>
    The BiteBook Team</p>
  </div>
</body>
</html>
```

## Template Variables Available

- `{{email}}` - Customer email
- `{{phone}}` - Customer phone
- `{{restaurant_name}}` - Restaurant they won
- `{{coupon_code}}` - Unique coupon code (e.g., BB-A3F9-240115)
- `{{coupon_html}}` - **NEW** - Full coupon HTML (use `{{{coupon_html}}}` to render HTML)

## Testing

1. Save your template
2. Submit a test spin wheel entry
3. Check the email - the coupon should appear formatted in the email body
4. Users can print the email to use the coupon

## Benefits

- ✅ Coupon displays immediately in email
- ✅ No attachment issues
- ✅ Works in all email clients
- ✅ Users can print directly from email
- ✅ Mobile-friendly

## Notes

- The coupon HTML includes all styling inline, so it will render properly in email clients
- The coupon is fully self-contained and doesn't require external resources
- Users can print the email to bring the coupon to the restaurant


# EmailJS Lead Magnet Template Setup

## Template Details

**Template Name:** `template_lead_magnet`  
**Service ID:** `service_u460dtm`  
**Public Key:** `qq3QK0zGBYaHNI2DW`

## Template Content

Copy this into your EmailJS template editor:

### Subject Line:
```
Your Free Coupon from BiteBook is On the Way! 🎉
```

### Email Body (HTML):
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
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border-radius: 0 0 10px 10px;
    }
    .coupon-box {
      background: white;
      border: 3px dashed #ff6b35;
      padding: 25px;
      margin: 20px 0;
      text-align: center;
      border-radius: 10px;
    }
    .coupon-code {
      font-size: 32px;
      font-weight: bold;
      color: #ff6b35;
      letter-spacing: 3px;
      margin: 15px 0;
    }
    .button {
      display: inline-block;
      background: #ff6b35;
      color: white;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #666;
      font-size: 12px;
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
    
    <p><strong>Your free coupon is on the way!</strong></p>
    
    <p>We will text you 1 coupon for Free Wings at one of our participating restaurants. Keep an eye on your phone - it should arrive shortly!</p>
    
    <div class="coupon-box">
      <h2 style="margin-top: 0; color: #333;">Here's How to Use Your Coupon:</h2>
      <ul style="text-align: left; display: inline-block; margin: 15px 0;">
        <li>We will text you 1 coupon for Free Wings at one of our participating restaurants.</li>
        <li>Present this coupon which is valid for the month of January.</li>
        <li>If you want more great deals sign up for the full version of BiteBook and get deals at over 25 restaurants.</li>
      </ul>
    </div>
    
    <p><strong>Special Offer Just For You!</strong></p>
    
    <p>We have a special offer for you. Sign up now and get the full book for only <strong style="color: #ff6b35; font-size: 20px;">$19.99</strong>. Discounted from the standard price of $29.99!</p>
    
    <div style="text-align: center;">
      <a href="https://getbitebook.com/checkout" class="button">Get Full BiteBook - $19.99 (Save $10!)</a>
    </div>
    
    <p style="margin-top: 30px;">Questions? Reply to this email or contact us at <a href="mailto:info@getbitebook.com">info@getbitebook.com</a></p>
    
    <p>Happy eating!<br>
    The BiteBook Team</p>
  </div>
  
  <div class="footer">
    <p>BiteBook - Local Restaurant Coupon Books<br>
    New Haven Area<br>
    <a href="https://getbitebook.com">getbitebook.com</a></p>
    <p style="margin-top: 10px;">
      You're receiving this because you signed up for a free coupon at getbitebook.com
    </p>
  </div>
</body>
</html>
```

### Plain Text Version (for email clients that don't support HTML):
```
🎉 Your Free Coupon is On the Way!

Hi there!

Thank you for signing up with BiteBook! We're excited to have you join our community of food lovers in the New Haven area.

Your free coupon is on the way!

We will text you 1 coupon for Free Wings at one of our participating restaurants. Keep an eye on your phone - it should arrive shortly!

Here's How to Use Your Coupon:
- We will text you 1 coupon for Free Wings at one of our participating restaurants.
- Present this coupon which is valid for the month of January.
- If you want more great deals sign up for the full version of BiteBook and get deals at over 25 restaurants.

Special Offer Just For You!

We have a special offer for you. Sign up now and get the full book for only $19.99. Discounted from the standard price of $29.99!

Get your full BiteBook here: https://getbitebook.com/checkout

Questions? Contact us at info@getbitebook.com

Happy eating!
The BiteBook Team

---
BiteBook - Local Restaurant Coupon Books
New Haven Area
getbitebook.com

You're receiving this because you signed up for a free coupon at getbitebook.com
```

## Template Variables

Make sure these variables are available in your template:
- `{{email}}` - The user's email address
- `{{phone}}` - The user's phone number
- `{{from_name}}` - Will be "BiteBook"
- `{{message}}` - Thank you message

## Setup Instructions

1. Go to https://dashboard.emailjs.com/
2. Navigate to **Email Templates**
3. Click **Create New Template**
4. Name it: `template_lead_magnet`
5. Paste the HTML content above
6. Set the subject line
7. Save the template
8. Make sure it's connected to service `service_u460dtm`

## Testing

After creating the template, test it by submitting the lead magnet form on your website. The email should be sent to the email address entered in the form.

## Notes

- The coupon code `FREEBITE2025` is a placeholder - you may want to generate unique codes for each lead
- You can customize the coupon code, discount amount, and participating restaurant list
- Consider adding an expiration date to the coupon
- You may want to track which coupon codes have been used


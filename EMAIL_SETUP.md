New # Email Setup Guide for BiteBook

## 📧 Setting Up EmailJS for Form Submissions

Your forms are now configured to send emails to `info@getbitebook.com`. Here's how to complete the setup:

### Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://emailjs.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Connect Your Email
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (since you have Google Workspace)
4. Connect your `info@getbitebook.com` account
5. Note down your **Service ID**

### Step 3: Create Email Templates
1. Go to "Email Templates"
2. Create a new template for **Partner Applications**:
   - Template ID: `partner_application`
   - Subject: "New Restaurant Partner Application"
   - Body: Include all form fields (restaurant name, contact info, etc.)

3. Create a new template for **Checkout Orders**:
   - Template ID: `checkout_order`
   - Subject: "New BiteBook Order"
   - Body: Include customer info, subscription status, total price

### Step 4: Get Your Keys
1. Go to "Account" → "General"
2. Note your **Public Key**
3. Note your **Service ID** (from step 2)
4. Note your **Template IDs** (from step 3)

### Step 5: Update Your Code
Replace these placeholders in your code:
- `YOUR_SERVICE_ID` → Your actual service ID
- `YOUR_TEMPLATE_ID` → Your actual template ID
- `YOUR_PUBLIC_KEY` → Your actual public key

### Step 6: Test Your Forms
1. Deploy your changes to Vercel
2. Test the partner application form
3. Test the checkout form
4. Check that emails arrive at `info@getbitebook.com`

## 🎯 What You'll Receive

### Partner Application Emails:
- Restaurant name and contact details
- Business information (seating, years in business)
- Why they want to partner with BiteBook
- Preferred contact method

### Checkout Order Emails:
- Customer name and email
- Subscription status (one-time or monthly)
- Total price
- Order details

## 📱 Alternative: Simple Contact Form

If you want a simpler setup, you can also use:
- **Netlify Forms** (if switching to Netlify)
- **Formspree** (form handling service)
- **Typeform** (embedded forms)

## ✅ Next Steps After Setup

1. **Test all forms** work correctly
2. **Set up email filters** in Gmail to organize submissions
3. **Create email templates** for responses to customers
4. **Set up notifications** for new submissions

Your forms will now send professional emails to `info@getbitebook.com` with all the submission details!

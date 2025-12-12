# How to View Google Analytics 4 (GA4) Data

## What is GA4?

**Google Analytics 4 (GA4)** is Google's analytics platform that tracks:
- **Page views** - Which pages visitors view
- **User behavior** - How visitors interact with your site
- **Events** - Button clicks, form submissions, purchases, etc.
- **Conversions** - When visitors complete goals (like purchases)
- **User demographics** - Age, gender, location, device type
- **Traffic sources** - Where visitors come from (Google, Facebook, direct, etc.)

## Your GA4 Property

**Measurement ID:** `G-RKNBVY764P`

This is already set up and tracking on your website!

## How to Access GA4

### Step 1: Go to Google Analytics
1. Visit: **https://analytics.google.com/**
2. Sign in with your Google account (the one that has access to the GA4 property)

### Step 2: Select Your Property
1. If you see multiple properties, click the dropdown at the top
2. Select the property with ID **G-RKNBVY764P** or named "BiteBook"

### Step 3: Navigate the Dashboard

#### Main Reports (Left Sidebar):

**1. Reports → Realtime**
- See visitors on your site RIGHT NOW
- Live page views, events, user locations
- Great for testing if tracking is working

**2. Reports → Engagement → Events**
- See all events being tracked:
  - `page_view` - Page views
  - `button_click` - Button clicks
  - `form_start` - Form interactions
  - `form_submit` - Form submissions
  - `scroll` - Scroll depth
  - `purchase` - Purchases
  - `funnel_step` - Conversion funnel steps

**3. Reports → Engagement → Conversions**
- See which events are marked as conversions
- Track your key goals (purchases, leads, etc.)

**4. Reports → Monetization → Ecommerce purchases**
- See purchase data:
  - Revenue
  - Transaction IDs
  - Items purchased
  - Subscription details

**5. Explore → Funnel exploration**
- Create custom funnels to see where users drop off
- Example funnel:
  1. Homepage view
  2. Landing page view
  3. Spin wheel view
  4. Checkout initiated
  5. Checkout view
  6. Purchase complete

## Key Metrics to Monitor

### 1. **Traffic Overview**
- **Location:** Reports → Acquisition → Traffic acquisition
- **What it shows:** How many visitors, where they come from

### 2. **Page Performance**
- **Location:** Reports → Engagement → Pages and screens
- **What it shows:** Which pages get the most views

### 3. **Event Tracking**
- **Location:** Reports → Engagement → Events
- **What it shows:** All button clicks, form submissions, scroll depth, etc.

### 4. **Conversions**
- **Location:** Reports → Engagement → Conversions
- **What it shows:** How many purchases, leads, etc.

### 5. **User Journey**
- **Location:** Explore → Path exploration
- **What it shows:** How users navigate through your site

## Testing if Tracking Works

### Quick Test:
1. Go to **Reports → Realtime**
2. Visit your website in another browser tab
3. Click around, submit a form, or make a purchase
4. You should see events appear in real-time (within 30 seconds)

### Check Specific Events:
1. Go to **Reports → Engagement → Events**
2. Search for event names like:
   - `button_click`
   - `form_submit`
   - `purchase`
   - `funnel_step`

## Setting Up Custom Reports

### Create a Conversion Funnel:
1. Go to **Explore** (left sidebar)
2. Click **+ New exploration**
3. Select **Funnel exploration**
4. Add steps:
   - Step 1: `funnel_step` = `homepage_view`
   - Step 2: `funnel_step` = `landing_view`
   - Step 3: `funnel_step` = `spin_wheel_view`
   - Step 4: `funnel_step` = `checkout_initiated`
   - Step 5: `funnel_step` = `checkout_view`
   - Step 6: `funnel_step` = `purchase_complete`

### Create a Revenue Report:
1. Go to **Explore** → **+ New exploration**
2. Select **Free form**
3. Add dimensions: Date, Page title
4. Add metrics: Purchase revenue, Transactions, Event count

## Common Questions

### Q: I don't see any data?
**A:** 
- Data can take 24-48 hours to appear in standard reports
- Check **Realtime** reports for immediate data
- Make sure you're viewing the correct property (G-RKNBVY764P)

### Q: How do I see purchase data?
**A:**
- Go to **Reports → Monetization → Ecommerce purchases**
- Or **Reports → Engagement → Events** → Search for `purchase`

### Q: How do I see button clicks?
**A:**
- Go to **Reports → Engagement → Events**
- Search for `button_click`
- Click on it to see details (which buttons, where, etc.)

### Q: How do I see form submissions?
**A:**
- Go to **Reports → Engagement → Events**
- Search for `form_submit`
- Filter by `form_name` to see specific forms

### Q: Can I export data?
**A:**
- Yes! Click the **Export** button (top right of any report)
- Choose PDF, Google Sheets, or CSV format

## Mobile App

Download the **Google Analytics** app:
- iOS: App Store
- Android: Google Play Store
- View your data on the go!

## Need Help?

- **GA4 Help Center:** https://support.google.com/analytics
- **GA4 Academy:** Free courses at https://analytics.google.com/analytics/academy/

## Your Current Tracking Setup

✅ **Page views** - All pages tracked
✅ **Button clicks** - All CTA buttons tracked
✅ **Form interactions** - Form starts and submissions tracked
✅ **Scroll depth** - 25%, 50%, 75%, 100% tracked
✅ **Time on page** - Time spent tracked
✅ **Purchases** - Full e-commerce tracking with transaction IDs
✅ **Conversion funnel** - 6-step funnel tracked
✅ **User engagement** - Comprehensive engagement metrics

All of this data is available in your GA4 dashboard!


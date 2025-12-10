# Checkout Page - Subscription Model Draft

## Proposed Changes

### 1. Remove Subscription Toggle
- **Current**: Users can toggle between one-time purchase and subscription
- **New**: Always subscription (remove toggle entirely)

### 2. Updated Header/Title
**Current**: "Your BiteBook Order"
**New**: "Subscribe to BiteBook Monthly"

### 3. Updated Product Description

**Current Text:**
> "With over 30 local restaurants participating you'll be getting hundreds of dollars in value for less than the cost of another parking ticket. We've partnered with some of the best establishments in the area to put together an incredible deal book for this January. Share with your friends and family or keep all the deals to yourself. Whatever you decide, January is for wing lovers. Checkout now and make some memories with BiteBook."

**Proposed New Text:**
> "Join BiteBook and receive a new coupon book every month featuring over 25 local restaurants. Each month brings a new theme - wings, tacos, pizza, burgers, and more. You'll get hundreds of dollars in value every month for less than the cost of a single meal out. Cancel anytime - no commitment required."

### 4. Subscription Information Box

**New Section to Add:**
```
┌─────────────────────────────────────────┐
│ 📅 Monthly Subscription                 │
│                                         │
│ • New coupon book delivered monthly     │
│ • Billed automatically each month       │
│ • Cancel anytime - no commitment        │
│ • Skip or pause anytime                 │
│                                         │
│ Your first month: $20.99                │
│ Then: $20.99/month (billed monthly)     │
└─────────────────────────────────────────┘
```

### 5. Updated Pricing Display

**Current**: Shows one-time price
**New**: 
- "First Month: $20.99"
- "Then: $20.99/month"
- "Billed monthly • Cancel anytime"

### 6. Updated Success Message

**Current**: "Thank you for your order! We'll process your BiteBook and send it to your email within 24 hours."

**New**: "Welcome to BiteBook! Your subscription is active. You'll receive your first coupon book within 24 hours, and a new book will be delivered to your email each month. You can cancel anytime from your account."

### 7. Updated Terms Checkbox

**Current**: "I agree to the Terms of Service and Privacy Policy"

**New**: "By subscribing, I agree to the Terms of Service and Privacy Policy. I understand that I will be charged $20.99/month (or discounted price if coupon applied) and can cancel anytime."

### 8. Billing Information Section

**New Section:**
```
Billing Information:
• You'll be charged $20.99 today for your first month
• Future charges will occur on the same date each month
• You'll receive an email reminder 3 days before each charge
• Cancel anytime - no fees or penalties
• Access your account to manage subscription
```

## Language Options

### Option A: Friendly & Casual
- "Join the BiteBook family"
- "Get a new book every month"
- "Cancel anytime, no questions asked"

### Option B: Professional & Clear
- "Subscribe to BiteBook Monthly"
- "Recurring monthly subscription"
- "Cancel your subscription at any time"

### Option C: Value-Focused
- "Save 30% with monthly subscription"
- "New deals every month"
- "Cancel anytime - no commitment"

## Questions for You

1. **Default Price**: Should it default to $20.99 (subscription price) or keep current pricing logic?
2. **Billing Frequency**: Monthly billing only, or offer quarterly/annual options?
3. **Tone**: Which language style do you prefer (A, B, or C above)?
4. **Cancellation**: How should users cancel? (Link to account page, email, etc.)
5. **First Month**: Should first month be discounted, or same price as ongoing?

## What I'll Change

1. ✅ Remove subscription toggle
2. ✅ Set `isSubscription` to always `true`
3. ✅ Update all text to subscription language
4. ✅ Add subscription information box
5. ✅ Update pricing display
6. ✅ Update success message
7. ✅ Update terms checkbox
8. ✅ Add billing information section

## Review Before Publishing

I'll show you the exact code changes before pushing to production. You can review:
- All text changes
- Layout changes
- Pricing logic
- Any other adjustments needed

Ready for me to draft the code changes?


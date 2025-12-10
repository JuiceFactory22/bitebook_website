# Subscription Checkout - Proposed Changes Preview

## Summary of Changes

This document shows exactly what will change on the checkout page to make it subscription-only.

---

## 1. Remove Subscription Toggle

**CURRENT:**
```
┌─────────────────────────────────────┐
│ Subscribe & Save 30%                │
│ Get your BiteBook delivered monthly │
│                    [Toggle Switch]  │
└─────────────────────────────────────┘
```

**NEW:**
- Remove this entire section
- Subscription is now the only option

---

## 2. Update Page Header

**CURRENT:**
```
"Your BiteBook Order"
```

**NEW:**
```
"Subscribe to BiteBook Monthly"
```

---

## 3. Update Product Title

**CURRENT:**
```
"BiteBook Monthly Coupon Book"
```

**NEW:**
```
"BiteBook Monthly Subscription"
```

---

## 4. Update Product Description

**CURRENT:**
> "With over 30 local restaurants participating you'll be getting hundreds of dollars in value for less than the cost of another parking ticket. We've partnered with some of the best establishments in the area to put together an incredible deal book for this January. Share with your friends and family or keep all the deals to yourself. Whatever you decide, January is for wing lovers. Checkout now and make some memories with BiteBook."

**NEW:**
> "Join BiteBook and receive a new coupon book every month featuring over 25 local restaurants. Each month brings a new theme - wings, tacos, pizza, burgers, and more. You'll get hundreds of dollars in value every month for less than the cost of a single meal out. Cancel anytime - no commitment required."

---

## 5. Add Subscription Information Box

**NEW SECTION TO ADD:**
```
┌─────────────────────────────────────────────┐
│ 📅 Monthly Subscription                      │
│                                              │
│ • New coupon book delivered monthly          │
│ • Billed automatically each month            │
│ • Cancel anytime - no commitment             │
│ • Skip or pause anytime                      │
│                                              │
│ First Month: $20.99                          │
│ Then: $20.99/month (billed monthly)           │
└─────────────────────────────────────────────┘
```

---

## 6. Update Pricing Display

**CURRENT:**
```
$29.99
$300 value (struck through)
```

**NEW:**
```
$20.99/month
First month: $20.99
Then: $20.99/month
Billed monthly • Cancel anytime
$300 value (struck through)
```

---

## 7. Update Success Message

**CURRENT:**
> "Thank you for your order! We'll process your BiteBook and send it to your email within 24 hours."

**NEW (Already Updated):**
> "Welcome to BiteBook! Your subscription is active. You'll receive your first coupon book within 24 hours prior to the start of the event, and a new book will be delivered to your email each month. You can cancel anytime from your account."

---

## 8. Update "Complete Your Purchase" Section

**CURRENT:**
```
"Complete Your Purchase"
```

**NEW:**
```
"Complete Your Subscription"
```

---

## 9. Update Terms Checkbox

**CURRENT:**
```
☐ I agree to the Terms of Service and Privacy Policy
```

**NEW:**
```
☐ By subscribing, I agree to the Terms of Service and Privacy Policy. 
  I understand that I will be charged $20.99/month (or discounted price 
  if coupon applied) and can cancel anytime.
```

---

## 10. Add Billing Information Section

**NEW SECTION (Before payment form):**
```
┌─────────────────────────────────────────────┐
│ Billing Information                          │
│                                              │
│ • You'll be charged $20.99 today for your    │
│   first month                                │
│ • Future charges will occur on the same date │
│   each month                                 │
│ • You'll receive an email reminder 3 days   │
│   before each charge                         │
│ • Cancel anytime - no fees or penalties     │
│ • Access your account to manage subscription│
└─────────────────────────────────────────────┘
```

---

## 11. Update "What's Included" Section

**CURRENT:**
```
✓ 30+ restaurant coupons
✓ 30-day validity
✓ Digital coupon access
```

**NEW:**
```
✓ New coupon book every month
✓ 30+ restaurant coupons per month
✓ 30-day validity per book
✓ Digital coupon access
✓ Cancel anytime
✓ No commitment required
```

---

## 12. Code Changes

### A. Remove Subscription Toggle State
- Set `isSubscription` to always be `true`
- Remove the toggle UI element
- Remove subscription toggle logic

### B. Update Default Pricing
- Default to subscription price ($20.99)
- Keep coupon code functionality
- Update price display logic

### C. Update All Text References
- Change "order" to "subscription"
- Change "purchase" to "subscribe"
- Update all messaging to subscription language

---

## Visual Layout Changes

### Before:
```
[Product Details]
[Subscription Toggle] ← REMOVE THIS
[Coupon Code]
[What's Included]
[Payment Form]
```

### After:
```
[Product Details - Subscription Focused]
[Subscription Information Box] ← NEW
[Coupon Code]
[What's Included - Updated]
[Billing Information] ← NEW
[Payment Form]
```

---

## Questions Before Implementation

1. **Default Price**: Should it always show $20.99, or keep coupon logic (WINGS20NH = $19.99)?

2. **Subscription Box**: Should the subscription information box be:
   - Prominent (large, colored background)
   - Subtle (small, simple border)
   - Inline with product details

3. **Billing Details**: How detailed should the billing information be?
   - Simple: "Billed monthly • Cancel anytime"
   - Detailed: Full billing schedule explanation

4. **Cancel Link**: Where should "cancel anytime" link to?
   - Account management page (if exists)
   - Email instructions
   - Just text (no link yet)

---

## Ready to Review

Once you approve, I'll implement all these changes and show you the final code before pushing live.

**What would you like me to adjust before implementing?**


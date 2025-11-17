# Restaurant Logos Section - Implementation Guide

## Component Created
✅ Created: `src/components/RestaurantLogosCarousel.tsx`

## To Add to Landing Page

Add this section to `/src/app/landing-new_haven/page.tsx` after the "How It Works" copy section:

```tsx
import RestaurantLogosCarousel from '@/components/RestaurantLogosCarousel';

// Add this section in your JSX, after the "How It Works Copy" section:

{/* Some of our Participating Restaurants */}
<section className="bg-gray-50 py-12 md:py-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
        Some of our Participating Restaurants
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        We partner with the best restaurants in the New Haven area to bring you incredible deals
      </p>
    </div>
    <RestaurantLogosCarousel />
  </div>
</section>
```

## Logo Files Location
✅ The logos are already in place at:
`public/Images/Logos/New Haven/`

The component includes all 12 restaurants:
- Archie Moores
- Blue Orchid
- Castle Black Rock
- Capotorto's Apizza Center
- Gaetano's Tavern
- Jordan's Hot Dogs
- Jroos Restaurant
- Outriggers
- Prime 16
- Ricky D's Rib Shack
- The Breakwall
- Transilvania

## Next Steps
1. Open `/src/app/landing-new_haven/page.tsx`
2. Add the import at the top: `import RestaurantLogosCarousel from '@/components/RestaurantLogosCarousel';`
3. Add the section JSX after the "How It Works Copy" section (the section with id="how-it-works-copy")


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
The logos should be placed in:
`public/images/logos/new-haven/`

With these filenames:
- blue-orchid-logo.jpeg
- capotortos-logo.jpeg
- gaetanos-tavern-logo.jpeg
- jordans-hot-dogs-logo.jpeg
- jroos-restaurant-logo.jpeg
- outriggers-logo.jpeg
- prime-16-logo.jpeg
- ricky-ds-logo.jpeg
- the-breakwall-logo.jpeg
- transilvania-logo.jpeg


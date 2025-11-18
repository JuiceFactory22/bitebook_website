# Restaurant Logos File Structure Guide

## Proper File Structure for Next.js

In Next.js, all static assets (images, logos, etc.) should be placed in the `public/` directory. Files in `public/` are served from the root URL path.

## Current Structure

```
public/
└── Images/
    └── Logos/
        └── New Haven/
            ├── archie-moores-nh-logo.jpeg
            ├── blue-orchid-logo.jpeg
            ├── castle-black-rock.jpeg
            ├── capotortos-logo.jpeg
            ├── gaetanos-tavern-logo.jpeg
            ├── jordans-hot-dogs-logo.jpeg
            ├── jroos-restaurant-logo.jpeg
            ├── outriggers-logo.jpeg
            ├── prime-16-logo.jpeg
            ├── ricky-ds-logo.jpeg
            ├── the-breakwall-logo.jpeg
            └── transilvania-logo.jpeg
```

## How Paths Work

- **File location**: `public/Images/Logos/New Haven/restaurant-logo.jpeg`
- **URL path**: `/Images/Logos/New Haven/restaurant-logo.jpeg`
- **In component**: Use `/Images/Logos/New Haven/restaurant-logo.jpeg`

## Best Practices

### 1. Directory Organization
```
public/
└── Images/
    └── Logos/
        ├── New Haven/          # Location-specific folder
        ├── Boston/              # Future locations
        ├── Hartford/            # Future locations
        └── [City Name]/         # Add more cities as needed
```

### 2. File Naming Conventions
- Use lowercase with hyphens: `restaurant-name-logo.jpeg`
- Be consistent: `[restaurant-name]-logo.[extension]`
- Include location if needed: `restaurant-name-[city]-logo.jpeg`
- Examples:
  - ✅ `archie-moores-nh-logo.jpeg`
  - ✅ `blue-orchid-logo.jpeg`
  - ❌ `Archie Moores Logo.jpg` (spaces, capitals)
  - ❌ `blue_orchid_logo.png` (underscores)

### 3. Image Formats
- **JPEG** (`.jpeg` or `.jpg`) - Best for photos/logos with many colors
- **PNG** (`.png`) - Best for logos with transparency
- **WebP** (`.webp`) - Best for web (smaller file size, good quality)
- **SVG** (`.svg`) - Best for simple vector logos

### 4. Image Optimization
- **Recommended size**: 200-400px width for logos in carousel
- **File size**: Keep under 100KB per logo when possible
- **Aspect ratio**: Maintain consistent aspect ratios (e.g., 4:3 or 16:9)
- **Background**: Use transparent backgrounds (PNG) or white backgrounds

## Adding New Logos

1. **Save the logo file** with a descriptive name:
   ```
   restaurant-name-logo.jpeg
   ```

2. **Place it in the appropriate location folder**:
   ```
   public/Images/Logos/New Haven/restaurant-name-logo.jpeg
   ```

3. **Add it to the component** (`src/components/RestaurantLogosCarousel.tsx`):
   ```typescript
   const restaurantLogos = [
     { 
       name: 'Restaurant Name', 
       image: '/Images/Logos/New Haven/restaurant-name-logo.jpeg' 
     },
     // ... other restaurants
   ];
   ```

## Multi-Location Support

If you expand to other cities, create separate folders:

```
public/Images/Logos/
├── New Haven/
│   ├── restaurant-1-logo.jpeg
│   └── restaurant-2-logo.jpeg
├── Boston/
│   ├── restaurant-1-logo.jpeg
│   └── restaurant-2-logo.jpeg
└── Hartford/
    ├── restaurant-1-logo.jpeg
    └── restaurant-2-logo.jpeg
```

Then update the component to use the appropriate location folder based on the page or context.

## Current Implementation

The `RestaurantLogosCarousel` component currently references:
- Path: `/Images/Logos/New Haven/[restaurant]-logo.jpeg`
- Location: `public/Images/Logos/New Haven/`

Make sure all logo files are placed in: `public/Images/Logos/New Haven/`


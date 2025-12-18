// Shared restaurant data for carousel and spin wheel
export interface Restaurant {
  name: string;
  image: string;
  promotion?: string; // Optional: restaurant-specific promotion description
}

export const restaurants: Restaurant[] = [
  { name: 'Orange Ale House', image: '/images/Logos/New Haven/orange-ale-house-logo.jpeg' },
  { name: 'Pizza at the Brick Oven', image: '/images/Logos/New Haven/pizza-at-the-brick-oven-logo.jpeg' },
  { name: 'Hop Haus Craft Eatery', image: '/images/Logos/New Haven/hop-haus-craft-eatery-logo.jpeg' },
  { name: 'Heffer', image: '/images/Logos/New Haven/heffer-logo.jpeg' },
  { name: 'Giulios Apizza', image: '/images/Logos/New Haven/giulios-apizza-logo.jpeg' },
  { name: 'Sly Fox Tavern', image: '/images/Logos/New Haven/sly-fox-tavern.jpeg' },
  { name: 'The Landing at Five Twenty', image: '/images/Logos/New Haven/the-landing-at-five-twenty.jpeg' },
  { name: 'Amity Brick Oven', image: '/images/Logos/New Haven/amity-brick-oven-pizza-logo.jpeg' },
  { name: 'Prime 16', image: '/images/Logos/New Haven/Prime 16 logo.jpeg' },
  { name: 'Transilvania', image: '/images/Logos/New Haven/transilvania-logo.jpeg' },
  { name: 'Naked Wings', image: '/images/Logos/New Haven/naked-wings-logo.jpeg' },
  { name: "Ricky D's Rib Shack", image: '/images/Logos/New Haven/Ricky Ds logo.jpeg' },
  { name: "Jack's Bar & Steakhouse", image: '/images/Logos/New Haven/jacks-bar-steakhouse-logo.jpeg' },
  { name: 'Southern Wings Express', image: '/images/Logos/New Haven/southern-wings-express-logo.jpeg' },
  { name: 'The Castle Black Rock', image: '/images/Logos/New Haven/The-Castle-Black-Rock-Logo.jpeg' },
  { name: "Archie Moore's NH", image: '/images/Logos/New Haven/archie-moores.jpeg' },
  { name: "Capotorto's Apizza Center", image: '/images/Logos/New Haven/capotortos logo.jpeg' },
  { name: 'Gaetano's Tavern on Main', image: '/images/Logos/New Haven/gaetanos tavern logo.jpeg' },
  { name: "J Roo's", image: '/images/Logos/New Haven/jroos.jpeg' },
  { name: "Jordan's Hot Dog's & Mac", image: '/images/Logos/New Haven/jordans hot dogs logo.jpeg' },
  { name: 'Blue Orchid Pan Asian Cuisine', image: '/images/Logos/New Haven/blue-orchid-logo.jpeg' },
  { name: "Porky's Cafe", image: '/images/Logos/New Haven/porkys-logo.jpeg' },
  { name: "Delaney's Restaurant & Tap", image: '/images/Logos/New Haven/delaneys-restaurant-nh.jpeg' },
  { name: 'The Breakwall', image: '/images/Logos/New Haven/the breakwall logo.jpeg' },
  { name: 'New West Cafe', image: '/images/Logos/New Haven/new-west-cafe-new-logo.jpeg' },
  { name: 'Pub 67', image: '/images/Logos/New Haven/pub-67-new.jpeg' },
  { name: 'Pianca Pizza', image: '/images/Logos/New Haven/pianca-pizza.jpeg' },
];


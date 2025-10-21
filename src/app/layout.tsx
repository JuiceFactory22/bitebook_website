import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BiteBook - Local Restaurant Coupon Books | Boston Metro Area",
  description: "Discover amazing deals at local restaurants with BiteBook coupon books. $29.99 for over $300 in savings at 30+ Boston area restaurants. Limited monthly themes - Taco, Breakfast, Pizza & Burger months.",
  keywords: "restaurant coupons, Boston restaurants, local dining deals, food coupons, restaurant discounts, Boston metro area dining",
  authors: [{ name: "BiteBook" }],
  creator: "BiteBook",
  publisher: "BiteBook",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bitebook.com',
    title: 'BiteBook - Local Restaurant Coupon Books',
    description: 'Discover amazing deals at local restaurants with BiteBook coupon books. $29.99 for over $300 in savings at 30+ Boston area restaurants.',
    siteName: 'BiteBook',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BiteBook - Local Restaurant Coupon Books',
    description: 'Discover amazing deals at local restaurants with BiteBook coupon books. $29.99 for over $300 in savings at 30+ Boston area restaurants.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BiteBook",
              "description": "Local restaurant coupon book service providing amazing deals at Boston area restaurants",
              "url": "https://bitebook.com",
              "sameAs": [],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Boston",
                "addressRegion": "MA",
                "addressCountry": "US"
              },
              "offers": {
                "@type": "Offer",
                "price": "29.99",
                "priceCurrency": "USD",
                "description": "Monthly restaurant coupon book with over $300 in savings"
              }
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

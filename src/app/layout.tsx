import type { Metadata } from "next";
import Script from "next/script";
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RKNBVY764P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RKNBVY764P');
          `}
        </Script>

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
        
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1557597308925077');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=1557597308925077&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

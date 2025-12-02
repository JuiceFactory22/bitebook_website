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
  title: "BiteBook - Local Restaurant Coupon Books | New Haven Area",
  description: "Discover amazing deals at local restaurants with BiteBook coupon books. $29.99 for over $300 in savings at 30+ local restaurants. Limited monthly themes - Wings, Tacos, Pizza, Burgers & more.",
  keywords: "restaurant coupons, New Haven restaurants, local dining deals, food coupons, restaurant discounts, New Haven area dining, coupon books",
  authors: [{ name: "BiteBook" }],
  creator: "BiteBook",
  publisher: "BiteBook",
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
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
    url: 'https://getbitebook.com',
    title: 'BiteBook - Local Restaurant Coupon Books | New Haven Area',
    description: 'Discover amazing deals at local restaurants with BiteBook coupon books. $29.99 for over $300 in savings at 30+ local restaurants. Limited monthly themes featuring wings, tacos, pizza, burgers and more.',
    siteName: 'BiteBook',
    images: [
      {
        url: '/images/bitebook-logo.png',
        width: 1200,
        height: 630,
        alt: 'BiteBook - Local Restaurant Coupon Books',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BiteBook - Local Restaurant Coupon Books | New Haven Area',
    description: 'Discover amazing deals at local restaurants with BiteBook coupon books. $29.99 for over $300 in savings at 30+ local restaurants. Limited monthly themes featuring wings, tacos, pizza, burgers and more.',
    images: ['/images/bitebook-logo.png'],
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
        {/* Google tag (gtag.js) - Google Ads Conversion Tracking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17738788165"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17738788165');
          `}
        </Script>

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
              "description": "Local restaurant coupon book service providing amazing deals at New Haven area restaurants",
              "url": "https://getbitebook.com",
              "sameAs": [],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "New Haven",
                "addressRegion": "CT",
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
              fbq('init', '2728483774150410', {
                // Advanced matching data - values will be hashed automatically by the pixel using SHA-256
                // Add user data here when available (em: email, ph: phone, etc.)
              });
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=2728483774150410&ev=PageView&noscript=1"
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

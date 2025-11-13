import Link from 'next/link';
import { Metadata } from 'next';
import Script from 'next/script';
import TrackingButton from '@/components/TrackingButton';

export const metadata: Metadata = {
  title: 'Wings Month - BiteBook | Get $300+ in Local Restaurant Deals for $29.99',
  description: 'Love wings for less! Unlock unbeatable Wing Month deals at local favorites. Get $300+ in savings for just $29.99. Digital, mobile-friendly, instant access.',
  keywords: 'wings month, restaurant deals, local restaurant coupons, wing deals, food coupons',
};

export default function LandingBiteBook() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Meta Pixel Code for Landing Page */}
      <Script
        id="meta-pixel-landing"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); 
            fbq('init', '2728483774150410'); 
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
      {/* End Meta Pixel Code */}
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-slate-900">BiteBook</Link>
          <TrackingButton
            href="/checkout"
            value={29.99}
            className="hidden md:inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold bg-yellow-400 hover:bg-yellow-300 text-slate-900 shadow"
          >
            Get Yours Now
          </TrackingButton>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Love <span className="text-orange-600">Wings</span> for Less
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Unlock unbeatable Wing Month deals at local favorites — all in one simple digital BiteBook for just <span className="font-semibold">$29.99</span>.
            </p>
            <div className="mt-6 flex gap-3">
              <TrackingButton
                href="/checkout"
                value={29.99}
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold bg-yellow-400 hover:bg-yellow-300 text-slate-900 shadow"
              >
                Get Yours Now
              </TrackingButton>
              <a href="#how" className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow">
                See How It Works
              </a>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Secure checkout • Instant email confirmation • Limited quantity
            </p>
          </div>

          <div className="relative">
            <img
              src="/images/hero-wings.jpg"
              alt="Saucy wings and beer"
              className="w-full rounded-2xl shadow-lg object-cover aspect-[4/3]"
            />
            {/* Optional decorative gradient */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-transparent to-blue-50" />
          </div>
        </div>
      </section>

      {/* Value Stack */}
      <section className="bg-blue-50">
        <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-4 gap-6">
          {[
            { title: "$300+ in Value", desc: "Big local savings for a single low price." },
            { title: "Digital & Easy", desc: "No physical book. Show on your phone." },
            { title: "Wing Nights Upgraded", desc: "Hot wings, cold beers, easy savings." },
            { title: "Friends Love It", desc: "Perfect for group nights and game days." },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
              <h3 className="font-bold">{b.title}</h3>
              <p className="text-slate-600 mt-1">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-3xl font-extrabold">How It Works</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Order BiteBook", desc: "Check out securely in seconds." },
              { step: "2", title: "Get Your Access", desc: "We'll email your digital access details right away." },
              { step: "3", title: "Redeem & Enjoy", desc: "Show your deals during Wings Month. Easy." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center font-bold">{s.step}</div>
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="text-slate-600 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-3xl font-extrabold">What You Get</h2>
          <div className="mt-6 grid md:grid-cols-4 gap-6">
            {[
              "Over $300 in local restaurant value",
              "Exclusive Wings Month offers",
              "Mobile-friendly redemption",
              "One low price: $29.99",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-blue-50 p-5 border border-blue-100">
                <p className="font-semibold text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof (placeholder quotes) */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Paid for itself in one weekend.",
              "Wing night just got way cheaper.",
              "So easy — we use it everywhere.",
            ].map((q, i) => (
              <blockquote key={i} className="rounded-2xl border border-slate-200 p-5 shadow-sm">
                <p className="text-slate-700">"{q}"</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-blue-50">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-3xl font-extrabold">FAQ</h2>
          <div className="mt-6 space-y-6">
            {[
              { q: "Is BiteBook physical or digital?", a: "Digital. Your access is delivered via email — simple, fast, and mobile-friendly." },
              { q: "When can I use the deals?", a: "During Wings Month. You'll receive your access now and use it when the event period is active." },
              { q: "How do I redeem?", a: "Show your BiteBook access on your phone at participating spots. Easy." },
              { q: "Where is it valid?", a: "Across select restaurants in your area. (List shown inside after purchase.)" },
              { q: "Do you offer refunds?", a: "BiteBook is a limited-quantity offer. If you have any issues, contact us — we're here to help." },
              { q: "Why limited quantity?", a: "The deals are so good, we cap availability to keep offers generous and redemption smooth." },
            ].map((f, i) => (
              <details key={i} className="rounded-2xl bg-white p-5 border border-slate-200">
                <summary className="font-semibold cursor-pointer">{f.q}</summary>
                <p className="text-slate-600 mt-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="buy" className="sticky bottom-0 z-30">
        <div className="bg-slate-900 text-white">
          <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-center md:text-left">
              <p className="font-bold text-lg">Ready for wings, beers, and big savings?</p>
              <p className="text-slate-300 text-sm">Secure checkout • Instant email confirmation • Limited quantity</p>
            </div>
            <div className="flex gap-3">
              <TrackingButton
                href="/checkout"
                value={29.99}
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold bg-yellow-400 hover:bg-yellow-300 text-slate-900 shadow"
              >
                Get Your BiteBook — $29.99
              </TrackingButton>
              <TrackingButton
                href="/checkout"
                value={29.99}
                className="hidden md:inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow"
              >
                Join Wings Month
              </TrackingButton>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} BiteBook</span>
          <div className="flex gap-4">
            <a href="/terms" className="hover:text-slate-700">Terms</a>
            <a href="/privacy" className="hover:text-slate-700">Privacy</a>
            <a href="mailto:info@getbitebook.com" className="hover:text-slate-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

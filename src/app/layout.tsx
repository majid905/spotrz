import type { Metadata } from 'next'
import './globals.css'
import VisitorTracker from '@/components/VisitorTracker'
import { getSiteSettings } from '@/lib/settings'
import Script from 'next/script'

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings()
  return {
    title: { default: s.site_title || 'ESPN Sports – Live Scores & Highlights', template: `%s | ESPN Sports` },
    description: s.meta_description || 'Live sports scores, match highlights, and breaking sports news. Watch FIFA World Cup 2026, football, basketball, boxing and more.',
    keywords: 'live sports scores, football highlights, FIFA World Cup 2026, live stream sports, ESPN sports, basketball scores, boxing results',
    icons: { icon: s.favicon_url || '/favicon.ico' },
    metadataBase: new URL('https://espnsports.online'),
    alternates: { canonical: 'https://espnsports.online' },
    openGraph: {
      title: s.site_title || 'ESPN Sports – Live Scores & Highlights',
      description: s.meta_description || 'Live sports scores, match highlights, and breaking sports news.',
      siteName: s.site_name || 'ESPN Sports',
      url: 'https://espnsports.online',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: s.site_title || 'ESPN Sports – Live Scores & Highlights',
      description: s.meta_description || 'Live sports scores, match highlights, and breaking sports news.',
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: 'ESPN Sports',
  url: 'https://espnsports.online',
  description: 'Live sports scores, match highlights, and breaking sports news.',
  sameAs: ['https://espnsports.online'],
}

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ESPN Sports',
  url: 'https://espnsports.online',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://espnsports.online/blog?search={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
      </head>
      <body>
        {/* Adsterra Social Bar + Popunder — loaded on first user interaction for Chrome compatibility */}
        <Script id="adsterra-main" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          (function() {
            var loaded = false;
            function load() {
              if (loaded) return;
              loaded = true;
              var s = document.createElement('script');
              s.src = 'https://pl17892879.effectivecpmnetwork.com/97/8c/2b/978c2bd329d738413c77d4f65d7090a1.js';
              s.async = true;
              document.head.appendChild(s);
            }
            // Load immediately for Firefox/Safari
            load();
            // Also re-trigger on first click for Chrome popup policy
            document.addEventListener('click', function() {
              var s2 = document.createElement('script');
              s2.src = 'https://pl17892879.effectivecpmnetwork.com/97/8c/2b/978c2bd329d738413c77d4f65d7090a1.js';
              s2.async = true;
              document.head.appendChild(s2);
            }, { once: true });
          })();
        `}} />
        <VisitorTracker />
        {children}
      </body>
    </html>
  )
}

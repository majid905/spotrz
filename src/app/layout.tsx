import type { Metadata } from 'next'
import './globals.css'
import VisitorTracker from '@/components/VisitorTracker'
import { getSiteSettings } from '@/lib/settings'
import Script from 'next/script'

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings()
  return {
    title: s.site_title,
    description: s.meta_description,
    icons: {
      icon: s.favicon_url || '/favicon.ico',
    },
    openGraph: {
      title: s.site_title,
      description: s.meta_description,
      siteName: s.site_name,
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script src="https://pl17892879.effectivecpmnetwork.com/97/8c/2b/978c2bd329d738413c77d4f65d7090a1.js" strategy="afterInteractive" />
        <VisitorTracker />
        {children}
      </body>
    </html>
  )
}

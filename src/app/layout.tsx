import type { Metadata } from 'next'
import './globals.css'
import VisitorTracker from '@/components/VisitorTracker'
import { getSiteSettings } from '@/lib/settings'

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
        <VisitorTracker />
        {children}
      </body>
    </html>
  )
}

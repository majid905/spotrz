import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import LiveScoreSection from '@/components/LiveScoreSection'
import LiveStreamsSection from '@/components/LiveStreamsSection'
import YouTubeLiveSection from '@/components/YouTubeLiveSection'
import AdBanner from '@/components/AdBanner'
import NextMatchSection from '@/components/NextMatchSection'
import RecentResultsSection from '@/components/RecentResultsSection'
import HighlightsSection from '@/components/HighlightsSection'
import ScheduleSection from '@/components/ScheduleSection'
import FAQSection from '@/components/FAQSection'
import BlogSection from '@/components/BlogSection'
import Footer from '@/components/Footer'
import { getSiteSettings } from '@/lib/settings'

export default async function Home() {
  const s = await getSiteSettings()
  return (
    <main>
      <Navbar logoUrl={s.logo_url} siteName={s.site_name} />
      <HeroSection />
      <LiveScoreSection />
      <LiveStreamsSection />
      <AdBanner adKey="856c19033f9f0de2da39687481e87787" width={728} height={90} />
      <YouTubeLiveSection siteName={s.site_name} />
      <NextMatchSection />
      <AdBanner adKey="856c19033f9f0de2da39687481e87787" width={728} height={90} />
      <RecentResultsSection />
      <HighlightsSection />
      <AdBanner adKey="856c19033f9f0de2da39687481e87787" width={728} height={90} />
      <ScheduleSection />
      <FAQSection />
      <BlogSection />
      <Footer
        logoUrl={s.logo_url}
        siteName={s.site_name}
        socialFacebook={s.social_facebook}
        socialTwitter={s.social_twitter}
        socialInstagram={s.social_instagram}
        socialYoutube={s.social_youtube}
        contactEmail={s.contact_email}
      />
    </main>
  )
}

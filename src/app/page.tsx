import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import LiveScoreSection from '@/components/LiveScoreSection'
import LiveStreamsSection from '@/components/LiveStreamsSection'
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
      <NextMatchSection />
      <RecentResultsSection />
      <HighlightsSection />
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

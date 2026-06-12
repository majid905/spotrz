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

function Ad728() {
  return (
    <div className="py-3">
      <div className="hidden md:block"><AdBanner adKey="856c19033f9f0de2da39687481e87787" width={728} height={90} /></div>
      <div className="md:hidden"><AdBanner adKey="856c19033f9f0de2da39687481e87787" width={300} height={250} /></div>
    </div>
  )
}

function Ad300() {
  return (
    <div className="py-3 flex justify-center">
      <AdBanner adKey="856c19033f9f0de2da39687481e87787" width={300} height={250} />
    </div>
  )
}

export default async function Home() {
  const s = await getSiteSettings()
  return (
    <main>
      <Navbar logoUrl={s.logo_url} siteName={s.site_name} />
      <HeroSection />

      {/* Ad 1: After hero — high visibility, above the fold */}
      <Ad728 />

      <LiveScoreSection />

      {/* Ad 2: After live scores — engaged sports audience */}
      <Ad728 />

      <LiveStreamsSection />

      {/* Ad 3: Between live streams and YouTube live */}
      <div className="py-3 flex justify-center gap-4 flex-wrap">
        <AdBanner adKey="856c19033f9f0de2da39687481e87787" width={300} height={250} />
        <div className="hidden lg:block">
          <AdBanner adKey="856c19033f9f0de2da39687481e87787" width={300} height={250} />
        </div>
      </div>

      <YouTubeLiveSection siteName={s.site_name} />

      {/* Ad 4: After YouTube live */}
      <Ad728 />

      <NextMatchSection />

      {/* Ad 5: Between next match and recent results */}
      <Ad300 />

      <RecentResultsSection />

      {/* Ad 6: After recent results */}
      <Ad728 />

      <HighlightsSection />

      {/* Ad 7: After highlights */}
      <Ad728 />

      <ScheduleSection />

      {/* Ad 8: Between schedule and FAQ */}
      <Ad300 />

      <FAQSection />
      <BlogSection />

      {/* Ad 9: Before footer */}
      <Ad728 />

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

import type { Metadata } from 'next'
import Link from 'next/link'
import AdBanner from '@/components/AdBanner'

const AD_KEY = '856c19033f9f0de2da39687481e87787'

function Ad() {
  return (
    <div className="py-4 text-center">
      <div className="hidden md:inline-block"><AdBanner adKey={AD_KEY} width={728} height={90} /></div>
      <div className="md:hidden inline-block"><AdBanner adKey={AD_KEY} width={300} height={250} /></div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'About ESPN Sports – Your #1 Sports Scores & Highlights Hub',
  description: 'Learn about espnsports.online – the fastest live sports scores, match highlights, and news covering FIFA World Cup 2026, Boxing, UFC, and NFL.',
  openGraph: {
    title: 'About ESPN Sports – Your #1 Sports Scores & Highlights Hub',
    description: 'Live scores, match highlights, and breaking sports news for fans worldwide.',
    url: 'https://espnsports.online/about',
  },
}

const stats = [
  { value: '50+', label: 'Countries Covered' },
  { value: '500K+', label: 'Monthly Visitors' },
  { value: '10K+', label: 'Matches Tracked' },
  { value: '24/7', label: 'Live Coverage' },
]

const team = [
  { name: 'Alex Martinez', role: 'Founder & Editor-in-Chief', sport: 'FIFA / World Cup' },
  { name: 'Jordan Lee', role: 'Combat Sports Editor', sport: 'Boxing & UFC' },
  { name: 'Marcus Thompson', role: 'NFL Analyst', sport: 'NFL & American Football' },
  { name: 'Sofia Chen', role: 'Tech Lead', sport: 'Platform & Data' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest block mb-4">About Us</span>
          <h1 className="font-oswald font-black uppercase tracking-tight mb-6" style={{ fontSize: 'clamp(2.2rem, 8vw, 4rem)' }}>
            The Home of Live<br />Sports Coverage
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            espnsports.online delivers real-time scores, match highlights, and breaking sports news — from FIFA World Cup 2026 to the UFC octagon, every second counts.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 sm:py-16 bg-red-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center text-white">
            {stats.map(s => (
              <div key={s.label}>
                <div className="font-oswald font-black text-3xl sm:text-4xl mb-1">{s.value}</div>
                <div className="text-xs font-semibold uppercase tracking-widest text-red-100">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad after stats */}
      <div className="bg-white"><Ad /></div>

      {/* Mission */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-red-600 text-xs font-bold uppercase tracking-widest block mb-3">Our Mission</span>
              <h2 className="font-oswald font-bold text-gray-900 uppercase text-2xl sm:text-3xl mb-5 tracking-tight">
                Sports News Without the Noise
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Founded by sports fans for sports fans, espnsports.online was built to cut through the clutter. No ads that take 5 seconds to skip. No paywalls on match scores. Just fast, accurate sports data the moment it happens.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                We aggregate live scores from verified APIs, publish expert analysis from our editorial team, and host the best match highlights so you never miss a moment — whether you're following the FIFA World Cup 2026, a PPV boxing bout, or an NFL Sunday showdown.
              </p>
            </div>
            <div>
              <span className="text-red-600 text-xs font-bold uppercase tracking-widest block mb-3">What We Cover</span>
              <h2 className="font-oswald font-bold text-gray-900 uppercase text-2xl sm:text-3xl mb-5 tracking-tight">
                Every Sport, Every Game
              </h2>
              <ul className="space-y-3">
                {[
                  { emoji: '⚽', sport: 'FIFA World Cup 2026', desc: 'Live scores, group standings, and match analysis' },
                  { emoji: '🥊', sport: 'Boxing', desc: 'Fight cards, results, and round-by-round highlights' },
                  { emoji: '🥋', sport: 'UFC / MMA', desc: 'Event previews, fight results, and video highlights' },
                  { emoji: '🏈', sport: 'NFL', desc: 'Game scores, stats, fantasy-relevant updates' },
                ].map(item => (
                  <li key={item.sport} className="flex gap-3 p-3 rounded-lg bg-gray-50">
                    <span className="text-2xl shrink-0">{item.emoji}</span>
                    <div>
                      <div className="font-bold text-sm text-gray-900">{item.sport}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-red-600 text-xs font-bold uppercase tracking-widest block mb-3">The Team</span>
            <h2 className="font-oswald font-bold text-gray-900 uppercase text-2xl sm:text-3xl tracking-tight">
              People Behind the Scores
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="bg-white rounded-xl p-5 text-center shadow-sm">
                <div className="w-16 h-16 bg-gray-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-oswald font-bold text-xl">{member.name[0]}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{member.name}</h3>
                <p className="text-gray-500 text-xs mb-2">{member.role}</p>
                <span className="inline-block bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                  {member.sport}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad before CTA */}
      <div className="bg-gray-50"><Ad /></div>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-oswald font-bold uppercase text-2xl sm:text-3xl mb-4 tracking-tight">
            Stay in the Game
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Follow us for live updates, and never miss a goal, knockout, or touchdown.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors">
              Live Scores
            </Link>
            <Link href="/blog" className="border-2 border-white/20 hover:border-white text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors">
              Read Blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

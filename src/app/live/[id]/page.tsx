import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import VideoPlayer from '@/components/VideoPlayer'
import AdBanner from '@/components/AdBanner'
import type { Metadata } from 'next'

interface Stream {
  id: number; title: string; team1_name: string; team1_logo: string
  team2_name: string; team2_logo: string; video_url: string; thumbnail: string
  competition: string; score1: string; score2: string; stream_status: string
  viewers: number; match_date: string; match_time: string
}

async function getStream(id: string): Promise<Stream | null> {
  try {
    const [rows] = await db.query('SELECT * FROM live_streams WHERE id=?', [id]) as any
    return rows?.[0] || null
  } catch { return null }
}

async function getOthers(currentId: string): Promise<Stream[]> {
  try {
    const [rows] = await db.query(
      'SELECT * FROM live_streams WHERE is_active=1 AND id!=? ORDER BY sort_order ASC LIMIT 8', [currentId]
    ) as any
    return rows || []
  } catch { return [] }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const s = await getStream(params.id)
  if (!s) return { title: 'Live Stream' }
  return { title: `${s.team1_name} vs ${s.team2_name} - ${s.competition} | Live` }
}

function TeamLogo({ logo, name, size = 'md' }: { logo: string; name: string; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'lg' ? 'w-16 h-16' : size === 'sm' ? 'w-8 h-8' : 'w-12 h-12'
  if (logo) return <img src={logo} alt={name} className={`${sz} object-contain rounded-full bg-white/5 p-1`} />
  return (
    <div className={`${sz} rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm`}>
      {name.slice(0, 2).toUpperCase()}
    </div>
  )
}

export default async function LiveWatchPage({ params }: { params: { id: string } }) {
  const [stream, others] = await Promise.all([getStream(params.id), getOthers(params.id)])
  if (!stream) notFound()

  return (
    <div className="min-h-screen" style={{ background: '#050b18' }}>
      {/* Top bar */}
      <div className="border-b border-white/5 px-4 sm:px-6 py-3 flex items-center justify-between" style={{ background: '#0d1526' }}>
        <Link href="/" className="flex items-center gap-2 text-white hover:text-red-400 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          <span className="text-xs font-bold uppercase tracking-widest">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"/>
          <span className="text-red-400 text-xs font-bold uppercase tracking-widest">{stream.stream_status}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
          </svg>
          <span className="font-semibold">{stream.viewers >= 1000 ? `${(stream.viewers/1000).toFixed(1)}K` : stream.viewers} watching</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 lg:grid lg:grid-cols-[160px_1fr_340px] lg:gap-4">

        {/* Left ad column — desktop only */}
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:pt-0">
          <div className="sticky top-4">
            <AdBanner adKey="856c19033f9f0de2da39687481e87787" width={160} height={600} />
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-5">
          {/* Video Player */}
          <VideoPlayer url={stream.video_url} title={stream.title} />

          {/* Ad below video — mobile only */}
          <div className="lg:hidden">
            <AdBanner adKey="856c19033f9f0de2da39687481e87787" width={300} height={250} />
          </div>

          {/* Match Info */}
          <div className="rounded-2xl p-5 sm:p-6" style={{ background: '#0d1526' }}>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-4">{stream.competition}</p>

            <div className="flex items-center justify-between gap-4">
              {/* Team 1 */}
              <div className="flex flex-col items-center gap-2 flex-1 text-center">
                <TeamLogo logo={stream.team1_logo} name={stream.team1_name} size="lg" />
                <span className="font-oswald font-bold text-white text-sm sm:text-base uppercase">{stream.team1_name}</span>
              </div>

              {/* Score */}
              <div className="text-center flex-shrink-0">
                <div className="font-oswald font-black text-white text-4xl sm:text-5xl tabular-nums leading-none mb-2">
                  {stream.score1} <span className="text-gray-600">:</span> {stream.score2}
                </div>
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full">
                  {stream.stream_status}
                </span>
              </div>

              {/* Team 2 */}
              <div className="flex flex-col items-center gap-2 flex-1 text-center">
                <TeamLogo logo={stream.team2_logo} name={stream.team2_name} size="lg" />
                <span className="font-oswald font-bold text-white text-sm sm:text-base uppercase">{stream.team2_name}</span>
              </div>
            </div>
          </div>

          {/* Other streams — mobile only (shown below player) */}
          {others.length > 0 && (
            <div className="lg:hidden space-y-3">
              <h3 className="font-oswald font-bold text-white text-lg uppercase">More Live</h3>
              <div className="grid grid-cols-2 gap-3">
                {others.map(o => (
                  <Link key={o.id} href={`/live/${o.id}`}
                    className="block rounded-xl overflow-hidden border border-white/5 hover:border-red-500/30 transition-all"
                    style={{ background: '#0d1526' }}>
                    <div className="aspect-video bg-gradient-to-br from-[#0a1020] to-[#1a2a44] flex items-center justify-center gap-2 relative">
                      {o.thumbnail
                        ? <img src={o.thumbnail} alt={o.title} className="w-full h-full object-cover opacity-60" />
                        : <><TeamLogo logo={o.team1_logo} name={o.team1_name} size="sm" /><span className="text-gray-500 text-xs font-bold">vs</span><TeamLogo logo={o.team2_logo} name={o.team2_name} size="sm" /></>
                      }
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                        <span className="w-1 h-1 bg-white rounded-full animate-pulse"/>LIVE
                      </div>
                    </div>
                    <div className="p-2.5">
                      <p className="text-[9px] text-red-500 font-bold uppercase tracking-wider mb-0.5">{o.competition}</p>
                      <p className="text-white text-xs font-semibold truncate">{o.team1_name} vs {o.team2_name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar — desktop only */}
        <div className="hidden lg:block space-y-3">
          {/* Ad at top of right sidebar */}
          <AdBanner adKey="856c19033f9f0de2da39687481e87787" width={300} height={250} />

          {others.length > 0 && <>
            <h3 className="font-oswald font-bold text-white text-lg uppercase mb-4">More Live Streams</h3>
            {others.map(o => (
              <Link key={o.id} href={`/live/${o.id}`}
                className="flex gap-3 p-3 rounded-xl border border-white/5 hover:border-red-500/30 transition-all group"
                style={{ background: '#0d1526' }}>
                <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#0a1020] to-[#1a2a44] flex items-center justify-center relative">
                  {o.thumbnail
                    ? <img src={o.thumbnail} alt={o.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                    : <div className="flex items-center gap-1">
                        <TeamLogo logo={o.team1_logo} name={o.team1_name} size="sm" />
                        <span className="text-gray-600 text-xs">v</span>
                        <TeamLogo logo={o.team2_logo} name={o.team2_name} size="sm" />
                      </div>
                  }
                  <div className="absolute top-1 left-1 flex items-center gap-0.5 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                    <span className="w-1 h-1 bg-white rounded-full animate-pulse"/>LIVE
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-red-500 font-bold uppercase tracking-wider">{o.competition}</p>
                  <p className="text-white text-xs font-semibold mt-0.5 truncate">{o.team1_name} vs {o.team2_name}</p>
                  <p className="text-gray-500 text-[10px] mt-1">{o.score1} - {o.score2}</p>
                </div>
              </Link>
            ))}
          </>}
        </div>
      </div>
    </div>
  )
}

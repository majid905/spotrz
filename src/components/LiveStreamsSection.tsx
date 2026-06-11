import Link from 'next/link'
import { db } from '@/lib/db'

interface Stream {
  id: number; title: string; team1_name: string; team1_logo: string
  team2_name: string; team2_logo: string; thumbnail: string
  competition: string; score1: string; score2: string
  stream_status: string; viewers: number
}

async function getStreams(): Promise<Stream[]> {
  try {
    const [rows] = await db.query('SELECT * FROM live_streams WHERE is_active=1 ORDER BY sort_order ASC, created_at DESC') as any
    return rows || []
  } catch { return [] }
}

function TeamLogo({ logo, name }: { logo: string; name: string }) {
  if (logo) return <img src={logo} alt={name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full bg-white/10 p-1" />
  return (
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm">
      {name.slice(0, 2).toUpperCase()}
    </div>
  )
}

function ViewerCount({ count }: { count: number }) {
  if (count >= 1000) return <>{(count / 1000).toFixed(1)}K</>
  return <>{count}</>
}

export default async function LiveStreamsSection() {
  const streams = await getStreams()
  if (streams.length === 0) return null

  return (
    <section className="py-12 sm:py-16" style={{ background: '#050b18' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <h2 className="font-oswald font-bold text-white uppercase tracking-widest"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>
              Live Now
            </h2>
          </div>
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-full">
            {streams.length} Stream{streams.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* Stream Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {streams.map(s => (
            <Link key={s.id} href={`/live/${s.id}`}
              className="group block rounded-2xl overflow-hidden border border-white/5 hover:border-red-500/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/10"
              style={{ background: '#0d1526' }}>

              {/* Thumbnail / Teams visual */}
              <div className="relative aspect-video bg-gradient-to-br from-[#0a1020] to-[#1a2a44] overflow-hidden">
                {s.thumbnail ? (
                  <img src={s.thumbnail} alt={s.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center gap-6">
                    <TeamLogo logo={s.team1_logo} name={s.team1_name} />
                    <div className="text-center">
                      <div className="font-oswald font-bold text-white text-lg sm:text-xl">
                        {s.score1} <span className="text-gray-500">:</span> {s.score2}
                      </div>
                    </div>
                    <TeamLogo logo={s.team2_logo} name={s.team2_name} />
                  </div>
                )}

                {/* LIVE badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  {s.stream_status}
                </div>

                {/* Viewers */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 text-gray-300 text-[10px] font-medium px-2 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                  <ViewerCount count={s.viewers} />
                </div>

                {/* Play overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1.5">{s.competition}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-oswald font-bold text-white text-sm truncate">{s.team1_name}</span>
                  <span className="text-gray-500 font-bold text-xs flex-shrink-0">
                    {s.score1} - {s.score2}
                  </span>
                  <span className="font-oswald font-bold text-white text-sm truncate text-right">{s.team2_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-xs">{s.title}</span>
                  <span className="text-red-500 text-xs font-bold group-hover:text-red-400 flex items-center gap-1">
                    Watch
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

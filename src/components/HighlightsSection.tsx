import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/lib/db'

async function getHighlights() {
  try {
    const [rows] = await db.query(
      `SELECT id, title, slug, thumbnail, duration, competition, views
       FROM highlights WHERE is_active = 1
       ORDER BY sort_order ASC, created_at DESC LIMIT 6`
    ) as any
    return rows || []
  } catch {
    return []
  }
}

export default async function HighlightsSection() {
  const highlights = await getHighlights()

  return (
    <section id="highlights" className="py-16 sm:py-20" style={{ background: '#070d1c' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-red-500 text-xs font-bold uppercase tracking-widest block mb-2">Watch Now</span>
            <h2 className="font-oswald font-bold text-white uppercase tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 7vw, 2.8rem)' }}>
              Match Highlights
            </h2>
          </div>
          {highlights.length > 0 && (
            <Link href="/highlights" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider transition-colors hidden sm:block">
              All Highlights →
            </Link>
          )}
        </div>

        {highlights.length === 0 ? (
          /* Empty state — shown until admin adds highlights */
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden aspect-video flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0a2010 0%, #041a08 100%)' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white/20 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="text-white/40 text-sm font-medium">Highlights coming soon</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-3 items-center p-3 rounded-xl" style={{ background: '#0d1526' }}>
                  <div className="w-24 sm:w-28 flex-shrink-0 rounded-lg aspect-video flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #0a2010, #041a08)' }}>
                    <svg className="w-4 h-4 text-white/10 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="h-2.5 bg-white/5 rounded w-3/4 mb-2" />
                    <div className="h-2 bg-white/5 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Main featured highlight */}
            <Link href={`/highlights/${highlights[0].slug || highlights[0].id}`} className="lg:col-span-2 group block">
              <div className="relative rounded-2xl overflow-hidden aspect-video" style={{ background: '#0d1526' }}>
                {highlights[0].thumbnail ? (
                  <Image
                    src={highlights[0].thumbnail}
                    alt={highlights[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #0a2010 0%, #041a08 100%)' }}>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white/40 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  {highlights[0].competition && (
                    <span className="inline-block bg-red-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest mb-2">
                      {highlights[0].competition}
                    </span>
                  )}
                  <p className="text-white font-bold text-sm sm:text-base leading-tight line-clamp-2 group-hover:text-red-300 transition-colors">
                    {highlights[0].title}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-gray-400 text-xs">
                    {highlights[0].duration && <span>{highlights[0].duration}</span>}
                    {highlights[0].duration && <span>·</span>}
                    <span>{highlights[0].views || 0} views</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Sidebar list */}
            <div className="flex flex-col gap-3">
              {highlights.slice(1, 5).map((h: any) => (
                <Link key={h.id} href={`/highlights/${h.slug || h.id}`} className="group flex gap-3 items-center p-3 rounded-xl transition-colors hover:bg-white/5" style={{ background: '#0d1526' }}>
                  <div className="relative w-24 sm:w-28 flex-shrink-0 rounded-lg overflow-hidden aspect-video">
                    {h.thumbnail ? (
                      <Image src={h.thumbnail} alt={h.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a2010, #041a08)' }}>
                        <svg className="w-4 h-4 text-white/20 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    )}
                    {h.duration && (
                      <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-white text-[8px] font-bold px-1 py-0.5 rounded">{h.duration}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-semibold leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">{h.title}</p>
                    {h.competition && <p className="text-red-500/70 text-[10px] mt-1 font-medium">{h.competition}</p>}
                    <p className="text-gray-600 text-[10px] mt-0.5">{h.views || 0} views</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {highlights.length > 0 && (
          <div className="mt-5 text-center sm:hidden">
            <Link href="/highlights" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              All Highlights →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

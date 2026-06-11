interface YTItem {
  id: { videoId: string }
  snippet: {
    title: string
    channelTitle: string
    thumbnails: { high: { url: string } }
  }
}

async function getYouTubeLive(): Promise<YTItem[]> {
  const key = process.env.YOUTUBE_API_KEY
  if (!key) return []
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&q=FIFA+World+Cup&maxResults=6&relevanceLanguage=en&key=${key}`,
      { next: { revalidate: 300 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.items || []
  } catch { return [] }
}

export default async function YouTubeLiveSection({ siteName = 'Spotrz' }: { siteName?: string }) {
  const items = await getYouTubeLive()
  if (items.length === 0) return null

  return (
    <section className="py-12 sm:py-16" style={{ background: '#080f20' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <h2 className="font-oswald font-bold text-white uppercase tracking-widest"
              style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)' }}>
              {siteName} Live
            </h2>
          </div>
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"/>
            Live
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(item => (
            <a
              key={item.id.videoId}
              href={`/watch/${item.id.videoId}?title=${encodeURIComponent(item.snippet.title)}&channel=${encodeURIComponent(item.snippet.channelTitle)}`}
              className="group block rounded-2xl overflow-hidden border border-white/5 hover:border-red-500/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/10"
              style={{ background: '#0d1526' }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.snippet.thumbnails.high.url}
                  alt={item.snippet.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                {/* Live badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"/>
                  Live
                </div>
                {/* YouTube logo */}
                <div className="absolute top-3 right-3 bg-black/60 rounded-lg p-1.5">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1.5">{item.snippet.channelTitle}</p>
                <p className="font-semibold text-white text-sm line-clamp-2 leading-snug">{item.snippet.title}</p>
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1 font-bold group-hover:text-red-400">
                  Watch Live
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

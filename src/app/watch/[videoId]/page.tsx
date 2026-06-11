import VideoPlayer from '@/components/VideoPlayer'
import AdBanner from '@/components/AdBanner'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: { videoId: string }
  searchParams: { title?: string; channel?: string }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  return { title: searchParams.title || 'Live Stream' }
}

export default function WatchPage({ params, searchParams }: Props) {
  const { videoId } = params
  const title = searchParams.title || 'Live Stream'
  const channel = searchParams.channel || ''
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`

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
          <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Live</span>
        </div>
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors text-xs font-medium"
        >
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          YouTube
        </a>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 lg:grid lg:grid-cols-[160px_1fr_160px] lg:gap-4">

        {/* Left ad — desktop only */}
        <div className="hidden lg:flex lg:flex-col lg:items-center">
          <div className="sticky top-4">
            <AdBanner adKey="856c19033f9f0de2da39687481e87787" width={160} height={600} />
          </div>
        </div>

        {/* Main content */}
        <div>
        {/* Player */}
        <VideoPlayer url={youtubeUrl} title={title} />

        {/* Ad below video — mobile only */}
        <div className="lg:hidden mt-4">
          <AdBanner adKey="856c19033f9f0de2da39687481e87787" width={300} height={250} />
        </div>

        {/* Info */}
        <div className="mt-5 rounded-2xl p-5" style={{ background: '#0d1526' }}>
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            {channel && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{channel}</p>}
          </div>
          <h1 className="font-oswald font-bold text-white text-lg sm:text-xl leading-snug">{title}</h1>
        </div>
        </div>

        {/* Right ad — desktop only */}
        <div className="hidden lg:flex lg:flex-col lg:items-center">
          <div className="sticky top-4">
            <AdBanner adKey="856c19033f9f0de2da39687481e87787" width={160} height={600} />
          </div>
        </div>

      </div>
    </div>
  )
}
